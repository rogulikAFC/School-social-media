import { useNavigate } from "react-router-dom";
import { config } from "../../config";
import ProfileImage from "../ProfileImage/ProfileImage";
import "./SchoolCard.css"

type SchoolCardProps = {
  blockName: string;
  school: School;
};

const SchoolCard = ({ blockName, school }: SchoolCardProps) => {
  const navigate = useNavigate();

  return (
    <button className={`school-card ${blockName}__school-card`} onClick={() => navigate(`/school/${school.id}`)} >
      <ProfileImage blockName="school-card" imageSource={`${config.SERVER_URL}${school.imagePath}`} />

      <div className="school-card__info-block">
        <div className="school-card__title">{school.name}</div>
        <div className="school-card__address">{school.fullAddress}</div>
      </div>
    </button>
  );
};

export default SchoolCard;