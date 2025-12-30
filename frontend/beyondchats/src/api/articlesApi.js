const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://beyondchats-assignment-1-3e5n.onrender.com";

export const fetchArticles = async () => {
  const res = await fetch(`${API_BASE_URL}/articles`);
  return res.json();
};
