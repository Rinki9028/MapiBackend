const db = require("../db/connMysql");
const settings = require("../config/settings");
const moment = require("moment");
const crypto = require("crypto");

exports.get = (partnername = null) => {
  let query = `SELECT VendorPartner_id, PartnerName, created_date, Is_active from vendorpartner`;
  if (partnername) {
    query += ` WHERE PartnerName = '${partnername}'`;
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
    let query = `INSERT INTO vendorpartner (PartnerName, Is_active, created_date)
    VALUES (?, ?, ?)`;
    db.query(
      query,
      [data.PartnerName, data.Is_active, currentTime],
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
};

exports.update = (data, partnerData) => {
  let currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE vendorpartner SET PartnerName = ?, Is_active = ? WHERE VendorPartner_id = ?`,
      [data.PartnerName, data.Is_active, data.VendorPartner_id],
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
};

exports.remove = (post) => {
  return new Promise((resolve, reject) => {
    let query = `DELETE FROM vendorpartner WHERE VendorPartner_id = ?`;
    db.query(query, [post.VendorPartner_id], (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
};
function fn_InsertPartner(valName, callback) {
  db.query('CALL sp_PartnerEntry(?)', [valName], (error, results) => {
    if (error) {
      console.error('Error calling stored procedure:', error);
      callback(error, null);
    } else {
      callback(null, results[0]);
    }
  });
}
function fn_SelectPartner(valPid,ValCase,callback) {
  db.query('CALL sp_getPartnerName(?,?)', 
  [valPid,ValCase], (error, results) => {
    if (error) {
      console.error('Error calling stored procedure:', error);
      callback(error, null);
    } else {
      callback(null, results[0]);
    }
  });
}

module.exports = {...exports, fn_InsertPartner,fn_SelectPartner};


