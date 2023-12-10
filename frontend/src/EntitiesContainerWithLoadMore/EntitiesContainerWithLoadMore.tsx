import "./EntitiesContainerWithLoadMore.css";
import { ReactElement } from "react";
import LoadMoreEntities from "../LoadMoreArticles/LoadMoreEntities";
import useFetchingWithPagination from "../hooks/useFetchingWithPagination";
import { EntitiesContainerProps } from "../EntitiesContainer/EntitiesContainer";
import SchoolCard from "../SchoolCard/SchoolCard";
import ArticleCard from "../ArticleCard/ArticleCard";

type EntitiesContainerWithLoadMoreProps = {
  Container: <T>({
    entities,
    entitiesPluralName,
    EntityComponent,
    blockName,
  }: EntitiesContainerProps<T>) => ReactElement;
  blockName: string;
  entitiesPluralName: string;
  searchString: string;
};

type EntitiesContainerWithLoadMorePropsWithSearch = PartialBy<
  EntitiesContainerWithLoadMoreProps,
  "searchString"
>;

const getRelativeUrl = (entitiesPluralName: string) => {
  switch (entitiesPluralName.toLowerCase()) {
    case "articles":
      return "api/Articles";
    case "schools":
      return "api/Schools";
    default:
      return "";
  }
};

const getEntityComponentType = (entitiesPluralName: string) => {
  switch (entitiesPluralName.toLowerCase()) {
    case "articles":
      return ArticleCard;
    case "schools":
      return SchoolCard;
  }
};

function EntitiesContainerWithLoadMore<T>({
  Container,
  blockName,
  entitiesPluralName,
  searchString,
}: EntitiesContainerWithLoadMorePropsWithSearch) {
  const { entities, isLoaded, loadNextPage } = useFetchingWithPagination<T>({
    pageSize: 4,
    relativeUrlWithoutParams: getRelativeUrl(entitiesPluralName),
    searchParams: searchString ? [`query=${searchString}`] : [],
  });

  return (
    entities.length > 0 && (
      <div
        className={`entities-container-wrapper ${blockName}__entities-container-wrapper ${entitiesPluralName} ${blockName}__${entitiesPluralName}`}
      >
        {Container<T>({
          entities: entities,
          blockName: blockName,
          entitiesPluralName: entitiesPluralName,
          EntityComponent: getEntityComponentType(entitiesPluralName)!,
        })}

        <LoadMoreEntities
          blockName={blockName}
          onClick={loadNextPage}
          isLoaded={isLoaded}
        />
      </div>
    )
  );
}

export default EntitiesContainerWithLoadMore;
