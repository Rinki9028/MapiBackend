const express = require("express");
const foodController = require("../controllers/foodController");

const router = express.Router();

const jwt = require('jsonwebtoken')

router.get("/", async (req, res) => {
  let data = await foodController.get()
  res.json({status: 200, data})
})

router.post("/", async (req, res) => {
  const post = req.body;
    let foodExists = await foodController.get(post.FoodName)
  if (foodExists?.length > 0) {
    return res.json({status: 400, message: `FoodName "${foodExists[0].FoodName}": already exists`})
  }
  let data = await foodController.save(post)
  if (data.insertId) {
    res.json({status: 200, message: 'Food data added successfully'})
  } else {
    res.json({status: 400, message: 'Something went wrong'})
  }
})

router.put("/", async (req, res) => {
  const post = req.body;
  let foodExists = await foodController.get(post.FoodName)
  if (foodExists?.length > 0 && foodExists[0].Food_id != post.Food_id){
    return res.json({status: 400, message: 'FoodName already exists'})
  }
  let data = await foodController.update(post, foodExists[0])
  if (data.affectedRows > 0) {
    res.json({status: 200, message: 'Food data updated successfully'})
  } else {
    res.json({status: 400, message: 'Something went wrong'})
  }
})
router.delete("/", async (req, res) => {
  const post = req.query;
  let data = await foodController.remove(post)
  if (data.affectedRows > 0) {
    res.json({status: 200, message: 'Food data deleted successfully'})
  } else {
    res.json({status: 400, message: 'Something went wrong'})
  }
})

router.post("/foodEntry", (req, res) => {
  const {valName} = req.body;
  foodController.fn_InsertFood(valName, (error, data) => 
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

router.post("/getfood", (req, res) => {
  const {valEid,ValCase} = req.body;
  foodController.fn_SelectFood(valEid,ValCase, (error, data) => 
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
 