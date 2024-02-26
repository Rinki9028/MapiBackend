DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_EmpLknMap`(IN `LID` INT)
    NO SQL
select DATE_FORMAT(Created_date,'%d/%m/%Y') as Date, Fn_EmpName(LoginID) as Name , Fn_PropertyName(LocationID) as Location  from emplocationmapping where LoginID = LID order by Created_date desc$$
DELIMITER ;

-- Controller

 
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

-- routes

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



-- DELIMITER $$
-- CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_GetTrackReportByEmp`(IN `LID` INT)
--     NO SQL
-- select DATE_FORMAT(Created_date,'%d/%m/%Y') as Date, Fn_EmpName(LoginID) as Name , Fn_PropertyName(chkLocation) as Location , chkINMapLkn as CheckIN, chkOUTMapLkn as CheckOut , CheckInDate as InDate , CheckOutDate as OutDate from propertychecktracking where LoginID = LID order by Created_date desc$$
-- DELIMITER ;

-- 1	PCTID Primary	bigint(20)			No	None		AUTO_INCREMENT	Change Change	Drop Drop	
-- 	2	LoginID	bigint(20)			No	None			Change Change	Drop Drop	
	3	chkLocation	bigint(20)			Yes	NULL			Change Change	Drop Drop	
	-- 4	chkINMapLkn	varchar(250)	utf8mb4_general_ci		Yes	NULL			Change Change	Drop Drop	
	-- 5	chkOUTMapLkn	varchar(100)	utf8mb4_general_ci		Yes	NULL			Change Change	Drop Drop	
	-- 6	Created_by	bigint(20)			Yes	NULL			Change Change	Drop Drop	
	-- 7	Created_date	datetime			Yes	current_timestamp()			Change Change	Drop Drop	
	-- 8	Is_active	tinyint(1)			No	None			Change Change	Drop Drop	
	-- 9	CheckInDate	datetime			Yes	current_timestamp()			Change Change	Drop Drop	
-- 10	CheckOutDate



-- 1	ELMID Primary	bigint(20)			No	None		AUTO_INCREMENT	Change Change	Drop Drop	
-- 	2	LoginID	bigint(20)			No	None			Change Change	Drop Drop	
	3	LocationID	bigint(20)			Yes	NULL			Change Change	Drop Drop	
	-- 4	Created_by	bigint(20)			Yes	NULL			Change Change	Drop Drop	
	-- 5	Created_date	datetime			Yes	current_timestamp()			Change Change	Drop Drop	
	-- 6	Is_active	tinyint(1)			No	None			Change Change	Drop Drop	


DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getemplknmapping`(IN `LoginID` BIGINT)
    NO SQL
SELECT LoginID `EMPLocationMapping`(`LoginID`, `Created_by`, `Is_active`) VALUES (LoginID,1)$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=mapi@localhost PROCEDURE sp_getemplknmapping(IN LID INT)
    NO SQL
SELECT ELMID as MappingID , Fn_EmpName(LoginID) as Name, Fn_LocationName (LocationID) from EMPLocationMapping where LoginID = LID$$
DELIMITER ;