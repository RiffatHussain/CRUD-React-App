// backend/db.js
import mysql from "mysql2";

const db = mysql.createConnection({
  host: "188.40.68.177",
  user: "sysadmin",
  password: "blaze.ws", // your MySQL password
  database: "crud_react",
});

db.connect((err) => {
  if (err) throw err;
  console.log("✅ MySQL Connected");
});

export default db;
