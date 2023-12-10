import "./SchoolPage.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { config } from "../../../config";
import ProfileImage from "../../ProfileImage/ProfileImage";
import ShareContainer from "../../ShareContainer/ShareContainer";
import EntitiesContainerWithLoadMore from "../../EntitiesContainerWithLoadMore/EntitiesContainerWithLoadMore";
import EntitiesContainer from "../../EntitiesContainer/EntitiesContainer";

const SchoolPage = () => {
  const { schoolId } = useParams();
  const [school, setSchool] = useState<School>();

  useEffect(() => {
    const getSchool = async () => {
      const response = await fetch(
        `${config.SERVER_URL}api/Schools/${schoolId}`
      );

      if (!response.ok) return;

      const schoolFromJson: School = await response.json();

      setSchool(schoolFromJson);
    };

    getSchool();
  }, []);

  return (
    <>
      <div className="school-info-container main-page__school-info-container">
        <ProfileImage
          blockName="school-info-container"
          imageSource={
            school ? `${config.SERVER_URL}${school.imagePath}` : null
          }
        />
        <div className="school-info-container__info-block">
          <div className="school-info-container__title">{school?.name}</div>
          <div className="school-info-container__address">
            {school?.fullAddress}
          </div>
        </div>

        <ShareContainer
          location={location.href}
          blockName="school-info-container"
          title={school ? school.nameWithAddress : null}
        />
      </div>

      <EntitiesContainerWithLoadMore
        blockName="main-page"
        Container={EntitiesContainer}
        entitiesPluralName="articles"
      />
    </>
  );
};

export default SchoolPage;
