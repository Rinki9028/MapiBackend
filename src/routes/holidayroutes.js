const express = require("express");
const holidayController = require("../controllers/holidayController");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/holidayEntry", (req, res) => {
  const { holidayName, holidaytype, holidaydate, CreatedBy } = req.body;

  holidayController.fn_InsertHoliday(
    holidayName,
    holidaytype,
    holidaydate,
    CreatedBy, // Corrected parameter name
    (error, data) => {
      if (error) {
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.json({ status: 200, message: "Data saved successfully" });
      }
    }
  );
});

router.post("/getHoliday", (req, res) => {
  const { valLid, ValCase } = req.body;
  holidayController.fn_SelectHoliday(valLid, ValCase, (error, data) => {
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

router.post("/holidayupdate", (req, res) => {
  const post = req.body;
 //post.Modifiedby = res.userData.holiday_id
  holidayController.fn_UpdateHoliday(post, (error, data) => {
    if (error) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json({ status: 200, message: "Data updated successfully" });
    }
  });
});

router.delete("/holidaydelete", async (req, res) => {
  const post = req.query;
  let data = await holidayController.remove(post);
  if (data.affectedRows > 0) {
    res.json({ status: 200, message: "HolidayName data deleted successfully" });
  } else {
    res.json({ status: 400, message: "Something went wrong" });
  }
});

module.exports = router;



// //for get Holyday table data from Holyday table
// router.get("/", async (req, res) => {
//   let data = await holydayController.get();
//   res.json({ status: 200, data });
// });

// //for post Holyday data from Holyday table
// router.post("/", async (req, res) => {
//   const post = req.body;
//   let HolydayExists = await holydayController.get(post.holidayName);
//   if (HolydayExists?.length > 0) {
//     return res.json({
//       status: 400,
//       message: `holidayName "${HolydayExists[0].holidayName}": already exists`,
//     });
//   }
//   let data = await holydayController.save(post);
//   if (data.insertId) {
//     res.json({ status: 200, message: "Holyday data added successfully" });
//   } else {
//     res.json({ status: 400, message: "Something went wrong" });
//   }
// });

// //for update Holyday data from Holyday table
// router.put("/", async (req, res) => {
//   const post = req.body;
//   let HolydayExists = await holydayController.get(
//     post.holidayName,
//     post.holidaytype,
//     post.holidaydate,
//     post.CreatedBy,
//     post.Created_date,
//     post.Modified_by,
//     post.modified_date,
//     post.Is_active,
//   );
//   if (
//     HolydayExists?.length > 0 &&
//     HolydayExists[0].holyday_id != post.holyday_id
//   ) {
//     return res.json({ status: 400, message: "holidayName already exists" });
//   }
//   let data = await holydayController.update(post, HolydayExists[0]);
//   if (data.affectedRows > 0) {
//     res.json({ status: 200, message: "holidayName data updated successfully" });
//   } else {
//     res.json({ status: 400, message: "Something went wrong" });
//   }
// });

// //for delete Holyday data from Holyday table

// router.delete("/", async (req, res) => {
//   const post = req.query;
//   let data = await holydayController.remove(post);
//   if (data.affectedRows > 0) {
//     res.json({ status: 200, message: "holidayName data deleted successfully" });
//   } else {
//     res.json({ status: 400, message: "Something went wrong" });
//   }
// });

