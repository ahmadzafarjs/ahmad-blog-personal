import React, { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import Loader from "../components/layout/Loader";

const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState();
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        setIsAuth(true);
        setIsLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        console.log("SignOut Successfull");
        window.location.reload();
      })
      .catch((err) => {
        setIsError(err);
      });
  }

  function handleGoogleAuth() {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);

        setIsLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setIsError("Google sign-in failed. Please try again.");
        setIsLoading(false);
        console.log(error.message);
      });
  }

  return (
    <AuthContext.Provider
      value={{
        authUser,
        isLoading,
        isAuth,
        handleSignOut,
        isError,
        handleGoogleAuth,
      }}
    >
      {isError && <span>{isError.message}</span>}
      {isAuth && !isError && isLoading ? <Loader /> : children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
