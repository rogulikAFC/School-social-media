import { useParams } from "react-router-dom";
import EntitiesCategory from "../../EntitiesCategory/EntitiesCategory";
import EntitiesContainer from "../../EntitiesContainer/EntitiesContainer";
import "./FileArticlesCategoryPage.css";
import { useEffect, useState } from "react";
import { config } from "../../../config";

const FileArticlesCategoryPage = () => {
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
    <div className="file-articles-category-page main-page__file-articles-category-page">
      <EntitiesCategory
        blockName="file-articles-category-page"
        title={`Категория "${categoryName}" школы ${schoolName}`}
        searchString={searchString}
        entitiesPluralName="file_articles"
        Container={EntitiesContainer}
      />
    </div>
  );
};

export default FileArticlesCategoryPage;
