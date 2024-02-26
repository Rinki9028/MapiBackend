const express = require("express");
const router = express.Router();

const AuthHelper = require("../helper/AuthHelper");

const leadroutes = require("./leadroutes");
const eventRouter = require("./eventroutes");
const locationRouter = require("./locationroutes");
const partnerRouter = require("./partnerroutes");
const foodRouter = require("./foodroutes");
const statusRouter = require("./statusroutes");
const venueRouter = require("./venueroutes");
const loginRouter = require("./authroutes");
const employeeRouter = require("./emproutes");
const accountRouter = require("./accountroutes");
const citiesroutes = require("./citiesroutes");
const expenseRouter = require("./expenseroutes");
const holidayRouter = require("./holidayroutes");
const empcheckinroutes = require("./empcheckinroutes")

router.get("/", (req, res, next) => {
  res.send("come through proper channel");
});

router.use("/", citiesroutes);
router.use("/", leadroutes);
router.use("/event", eventRouter);
router.use("/location", locationRouter);
router.use("/partner", partnerRouter);
router.use("/food", foodRouter);
router.use("/status", statusRouter);
router.use("/venue", venueRouter);

router.use("/auth", loginRouter);
//router.use('/employee', AuthHelper.verifyUserToken, employeeRouter);
//router.use('/lead', AuthHelper.verifyUserToken, leadroutes);
router.use("/employee", employeeRouter);
router.use("/lead", leadroutes);
router.use("/expense", expenseRouter);
router.use("/holiday", holidayRouter);
router.use('/', empcheckinroutes);
//after login routes
router.use("/account", AuthHelper.verifyUserToken, accountRouter);

module.exports = router;
