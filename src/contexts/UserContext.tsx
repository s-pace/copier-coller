import { User } from "firebase/auth";
import { useRouter } from "next/router";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { AUTH_TOKEN_KEY } from "../components/SetAuth";
import { auth } from "../firebase"; // Adjust the path according to your project structure

interface UserContextValue {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>> | null;
}

const UserContext = React.createContext<UserContextValue>({
  user: null,
  setUser: null,
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useCurrentUser = () => {
  const { user } = useContext(UserContext);
  return user;
};

export const useLogout = () => {
  // Call useContext at the top level of your custom hook
  const { setUser } = useContext(UserContext);
  const router = useRouter();

  const logout = async () => {
    try {
      await auth.signOut();

      localStorage.removeItem(AUTH_TOKEN_KEY);

      // Assuming you want to update the user state to null after logout
      if (setUser) {
        setUser(null);
      }
      router.push("/signin");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Return the logout function so it can be called from the component
  return logout;
};
