import { config } from "../../config.ts";
import AuthorTag from "../AuthorTag/AuthorTag.tsx";
import CategoryTag from "../CategoryTag/CategoryTag.tsx";
import TitleForCards from "../Title/TitleForCards.tsx";
import "./ArticleCard.css";
import { useNavigate } from "react-router-dom";

type ArticleCardProps = {
  entity: Article;
  blockName: string;
};

const ArticleCard = ({ entity, blockName }: ArticleCardProps) => {
  const navigate = useNavigate();

  let artilcePreviewImage = config.SERVER_URL + entity.previewImagePath;

  let date = new Date(entity.createdUTC + " GMT");

  let dateString = date.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let articleURL = `/article/${entity.id}`;

  return (
    <div
      className={`article-card ${blockName}__article-card`}
      onClick={() => navigate(articleURL)}
    >
      <div className="article-card__header">
        <AuthorTag blockName="article-card" user={entity.user} />

        <span className="article-card__date">{dateString}</span>
      </div>

      {entity.previewImagePath ? (
        <img
          className="article-card__preview-image"
          src={artilcePreviewImage}
        />
      ) : (
        ""
      )}

      <div className="article-card__content">
        {/* <div className="article-card__title">{entity.title}</div> */}
        <TitleForCards blockName="article-card">{entity.title}</TitleForCards>
        {entity.category ? (
          <CategoryTag category={entity.category} blockName="article-card" isFilled={false} modificatorName={null} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ArticleCard;
