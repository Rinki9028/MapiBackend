const express = require("express");
const eventController = require("../controllers/eventController");

const router = express.Router();

const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  let data = await eventController.get();
  res.json({ status: 200, data });
});

router.post("/", async (req, res) => {
  const post = req.body;
  let eventExists = await eventController.get(post.EventName);
  if (eventExists?.length > 0) {
    return res.json({
      status: 400,
      message: `EventName "${eventExists[0].EventName}": already exists`,
    });
  }
  let data = await eventController.save(post);
  if (data.insertId) {
    res.json({ status: 200, message: "Event data added successfully" });
  } else {
    res.json({ status: 400, message: "Something went wrong" });
  }
});

router.put("/", async (req, res) => {
  const post = req.body;
  let eventExists = await eventController.get(post.EventName);
  if (
    eventExists?.length > 0 &&
    eventExists[0].Venue_id != post.Venue_id
  ) {
    return res.json({ status: 400, message: "EventName already exists" });
  }
  let data = await eventController.update(post, eventExists[0]);
  if (data.affectedRows > 0) {
    res.json({ status: 200, message: "Event data updated successfully" });
  } else {
    res.json({ status: 400, message: "Something went wrong" });
  }
});
router.delete("/", async (req, res) => {
  const post = req.query;
  let data = await eventController.remove(post);
  if (data.affectedRows > 0) {
    res.json({ status: 200, message: "Event data deleted successfully" });
  } else {
    res.json({ status: 400, message: "Something went wrong" });
  }
});

router.post("/eventEntry", (req, res) => {
  const { valName } = req.body;
  eventController.fn_InsertEvent(valName, (error, data) => {
    if (error) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json({ isValid: true });
    }
  });
});

router.post("/getEvent", (req, res) => {
  const { valEid, ValCase } = req.body;
  eventController.fn_SelectEvent(valEid, ValCase, (error, data) => {
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
