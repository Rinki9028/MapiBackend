const db = require("../db/connMysql"); // Import the database connection

function fn_DeviceMapping(IMEINum, LoginId, callback) {
  db.query(
    "CALL sp_DeviceMapping(?,?)",
    [IMEINum, LoginId],
    (error, results) => {
      if (error) {
        console.error("Error calling stored procedure:", error);
        callback(error, null);
      } else {
        callback(null, results[0]);
      }
    }
  );
}

function fn_ValidDevice(LoginId, IMEINum, callback) {
  db.query("CALL sp_ValidDevice(?,?)", [IMEINum, LoginId], (error, results) => {
    if (error) {
      console.error("Error calling stored procedure:", error);
      callback(error, null);
    } else {
      callback(null, results[0]);
    }
  });
}

function fn_ValidEmpForCurrPage(LoginId, CurrPage, callback) {
  db.query(
    "CALL sp_ValidEmpForCurrPage(?,?)",
    [LoginId, CurrPage],
    (error, results) => {
      if (error) {
        console.error("Error calling stored procedure:", error);
        callback(error, null);
      } else {
        callback(null, results[0]);
      }
    }
  );
}

function fn_getProperty(LoginId, callback) {
  db.query("CALL sp_getProperty(?)", [LoginId], (error, results) => {
    if (error) {
      console.error("Error calling stored procedure:", error);
      callback(error, null);
    } else {
      callback(null, results[0]);
    }
  });
}

function fn_getEmpChkData(LoginId, callback) {
  db.query("CALL sp_getEmpChkData(?)", [LoginId], (error, results) => {
    if (error) {
      console.error("Error calling stored procedure:", error);
      callback(error, null);
    } else {
      callback(null, results[0]);
    }
  });
}

function fn_getChkTrackingRep(LoginId, ValCase, callback) {
  db.query(
    "CALL 	sp_getChkTrackingRep(?,?)",
    [LoginId, ValCase],
    (error, results) => {
      if (error) {
        console.error("Error calling stored procedure:", error);
        callback(error, null);
      } else {
        callback(null, results[0]);
      }
    }
  );
}

/// for check In and CheckOut

function fn_UpdateCheckIn(LoginId, Chktype, chkId, callback) {
  db.query(
    "CALL sp_UpdateCheckIn(?,?,?)",
    [LoginId, Chktype, chkId],
    (error, results) => {
      if (error) {
        console.error("Error calling stored procedure:", error);
        callback(error, null);
      } else {
        callback(null, results[0]);
      }
    }
  );
}

function fn_PropTrackEntry(
  LoginId,
  ChklknId,
  mapLocation,
  ValCase,
  TID,
  callback
) {
  db.query(
    "CALL sp_PropTrackEntry(?,?,?,?,?)",
    [LoginId, ChklknId, mapLocation, ValCase, TID],
    (error, results) => {
      if (error) {
        console.error("Error calling stored procedure:", error);
        callback(error, null);
      } else {
        callback(null, results[0]);
      }
    }
  );
}

function fn_getEmpListByName(Name, callback) {
  db.query("CALL sp_getEmpListByName(?)", [Name], (error, results) => {
    if (error) {
      console.error("Error calling stored procedure:", error);
      callback(error, null);
    } else {
      callback(null, results[0]);
    }
  });
}

function fn_GetTrackReportByEmp(LoginID, callback) {
  db.query("CALL sp_GetTrackReportByEmp(?)", [LoginID], (error, results) => {
    if (error) {
      console.error("Error calling stored procedure:", error);
      callback(error, null);
    } else {
      callback(null, results[0]);
    }
  });
}

function  fn_emplocationmapping(LoginId,LocId, callback) {
  db.query('CALL  sp_EmpLknMap(?,?)', [LoginId,LocId], (error, results) => {
    if (error) {
      console.error('Error calling stored procedure:', error);
      callback(error, null);
    } else {
      callback(null, results[0]);
    }
  })
};

function fn_GetEmpLknmapping(LoginID,callback) {
  db.query('CALL sp_getemplknmapping(?)', [LoginID], (error, results) => {
    if (error) {
      console.error('Error calling stored procedure:', error);
      callback(error, null);
    } else {
      callback(null, results[0]);
    }
  })
};


module.exports = {
  fn_DeviceMapping,
  fn_ValidDevice,
  fn_ValidEmpForCurrPage,
  fn_UpdateCheckIn,
  fn_getProperty,
  fn_getEmpChkData,
  fn_PropTrackEntry,
  fn_getChkTrackingRep,
  fn_getEmpListByName,
  fn_GetTrackReportByEmp,
  fn_emplocationmapping,
  fn_GetEmpLknmapping,
};
