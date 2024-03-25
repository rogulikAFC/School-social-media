import "./SchoolPage.css";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { config } from "../../../config";
import ProfileImage from "../../ProfileImage/ProfileImage";
import ShareContainer from "../../ShareContainer/ShareContainer";
import EntitiesContainerWithLoadMore from "../../EntitiesContainerWithLoadMore/EntitiesContainerWithLoadMore";
import EntitiesContainer from "../../EntitiesContainer/EntitiesContainer";
import CategoryTag from "../../CategoryTag/CategoryTag";
import { CategoryTypes } from "../../WithNavigationToCategory/WithNavigationToCategoryPage";
import TitleForCards from "../../Title/TitleForCards";
import SelectSchoolButton from "../../SelectSchoolButton/SelectSchoolButton";
import { UserContext } from "../../contexts/UserContext";

const SchoolPage = () => {
  const { schoolId } = useParams();
  const [school, setSchool] = useState<School>();
  const [categories, setCategories] = useState<Category[]>([]);
  const { getCredentials } = useContext(UserContext);
  const [doesUserStudiesInSchool, setDoesUserStudiesInSchool] = useState(false);
  const [countOfUsers, setCountOfUsers] = useState(0);
  const [doesGettingInfoAboutStudents, setDoesGettingInfoAboutStudents] =
    useState(true);

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
      const response = await fetch(
        config.SERVER_URL + `api/Categories?schoolId=${schoolId}`
      )

      if (!response.ok) return;

      setCategories(await response.json() as Category[])
    }

    getSchool();
    getCategories();
  }, []);

  useEffect(() => {
    if (!doesGettingInfoAboutStudents) return;

    const getIfUserStudiesInSchool = async () => {
      const user = await getCredentials();

      if (!user) return setDoesUserStudiesInSchool(false);

      if (user.school.id === schoolId) return setDoesUserStudiesInSchool(true);
    };

    const getCountOfSchoolStudents = async () => {
      const response = await fetch(
        config.SERVER_URL + `api/Schools/${schoolId}/count_of_students`
      );

      if (!response.ok) return;

      setCountOfUsers(await response.json());
    };

    getIfUserStudiesInSchool();
    getCountOfSchoolStudents();

    setDoesGettingInfoAboutStudents(false);
  }, [doesGettingInfoAboutStudents]);

  const handleSelectSchoolButtonClick = () =>
    setDoesGettingInfoAboutStudents(true);

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

          <div className="school-info-container__info-about-students">
            <span>
              {countOfUsers} {countOfUsers === 1 ? "ученик" : "учеников"}{" "}
              учиться здесь
            </span>

            {doesUserStudiesInSchool || (
              <SelectSchoolButton
                schoolId={school?.id}
                blockName="school-info-container"
                onClick={handleSelectSchoolButtonClick}
              />
            )}
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
          entities={categories.filter(category => ["Text", "Combined"].includes(category.dataType))}
          entitiesPluralName="categories"
          blockName="categories-wrapper"
          EntityComponent={CategoryTag}
          school={school}
          type={CategoryTypes.Articles}
          isFilled={false}
        />

        <TitleForCards blockName="categories-wrapper">Файлы</TitleForCards>
        <EntitiesContainer
          entities={categories.filter(category => ["File", "Combined"].includes(category.dataType))}
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
