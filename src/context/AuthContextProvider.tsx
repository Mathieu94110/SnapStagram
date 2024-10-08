import { createContext, useContext, useEffect, useState } from "react";
import { TNewUser } from "@/types";
import { useGetCurrentUserById } from "@/lib/react-query/queries";

export const INITIAL_USER = {
  iduser: undefined,
  name: "",
  userName: "",
  email: "",
  password: ""
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
  user: TNewUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<TNewUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<TNewUser>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");

  const {
    data: userInfos
  } = useGetCurrentUserById(userId);

  useEffect(() => {
    if (userInfos && userInfos.data) {
      setUser(userInfos.data);
      setIsAuthenticated(true);
      setIsLoading(false)
    }
  }, [userInfos])

  const checkAuthUser = async () => {
    setIsLoading(true);
    const storedUserData = localStorage.getItem('availability');
    if (storedUserData) {
      //user info on local storage case
      const userData = JSON.parse(storedUserData)
      // On below we compare the expiration date on localStorage of user authentication 
      if ("exp" in userData && userData.exp > Math.floor(new Date().getTime() / 1000)) {
        // user was authenticated less than an hour ago and he not be logged out
        setUserId(String(userData.user_id));
        return true
      } else {
        // user was authenticated over an hour ago, he has to log in again
        setIsLoading(false)
        localStorage.removeItem("availability");
        return false
      }
    } else {
      // no user saved on localStorage
      setIsLoading(false)
      return false
    }
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
