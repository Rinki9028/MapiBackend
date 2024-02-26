const express = require("express");
const locationController = require("../controllers/locationController");

const router = express.Router();

const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  let data = await locationController.get();
  res.json({ status: 200, data });
});

router.post("/", async (req, res) => {
  const post = req.body;
  let locationExists = await locationController.get(post.LocationName);
  if (locationExists?.length > 0) {
    return res.json({
      status: 400,
      message: `LocationName "${locationExists[0].LocationName}": already exists`,
    });
  }
  let data = await locationController.save(post);
  if (data.insertId) {
    res.json({ status: 200, message: "Location data added successfully" });
  } else {
    res.json({ status: 400, message: "Something went wrong" });
  }
});

router.put("/", async (req, res) => {
  const post = req.body;
  let locationExists = await locationController.get(post.LocationName);
  if (
    locationExists?.length > 0 &&
    locationExists[0].Location_id  != post.Location_id 
  ) {
    return res.json({ status: 400, message: "LocationName already exists" });
  }
  let data = await locationController.update(post, locationExists[0]);
  if (data.affectedRows > 0) {
    res.json({ status: 200, message: "Location data updated successfully" });
  } else {
    res.json({ status: 400, message: "Something went wrong" });
  }
});
router.delete("/", async (req, res) => {
  const post = req.query;
  let data = await locationController.remove(post);
  if (data.affectedRows > 0) {
    res.json({ status: 200, message: "Location data deleted successfully" });
  } else {
    res.json({ status: 400, message: "Something went wrong" });
  }
});

router.post("/locationEntry", (req, res) => {
    const {valName} = req.body;
    locationController.fn_Insertlocation(valName, (error, data) => 
    {
      if (error) 
      {
        res.status(500).json({ error: "Internal server error" });
      } 
      else 
      {
        res.json({ isValid: true });
      }
    });
  });

  

  router.post("/getLocation", (req, res) => {
    const {valLid,ValCase} = req.body;
    locationController.fn_SelectLocation(valLid,ValCase, (error, data) => 
    {
      if (error) {
        res.status(500).json({ error: "Internal server error" });
      } else {
        if (data && data.length > 0) {
          res.json({ isValid: true,data });
        } else {
          res.json({ isValid: false,data});
        }
      }
    });
  });
  
  
  module.exports = router;


 