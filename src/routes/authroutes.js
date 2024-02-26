// const express = require('express');
// const AuthController = require('../controllers/authController');
// const router = express.Router();

// const crypto = require('crypto');
// const jwt = require('jsonwebtoken');
// const settings = require('../config/settings');

// router.post("/loginCheck", async (req, res) => {
//   const { LoginId, LoginPass } = req.body;
//   let password = crypto.createHmac(settings.hashing.algorithm, LoginPass).update(settings.hashing.salt).digest("hex");

//   AuthController.validateLogin(LoginId, password, async (error, data) => {
//     if (error) {
//       res.status(500).json({ error: "Internal server error" });
//     } else {
//       if (data && data.length > 0) {
//         if (data[0].Is_active == 0) {
//           res.json({ status: 400, message: 'User is not active | Please contact system administrator', isValid: false});
//         }
//         const token = jwt.sign( { Username: data[0].Username, Login_id: data[0].Login_id }, process.env.TOKEN_KEY, { expiresIn: "24h" } );
//         await AuthController.updateToken(data[0], token)
//         res.json({ status: 200, token, Username: data[0].Username, isValid: true });
//       } else {
//         res.json({ status: 400, message: 'Username/Password doesn\'t match', isValid: false});
//       }
//     }
//   });
// });



//   AuthController.EmpCheckIn(LoginId, Chktype, chkId, async (error, data) => {
//     if (error) {
//       res.status(500).json({ error: "Internal server error" });
//     } else {
//       if (data && data.length > 0) {
//         if (data[0].Is_active == 0) {
//           res.json({ status: 400, message: 'User is not active | Please contact system administrator', isValid: false});
//         }
//         const token = jwt.sign( { Username: data[0].Username, Login_id: data[0].Login_id }, process.env.TOKEN_KEY, { expiresIn: "24h" } );
//         await AuthController.updateToken(data[0], token)
//         res.json({ status: 200, token, Username: data[0].Username, isValid: true });
//       } else {
//         res.json({ status: 400, message: 'Username/Password doesn\'t match', isValid: false});
//       }
//     }
//   });



// module.exports = router;


const express = require('express');
const AuthController = require('../controllers/authController');
const router = express.Router();

const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const settings = require('../config/settings');

router.post("/loginCheck", async (req, res) => {
  const { LoginId, LoginPass } = req.body;
  let password = crypto.createHmac(settings.hashing.algorithm, LoginPass).update(settings.hashing.salt).digest("hex");

  AuthController.validateLogin(LoginId, password, async (error, data) => {
    if (error) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (data && data.length > 0) {
        if (data[0].Is_active == 0) {
          res.json({ status: 400, message: 'User is not active | Please contact system administrator', isValid: false});
        }
        const token = jwt.sign( { Username: data[0].Username, Login_id: data[0].Login_id }, process.env.TOKEN_KEY, { expiresIn: "24h" } );
        await AuthController.updateToken(data[0], token)
        res.json({ status: 200, token, Username: data[0].Username, isValid: true });
      } else {
        res.json({ status: 400, message: 'Username/Password doesn\'t match', isValid: false});
      }
    }
  });
});
module.exports = router;