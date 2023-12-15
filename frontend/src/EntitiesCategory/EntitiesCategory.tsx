import Title from "../Title/Title";
import EntitiesContainerWithLoadMore from "../EntitiesContainerWithLoadMore/EntitiesContainerWithLoadMore";
import { EntitiesContainerProps } from "../EntitiesContainer/EntitiesContainer";
import { ReactElement } from "react";
import "./EntitiesCategory.css";

type EntitiesCategoryProps = {
  blockName: string;
  title: string;
  query: string;
  entitiesPluralName: string;
  Container: <T>({
    entities,
    entitiesPluralName,
    EntityComponent,
    blockName,
  }: EntitiesContainerProps<T>) => ReactElement;
};

const EntitiesCategory = ({
  blockName,
  title,
  query,
  entitiesPluralName,
  Container,
}: EntitiesCategoryProps) => {
  return (
    <div
      className={`entities-category ${blockName}__entities-category ${blockName}__${entitiesPluralName}-category ${entitiesPluralName}-category`}
    >
      <Title blockName="entities-category">{title}</Title>
      <EntitiesContainerWithLoadMore
        blockName={blockName}
        Container={Container}
        entitiesPluralName={entitiesPluralName}
        searchString={`${query}`}
      />
    </div>
  );
};

export default EntitiesCategory;
