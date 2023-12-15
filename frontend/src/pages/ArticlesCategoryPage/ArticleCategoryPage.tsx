import { useParams } from "react-router-dom";
import "./ArticleCategoryPage.css";
import EntitiesContainer from "../../EntitiesContainer/EntitiesContainer";
import { useEffect, useState } from "react";
import { config } from "../../../config";
import EntitiesCategory from "../../EntitiesCategory/EntitiesCategory";

const ArticleCategoryPage = () => {
  const { schoolId, categoryId } = useParams();
  const searchString = `schoolId=${schoolId}&categoryId=${categoryId}`;
  const [categoryName, setCategoryName] = useState<string>("");
  const [schoolName, setSchoolName] = useState<string>("");

  useEffect(() => {
    const getCategory = async () => {
      const response = await fetch(
        config.SERVER_URL + "api/Categories/" + categoryId
      );
      const category: Category = await response.json();

      setCategoryName(category.name);
    };

    const getSchool = async () => {
      const response = await fetch(
        config.SERVER_URL + "api/Schools/" + schoolId
      );
      const school: School = await response.json();

      setSchoolName(school.name);
    };

    getCategory();
    getSchool();
  }, []);

  return (
    <div className="articles-category-page main-page__articles-category-page">
      <EntitiesCategory
        title={`Категория "${categoryName}" школы ${schoolName}`}
        blockName="articles-category-page"
        query={searchString}
        entitiesPluralName="articles"
        Container={EntitiesContainer}
      />
    </div>
  );
};

export default ArticleCategoryPage;
