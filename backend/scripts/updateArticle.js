require("dotenv").config({ path: "../.env" });
const OpenAI = require("openai");
const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");
const Article = require("../models/Article");

/* ---------- CONFIG ---------- */

const axiosConfig = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    Accept: "text/html"
  }
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/* ---------- DB ---------- */

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected (Phase-2)");
};

/* ---------- MAIN SCRIPT ---------- */

const run = async () => {
  await connectDB();

  const articles = await Article.find();

  if (!articles.length) {
    console.log("No articles found");
    process.exit();
  }

  for (const article of articles) {
    console.log("\n==============================");
    console.log("Updating article:");
    console.log(article.title);
    console.log("==============================");

    /* ---------- GOOGLE SEARCH ---------- */

    const query = article.title;

    const searchResponse = await axios.get("https://serpapi.com/search", {
      params: {
        q: query,
        api_key: process.env.SERP_API_KEY,
        engine: "google"
      }
    });

    const results = searchResponse.data.organic_results || [];

    const referenceLinks = [];

    for (const result of results) {
      if (result.link && !result.link.includes("beyondchats.com")) {
        referenceLinks.push(result.link);
      }
      if (referenceLinks.length === 2) break;
    }

    console.log("Reference links:", referenceLinks);

    /* ---------- SCRAPE REFERENCES ---------- */

    const referenceContents = [];

    for (const link of referenceLinks) {
      try {
        const pageResponse = await axios.get(link, axiosConfig);
        const page$ = cheerio.load(pageResponse.data);

        let text =
          page$("article").text().trim() ||
          page$("main").text().trim() ||
          page$("body").text().trim();

        referenceContents.push({
          url: link,
          content: text.slice(0, 3000)
        });

        console.log(`Scraped content from: ${link}`);
      } catch (err) {
        console.log(`Fallback to snippet for: ${link}`);

        const fallbackResult = results.find(r => r.link === link);

        if (fallbackResult && fallbackResult.snippet) {
          referenceContents.push({
            url: link,
            content: fallbackResult.snippet
          });
        }
      }
    }

    /* ---------- AI PROMPT ---------- */

    const aiPrompt = `
You MUST strictly stay on the topic:
"${article.title}"

You are a professional content editor.

Original Article:
${article.originalContent}

Reference Article 1:
${referenceContents[0]?.content || ""}

Reference Article 2:
${referenceContents[1]?.content || ""}

Task:
Rewrite the original article with better structure, clarity, headings, and flow.
Do NOT copy text from references.
Use references only for inspiration.
Add proper headings and a conclusion.
`;

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: aiPrompt }]
    });

    const updatedContent = aiResponse.choices[0].message.content;

    /* ---------- SAVE ---------- */

    article.updatedContent = updatedContent;
    article.references = referenceLinks;
    await article.save();

    console.log("✅ Updated article saved");
  }

  console.log("\n🎉 ALL ARTICLES UPDATED SUCCESSFULLY");
  process.exit();
};

run();
