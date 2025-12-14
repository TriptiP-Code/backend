const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
});

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok", db: "connected" });
  } catch (err) {
    res.status(500).json({ status: "error", db: "not connected" });
  }
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
