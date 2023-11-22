import { useEffect, useState } from "react";
import { config } from "../../../config";
import "./MainPage.css";
import ArticlesContainer from "../../ArticlesContainer/ArticlesContainer";
import LoadMoreArticles from "../../LoadMoreArticles/LoadMoreArticles";

const MainPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [pageNum, setPageNum] = useState<number>(1);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const pageSize = 4;

  useEffect(() => {
    const getArticles = async () => {
      if (isLastPage) {
        return;
      }

      setIsLoaded(false);

      let response = await fetch(
        config.SERVER_URL +
          `api/Articles?pageNum=${pageNum}&pageSize=${pageSize}`
      );
      let json = await response.json();

      let articlesFromJson: Article[] = json;

      if (articlesFromJson.length < pageSize) {
        setIsLastPage(true);
      }

      if (!articles) {
        setArticles(articlesFromJson);

        return;
      }

      setArticles((prevArticles) => [...prevArticles, ...articlesFromJson]);

      setIsLoaded(true);
    };

    getArticles();
  }, [pageNum]);

  return (
    <>
      <ArticlesContainer articles={articles} blockName="main-page" />

      {articles ? (
        <LoadMoreArticles
          onClick={() => setPageNum((prevPageNum) => ++prevPageNum)}
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
