const db = require('../db/connMysql');

exports.verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT * FROM emp WHERE token = '${token}'`,
            (err, result) => {
                return err ? reject(err) : resolve(result);
            }
        );
    });
}