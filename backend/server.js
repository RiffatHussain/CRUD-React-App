// backend/server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import studentRoutes from "./routes/studentRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors()); // Enable all CORS requests (for testing)
app.use(bodyParser.json());

// API routes
app.use("/api/students", studentRoutes);

// Serve React frontend from the public folder
app.use(express.static(path.join(__dirname, "public")));

// Catch-all route to serve React index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
