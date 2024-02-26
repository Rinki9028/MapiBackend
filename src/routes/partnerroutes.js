const express = require("express");
const partnerController = require("../controllers/partnerController");

const router = express.Router();

const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  let data = await partnerController.get();
  res.json({ status: 200, data });
});

router.post("/", async (req, res) => {
  const post = req.body;
  let partnerExists = await partnerController.get(post.PartnerName);
  if (partnerExists?.length > 0) {
    return res.json({
      status: 400,
      message: `PartnerName "${partnerExists[0].PartnerName}": already exists`,
    });
  }
  let data = await partnerController.save(post);
  if (data.insertId) {
    res.json({ status: 200, message: "Partner data added successfully" });
  } else {
    res.json({ status: 400, message: "Something went wrong" });
  }
});

router.put("/", async (req, res) => {
  const post = req.body;
  let partnerExists = await partnerController.get(post.PartnerName);
  if (partnerExists?.length > 0 && partnerExists[0].VendorPartner_id != post.VendorPartner_id) {
    return res.json({ status: 400, message: "PartnerName already exists" });
  }
  let data = await partnerController.update(post, partnerExists[0]);
  if (data.affectedRows > 0) {
    res.json({ status: 200, message: "Partner data updated successfully" });
  } else {
    res.json({ status: 400, message: "Something went wrong" });
  }
});
router.delete("/", async (req, res) => {
  const post = req.query;
  let data = await partnerController.remove(post);
  if (data.affectedRows > 0) {
    res.json({ status: 200, message: "Partner data deleted successfully" });
  } else {
    res.json({ status: 400, message: "Something went wrong" });
  }
});
router.post("/partnerEntry", (req, res) => {
    const {valName} = req.body;
    partnerController.fn_InsertPartner(valName, (error, data) => 
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

  

  router.post("/getPartner", (req, res) => {
    const {valPid,ValCase} = req.body;
    partnerController.fn_SelectPartner(valPid,ValCase, (error, data) => 
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


 