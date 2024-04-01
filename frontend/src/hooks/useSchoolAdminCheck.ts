import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";

const useSchoolAdminCheck = (school: School | undefined) => {
  const { getCredentials } = useContext(UserContext);
  const [isUserAdmin, setIsUserAdmin] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (!school) return setIsUserAdmin(false);

      const userId = (await getCredentials())?.id;

      if (!userId) return setIsUserAdmin(false);

      const adminsIds = school.admins.map((a) => a.id);

      if (adminsIds.includes(userId)) return setIsUserAdmin(true);

      setIsUserAdmin(false);
    })();
  });

  return {
    isUserAdmin,
  };
};

export default useSchoolAdminCheck;
