import { useEffect, useState } from "react";
import { config } from "../../config";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type ArticlesFetchingProps = {
  pageSize: number;
  relativeUrlWithoutParams: string;
  searchParams: string[];
};

type ArticlesFetchingPropsWithOptionalSearch = PartialBy<
  ArticlesFetchingProps,
  "searchParams"
>;

export type UseArticlesFetchingResult = {
  articles: Article[];
  loadNextPage: () => void;
  isLoaded: boolean;
};

const useArticlesFetching = ({
  pageSize,
  relativeUrlWithoutParams,
  searchParams,
}: ArticlesFetchingPropsWithOptionalSearch): UseArticlesFetchingResult => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [pageNum, setPageNum] = useState<number>(1);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(true);

  useEffect(() => {
    const getArticles = async () => {
      if (isLastPage) {
        return;
      }

      setIsLoaded(false);

      let response = await fetch(
        `${
          config.SERVER_URL
        }${relativeUrlWithoutParams}?pageNum=${pageNum}&pageSize=${pageSize}&${
          searchParams ? searchParams.join("&") : ""
        })}`
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

  const loadNextPage = () => setPageNum((lastPageNum) => ++lastPageNum);

  return {
    articles: articles,
    loadNextPage: loadNextPage,
    isLoaded: isLoaded,
  };
};

export default useArticlesFetching;
