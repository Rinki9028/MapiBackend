const express = require("express");
const expenseController = require("../controllers/expenseController");

const router = express.Router();

const jwt = require("jsonwebtoken");

//for get expense table data from expense table
router.get("/", async (req, res) => {
  let data = await expenseController.get();
  res.json({ status: 200, data });
});

//for post expense data from expense table
router.post("/", async (req, res) => {
  const post = req.body;
  let expenseExists = await expenseController.get(post.ExpenseName);
  if (expenseExists?.length > 0) {
    return res.json({
      status: 400,
      message: `ExpenseName "${expenseExists[0].ExpenseName}": already exists`,
    });
  }
  let data = await expenseController.save(post);
  if (data.insertId) {
    res.json({ status: 200, message: "Expense data added successfully" });
  } else {
    res.json({ status: 400, message: "Something went wrong" });
  }
});
//for update expense data from expense table
router.put("/", async (req, res) => {
  const post = req.body;
  let expenseExists = await expenseController.get(
    post.ExpenseName,
    post.Month,
    post.Year,
    post.Amount,
    post.Created_by,
    post.Is_active
  );
  if (
    expenseExists?.length > 0 &&
    expenseExists[0].Expense_id != post.Expense_id
  ) {
    return res.json({ status: 400, message: "ExpenseName already exists" });
  }
  let data = await expenseController.update(post, expenseExists[0]);
  if (data.affectedRows > 0) {
    res.json({ status: 200, message: "ExpenseName data updated successfully" });
  } else {
    res.json({ status: 400, message: "Something went wrong" });
  }
});

//for delete expense data from expense table
router.delete("/", async (req, res) => {
  const post = req.query;
  let data = await expenseController.remove(post);
  if (data.affectedRows > 0) {
    res.json({ status: 200, message: "ExpenseName data deleted successfully" });
  } else {
    res.json({ status: 400, message: "Something went wrong" });
  }
});

//for insert expense data by insert_function from expense table
router.post("/ExpenseEntry", (req, res) => {
  console.log("res.userData:", res.userData); // Add this line for logging
  const { ExpenseName, Month, Year, Amount, CreatedBy, created_date } =
    req.body;
  let userId = res.userData && res.userData.Expense_id; // Check if res.userData is defined
  expenseController.fn_InsertExpense(
    ExpenseName,
    Month,
    Year,
    Amount,
    CreatedBy,
    created_date,
    userId,
    (error, data) => {
      if (error) {
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.json({ status: 200, message: "Data saved successfully" });
      }
    }
  );
});

//for get expense data by select_functions from expense table
router.post("/getExpense", (req, res) => {
  const { valEid, ValCase } = req.body;
  expenseController.fn_SelectExpense(valEid, ValCase, (error, data) => {
    if (error) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (data && data.length > 0) {
        res.json({ isValid: true, data });
      } else {
        res.json({ isValid: false, data });
      }
    }
  });
});

//for update expense data by select_functions from expense table
router.post("/Expenseupdate", (req, res) => {
  const post = req.body;
  post.userId = res.userData.Expense_id;
  expenseController.fn_UpdateExpense(post, (error, data) => {
    if (error) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json({ status: 200, message: "Data updated successfully" });
    }
  });
});

//for get all months data from month table
router.get("/months", async (req, res) => {
  let data = await expenseController.getMonths();
  res.json({ status: 200, data });
});

//for post all months data from month table
router.post("/months", async (req, res) => {
  const post = req.body;
  let expenseExists = await expenseController.getMonths(post.MonthsName);
  if (expenseExists?.length > 0) {
    return res.json({
      status: 400,
      message: `MonthsName "${expenseExists[0].MonthsName}": already exists`,
    });
  }
  let data = await expenseController.saveMonths(post);
  if (data.insertId) {
    res.json({ status: 200, message: "MonthsName data added successfully" });
  } else {
    res.json({ status: 400, message: "Something went wrong" });
  }
});

//for insert all months data from month table by insert_function
router.post("/monthEntry", (req, res) => {
  const { valName } = req.body;
  expenseController.fn_InsertMonths(valName, (error, data) => {
    if (error) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json({ isValid: true });
    }
  });
});

//for select all months data from month table by insert_function
router.post("/getMonths", (req, res) => {
  const { valMid, ValCase } = req.body;
  expenseController.fn_SelectMonths(valMid, ValCase, (error, data) => {
    if (error) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (data && data.length > 0) {
        res.json({ isValid: true, data });
      } else {
        res.json({ isValid: false, data });
      }
    }
  });
});

//for get all years data from YEARS table
router.get("/years", async (req, res) => {
  let data = await expenseController.getYears();
  res.json({ status: 200, data });
});

//for post all years data from YEARS table
router.post("/years", async (req, res) => {
  const post = req.body;
  let expenseExists = await expenseController.getYears(post.YearsName);
  if (expenseExists?.length > 0) {
    return res.json({
      status: 400,
      message: `YearsName "${expenseExists[0].YearsName}": already exists`,
    });
  }
  let data = await expenseController.saveYears(post);
  if (data.insertId) {
    res.json({ status: 200, message: "YearsName data added successfully" });
  } else {
    res.json({ status: 400, message: "Something went wrong" });
  }
});
//for insert years data from years table by function
router.post("/yearsEntry", (req, res) => {
  const { valName } = req.body;
  expenseController.fn_InsertYears(valName, (error, data) => {
    if (error) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json({ isValid: true });
    }
  });
});
//for get years data from years table by function
router.post("/getyears", (req, res) => {
  const { valMid, ValCase } = req.body;
  expenseController.fn_SelectYears(valMid, ValCase, (error, data) => {
    if (error) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (data && data.length > 0) {
        res.json({ isValid: true, data });
      } else {
        res.json({ isValid: false, data });
      }
    }
  });
});

module.exports = router;
