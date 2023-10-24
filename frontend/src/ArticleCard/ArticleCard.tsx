import { config } from "../../config.ts";
import CategoryTag from "../CategoryTag/CategoryTag.tsx";
import "./ArticleCard.css";
import { useNavigate } from "react-router-dom";

type ArticleCardProps = {
  article: Article;
  blockName: string;
};

const ArticleCard = ({ article, blockName }: ArticleCardProps) => {
  const navigate = useNavigate();

  let userImage = config.SERVER_URL + article.user.imagePath;
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
      className={`article-card ${blockName}_article-card`}
      onClick={() => navigate(articleURL)}
    >
      <div className="article-card__header">
        <figure className="article-card__author">
          {article.user.imagePath === "null" ? <img src={userImage} /> : ""}
          <figcaption>Автор: {article.user.name}</figcaption>
        </figure>

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
          <CategoryTag category={article.category} blockName="article-card" />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ArticleCard;
