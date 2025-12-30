import { useEffect, useState } from "react";
import { fetchArticles } from "../api/articlesApi";
import ArticleCard from "../components/ArticleCard";

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles().then(setArticles);
  }, []);

  return (
    <main
      className="
        max-w-6xl mx-auto px-6 py-12
        animate-fadeIn
      "
    >
      {articles.map(article => (
        <ArticleCard key={article._id} article={article} />
      ))}
    </main>
  );
};

export default ArticlesPage;
