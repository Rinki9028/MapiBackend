const express = require('express');
const leadController = require('../controllers/leadController');
const leadroutes = express.Router();

leadroutes.post("/leadEntry", (req, res) => {
     const {Name, PhoneNumber, Event_type,E_Location,Event_date,
      CreatedBy,valPartner,IsPremiumLead,} = req.body;
    let userId = res.userData.Login_id
    leadController.fn_InsertLead(Name, PhoneNumber, Event_type,E_Location,Event_date,
      CreatedBy,valPartner,IsPremiumLead,userId, (error, data) => 
    {
      if (error) 
      {
        res.status(500).json({ error: "Internal server error" });
      } 
      else 
      {
        res.json({ status: 200, message: 'Data saved successfully' });
      }
    });
  });

  leadroutes.post("/leadupdate", (req, res) => {
    const post = req.body;
    post.Modifiedby = res.userData.Login_id
    leadController.fn_UpdateLead(post, (error, data) => 
    {
      if (error) 
      {
        res.status(500).json({ error: "Internal server error" });
      } 
      else 
      {
        res.json({ status: 200, message: 'Data updated successfully' });
      }
    });
  });


  leadroutes.post("/getLead", (req, res) => {
    const {valTid,ValCase} = req.body;
      leadController.fn_SelectLead(valTid,ValCase, (error, data) => 
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
  
  
  module.exports = leadroutes;


 