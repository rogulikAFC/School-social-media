import { config } from "../../config.ts";
import AuthorTag from "../AuthorTag/AuthorTag.tsx";
import CategoryTag from "../CategoryTag/CategoryTag.tsx";
import "./ArticleCard.css";
import { useNavigate } from "react-router-dom";

type ArticleCardProps = {
  article: Article;
  blockName: string;
};

const ArticleCard = ({ article, blockName }: ArticleCardProps) => {
  const navigate = useNavigate();

  let artilcePreviewImage = config.SERVER_URL + article.previewImagePath;

  let date = new Date(article.createdUTC + " GMT");

  let dateString = date.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let articleURL = `/article/${article.id}`;

  return (
    <div
      className={`article-card ${blockName}__article-card`}
      onClick={() => navigate(articleURL)}
    >
      <div className="article-card__header">
        <AuthorTag blockName="article-card" user={article.user} />

        <span className="article-card__date">{dateString}</span>
      </div>

      {article.previewImagePath ? (
        <img
          className="article-card__preview-image"
          src={artilcePreviewImage}
        />
      ) : (
        ""
      )}

      <div className="article-card__content">
        <div className="article-card__title">{article.title}</div>
        {article.category ? (
          <CategoryTag category={article.category} blockName="article-card" isFilled={false} modificatorName={null} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ArticleCard;
