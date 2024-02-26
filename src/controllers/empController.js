const db = require("../db/connMysql"); // Import the database connection
const settings =  require('../config/settings')
const moment = require('moment')
const crypto = require('crypto');

exports.get = (username = null) => {
  let query = `SELECT Login_id, CPassword, Username, modified_at, created_date, Is_active from emp`
  if (username) {
    query += ` WHERE Username = '${username}'`
  }

  query += ` ORDER BY created_date DESC`
  return new Promise((resolve, reject) => {
    db.query(query, (err, result) => {
      return err ? reject(err) : resolve(result);
    })
  });
}

exports.save = (data) => {
  let currentTime = moment().format('YYYY-MM-DD HH:mm:ss')
  let password = crypto.createHmac(settings.hashing.algorithm, data.CPassword).update(settings.hashing.salt).digest("hex");

  return new Promise((resolve, reject) => {
    let query = `INSERT INTO emp (Username, CPassword, token, Is_active, modified_at, created_date)
    VALUES (?, ?, ?, ?, ?, ?)`
    db.query(query, [data.Username, password, '', data.Is_active, currentTime, currentTime], (err, result) => {
      return err ? reject(err) : resolve(result);
    })
  });
}


exports.update = (data, employeeData) => {
  let currentTime = moment().format('YYYY-MM-DD HH:mm:ss')
  let password = data.CPassword == '****' ? employeeData.CPassword : crypto.createHmac(settings.hashing.algorithm, data.CPassword).update(settings.hashing.salt).digest("hex");
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE emp SET Username = ?, CPassword = ?, Is_active = ?, modified_at = ? WHERE Login_id = ?`,
      [data.Username, password, data.Is_active, currentTime, data.Login_id],
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
}

exports.remove = (post) => {
  return new Promise((resolve, reject) => {
    let query = `DELETE FROM emp WHERE Login_id = ?`
    db.query(query, [post.Login_id], (err, result) => {
      return err ? reject(err) : resolve(result);
    })
  });
}