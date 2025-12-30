const express = require("express");
const app = express();

app.use(express.json());

require("dotenv").config();
const connectDB = require("./config/db");

connectDB();

const cors = require("cors");
app.use(cors());


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
