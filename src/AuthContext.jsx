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
  const signup = async (username, password) => {
    const response = await fetch(`${API}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.token) {
      setToken(data.token);
      setLocation("DASHBOARD");
    }
  };


  // TODO: authenticate
  const authenticate = async (username, password) => {
    const response = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.token) {
      setToken(data.token);
      setLocation("DASHBOARD");
    }
  };

  const value = { location, signup, authenticate };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
