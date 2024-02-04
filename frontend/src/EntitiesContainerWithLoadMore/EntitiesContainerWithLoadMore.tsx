import "./EntitiesContainerWithLoadMore.css";
import { ReactElement } from "react";
import LoadMoreEntities from "../LoadMoreArticles/LoadMoreEntities";
import useFetchingWithPagination from "../hooks/useFetchingWithPagination";
import { EntitiesContainerProps } from "../EntitiesContainer/EntitiesContainer";
import SchoolCard from "../SchoolCard/SchoolCard";
import ArticleCard from "../ArticleCard/ArticleCard";
import FileArticleCard from "../FileArticleCard/FileArticleCard";

type EntitiesContainerWithLoadMoreProps = {
  Container: <T>({
    entities,
    entitiesPluralName,
    EntityComponent,
    blockName,
  }: EntitiesContainerProps<T>) => ReactElement;
  blockName: string;
  entitiesPluralName: string;
  searchString?: string;
};

const getRelativeUrl = (entitiesPluralName: string) => {
  switch (entitiesPluralName.toLowerCase()) {
    case "articles":
      return "api/Articles";
    case "schools":
      return "api/Schools";
    case "file_articles":
      return "api/FileArticles";
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
    case "file_articles":
      return FileArticleCard;
  }
};

function EntitiesContainerWithLoadMore<T>({
  Container,
  blockName,
  entitiesPluralName,
  searchString,
}: EntitiesContainerWithLoadMoreProps) {
  const { entities, isLoaded, loadNextPage } = useFetchingWithPagination<T>({
    pageSize: 4,
    relativeUrlWithoutParams: getRelativeUrl(entitiesPluralName),
    searchParams: searchString,
  });

  return (
    entities.length > 0 && (
      <div
        className={`entities-container-wrapper ${blockName}__entities-container-wrapper`}
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
