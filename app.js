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
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Backend Status</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #667eea, #764ba2);
          font-family: Arial, Helvetica, sans-serif;
        }

        .card {
          background: white;
          padding: 40px 60px;
          border-radius: 16px;
          text-align: center;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          animation: fadeIn 1s ease-in-out;
        }

        h1 {
          margin: 0;
          color: #2d3748;
          font-size: 28px;
        }

        p {
          margin-top: 12px;
          color: #4a5568;
          font-size: 16px;
        }

        .badge {
          display: inline-block;
          margin-top: 20px;
          padding: 8px 16px;
          background: #48bb78;
          color: white;
          border-radius: 20px;
          font-size: 14px;
          font-weight: bold;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>🚀 Your Application is Running !!!!</h1>
        <p>Backend service is up and healthy</p>
        <div class="badge">GitHub Actions Test Successful</div>
      </div>
    </body>
    </html>
  `);
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

