import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ArticlesContainer from "../../ArticlesContainer/ArticlesContainer";
import { config } from "../../../config";
import loadMoreIcon from "../../assets/LoadMoreIcon.svg";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const { q: query } = Object.fromEntries(searchParams);

  const [isFirstTimeLoading, setIsFirstTimeLoading] = useState<boolean>(true);
  const [articles, setArticles] = useState<Article[]>([]);
  const [pageNum, setPageNum] = useState<number>(1);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const pageSize = 4;

  useEffect(() => {
    const getArticles = async () => {
      if (isLastPage) {
        return;
      }

      const response = await fetch(
        config.SERVER_URL +
          `api/articles?query=${query}&pageNum=${pageNum}&pageSize=${pageSize}`
      );

      const articlesFromJson: Article[] = await response.json();

      if (articlesFromJson.length < pageNum) {
        setIsLastPage(false);
      }

      setArticles((prevArticles) => [...prevArticles, ...articlesFromJson]);
    };

    getArticles();
  }, [pageNum]);

  useEffect(() => {
    if (isFirstTimeLoading) {
      return;
    }

    console.log(searchParams)
    window.location.reload()
  }, [searchParams])

  useEffect(() => {
    setIsFirstTimeLoading(false)
  }, [])

  return (
    <>
      <ArticlesContainer articles={articles} blockName="main-page" />

      {articles ? (
        <button
          className="main-page__load-more-btn"
          onClick={() => {
            setPageNum((prevPageNum) => ++prevPageNum);
          }}
        >
          <img src={loadMoreIcon} alt="" />
          Загрузить ещё
        </button>
      ) : (
        ""
      )}
    </>
  );
};

export default SearchPage;
