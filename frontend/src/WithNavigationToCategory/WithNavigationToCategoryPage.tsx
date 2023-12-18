import { ReactElement } from "react";
import { useNavigate, redirect } from "react-router-dom";

export enum CategoryTypes {
  FileArticles = "documents",
  Articles = "articles",
}

type WithNavigationToCategoryPage = {
  category: Category;
  school: School;
  type: string;
  children: ReactElement;
  blockName: string;
  newMechanic: boolean;
};

const WithNavigationToCategoryPage = ({
  blockName,
  category,
  school,
  type,
  children,
  newMechanic,
}: WithNavigationToCategoryPage) => {
  const navigate = useNavigate();

  const oldMechanicNavigate = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    location.replace(`/school/${school.id}/category/${category.id}/${type}`);
  };

  return (
    <button
      className={`${blockName}__with-navigation-to-category-page`}
      onClick={(e) =>
        newMechanic
          ? navigate(`/school/${school.id}/category/${category.id}/${type}`)
          : oldMechanicNavigate(e)
      }
      style={{
        display: "inline",
        border: "none",
        background: "none",
        width: "max-content",
      }}
    >
      {children}
    </button>
  );
};

export default WithNavigationToCategoryPage;
