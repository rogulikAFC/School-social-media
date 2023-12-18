import "./SchoolPage.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { config } from "../../../config";
import ProfileImage from "../../ProfileImage/ProfileImage";
import ShareContainer from "../../ShareContainer/ShareContainer";
import EntitiesContainerWithLoadMore from "../../EntitiesContainerWithLoadMore/EntitiesContainerWithLoadMore";
import EntitiesContainer from "../../EntitiesContainer/EntitiesContainer";
import CategoryTag from "../../CategoryTag/CategoryTag";
import { CategoryTypes } from "../../WithNavigationToCategory/WithNavigationToCategoryPage";
import TitleForCards from "../../Title/TitleForCards";

const SchoolPage = () => {
  const { schoolId } = useParams();
  const [school, setSchool] = useState<School>();
  const [articleCategories, setArticleCategories] = useState<Category[]>([]);
  const [fileArticleCategories, setFileArticleCategories] = useState<
    Category[]
  >([]);

  useEffect(() => {
    const getSchool = async () => {
      const response = await fetch(
        `${config.SERVER_URL}api/Schools/${schoolId}`
      );

      if (!response.ok) return;

      const schoolFromJson: School = await response.json();

      setSchool(schoolFromJson);
    };

    const getCategories = async () => {
      // const response = await fetch(`${config.SERVER_URL}api/Categories`);
      // if (!response.ok) return;
      // const categoriesFromJson: Category[] = await response.json();
      // setCategories(categoriesFromJson);
    };

    const getArticleCategories = async () => {
      const response = await fetch(
        `${config.SERVER_URL}api/Categories/school/${schoolId}/has_content/articles`
      );

      if (!response.ok) return;

      const categoriesFromJson: Category[] = await response.json();

      setArticleCategories(categoriesFromJson);
    };

    const getFileArticlesCategories = async () => {
      const response = await fetch(
        `${config.SERVER_URL}api/Categories/school/${schoolId}/has_content/fileArticles`
      );

      if (!response.ok) return;

      const categoriesFromJson: Category[] = await response.json();

      setFileArticleCategories(categoriesFromJson);
    };

    getSchool();
    getFileArticlesCategories();
    getArticleCategories();
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

      <div className="categories-wrapper school-info-container__categories-wrapper">
        <TitleForCards blockName="categories-wrapper">Статьи</TitleForCards>
        <EntitiesContainer
          entities={articleCategories}
          entitiesPluralName="categories"
          blockName="categories-wrapper"
          EntityComponent={CategoryTag}
          school={school}
          type={CategoryTypes.Articles}
          isFilled={false}
        />

        <TitleForCards blockName="categories-wrapper">Файлы</TitleForCards>
        <EntitiesContainer
          entities={fileArticleCategories}
          entitiesPluralName="categories"
          blockName="categories-wrapper"
          EntityComponent={CategoryTag}
          school={school}
          type={CategoryTypes.FileArticles}
          isFilled={false}
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
