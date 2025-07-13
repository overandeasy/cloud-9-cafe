import { auth, signIn, signOut } from "@/auth/firebase";
import { onAuthStateChanged, type UserCredential } from "firebase/auth";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { useLocation, useNavigate } from "react-router";

interface AuthContextType {
  user: UserCredential["user"] | null;
  signIn: typeof signIn;
  signOut: typeof signOut;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<null | UserCredential["user"]>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // This state will be used to store the user after sign up and in the context provider

  signIn;
  signOut;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      await currentUser?.reload(); // Reload the user to ensure we have the latest data
      setUser(currentUser);
    });
    const from = location.state?.from?.pathname || "/";
    console.log("AuthContext redirecting. From:", from);
    navigate(from, { replace: true });
    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
export const UserAuth = () => {
  // This way, the context value can be directly used without having to call "useContext" every time.
  return useContext(AuthContext);
};
