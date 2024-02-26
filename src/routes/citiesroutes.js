const express = require('express');
const citiesController = require('../controllers/citiesController'); // Assuming you have a cities controller
const citiesroutes = express.Router();

citiesroutes.post("/cityEntry", (req, res) => {
  const { valName } = req.body;
  citiesController.fn_InsertCity(valName, (error, data) => {
      if (error) {
          res.status(500).json({ error: "Internal server error" });
      } else {
          res.json({ isValid: true });
      }
  });
});
  

citiesroutes.post("/getCity", (req, res) => {
  const { valLid, ValCase } = req.body;
  citiesController.fn_SelectCity(valLid, ValCase, (error, data) => {
      if (error) {
          res.status(500).json({ error: "Internal server error" });
      } else {
          if (data && data.length > 0) {
              res.json({ isValid: true, data });
          } else {
              res.json({ isValid: false, data: [] });
          }
      }
  });
});
  
  module.exports = citiesroutes;


 
