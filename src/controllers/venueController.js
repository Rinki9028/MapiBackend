const db = require("../db/connMysql");
const settings = require("../config/settings");
const moment = require("moment");
const crypto = require("crypto");

exports.get = (venuename = null) => {
  let query = `SELECT Venue_id, VenueName, created_date, Is_active from venue`;
  if (venuename) {
    query += ` WHERE VenueName = '${venuename}'`;
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
    let query = `INSERT INTO venue (VenueName, Is_active, created_date)
    VALUES (?, ?, ?)`;
    db.query(
      query,
      [data.VenueName, data.Is_active, currentTime],
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
      `UPDATE venue SET VenueName = ?, Is_active = ? WHERE Venue_id = ?`,
      [data.VenueName, data.Is_active, data.Venue_id],
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
};

exports.remove = (post) => {
  return new Promise((resolve, reject) => {
    let query = `DELETE FROM venue WHERE Venue_id = ?`;
    db.query(query, [post.Venue_id], (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
};

function fn_InsertVenue(valName, callback) {
  db.query("CALL sp_VenueEntry(?)", [valName], (error, results) => {
    if (error) {
      console.error("Error calling stored procedure:", error);
      callback(error, null);
    } else {
      callback(null, results[0]);
    }
  });
}

function fn_SelectVenue(valEid, ValCase, callback) {
  db.query("CALL sp_getVenue(?,?)", [valEid, ValCase], (error, results) => {
    if (error) {
      console.error("Error calling stored procedure:", error);
      callback(error, null);
    } else {
      callback(null, results[0]);
    }
  });
}

module.exports = { ...exports, fn_InsertVenue, fn_SelectVenue };
