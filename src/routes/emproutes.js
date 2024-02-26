const express = require('express');
const empController = require('../controllers/empController');
const router = express.Router();

const jwt = require('jsonwebtoken')

router.get("/", async (req, res) => {
  let data = await empController.get()
  res.json({status: 200, data})
})

router.post("/", async (req, res) => {
  const post = req.body;
  let employeeExists = await empController.get(post.Username)
  if (employeeExists?.length > 0) {
    return res.json({status: 400, message: `Username "${employeeExists[0].Username}": already exists`})
  }
  let data = await empController.save(post)
  if (data.insertId) {
    res.json({status: 200, message: 'Employee data added successfully'})
  } else {
    res.json({status: 400, message: 'Something went wrong'})
  }
})

router.put("/", async (req, res) => {
  const post = req.body;
  let employeeExists = await empController.get(post.Username)
  if (employeeExists?.length > 0 && employeeExists[0].Username == post.Username && employeeExists[0].Login_id != post.Login_id){
    return res.json({status: 400, message: 'Username already exists'})
  }
  let data = await empController.update(post, employeeExists[0])
  if (data.affectedRows > 0) {
    res.json({status: 200, message: 'Employee data updated successfully'})
  } else {
    res.json({status: 400, message: 'Something went wrong'})
  }
})
router.delete("/", async (req, res) => {
  const post = req.query;
  let data = await empController.remove(post)
  if (data.affectedRows > 0) {
    res.json({status: 200, message: 'Employee data deleted successfully'})
  } else {
    res.json({status: 400, message: 'Something went wrong'})
  }
})

module.exports = router;