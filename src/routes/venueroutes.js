const express = require("express");
const venueController = require("../controllers/venueController");

const router = express.Router();

const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  let data = await venueController.get();
  res.json({ status: 200, data });
});

router.post("/", async (req, res) => {
  const post = req.body;
  let venueExists = await venueController.get(post.VenueName);
  if (venueExists?.length > 0) {
    return res.json({
      status: 400,
      message: `VenueName "${venueExists[0].VenueName}": already exists`,
    });
  }
  let data = await venueController.save(post);
  if (data.insertId) {
    res.json({ status: 200, message: "venue data added successfully" });
  } else {
    res.json({ status: 400, message: "Something went wrong" });
  }
});

router.put("/", async (req, res) => {
  const post = req.body;
  let venueExists = await venueController.get(post.VenueName);
  if (venueExists?.length > 0 && venueExists[0].Venue_id != post.Venue_id) {
    return res.json({ status: 400, message: "VenueName already exists" });
  }
  let data = await venueController.update(post, venueExists[0]);
  if (data.affectedRows > 0) {
    res.json({ status: 200, message: "venue data updated successfully" });
  } else {
    res.json({ status: 400, message: "Something went wrong" });
  }
});
router.delete("/", async (req, res) => {
  const post = req.query;
  let data = await venueController.remove(post);
  if (data.affectedRows > 0) {
    res.json({ status: 200, message: "Venue data deleted successfully" });
  } else {
    res.json({ status: 400, message: "Something went wrong" });
  }
});

router.post("/venueEntry", (req, res) => {
  const { valName } = req.body;
  venueController.fn_InsertVenue(valName, (error, data) => {
    if (error) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json({ isValid: true });
    }
  });
});
router.post("/getvenue", (req, res) => {
  const { valEid, ValCase } = req.body;
  venueController.fn_SelectVenue(valEid, ValCase, (error, data) => {
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
