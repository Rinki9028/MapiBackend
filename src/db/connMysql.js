const mysql = require("mysql");

// const db = mysql.createConnection({
//   host: 'https://mapimagicalevents.com/',
//   user: 'mapi',
//   password: 'MaPi@7836M',
//   database: 'mapi',
// });

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mapi",
});


// const db = mysql.createConnection({
//   host: 'http://206.189.133.53/',
//   user: 'mapi',
//   password: 'MaPi@7836M',
//   database: 'mapi',
// });

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: ", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

module.exports = db;
