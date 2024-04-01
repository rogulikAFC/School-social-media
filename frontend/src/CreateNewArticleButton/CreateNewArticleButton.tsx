import { useNavigate } from "react-router-dom";

type CreateNewArticleButtonProps = {
  blockName: string;
  schoolId: string;
};

const CreateNewArticleButton = ({
  blockName,
  schoolId,
}: CreateNewArticleButtonProps) => {
  const navigate = useNavigate();

  const handleClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    navigate(`/school/${schoolId}/create_article`);
  };

  return (
    <button
      className={`${blockName}__form-button form-button`}
      onClick={handleClick}
    >
      Новая статья
    </button>
  );
};

export default CreateNewArticleButton;
