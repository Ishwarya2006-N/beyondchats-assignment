import ArticleTabs from "./ArticleTabs";

const ArticleCard = ({ article }) => {
  return (
    <div
      className="
        bg-surface rounded-2xl
        border border-slate-200
        p-8 mb-12
        shadow-sm
        transition-all duration-300 ease-out
        hover:shadow-xl hover:-translate-y-1
      "
    >
      {/* Article Title */}
      <div className="mb-6 pb-4 border-b border-slate-200">
        <h2 className="text-2xl font-bold leading-snug text-slate-900">
          {article.title}
        </h2>
      </div>

      {/* Tabs Section */}
      <div className="mt-6 rounded-xl bg-blue-50 p-5 border border-slate-200">
        <ArticleTabs
          original={article.originalContent}
          updated={article.updatedContent}
        />
      </div>

      {/* References */}
      {article.references?.length > 0 && (
        <div className="mt-10 pt-6 border-t border-slate-200">
          <h4 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
            References
          </h4>

          <ul className="space-y-2 text-sm">
            {article.references.map((ref, i) => (
              <li key={i}>
                <a
                  href={ref}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    inline-block
                    text-blue-600
                    hover:text-blue-800
                    hover:underline
                    transition-colors duration-200
                    break-all
                  "
                >
                  {ref}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ArticleCard;
