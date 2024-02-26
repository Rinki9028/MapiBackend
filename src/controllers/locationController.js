const db = require("../db/connMysql");
const settings = require("../config/settings");
const moment = require("moment");
const crypto = require("crypto");

exports.get = (locationname = null) => {
  let query = `SELECT Location_id, LocationName, created_date, Is_active from locationtype`;
  if (locationname) {
    query += ` WHERE LocationName = '${locationname}'`;
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
    let query = `INSERT INTO locationtype (LocationName, Is_active, created_date)
    VALUES (?, ?, ?)`;
    db.query(
      query,
      [data.LocationName, data.Is_active, currentTime],
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
};

exports.update = (data, locationData) => {
  let currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE locationtype SET LocationName = ?, Is_active = ? WHERE Location_id = ?`,
      [data.LocationName, data.Is_active, data.Location_id],
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
};

exports.remove = (post) => {
  return new Promise((resolve, reject) => {
    let query = `DELETE FROM locationtype WHERE Location_id = ?`;
    db.query(query, [post.Location_id], (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
};
function fn_Insertlocation(valName, callback) {
  db.query('CALL sp_LocationEntry(?)', [valName], (error, results) => {
    if (error) {
      console.error('Error calling stored procedure:', error);
      callback(error, null);
    } else {
      callback(null, results[0]);
    }
  });
}
function fn_SelectLocation(valPid,ValCase,callback) {
  db.query('CALL sp_getLocationType(?,?)', 
  [valPid,ValCase], (error, results) => {
    if (error) {
      console.error('Error calling stored procedure:', error);
      callback(error, null);
    } else {
      callback(null, results[0]);
    }
  });
}

module.exports = { ...exports, fn_SelectLocation,fn_Insertlocation};


