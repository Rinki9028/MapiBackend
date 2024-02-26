const express = require("express");
const EmpCheckInController = require("../controllers/EmpCheckInController");
const empcheckinroutes = express.Router();

empcheckinroutes.post("/ValidDevice", (req, res) => {
  const { LoginId, IMEINum } = req.body;
  EmpCheckInController.fn_ValidDevice(LoginId, IMEINum, (error, data) => {
    if (error) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (data && data.length > 0) {
        if (data[0].IMEINumber == IMEINum) {
          if (data[0].Is_active == 1) {
            res.json({ Result: 2 });
          } else {
            res.json({ Result: 1 });
          }
        } else {
          res.json({ Result: 3 });
        }
      } else {
        res.json({ Result: 0 });
      }
    }
  });
});

empcheckinroutes.post("/DeviceMapping", (req, res) => {
  const { LoginId, IMEINum } = req.body;
  EmpCheckInController.fn_DeviceMapping(LoginId, IMEINum, (error, data) => {
    if (error) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json({ status: 200, message: "Data updated successfully" });
    }
  });
});

empcheckinroutes.post("/getProperty", (req, res) => {
  const { LoginId } = req.body;
  EmpCheckInController.fn_getProperty(LoginId, (error, data) => {
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

empcheckinroutes.post("/getEmpChkData", (req, res) => {
  const { LoginId } = req.body;
  EmpCheckInController.fn_getEmpChkData(LoginId, (error, data) => {
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

empcheckinroutes.post("/getChkTrackingRep", (req, res) => {
  const { LoginId, ValCase } = req.body;
  EmpCheckInController.fn_getChkTrackingRep(LoginId, ValCase, (error, data) => {
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

empcheckinroutes.post("/ValidEmpForCurrPage", (req, res) => {
  const { LoginId, CurrPage } = req.body;
  EmpCheckInController.fn_ValidEmpForCurrPage(
    LoginId,
    CurrPage,
    (error, data) => {
      if (error) {
        res.status(500).json({ error: "Internal server error" });
      } else {
        if (data && data.length > 0)
          if (data[0].Result == 1) {
            res.json({ Value: true });
          } else {
            res.json({ Value: false });
          }
      }
    }
  );
});

empcheckinroutes.post("/UpdateCheckIn", (req, res) => {
  const { LoginId, Chktype, chkId } = req.body;
  EmpCheckInController.fn_UpdateCheckIn(
    LoginId,
    Chktype,
    chkId,
    (error, data) => {
      if (error) {
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.json({ status: 200, message: "Data updated successfully" });
      }
    }
  );
});

empcheckinroutes.post("/PropTrackEntry", (req, res) => {
  const { LoginId, ChklknId, mapLocation, ValCase, TID } = req.body;
  EmpCheckInController.fn_PropTrackEntry(
    LoginId,
    ChklknId,
    mapLocation,
    ValCase,
    TID,
    (error, data) => {
      if (error) {
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.json({ status: 200, message: "Data updated successfully" });
      }
    }
  );
});

empcheckinroutes.post("/getEmpListByName", (req, res) => {
  const { Name } = req.body;
  EmpCheckInController.fn_getEmpListByName(Name, (error, data) => {
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
empcheckinroutes.post("/getTrackReportByEmp", (req, res) => {
  const { LoginId } = req.body;
  EmpCheckInController.fn_GetTrackReportByEmp(LoginId, (error, data) => {
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

empcheckinroutes.post("/empLknMap", (req, res) => {
  const {LoginId,LocId,} = req.body;
  EmpCheckInController.fn_emplocationmapping(LoginId,LocId, (error, data) =>
  {
      if (error)
      {
        res.status(500).json({ error: "Internal server error" });
      }
      else
      {
        res.json({ status: 200, message: 'Data updated successfully' });
      }
    });
  });

  empcheckinroutes.post("/getemplknmapping", (req, res) => {
    const {LoginId,} = req.body;
    EmpCheckInController.fn_GetEmpLknmapping(LoginId, (error, data) =>
    {
      if (error) {
        res.status(500).json({ error: "Internal server error" });
      } else {
        if (data && data.length > 0) {
          res.json({ isValid: true,data });
        } else {
          res.json({ isValid: false,data});
        }
      }
    });
  });
module.exports = empcheckinroutes;
