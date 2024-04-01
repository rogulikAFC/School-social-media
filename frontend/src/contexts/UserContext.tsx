import { ReactElement, createContext } from "react";
import Cookies from "universal-cookie";
import { config } from "../../config";

type UserContextValue = {
  getCredentials: () => Promise<User | null>;
  signIn: (userToSignIn: UserToSignIn) => Promise<boolean>;
  signUp: (userToSignUp: UserToSignUp) => Promise<boolean>;
};

const cookies = new Cookies(null, { path: "/" });

const getCredentials = async () => {
  const userId = cookies.get("userId");

  console.log({ userId });

  const response = await fetch(config.SERVER_URL + "api/Users/" + userId);

  if (!response.ok) return null;

  const user: User = await response.json();

  return user;
};

const signUp = async (userToSignUp: UserToSignUp): Promise<boolean> => {
  const response = await fetch(config.SERVER_URL + "api/Users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userToSignUp),
  });

  console.log(response);

  if (!response.ok) return false;

  const user: User = await response.json();

  console.log(user);

  cookies.set("userId", user.id);

  return true;
};

const signIn = async (userToSignIn: UserToSignIn): Promise<boolean> => {
  const signInResponse = await fetch(
    config.SERVER_URL + `api/Users/by_email/${userToSignIn.email}/sign_in`,
    {
      method: "POST",
      body: JSON.stringify(userToSignIn.password),
    }
  );

  if (!signInResponse.ok) return false;

  const userResponse = await fetch(
    config.SERVER_URL + `api/Users/by_email/${userToSignIn.email}`
  );

  if (!userResponse.ok) return false;

  const user: User = await userResponse.json();

  cookies.set("userId", user.id);

  return true;
};

const contextValue = {
  getCredentials,
  signIn,
  signUp,
};

export const UserContext = createContext<UserContextValue>(contextValue);

type UserProviderProps = {
  children: ReactElement;
};

const UserContextProvider = ({ children }: UserProviderProps) => {
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
