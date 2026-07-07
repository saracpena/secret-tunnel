/**
 * AuthContext manages the application's authentication state.
 *
 * Responsibilities:
 * - Stores the user's JWT token.
 * - Tracks where the user is in the authentication flow.
 * - Provides functions to sign up and authenticate.
 * - Shares authentication state and functionality with every component
 *   through React Context.
 */

import { createContext, useContext, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");

  // TODO: signup
  const signup = async (username) => {
    const response = await fetch(`${API}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });

    const data = await response.json();

    if (data.token) {
      setToken(data.token);
      setLocation("TABLET");
    }
  };


  // TODO: authenticate
  const authenticate = async () => {
  if (!token) {
    throw Error("No token found");
  }

  const response = await fetch(`${API}/authenticate`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw Error("Authentication failed");
  }

  setLocation("TUNNEL");
};

console.log("token:", token);
console.log("location:", location);

  const value = { location, signup, authenticate };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}

