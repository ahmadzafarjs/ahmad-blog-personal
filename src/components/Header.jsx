import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContextProvider";

export default function Header() {
  const { isAuth, handleSignOut, handleGoogleAuth } = useAuth();
  return (
    <header>
      <div className="m-auto w-[90vw] md:max-w-[900px] flex items-center justify-between h-20">
        <h3 className="font-bold text-xl text-blue-700">ahmad.</h3>
        <nav className="flex items-end justify-center gap-6">
          {isAuth ? (
            <>
              <Link to="/">Home</Link>
              <Link to="/create">Create</Link>
              <button onClick={handleSignOut}>Logout</button>
            </>
          ) : (
            <button
              className="flex items-center justify-center gap-2 bg-stone-700 p-3   rounded-full "
              onClick={handleGoogleAuth}
            >
              <span>
                <img src="./google.png" alt="icon" className="w-4" />
              </span>
              <span className="text-stone-100 text-md leading-[1]">Signup</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
