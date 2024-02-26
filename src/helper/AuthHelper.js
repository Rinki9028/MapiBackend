const AuthModel = require('../models/AuthModel')
const jwt = require('jsonwebtoken')

exports.verifyUserToken = async (req, res, next) => {
    if (req.headers.authorization) {
        let token = req.headers.authorization.split(' ')
        if (token.length == 2) {
            let data = await AuthModel.verifyToken(token[1])
            if (data.length > 0) {
                //user active check
                if (data[0].Is_active == 0) {
                    return res.status(401).send('user is not active | not authorized to visit the site')
                }

                //user token expiration jwt check
                let userToken = data[0].token
                if (token[1] != userToken) {
                    return res.status(401).send('Unauthorized request')
                }
                
                if (userToken) {
                    jwt.verify(userToken, process.env.TOKEN_KEY, (err, decoded) => {
                        if (err) {
                            return res.status(401).send('Unauthorized request')
                        }
                        res.userData = decoded
                    })
                    next()
                } else {
                    return res.status(401).send('Unauthorized request')
                }
            } else {
                return res.json({status: 401, message: 'you are not authorized to access this site'})
            }
        }
    } else {
        return res.json({status: 401, message: 'you are not authorized to access this site'})
    }
}