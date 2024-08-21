import React, { useState } from "react";
import { auth } from "../../firebase/firebase";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(""); // State to hold error messages

  const navigate = useNavigate();

  function handleOnSubmit(e) {
    e.preventDefault();
    setError(""); // Reset error before attempting login
    setIsLoading(true);

    if (user.email && user.password) {
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          const getUser = userCredential.user;
          setIsLoading(false);
          navigate("/");
        })
        .catch((err) => {
          // Handle different error codes

          switch (err.code) {
            case "auth/user-not-found":
              setError("No user found with this email.");
              break;
            case "auth/wrong-password":
              setError("Incorrect password. Please try again.");
              break;
            case "auth/invalid-email":
              setError("Invalid email format.");
              break;
            default:
              setError("An error occurred. Please try again.");
          }
          setIsLoading(false);
        });
    } else {
      setError("Please fill in both email and password fields.");
    }
  }

  function handleGoogleLogin() {
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
        setError("Google sign-in failed. Please try again.");
        setIsLoading(false);
        console.log(error.message);
      });
  }

  return (
    <div className="h-[100vh] w-[90vw] m-auto flex flex-col items-center gap-5 justify-center">
      {/* <form
        onSubmit={handleOnSubmit}
        className="flex flex-col items-center justify-center gap-5"
      >
        <input
          disabled={isLoading}
          className="bg-blue-50 p-3 rounded text-lg"
          type="email"
          placeholder="Email..."
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          disabled={isLoading}
          className="bg-blue-50 p-3 rounded text-lg"
          type="password"
          placeholder="Password..."
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button
          disabled={isLoading}
          type="submit"
          className="bg-blue-700 text-stone-100 w-full py-2 rounded"
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            "Login"
          )}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}{" "} */}
      {/* Display error message */}
      <>
        {" "}
        <button
          className="flex items-center justify-center gap-3 bg-stone-700 p-5 rounded-lg "
          onClick={handleGoogleLogin}
        >
          <span>
            <img src="./google.png" alt="icon" className="w-8" />
          </span>
          <span className="text-stone-100 text-lg">Login with google</span>
        </button>
        {/* <Link
          to="/signup"
          className="text-slate-500 text-center underline w-full"
        >
          Don&apos;t have account? Signup
        </Link>{" "} */}
      </>
    </div>
  );
}
