import Preloader from "../Preloader/Preloader";
import ArticleCard from "../ArticleCard/ArticleCard";
import "./ArticlesContainer.css"

type ArticlesContainerProps = {
  articles: Article[];
  blockName: string;
};

const ArticlesContainer = ({ articles, blockName }: ArticlesContainerProps) => {
  return (
    <div className={`articles ${blockName}__articles`}>
      {articles.length > 0 ? (
        articles.map((article) => (
          <ArticleCard
            article={article}
            key={article.id}
            blockName={blockName}
          />
        ))
      ) : (
        <Preloader />
      )}
    </div>
  );
};

export default ArticlesContainer;
