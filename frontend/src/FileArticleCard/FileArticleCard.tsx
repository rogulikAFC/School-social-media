import { config } from "../../config";
import TitleForCards from "../Title/TitleForCards";
import "./FileArticleCard.css";

type FileArticleCardProps = {
  blockName: string;
  entity: FileArticle;
};

const FileArticleCard = ({ blockName, entity }: FileArticleCardProps) => {
  return (
    <a
      className={`file-article ${blockName}__file-article`}
      download={entity.title}
      href={config.SERVER_URL + entity.filePath}
    >
      <TitleForCards blockName="file-article">
        {entity.title}
      </TitleForCards>
    </a>
  );
};

export default FileArticleCard;
