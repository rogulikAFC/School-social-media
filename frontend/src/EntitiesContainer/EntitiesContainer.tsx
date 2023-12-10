import { ComponentType } from "react";
import "./EntitiesContainer.css";
import Preloader from "../Preloader/Preloader";

export type EntitiesContainerProps<T> = {
  entities: T[];
  entitiesPluralName: string;
  EntityComponent: ComponentType<string | any>;
  blockName: string;
};

function EntitiesContainer<T>({
  entities,
  entitiesPluralName,
  blockName,
  EntityComponent,
}: EntitiesContainerProps<T>) {
  return entities ? (
    <div
      className={`entities-container ${blockName}__entity-container ${entitiesPluralName} ${blockName}__${entitiesPluralName}`}
    >
      {entities.map((entity) => (
        <EntityComponent entity={entity} blockName="entities-container" key={Math.random()} />
      ))}
    </div>
  ) : (
    <Preloader />
  );
}

export default EntitiesContainer;
