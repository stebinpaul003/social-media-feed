import React, { useState } from "react";
import { auth } from "../firebase"; // Firebase authentication
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/feed"); // Redirect to feed after successful login
    } catch (err) {
      handleAuthError(err.code); // Map Firebase error codes to user-friendly messages
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/feed"); // Redirect to feed after successful Google login
    } catch (err) {
      setError("Failed to sign in with Google. Please try again.");
    }
  };

  const handleAuthError = (errorCode) => {
    switch (errorCode) {
      case "auth/user-not-found":
        setError("No account found with this email. Please sign up or check your email.");
        break;
      case "auth/wrong-password":
        setError("Incorrect password. Please try again or reset your password.");
        break;
      case "auth/invalid-email":
        setError("Invalid email format. Please enter a valid email.");
        break;
      case "auth/too-many-requests":
        setError("Too many unsuccessful login attempts. Please try again later.");
        break;
        case "auth/invalid-credential":
            setError("Invalid credentials. Please check your login credential.");
            break;
      default:
        setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Log In</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full"
        >
          Log In
        </button>
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="bg-red-500 text-white font-bold py-2 px-4 rounded w-full mt-4"
        >
          Sign In with Google
        </button>
        <p className="mt-4 text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-500 cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
