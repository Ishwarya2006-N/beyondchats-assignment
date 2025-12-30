const axios = require("axios");
const cheerio = require("cheerio");
const Article = require("../models/Article");

const scrapeBeyondChatsBlogs = async () => {
  try {
    const url = "https://beyondchats.com/blogs/";
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const links = [];

    // STEP 1: Collect article links
    $("a").each((i, element) => {
      let href = $(element).attr("href");
      if (!href) return;

      if (href.startsWith("/blogs/")) {
        href = "https://beyondchats.com" + href;
      }

      if (
        href.startsWith("https://beyondchats.com/blogs/") &&
        !href.includes("/tag/") &&
        !href.includes("/page/") &&
        href !== "https://beyondchats.com/blogs/"
      ) {
        links.push(href);
      }
    });

    const uniqueLinks = [...new Set(links)];
    const oldestFive = uniqueLinks.slice(-5);

    console.log("Saving articles to MongoDB...");

    // STEP 2: Visit each article and save content
    for (const articleUrl of oldestFive) {
      const articleResponse = await axios.get(articleUrl);
      const articlePage = cheerio.load(articleResponse.data);

      const title = articlePage("h1").first().text().trim();
      const content = articlePage("article").text().trim();

      if (!title || !content) continue;

      // Avoid duplicates
      const alreadyExists = await Article.findOne({ title });
      if (alreadyExists) {
        console.log(`Skipped (already exists): ${title}`);
        continue;
      }

      await Article.create({
        title,
        originalContent: content,
        source: "beyondchats"
      });

      console.log(`Saved: ${title}`);
    }

    console.log("✅ Phase-1 scraping completed");
  } catch (error) {
    console.error("Scraping failed:", error.message);
  }
};

module.exports = scrapeBeyondChatsBlogs;
