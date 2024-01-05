import { ReactElement, createContext, useContext, useState } from "react";
import Cookies from "universal-cookie";
import { config } from "../../config";

const UserContext = createContext(null);

type UserProviderProps = {
  children: ReactElement;
};

const UserProvider = ({ children }: UserProviderProps) => {
  const cookies = new Cookies(null, { path: "/" });

  const getCredentials = async (): Promise<User | null> => {
    const userId = cookies.get("userId");

    console.log(userId);

    const response = await fetch(config.SERVER_URL + "api/Users/" + userId);

    if (!response.ok) return null;

    const user: User = await response.json();

    return user;
  };

  const signUp = async (user: UserToSignUp): Promise<boolean> => {
    const response = await fetch(config.SERVER_URL + "api/Users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    console.log(response);

    if (!response.ok) return false;

    return true;
  };

  const signIn = async (user: UserToLogin)
};
