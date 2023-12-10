import "./SearchPage.css";
import { useSearchParams } from "react-router-dom";
import EntitiesContainerWithLoadMore from "../../EntitiesContainerWithLoadMore/EntitiesContainerWithLoadMore";
import Title from "../../Title/Title";
import EntitiesContainer from "../../EntitiesContainer/EntitiesContainer";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const { q: query } = Object.fromEntries(searchParams);

  return (
    <>
      <div className="main-page__search-results">
        <div className="entities-wrapper main-container__entities-wrapper main-container__school-wrapper school-wrapper">
          <Title blockName="entities-wrapper">Школы</Title>
          <EntitiesContainerWithLoadMore
            blockName="school-wrapper"
            Container={EntitiesContainer}
            entitiesPluralName="schools"
            searchString={query}
          />
        </div>
        <div className="entities-wrapper main-container__entities-wrapper articles-wrapper">
          <Title blockName="entities-wrapper">Статьи</Title>
          <EntitiesContainerWithLoadMore
            blockName="articles-wrapper"
            Container={EntitiesContainer}
            entitiesPluralName="articles"
            searchString={query}
          />
        </div>
      </div>
    </>
  );
};

export default SearchPage;
