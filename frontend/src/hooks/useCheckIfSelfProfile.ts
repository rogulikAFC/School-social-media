import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";

const useCheckIfSelfProfile = (userFromProfileId: string | undefined) => {
  const [isSelfProfile, setIfSelfProfile] = useState<boolean>(false);
  const [localUser, setLocalUser] = useState<User | null>(null);
  const { getCredentials } = useContext(UserContext);

  useEffect(() => {
    (async () => setLocalUser(await getCredentials()))();
  }, []);

  useEffect(() => {
    (async () => {
      if (!localUser) return;

      setIfSelfProfile(localUser.id === userFromProfileId);
    })();
  }, [localUser, userFromProfileId]);

  return { isSelfProfile };
};

export default useCheckIfSelfProfile;
