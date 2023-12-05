import { useSearchParams } from "react-router-dom";
import ArticlesContainer from "../../ArticlesContainer/ArticlesContainer";
import LoadMoreEntities from "../../LoadMoreArticles/LoadMoreEntities";
import useFetchingWithPagination from "../../hooks/useFetchingWithPagination";
import SchoolCard from "../../SchoolCard/SchoolCard";
import "./SearchPage.css";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const { q: query } = Object.fromEntries(searchParams);

  const {
    entities: articleEntities,
    loadNextPage: loadNextArticlesPage,
    isLoaded: isArticlesLoaded,
  } = useFetchingWithPagination<Article>({
    pageSize: 4,
    searchParams: [`query=${query}`],
    relativeUrlWithoutParams: "api/Articles",
  });

  const {
    entities: schoolEntities,
    loadNextPage: loadNextSchoolPage,
    isLoaded: isSchoolsLoaded,
  } = useFetchingWithPagination<School>({
    pageSize: 4,
    searchParams: [`query=${query}`],
    relativeUrlWithoutParams: "api/Schools",
  });

  return (
    <>
      {schoolEntities.length > 0 ? (
        <div className="search-entities-container main-page__search-entities-container search-entities-container_schools">
          <div className="search-entities-container__title">Школы</div>

          <div className="schools search-entities-container__schools">
            {schoolEntities.map((school) => (
              <SchoolCard school={school} blockName="schools" />
            ))}
          </div>

          <LoadMoreEntities
            onClick={loadNextSchoolPage}
            blockName="search-entities-container"
            isLoaded={isSchoolsLoaded}
          />
        </div>
      ) : (
        ""
      )}

      {articleEntities.length > 0 ? (
        <div className="search-entities-container main-page__search-entities-container search-entities-container_articles">
          <div className="search-entities-container__title">Статьи</div>

          <ArticlesContainer
            articles={articleEntities}
            blockName="search-entities-container"
          />
          {articleEntities ? (
            <LoadMoreEntities
              onClick={loadNextArticlesPage}
              blockName="search-entities-container"
              isLoaded={isArticlesLoaded}
            />
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default SearchPage;
