// backend/server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import studentRoutes from "./routes/studentRoutes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/students", studentRoutes);

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
