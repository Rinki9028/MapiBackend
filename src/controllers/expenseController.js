const db = require("../db/connMysql");
const settings = require("../config/settings");
const moment = require("moment");
const crypto = require("crypto");

// for get all expense table data on screen
exports.get = (expensename = null) => {
  let query = `SELECT Expense_id, ExpenseName,Month,Year,Amount, created_date, Is_active from expense`;
  if (expensename) {
    query += ` WHERE ExpenseName = '${expensename}'`;
  }

  query += ` ORDER BY created_date DESC`;
  return new Promise((resolve, reject) => {
    db.query(query, (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
};

//for save/insert data in expense table
exports.save = (data) => {
  let currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
  return new Promise((resolve, reject) => {
    let query = `INSERT INTO expense (ExpenseName,Month,Year,Amount,Created_by, Is_active, created_date)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(
      query,
      [
        data.ExpenseName,
        data.Month,
        data.Year,
        data.Amount,
        data.CreatedBy,
        data.Is_active,
        currentTime,
      ],
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
};

//for update/put data in expense table
exports.update = (data, expenseData) => {
  let currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE expense SET ExpenseName = ?, Month = ? ,Year = ? ,Amount = ? , Created_by = ?, Is_active = ? WHERE Expense_id = ?`,
      [
        data.ExpenseName,
        data.Month,
        data.Year,
        data.Amount,
        data.CreatedBy,
        data.Is_active,
        data.Expense_id,
      ],
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
};

//for delete/remove data in expense table
exports.remove = (post) => {
  return new Promise((resolve, reject) => {
    let query = `DELETE FROM expense WHERE Expense_id = ?`;
    db.query(query, [post.Expense_id], (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
};

//for fn_InsertExpense expense table
exports.fn_InsertExpense = (
  ExpenseName,
  Month,
  Year,
  Amount,
  CreatedBy,
  created_date,
  userId,
  callback
) => {
  db.query(
    "CALL sp_ExpenseEntry(?,?,?,?,?)",
    [ExpenseName, Month, Year, Amount, created_date, userId],
    (error, results) => {
      if (error) {
        console.error("Error calling stored procedure:", error);
        callback(error, null);
      } else {
        callback(null, results[0]);
      }
    }
  );
};
//for fn_SelectExpense expense table
exports.fn_SelectExpense = (valEid, ValCase, callback) => {
  db.query("CALL sp_getExpense(?,?)", [valEid, ValCase], (error, results) => {
    if (error) {
      console.error("Error calling stored procedure:", error);
      callback(error, null);
    } else {
      callback(null, results[0]);
    }
  });
};

//for get month table all data on screen
exports.getMonths = (monthsname = null) => {
  let query = `SELECT Months_id, MonthsName from months`;
  if (monthsname) {
    query += ` WHERE MonthsName = '${monthsname}'`;
  }
  return new Promise((resolve, reject) => {
    db.query(query, (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
};
//for save/insert month table all data on screen
exports.saveMonths = (data) => {
  return new Promise((resolve, reject) => {
    let query = `INSERT INTO months(MonthsName) VALUES (?)`;
    db.query(query, [data.MonthsName], (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
};
//function for insert in month table
exports.fn_InsertMonths = (valName, callback) => {
  db.query("CALL sp_MonthsEntry(?)", [valName], (error, results) => {
    if (error) {
      console.error("Error calling stored procedure:", error);
      callback(error, null);
    } else {
      callback(null, results[0]);
    }
  });
};
// function for select data for month table
exports.fn_SelectMonths = (valPid, ValCase, callback) => {
  db.query("CALL sp_getMonths(?,?)", [valPid, ValCase], (error, results) => {
    if (error) {
      console.error("Error calling stored procedure:", error);
      callback(error, null);
    } else {
      callback(null, results[0]);
    }
  });
};

//for get years data in years table
exports.getYears = (yearsname = null) => {
  let query = `SELECT Years_id, YearsName from years`;
  if (yearsname) {
    query += ` WHERE YearsName = '${yearsname}'`;
  }
  return new Promise((resolve, reject) => {
    db.query(query, (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
};
//for save/insert data in years table
exports.saveYears = (data) => {
  return new Promise((resolve, reject) => {
    let query = `INSERT INTO years(YearsName) VALUES (?)`;
    db.query(query, [data.YearsName], (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
};
//insert function for years in table
exports.fn_InsertYears = (valName, callback) => {
  db.query("CALL sp_YearsEntry(?)", [valName], (error, results) => {
    if (error) {
      console.error("Error calling stored procedure:", error);
      callback(error, null);
    } else {
      callback(null, results[0]);
    }
  });
};
//select all data from years table by function
exports.fn_SelectYears = (valPid, ValCase, callback) => {
  db.query("CALL sp_getYears(?,?)", [valPid, ValCase], (error, results) => {
    if (error) {
      console.error("Error calling stored procedure:", error);
      callback(error, null);
    } else {
      callback(null, results[0]);
    }
  });
};

module.exports = { ...exports };
