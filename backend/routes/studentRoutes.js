// backend/routes/studentRoutes.js
import express from "express";
import db from "../db.js";
const router = express.Router();

// CREATE
router.post("/add", (req, res) => {
  const { name, email, age } = req.body;
  const sql = "INSERT INTO students (name, email, age) VALUES (?, ?, ?)";
  db.query(sql, [name, email, age], (err) => {
    if (err) return res.json({ error: err });
    return res.json({ message: "Student added successfully" });
  });
});

// READ
router.get("/", (req, res) => {
  db.query("SELECT * FROM students", (err, results) => {
    if (err) return res.json({ error: err });
    return res.json(results);
  });
});

// UPDATE
router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  const sql = "UPDATE students SET name=?, email=?, age=? WHERE id=?";
  db.query(sql, [name, email, age, id], (err) => {
    if (err) return res.json({ error: err });
    return res.json({ message: "Student updated successfully" });
  });
});

// DELETE
router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM students WHERE id=?", [id], (err) => {
    if (err) return res.json({ error: err });
    return res.json({ message: "Student deleted successfully" });
  });
});

export default router;
