import { useEffect, useState } from "react";
import { config } from "../../config";

type FetchingWithPaginationProps = {
  pageSize: number;
  searchParams: string[];
  relativeUrlWithoutParams: string;
};

type FetchingWithPaginationPropWithOptionals = PartialBy<
  FetchingWithPaginationProps,
  "searchParams"
>;

export type UseFetchingWithPaginationResult<T> = {
  entities: T[];
  loadNextPage: () => void;
  isLoaded: boolean;
};

const useFetchingWithPagination = <T>({
  pageSize,
  searchParams,
  relativeUrlWithoutParams
}: FetchingWithPaginationPropWithOptionals): UseFetchingWithPaginationResult<T> => {
  const [entities, setEntities] = useState<T[]>([]);
  const [pageNum, setPageNum] = useState<number>(1);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(true);

  useEffect(() => {
    const getEntities = async () => {
      if (isLastPage) {
        return;
      }

      setIsLoaded(false);

      let response = await fetch(
        `${
          config.SERVER_URL
        }${relativeUrlWithoutParams}?pageNum=${pageNum}&pageSize=${pageSize}&${
          searchParams ? searchParams.join("&") : ""
        }`
      );

      let json = await response.json();

      let entitiesFromJson: any[] = json;

      if (entitiesFromJson.length < pageSize) {
        setIsLastPage(true);
      }

      if (!entities) {
        setEntities(entitiesFromJson);

        return;
      }

      setEntities((prevEntities) => [...prevEntities, ...entitiesFromJson]);

      setIsLoaded(true);
    };

    getEntities();
  }, [pageNum]);

  const loadNextPage = () => setPageNum((lastPageNum) => ++lastPageNum);

  return {
    entities: entities,
    loadNextPage: loadNextPage,
    isLoaded: isLoaded,
  };
};

export default useFetchingWithPagination;
