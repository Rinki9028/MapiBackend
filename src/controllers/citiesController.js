const db = require("../db/connMysql"); // Import the database connection

// Function for City Insert
function fn_InsertCity(valName, callback) {
    db.query('CALL sp_CityEntry(?)', [valName], (error, results) => {
        if (error) {
            console.error('Error calling stored procedure:', error);
            callback(error, null);
        } else {
            callback(null, results[0]);
        }
    });
}

function fn_SelectCity(valLid, ValCase, callback) {
  db.query('CALL sp_getCityType(?, ?)', [valLid, ValCase], (error, results) => {
      if (error) {
          console.error('Error calling stored procedure:', error);
          callback(error, null);
      } else {
          callback(null, results[0]);
      }
  });
}

// Export the function for city insertion
module.exports = { fn_InsertCity, fn_SelectCity };
