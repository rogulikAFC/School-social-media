import "./SearchPage.css";
import { useSearchParams } from "react-router-dom";
import EntitiesContainer from "../../EntitiesContainer/EntitiesContainer";
import EntitiesCategory from "../../EntitiesCategory/EntitiesCategory";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const { q: query } = Object.fromEntries(searchParams);

  return (
    <div className="search-results main-page__search-results">
      <EntitiesCategory
        blockName="search-results"
        title="Школы"
        searchString={`query=${query}`}
        entitiesPluralName="schools"
        Container={EntitiesContainer}
      />
      <EntitiesCategory
        blockName="search-results"
        title="Статьи"
        searchString={`query=${query}`}
        entitiesPluralName="articles"
        Container={EntitiesContainer}
      />
    </div>
  );
};

export default SearchPage;
