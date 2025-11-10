// backend/db.js
import mysql from "mysql2";
import dotenv from "dotenv";


dotenv.config(); // Load environment variables from .env file


const db = mysql.createConnection({
  host: "192.168.161.128",
  user: "sysadmin",
  password: "blaze.ws", // your MySQL password
  database: "crud_react",
});

db.connect((err) => {
  if (err) throw err;
  console.log("✅ MySQL Connected");
});

export default db;
