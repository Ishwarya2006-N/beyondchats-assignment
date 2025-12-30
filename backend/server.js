const express = require("express");
const app = express();

app.use(express.json());

require("dotenv").config();
const connectDB = require("./config/db");

connectDB();

const cors = require("cors");
// app.use(cors());
app.use(
  cors({
    origin: [
      "http://localhost:3000", // local dev
      "https://beyondchats-assignment-4gs4.vercel.app" // frontend live URL
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);



const scrapeBeyondChatsBlogs = require("./scrapers/beyondchatsScraper");

scrapeBeyondChatsBlogs();



app.get("/", (req, res) => {
  res.send("BeyondChats Phase-1 API running");
});

app.use("/articles", require("./routes/articleRoutes"));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
