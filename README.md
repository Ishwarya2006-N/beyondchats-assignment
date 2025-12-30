BeyondChats – Full Stack Web Developer Internship Assignment

This repository contains my submission for the BeyondChats Full Stack Web Developer Intern assignment.
The project demonstrates end-to-end full-stack development including web scraping, database storage, AI-based content enhancement, API design, frontend UI/UX, and production deployment.

🔗 Live Links

Frontend (Vercel)
👉 https://beyondchats-assignment-4gs4.vercel.app

Backend (Render)
👉 https://beyondchats-assignment-1-3e5n.onrender.com

📌 Project Overview

The goal of this project is to:

Scrape blog articles from BeyondChats

Store them in a database

Enhance the content using AI based on top Google-ranking reference articles

Display both Original and AI-Updated versions in a clean, professional UI

✅ Features
Phase 1 – Scraping & Backend (Moderate)

Scrapes the 5 oldest articles from BeyondChats blogs

Stores articles in MongoDB

RESTful CRUD APIs for articles

Clean backend structure (routes, controllers, models)

Phase 2 – AI Content Enhancement (Difficult)

Node.js script processes stored articles

Searches Google using article titles (SerpAPI)

Fetches top 2 external reference articles

Uses OpenAI LLM to rewrite articles:

Improved structure

Better readability

Professional formatting

Saves updated content and reference links to MongoDB

Phase 3 – Frontend UI (Easy)

React + Tailwind CSS frontend

Displays articles in a responsive, professional layout

Tab-based comparison:

Original Article

AI-Updated Article (shown only when available)

Reference links displayed clearly

Subtle animations and clean UX

🧱 Tech Stack
Frontend

React

Tailwind CSS

Deployed on Vercel

Backend

Node.js

Express.js

MongoDB + Mongoose

Axios & Cheerio (scraping)

OpenAI API

Deployed on Render

🧠 Architecture & Data Flow
BeyondChats Blog Website
        ↓
Scraper (Node.js + Cheerio)
        ↓
MongoDB (Original Articles)
        ↓
Phase-2 Script
(Google Search + Reference Scraping)
        ↓
OpenAI API
        ↓
MongoDB (Updated Articles + References)
        ↓
Express REST API (/articles)
        ↓
React Frontend (Original vs Updated UI)

⚙️ Local Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/Ishwarya2006-N/beyondchats-assignment.git
cd beyondchats-assignment

2️⃣ Backend Setup
cd backend
npm install


Create a .env file inside backend/:

MONGO_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
SERP_API_KEY=your_serpapi_key


Start backend:

npm start


Backend runs at:

http://localhost:5000

3️⃣ Frontend Setup
cd frontend
npm install
npm start


Frontend runs at:

http://localhost:3000