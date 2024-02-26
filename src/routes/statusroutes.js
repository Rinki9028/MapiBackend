const express = require("express");
const statusController = require("../controllers/statusController");

const router = express.Router();

const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  let data = await statusController.get();
  res.json({ status: 200, data });
});

router.post("/", async (req, res) => {
  const post = req.body;
  let statusExists = await statusController.get(post.StatusName);
  if (statusExists?.length > 0) {
    return res.json({
      status: 400,
      message: `StatusName "${statusExists[0].StatusName}": already exists`,
    });
  }
  let data = await statusController.save(post);
  if (data.insertId) {
    res.json({ status: 200, message: "Status data added successfully" });
  } else {
    res.json({ status: 400, message: "Something went wrong" });
  }
});

router.put("/", async (req, res) => {
  const post = req.body;
  let statusExists = await statusController.get(post.StatusName);
  if (
    statusExists?.length > 0 &&
    statusExists[0].LeadStatus_id != post.LeadStatus_id
  ) {
    return res.json({ status: 400, message: "StatusName already exists" });
  }
  let data = await statusController.update(post, statusExists[0]);
  if (data.affectedRows > 0) {
    res.json({ status: 200, message: "Status data updated successfully" });
  } else {
    res.json({ status: 400, message: "Something went wrong" });
  }
});
router.delete("/", async (req, res) => {
  const post = req.query;
  let data = await statusController.remove(post);
  if (data.affectedRows > 0) {
    res.json({ status: 200, message: "Status data deleted successfully" });
  } else {
    res.json({ status: 400, message: "Something went wrong" });
  }
});

router.post("/statusEntry", (req, res) => {
  const { valName } = req.body;
  statusController.fn_InsertStatus(valName, (error, data) => {
    if (error) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json({ isValid: true });
    }
  });
});

router.post("/getStatus", (req, res) => {
  const { valEid, ValCase } = req.body;
  statusController.fn_SelectStatus(valEid, ValCase, (error, data) => {
    if (error) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (data && data.length > 0) {
        res.json({ isValid: true, data });
      } else {
        res.json({ isValid: false, data });
      }
    }
  });
});
module.exports = router;
