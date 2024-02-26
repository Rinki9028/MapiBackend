const express = require('express');
const router = express.Router();
const AccountController = require('../controllers/AccountController');

router.get("/", async (req, res) => {
  let loginId = res.userData.Login_id
  let data = await AccountController.get(loginId);
  res.json({status: 200, data: data[0]})
});

module.exports = router;