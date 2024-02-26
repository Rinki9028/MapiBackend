const db = require("../db/connMysql"); // Import the database connection

function fn_InsertLead(Name, PhoneNumber, Event_type,E_Location,Event_date,
  CreatedBy,valPartner,IsPremiumLead, userId, callback) {
  db.query('CALL sp_LeadEntry(?,?,?,?,?,?,?,?)',
   [Name, PhoneNumber, Event_type,E_Location,Event_date,IsPremiumLead,userId,valPartner], (error, results) => {
    if (error) {
      console.error('Error calling stored procedure:', error);
      callback(error, null);
    } else {
      callback(null, results[0]);
    }
  });
}

function fn_UpdateLead(post,callback) {
  db.query('CALL sp_UpdateLead(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, ?)', 
  [post.Tracking_id, post.Name,post.Event_type,post.E_Status,post.
    Location,post.Event_date,post.Number_of_guest,post.Remarks,post.Modifiedby,post.
    Visit_Date,post.Next_Follow_Up_Date,post.Type_of_Venue,post.Food,post.Number_of_rooms,post.budgut, post.Partner], (error, results) => {
    if (error) {
      console.error('Error calling stored procedure:', error);
      callback(error, null);
    } else {
      callback(null, results[0]);
    }
  });
}


//Function for Select Lead By - Traking Id (ValCase - A - (All Lead),(ValCase - S - (Single lead))
function fn_SelectLead(valTid,ValCase,callback) {
  db.query('CALL sp_getLead(?,?)', 
  [valTid,ValCase], (error, results) => {
    if (error) {
      console.error('Error calling stored procedure:', error);
      callback(error, null);
    } else {
      callback(null, results[0]);
    }
  });
}

module.exports = { fn_InsertLead,fn_UpdateLead,fn_SelectLead};


