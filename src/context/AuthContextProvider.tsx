import { createContext, useContext, useEffect, useState } from "react";
import { INewUser } from "../types";

export const INITIAL_USER = {
  iduser: "",
  name: "",
  userName: "",
  email: "",
  avatar: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => { },
  setIsAuthenticated: () => { },
  checkAuthUser: async () => false as boolean,
};

type IContextType = {
  user: INewUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<INewUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<INewUser>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const checkAuthUser = async () => {
    // setIsLoading(true);
    // try {
    //   const currentAccount = await getCurrentUser();
    //   if (currentAccount) {
    //     setUser({
    //       id: currentAccount.$id,
    //       name: currentAccount.name,
    //       username: currentAccount.username,
    //       email: currentAccount.email,
    //     });
    //     setIsAuthenticated(true);

    //     return true;
    //   }

    //   return false;
    // } catch (error) {
    //   console.error(error);
    //   return false;
    // } finally {
    //   setIsLoading(false);
    // }
  };

  useEffect(() => {
    checkAuthUser();
  }, []);

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUserContext = () => useContext(AuthContext);