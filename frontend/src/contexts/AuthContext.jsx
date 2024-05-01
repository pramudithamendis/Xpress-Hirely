import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const storedData = JSON.parse(localStorage.getItem("user_data"));

  useEffect(() => {
    if (storedData) {
      const { userToken, user } = storedData;
      setToken(userToken);
      setUserData(user);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (newToken, newData) => {
    setToken(newToken);
    setUserData(newData);
    setIsAuthenticated(true);
    localStorage.setItem(
      "user_data",
      JSON.stringify({ userToken: newToken, user: newData })
    );
    localStorage.setItem('user', newData.email);
  };

  const logout = () => {
    setToken(null);
    setUserData(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user_data");
  };
  const authValues = {
    token,
    isAuthenticated,
    login,
    logout,
    userData,
  };
  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const { token, isAuthenticated, login, logout, userData } =
    useContext(AuthContext);
  return { token, isAuthenticated, login, logout, userData };
};
