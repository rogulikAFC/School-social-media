import { FC } from "react";
import "./CategoryTag.css";

const CategoryTag: FC<{ category: Category; blockName: string }> = ({
  category,
  blockName,
}) => {
  return (
    <a
      className={`category-tag ${blockName}__category-tag`}
      key={category.id}
    >
      {category.name}
    </a>
  );
};

export default CategoryTag;
