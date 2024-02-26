const db = require("../db/connMysql"); // Import the database
const settings = require("../config/settings");
const moment = require("moment");
const crypto = require("crypto");

exports.get = (statusname = null) => {
  let query = `SELECT LeadStatus_id, StatusName, created_date, Is_active from leadstatus`;
  if (statusname) {
    query += ` WHERE StatusName = '${statusname}'`;
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
    let query = `INSERT INTO leadstatus (StatusName, Is_active, created_date)
    VALUES (?, ?, ?)`;
    db.query(
      query,
      [data.StatusName,data.Is_active, currentTime],
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
};

exports.update = (data, statusData) => {
  let currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
   return new Promise((resolve, reject) => {
    db.query(
      `UPDATE leadstatus SET StatusName = ?, Is_active = ? WHERE LeadStatus_id = ?`,
      [data.StatusName, data.Is_active ,data.LeadStatus_id],
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
};

exports.remove = (post) => {
  return new Promise((resolve, reject) => {
    let query = `DELETE FROM leadstatus WHERE LeadStatus_id = ?`;
    db.query(query, [post.LeadStatus_id], (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
};

function fn_InsertStatus(valName, callback) {
  db.query("CALL sp_StatusEntry(?)", [valName], (error, results) => {
    if (error) {
      console.error("Error calling stored procedure:", error);
      callback(error, null);
    } else {
      callback(null, results[0]);
    }
  });
}

function fn_SelectStatus(valEid, ValCase, callback) {
  db.query("CALL sp_getStatus(?,?)", [valEid, ValCase], (error, results) => {
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
  fn_InsertStatus,
  fn_SelectStatus,
};
