require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

/* ---------- DB ---------- */
connectDB();

/* ---------- CORS (BULLETPROOF) ---------- */
const allowedOrigins = [
  "http://localhost:3000",
  "https://beyondchats-assignment-4gs4.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS not allowed"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

/* ---------- MIDDLEWARE ---------- */
app.use(express.json());

/* ---------- ROUTES ---------- */
app.get("/", (req, res) => {
  res.send("BeyondChats API running");
});

app.use("/articles", require("./routes/articleRoutes"));

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
