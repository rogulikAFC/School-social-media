import { useContext, useState } from "react";
import { config } from "../../config";
import { UserContext } from "../contexts/UserContext";
import { FormError } from "../Forms/FormError/FormError";

type SelectSchoolButtonProps = {
  blockName: string;
  schoolId: string | undefined;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

/**
 * Selecting user's school on click.
 *
 * @param schoolId - GUID of school.
 */
const SelectSchoolButton = ({
  schoolId,
  blockName,
  onClick,
}: SelectSchoolButtonProps) => {
  const { getCredentials } = useContext(UserContext);
  const [isError, setIsError] = useState(false);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsError(false);

    const user = await getCredentials();

    if (!user) return setIsError(true); // need to make response to user if not user

    const response = await fetch(config.SERVER_URL + `api/Users/${user.id}`, {
      method: "PATCH",
      body: JSON.stringify([
        {
          op: "add",
          path: "/schoolId",
          value: schoolId,
        },
      ]),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) return setIsError(true);
    
    onClick && onClick(e);
  };

  return (
    <>
      <button
        className={`form-button ${blockName}__form-button`}
        onClick={handleClick}
      >
        Я учусь здесь
      </button>

      {isError && (
        <FormError blockName={blockName}>Не удалось сменить школу</FormError>
      )}
    </>
  );
};

export default SelectSchoolButton;
