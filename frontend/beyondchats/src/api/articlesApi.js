export const fetchArticles = async () => {
  const res = await fetch("http://localhost:5000/articles");
  return res.json();
};
