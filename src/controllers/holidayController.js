const db = require("../db/connMysql");
const settings = require("../config/settings");
const moment = require("moment");
const crypto = require("crypto");

exports.fn_InsertHoliday = (holidayName, holidaytype, holidaydate,CreatedBy , callback) => {
  db.query('CALL sp_HolidayEntry(?,?,?,?)', [holidayName, holidaytype, holidaydate,CreatedBy, ], (error, results) => {
    if (error) {
      console.error('Error calling stored procedure:', error);
      callback(error, null);
    } else {
      callback(null, results[0]);
    }
  });
}

exports.fn_SelectHoliday = (valLid,ValCase,callback) => {
  db.query('CALL sp_getHoliday(?,?)', 
  [valLid,ValCase], (error, results) => {
    if (error) {
      console.error('Error calling stored procedure:', error);
      callback(error, null);
    } else {
      callback(null, results[0]);
    }
  });
}

exports.fn_UpdateHoliday = (post, callback) => { 
  db.query('CALL sp_UpdateHoliday(?,?,?,?,?)',
    [post.holiday_id, post.holidayName, post.holidaytype, post.holidaydate, post.ModifiedBy],
    (error, results) => {
      if (error) {
        console.error('Error calling stored procedure:', error);
        callback(error, null);
      } else {
        callback(null, results[0]);
      }
    });
}


exports.remove = (post) => {
  return new Promise((resolve, reject) => {
    let query = `DELETE FROM holidaylist WHERE holiday_id = ?`;
    db.query(query, [post.holiday_id], (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
};


// // for get all holydaylist table data on screen
// exports.get = (holidayname = null) => {
//   let query =  `SELECT holiday_id, holidayName, holidaytype, holidaydate, Created_by, Created_date, Modified_by, modified_date, Is_active FROM holidaylist`;
//   if (holidayname) {
//     query += ` WHERE holidayName = '${holidayname}'`;
//   }

//   query += ` ORDER BY created_date DESC`;
//   return new Promise((resolve, reject) => {
//     db.query(query, (err, result) => {
//       return err ? reject(err) : resolve(result);
//     });
//   });
// };
// //for save/insert data in holidaylist table
// exports.save = (data) => {
//   let currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
//   return new Promise((resolve, reject) => {

//     let query = `INSERT INTO holidaylist (holidayName,holidaytype,holidaydate,Created_by,Created_date, Is_active)
//     VALUES (?, ?, ?, ?, ?, ?)`;
//     db.query(
//       query,
//       [
//         data.holidayName,
//         data.holidaytype,
//         data.holidaydate,
//         data.CreatedBy,
//         currentTime,
//         data.Is_active,
//       ],
//       (err, result) => {
//         return err ? reject(err) : resolve(result);
//       }
//     );
//   });
// };
// //for update/put data in holidaylist table
// exports.update = (data, holidayData) => {
//   let currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
//   return new Promise((resolve, reject) => {
//     db.query(    
//        `UPDATE holidaylist SET holidayName = ?, holidaytype = ?, holidaydate = ?, Created_by = ?, Created_date = ?, Modified_by = ?, modified_date = ?, Is_active = ? WHERE  holiday_id = ?`,
//       [
//         data.holidayName,
//         data.holidaytype,
//         data.holidaydate,
//         data.CreatedBy,
//         data.Created_date,
//         data.Modified_by,
//         data.modified_date,
//         data.Is_active,
//         data.holiday_id,
//       ],
//       (err, result) => {
//         return err ? reject(err) : resolve(result);
//       }
//     );
//   });
// };
// //for delete/remove data in holidaylist table
// exports.remove = (post) => {
//   return new Promise((resolve, reject) => {
//     let query = `DELETE FROM holidaylist WHERE holiday_id = ?`;
//     db.query(query, [post.holiZday_id], (err, result) => {
//       return err ? reject(err) : resolve(result);
//     });
//   });
// };

module.exports = { ...exports };
