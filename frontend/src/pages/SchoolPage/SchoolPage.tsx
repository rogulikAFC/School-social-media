import ArticlesContainer from "../../ArticlesContainer/ArticlesContainer";
import LoadMoreArticles from "../../LoadMoreArticles/LoadMoreArticles";
import useArticlesFetching, { UseArticlesFetchingResult } from "../../hooks/useArticlesFetching";

const SchoolPage = () => {
  const { articles, loadNextPage, isLoaded }: UseArticlesFetchingResult =
    useArticlesFetching({
      pageSize: 4,
      relativeUrlWithoutParams: "api/Articles",
    });

  return (
    <>
      <ArticlesContainer articles={articles} blockName="main-page" />

      {articles ? (
        <LoadMoreArticles
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
