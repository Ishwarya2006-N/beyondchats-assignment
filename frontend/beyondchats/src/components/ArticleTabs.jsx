import { useState } from "react";

const ArticleTabs = ({ original, updated }) => {
  const [tab, setTab] = useState("original");

  const hasUpdated = updated && updated.trim().length > 0;

  return (
    <div>
      {/* Tabs */}
      <div className="inline-flex items-center gap-2 bg-slate-200/60 p-2 rounded-xl mb-6 shadow-inner">
        <button
          onClick={() => setTab("original")}
          className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
            tab === "original"
              ? "bg-white text-slate-900 shadow-md"
              : "text-slate-600 hover:bg-white/70 hover:text-slate-900"
          }`}
        >
          Original
        </button>

        {hasUpdated && (
          <button
            onClick={() => setTab("updated")}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              tab === "updated"
                ? "bg-white text-slate-900 shadow-md"
                : "text-slate-600 hover:bg-white/70 hover:text-slate-900"
            }`}
          >
            Updated
          </button>
        )}
      </div>

      {/* Content */}
      <div
        key={tab}
        className="
          prose prose-slate max-w-none leading-relaxed
          bg-white rounded-xl p-6
          border border-slate-200
          transition-opacity duration-300
        "
      >
        {tab === "original" || !hasUpdated ? original : updated}
      </div>
    </div>
  );
};

export default ArticleTabs;
