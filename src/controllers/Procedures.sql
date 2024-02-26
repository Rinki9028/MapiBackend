SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

-- <!--first i have created 3 table for expense-->

        CREATE TABLE `expense` (
        `Expense_id` bigint NOT NULL,
        `ExpenseName` varchar(100) DEFAULT NULL,
        `Month` varchar(20) DEFAULT NULL,
        `Year` varchar(4) DEFAULT NULL,
        `Amount` bigint(11) DEFAULT NULL,
        `Created_by` bigint(20) DEFAULT NULL,
        `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
        `Is_active` tinyint(1) NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


  	CREATE TABLE `months` (
  	`Months_id` bigint(20) NOT NULL,
 	  `MonthsName` varchar(100) DEFAULT NULL,
  	`Is_active` tinyint(1) NOT NULL
	  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

    CREATE TABLE `years` (
      `Years_id` bigint(20) NOT NULL,
      `YearsName` int(6) DEFAULT NULL,
      `Is_active` tinyint(1) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


  -- <!--for AUTO_INCREMENT all tables id-->

        ALTER TABLE `expense`
        ADD PRIMARY KEY (`Expense_id`);

        ALTER TABLE `expense`
        MODIFY `Expense_id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;


        ALTER TABLE `months`
        ADD PRIMARY KEY (`Months_id`);

        ALTER TABLE `months`
        MODIFY `Months_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

        ALTER TABLE `years`
        ADD PRIMARY KEY (`Years_id`);

        ALTER TABLE `years`
        MODIFY `Years_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;



            INSERT INTO `expense`(`Expense_id`, `ExpenseName`, `Month`, `Year`, `Amount`, `Created_by`, `created_date`, `Is_active`) 
          VALUES 	
          ('1','Rinki','August','2023','50000','piyush','2023-10-25 10:22:17','1'),
            ('2','Pinki','january','2023','50000','piyush','2023-10-25 10:22:17','1'),
            ('3','Nandu','february','2023','50000','piyush','2023-10-25 10:22:17','1'),
            ('4','Rani','march','2023','50000','piyush','2023-10-25 10:22:17','1'),
            ('5','Joyti','april','2023','50000','piyush','2023-10-25 10:22:17','1'),
            ('6','Rahul','may','2023','50000','piyush','2023-10-25 10:22:17','1'),
            ('7','Mahima','june','2023','50000','piyush','2023-10-25 10:22:17','1'),
            ('8','Puja','july','2023','50000','piyush','2023-10-25 10:22:17','1');

        INSERT INTO `months` (`Months_id`, `MonthsName`,`Is_active`) VALUES
        (1, 'January',1),
        (2, 'February',1),
        (3, 'March',1),
        (4, 'April',1),
        (5, 'May',1),
        (6, 'June',1),
        (7, 'July',1),
        (8, 'August',1),
        (9, 'September',1),
        (10, 'October',1),
        (11, 'November',1),
        (12, 'December',1);


        INSERT INTO `years` (`Years_id`, `YearsName`,`Is_active`) VALUES
        (1, '2023',1),
        (2, '2024',1),
        (3, '2025',1),
        (4, '2026',1),
        (5, '2027',1),
        (6, '2028',1),
        (7, '2029',1),
        (8, '2030',1);


        -- Procedures
        DELIMITER $$
        --
        -- Functions
        --

        CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_UpdateExpense` (IN `valEid` INT, IN `valExpenseName` VARCHAR(255), IN `valMonth` VARCHAR(20), IN `valYear` VARCHAR(4),  IN `valAmount` INT)  UPDATE expense
        SET ExpenseName = valExpenseName, 
        Month = valMonth,
        Year = valYear,
        Amount = valAmount
        WHERE Expense_id = valEid$$


        CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getExpense` (IN `valEid` INT, IN `ValCase` VARCHAR(5))  
        CASE ValCase

        WHEN  'S' THEN
              SELECT ExpenseName as txt, Expense_id as val from expense 
              where Is_active = 1 and Expense_id =   valEid;
        WHEN 'A' THEN
              SELECT ExpenseName as txt, Expense_id as val from expense 
              where Is_active = 1;
        ELSE
            SELECT ExpenseName as txt, Expense_id as val from expense where 
            Is_active = 1 and Expense_id =   valEid;
        END CASE$$



      CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ExpenseEntry` (IN `ExpenseName` VARCHAR(200),IN `Month` VARCHAR(20), IN `Year` VARCHAR(4),IN `Amount` VARCHAR(200), IN `CreatedBy` BIGINT) INSERT INTO expense 
      (ExpenseName,Month,Year,Amount,Created_by, Is_active) VALUES
      (ExpenseName,Month,Year,Amount,CreatedBy,1)$$


      CREATE DEFINER=`root`@`localhost` FUNCTION `Fn_ExpenseName` (`Id` BIGINT) RETURNS VARCHAR(255) CHARSET utf8mb4 COLLATE utf8mb4_general_ci  BEGIN
        SET @P1 = "NA";
        SET @P1 = (SELECT `ExpenseName`,`Year`,`month`,`Amount`,`Created_by` FROM `expense` WHERE Expense_id = Id);
        RETURN @P1;
      END$$


        CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getMonths`(IN `valMid` INT, IN `ValCase` VARCHAR(5)) NOT DETERMINISTIC CONTAINS SQL SQL SECURITY DEFINER CASE ValCase WHEN 'S' THEN SELECT MonthsName as txt, Months_id as val from months where Is_active = 1 and Months_id = valMid; WHEN 'A' THEN SELECT MonthsName as txt, Months_id as val from months where Is_active = 1; ELSE SELECT MonthsName as txt, Months_id as val from months where Is_active = 1 and Months_id = valMid; END CASE$$


        CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_MonthsEntry` (IN `valName` VARCHAR(100))   INSERT INTO months 
        (MonthsName,Is_active) VALUES
        (valName,1)$$

          CREATE DEFINER=`root`@`localhost` FUNCTION `Fn_MonthsName` (`Id` BIGINT) RETURNS VARCHAR(255) CHARSET utf8mb4 COLLATE utf8mb4_general_ci  BEGIN
          SET @P1 = "NA";
          SET @P1 = (SELECT `MonthsName` FROM `months` WHERE Months_id = Id);
          RETURN @P1;
        END$$



          CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getYears`(IN `valMid` INT, IN `ValCase` VARCHAR(5)) NOT DETERMINISTIC CONTAINS SQL SQL SECURITY DEFINER CASE ValCase WHEN 'S' THEN SELECT YearsName as txt, Years_id as val from years where Is_active = 1 and Years_id = valMid; WHEN 'A' THEN SELECT YearsName as txt, Years_id as val from years where Is_active = 1; ELSE SELECT YearsName as txt, Years_id as val from years where Is_active = 1 and Years_id = valMid; END CASE$$



          CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_YearsEntry` (IN `valName` VARCHAR(100))   INSERT INTO years 
          (YearsName,Is_active) VALUES
          (valName,1)$$



            CREATE DEFINER=`root`@`localhost` FUNCTION `Fn_YearsName` (`Id` BIGINT) RETURNS VARCHAR(255) CHARSET utf8mb4 COLLATE utf8mb4_general_ci  BEGIN
            SET @P1 = "NA";
            SET @P1 = (SELECT `YearsName` FROM `years` WHERE Years_id = Id);
            RETURN @P1;
          END$$
          DELIMITER ;
