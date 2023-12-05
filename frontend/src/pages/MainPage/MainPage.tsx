import "./MainPage.css";
import ArticlesContainer from "../../ArticlesContainer/ArticlesContainer";
import LoadMoreEntities from "../../LoadMoreArticles/LoadMoreEntities";
import useFetchingWithPagination from "../../hooks/useFetchingWithPagination";

const MainPage = () => {
  const { entities, isLoaded, loadNextPage } = useFetchingWithPagination<Article>({
    pageSize: 4,
    relativeUrlWithoutParams: "api/Articles",
  });

  return (
    <>
      <ArticlesContainer articles={entities} blockName="main-page" />

      {entities ? (
        <LoadMoreEntities
          onClick={loadNextPage}
          blockName="main-page"
          isLoaded={isLoaded}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default MainPage;
