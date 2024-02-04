import { useEffect, useState } from "react";
import { config } from "../../config";

type FetchingWithPaginationProps = {
  pageSize: number;
  searchParams?: string;
  relativeUrlWithoutParams: string;
};

export type UseFetchingWithPaginationResult<T> = {
  entities: T[];
  loadNextPage: () => void;
  isLoaded: boolean;
  isLastPage: boolean;
  error: string | null;
};

const useFetchingWithPagination = <T>({
  pageSize,
  searchParams,
  relativeUrlWithoutParams,
}: FetchingWithPaginationProps): UseFetchingWithPaginationResult<T> => {
  if (pageSize < 0) throw new Error("Page size cannot be negative");
  if (pageSize > 15) throw new Error("Page size cannot be greater than 15");

  if (
    relativeUrlWithoutParams.includes("://") ||
    relativeUrlWithoutParams.startsWith("//")
  )
    throw new Error("relativeUrlWithoutParams must be relative");

  if (relativeUrlWithoutParams.includes("?"))
    throw new Error("relativeUrlWithoutParams must be without params");

  const [entities, setEntities] = useState<T[]>([]);
  const [pageNum, setPageNum] = useState<number>(1);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (isLastPage) return;

      setIsLoaded(false);

      let response;

      try {
        response = await fetch(
          config.SERVER_URL +
            `${relativeUrlWithoutParams}?pageNum=${pageNum}&pageSize=${pageSize}&${
              searchParams ? searchParams : ""
            }`
        );
      } catch (e) {
        setError("Something went wrong");

        return;
      }

      let json: T[] = await response.json();

      if (json.length < pageSize) setIsLastPage(true);

      entities
        ? setEntities((prevEntities) => [...prevEntities, ...json])
        : setEntities(json);

      setIsLoaded(true);
    })();
  }, [pageNum]);

  const loadNextPage = () => setPageNum((lastPageNum) => ++lastPageNum);

  return {
    entities: entities,
    loadNextPage: loadNextPage,
    isLoaded: isLoaded,
    isLastPage: isLastPage,
    error: error,
  } as UseFetchingWithPaginationResult<T>;
};

export default useFetchingWithPagination;
