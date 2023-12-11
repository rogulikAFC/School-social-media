import { useNavigate } from "react-router-dom";
import { config } from "../../config";
import ProfileImage from "../ProfileImage/ProfileImage";
import "./SchoolCard.css"
import TitleForCards from "../Title/TitleForCards";

type SchoolCardProps = {
  blockName: string;
  entity: School;
};

const SchoolCard = ({ blockName, entity }: SchoolCardProps) => {
  const navigate = useNavigate();

  return (
    <button className={`school-card ${blockName}__school-card`} onClick={() => navigate(`/school/${entity.id}`)} >
      <ProfileImage blockName="school-card" imageSource={`${config.SERVER_URL}${entity.imagePath}`} />

      <div className="school-card__info-block">
        {/* <div className="school-card__title">{entity.name}</div> */}
        <TitleForCards blockName="school-card">{entity.name}</TitleForCards>
        <div className="school-card__address">{entity.fullAddress}</div>
      </div>
    </button>
  );
};

export default SchoolCard;