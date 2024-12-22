import { ReactNode, useEffect } from "react";

import { useCurrentUser } from "../contexts/UserContext";

export const AUTH_TOKEN_KEY = "token";

const SetAuth = ({ children }: { children: ReactNode }) => {
  const user = useCurrentUser();

  useEffect(() => {
    const setLocalStorageToken = async () => {
      if (user) {
        const token = await user.getIdToken();
        localStorage.setItem(AUTH_TOKEN_KEY, token);
      }
    };
    setLocalStorageToken();
  }, [user]); // Depend on the client and user to ensure the effect runs when either changes

  return children;
};

export default SetAuth;
