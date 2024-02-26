const db = require("../db/connMysql");
const settings = require("../config/settings");
const moment = require("moment");
const crypto = require("crypto");

exports.get = (eventname = null) => {
  let query = `SELECT Event_id, EventName, created_date, Is_active from eventtype`;
  if (eventname) {
    query += ` WHERE EventName = '${eventname}'`;
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
    let query = `INSERT INTO eventtype (EventName, Is_active, created_date)
    VALUES (?, ?, ?)`;
    db.query(
      query,
      [data.EventName, data.Is_active, currentTime],
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
      `UPDATE eventtype SET EventName = ?, Is_active = ? WHERE Event_id = ?`,
      [data.EventName, data.Is_active, data.Event_id],
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
};

exports.remove = (post) => {
  return new Promise((resolve, reject) => {
    let query = `DELETE FROM eventtype WHERE Event_id = ?`;
    db.query(query, [post.Event_id], (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
};
function fn_InsertEvent(valName, callback) {
  db.query('CALL sp_EventEntry(?)', [valName], (error, results) => {
    if (error) {
      console.error('Error calling stored procedure:', error);
      callback(error, null);
    } else {
      callback(null, results[0]);
    }
  });
}

function fn_SelectEvent(valEid,ValCase,callback) {
  db.query('CALL sp_getEventType(?,?)', 
  [valEid,ValCase], (error, results) => {
    if (error) {
      console.error('Error calling stored procedure:', error);
      callback(error, null);
    } else {
      callback(null, results[0]);
    }
  });
}

module.exports = { ...exports, fn_SelectEvent,fn_InsertEvent};


