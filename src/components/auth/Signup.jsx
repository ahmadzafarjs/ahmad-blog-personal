import React, { useState } from "react";
import { auth } from "../../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // State to hold error messages

  const navigate = useNavigate();

  function handleOnSubmit(e) {
    e.preventDefault();
    setError(""); // Reset error before attempting signup
    setIsLoading(true);

    if (user.email && user.password) {
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          const getUser = userCredential.user;
          setIsLoading(false);
          navigate("/");
        })
        .catch((err) => {
          switch (err.code) {
            case "auth/email-already-in-use":
              setError("This email is already in use.");
              break;
            case "auth/invalid-email":
              setError("Invalid email format.");
              break;
            case "auth/weak-password":
              setError("Password should be at least 6 characters.");
              break;
            default:
              setError("An error occurred. Please try again.");
          }
          setIsLoading(false);
        });
    } else {
      setError("Please fill in both email and password fields.");
      setIsLoading(false);
    }
  }

  function handleGoogleSignup() {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setIsLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setError("Google sign-up failed. Please try again.");
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
            "Signup"
          )}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}{" "} */}
      {/* Display error message */}
      <>
        {" "}
        <button
          className="text-blue-700 underline"
          onClick={handleGoogleSignup}
        >
          <span>
            <img src="./google.png" alt="icon" />
          </span>
        </button>
        {/* <Link
          to="/login"
          className="text-slate-500 text-center underline w-full"
        >
          Already have account? Login
        </Link>{" "} */}
      </>
    </div>
  );
}
