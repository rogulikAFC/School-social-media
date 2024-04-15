import { useEffect, useState } from "react";
import { config } from "../../config";

const useCheckIfUserImageValid = (user: User | null) => {
  const [isUserImageValid, setIsUserImageValid] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      {
        if (!user) return;

        try {
          await fetch(config.SERVER_URL + user.imagePath, {
            mode: "no-cors",
          });

          setIsUserImageValid(true);
        } catch {
          setIsUserImageValid(false);
        }
      }
    })();
  }, [user]);

  return {
    isUserImageValid,
  };
};

export default useCheckIfUserImageValid;
