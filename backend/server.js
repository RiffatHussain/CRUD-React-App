import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import studentRoutes from "./routes/studentRoutes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// API routes
app.use("/api/students", studentRoutes);

// Serve React build
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));

// Catch all other routes and return React's index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
