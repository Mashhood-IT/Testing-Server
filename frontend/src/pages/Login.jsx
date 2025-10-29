import React, { useState } from "react";
import { useLoginMutation } from "../features/auth/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      return alert("Please fill in both fields.");
    }

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res)); // Store token and user data
      nav("/dashboard"); // Redirect to dashboard
    } catch (e) {
      // Handle error appropriately (perhaps with a state for error message)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white">
      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm space-y-5 border border-gray-100"
      >
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
          SuperAdmin Login
        </h1>

        {/* Email Input */}
        <div className="flex items-center border rounded-lg p-2 bg-gray-50">
          <Mail size={18} className="text-gray-400 mx-2" />
          <input
            aria-label="Email"
            className="w-full bg-transparent outline-none text-sm"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email" // Enforces email validation
            required
          />
        </div>

        {/* Password Input */}
        <div className="flex items-center border rounded-lg p-2 bg-gray-50">
          <Lock size={18} className="text-gray-400 mx-2" />
          <input
            aria-label="Password"
            type="password"
            className="w-full bg-transparent outline-none text-sm"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-600 text-sm text-center">
            {error.data ? error.data.message : "Invalid credentials"}
          </p>
        )}

        {/* Login Button */}
        <button
          disabled={isLoading}
          className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all"
        >
          {isLoading ? "..." : "Login"}
        </button>
      </form>
    </div>
  );
}