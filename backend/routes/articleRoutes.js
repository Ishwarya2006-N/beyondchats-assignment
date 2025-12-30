const express = require("express");
const router = express.Router();
const Article = require("../models/Article");

router.get("/", async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
