import "./CategoryTag.css";

type CategoryProps = {
  category: Category;
  blockName: string;
  isFilled: boolean;
  modificatorName: string | null;
};

const CategoryTag = ({
  category,
  blockName,
  isFilled,
  modificatorName,
}: CategoryProps) => {
  return (
    <a
      className={`category-tag ${blockName}__category-tag ${
        isFilled ? "category-tag_filled" : ""
      } ${modificatorName ? `category-tag_${modificatorName}` : ""}`}
      key={category.id}
    >
      {category.name}
    </a>
  );
};

export default CategoryTag;
