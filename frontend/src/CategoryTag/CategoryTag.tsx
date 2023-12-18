import WithNavigationToCategoryPage from "../WithNavigationToCategory/WithNavigationToCategoryPage";
import "./CategoryTag.css";

type CategoryProps = {
  school: School;
  entity: Category;
  type: string;
  blockName: string;
  isFilled: boolean;
  modificatorName: string | null;
  newMechanic: boolean;
};

type CategoryPropsWithModificator = PartialBy<CategoryProps, "modificatorName">;
type CategoryPropsWithModificatorAndMechanicType = PartialBy<CategoryPropsWithModificator, "newMechanic">;

const CategoryTag = ({
  entity: category,
  school,
  type,
  blockName,
  isFilled,
  modificatorName,
  newMechanic = true
}: CategoryPropsWithModificatorAndMechanicType) => {
  return (
    <WithNavigationToCategoryPage newMechanic={newMechanic} blockName={blockName} category={category} school={school} type={type}>
      <a
        className={`category-tag ${blockName}__category-tag ${
          isFilled ? "category-tag_filled" : ""
        } ${modificatorName ? `category-tag_${modificatorName}` : ""}`}
        key={category.id}
      >
        {category.name}
      </a>
    </WithNavigationToCategoryPage>
  );
};

export default CategoryTag;
