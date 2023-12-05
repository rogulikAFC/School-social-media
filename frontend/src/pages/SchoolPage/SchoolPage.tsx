import "./SchoolPage.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ArticlesContainer from "../../ArticlesContainer/ArticlesContainer";
import LoadMoreEntities from "../../LoadMoreArticles/LoadMoreEntities";
import { config } from "../../../config";
import ProfileImage from "../../ProfileImage/ProfileImage";
import ShareContainer from "../../ShareContainer/ShareContainer";
import useFetchingWithPagination from "../../hooks/useFetchingWithPagination";

const SchoolPage = () => {
  const { schoolId } = useParams();
  const [school, setSchool] = useState<School>();

  const {entities: articleEntities, loadNextPage, isLoaded} = useFetchingWithPagination<Article>({
    pageSize: 4,
    relativeUrlWithoutParams: "api/Articles"
  })

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

      <ArticlesContainer articles={articleEntities} blockName="main-page" />

      {articleEntities ? (
        <LoadMoreEntities
          onClick={() => loadNextPage}
          blockName="main-page"
          isLoaded={isLoaded}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default SchoolPage;
