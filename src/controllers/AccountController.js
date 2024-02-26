const db = require("../db/connMysql"); // Import the database connection


exports.get = (id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT Username, Wrong_login_attempt, Today_login_attempt, created_date, Is_active from emp WHERE Login_id = '${id}'`,
            (err, result) => {
                return err ? reject(err) : resolve(result);
            }
        );
    });
};