const db = require("../db/connMysql"); // Import the database
const settings = require("../config/settings");
const moment = require("moment");
const crypto = require("crypto");

exports.get = (foodname = null) => {
  let query = `SELECT Food_id, FoodName, created_date, Is_active from food`;
  if (foodname) {
    query += ` WHERE FoodName = '${foodname}'`;
  }

  query += ` ORDER BY created_date DESC`;
  return new Promise((resolve, reject) => {
    db.query(query, (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
};

exports.save = (data) => {
  let currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
  return new Promise((resolve, reject) => {
    let query = `INSERT INTO food (FoodName, Is_active, created_date)
    VALUES (?, ?, ?)`;
    db.query(
      query,
      [data.FoodName, data.Is_active, currentTime],
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
};

exports.update = (data, foodsData) => {
  let currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE food SET FoodName = ?, Is_active = ? WHERE Food_id = ?`,
      [data.FoodName, data.Is_active, data.Food_id],
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
};

exports.remove = (post) => {
  return new Promise((resolve, reject) => {
    let query = `DELETE FROM food WHERE Food_id = ?`;
    db.query(query, [post.Food_id], (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
};

function fn_InsertFood(valName, callback) {
  db.query("CALL sp_FoodEntry(?)", [valName], (error, results) => {
    if (error) {
      console.error("Error calling stored procedure:", error);
      callback(error, null);
    } else {
      callback(null, results[0]);
    }
  });
}

function fn_SelectFood(valEid, ValCase, callback) {
  db.query("CALL sp_getFood(?,?)", [valEid, ValCase], (error, results) => {
    if (error) {
      console.error("Error calling stored procedure:", error);
      callback(error, null);
    } else {
      callback(null, results[0]);
    }
  });
}

module.exports = {
  ...exports,
  fn_InsertFood,
  fn_SelectFood,
};
