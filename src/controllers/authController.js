// const db = require("../db/connMysql"); // Import the database connection

// //Function to call the stored procedure with LoginId and LoginPass parameters
// exports.validateLogin = (LoginId, LoginPass, callback) => {
//   db.query('CALL sp_ValidateLogin(?, ?)', [LoginId, LoginPass], (error, results) => {
//     if (error) {
//       console.error('Error calling stored procedure:', error);
//       callback(error, null);
//     } else {
//       callback(null, results[0]);
//     }
//   });
// }

// exports.updateToken = async (post, token) => {
//   return new Promise((resolve, reject) => {
//     let query = `UPDATE emp SET token = ? WHERE Login_id = ?`
//     db.query(query, [token, post.Login_id], (err, result) => {
//       return err ? reject(err) : resolve(result);
//     })
//   });

//   exports.EmpCheckIn = (LoginId, Chktype, chkId, callback) => {
//     db.query('CALL sp_UpdateCheckIn(?, ?,?)', [LoginId, Chktype ,chkId], (error, results) => {
//       if (error) {
//         console.error('Error calling stored procedure:', error);
//         callback(error, null);
//       } else {
//         callback(null, results[0]);
//       }
//     });
//   }
// }

const db = require("../db/connMysql"); // Import the database connection

//Function to call the stored procedure with LoginId and LoginPass parameters
exports.validateLogin = (LoginId, LoginPass, callback) => {
  db.query('CALL sp_ValidateLogin(?, ?)', [LoginId, LoginPass], (error, results) => {
    if (error) {
      console.error('Error calling stored procedure:', error);
      callback(error, null);
    } else {
      callback(null, results[0]);
    }
  });
}

exports.updateToken = async (post, token) => {
  return new Promise((resolve, reject) => {
    let query = `UPDATE emp SET token = ? WHERE Login_id = ?`
    db.query(query, [token, post.Login_id], (err, result) => {
      return err ? reject(err) : resolve(result);
    })
  });
}