// client/src/context/AuthContext.jsx

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import API from "../api/axios";

/* eslint-disable react-refresh/only-export-components */

// Create Context
const AuthContext =
  createContext();

// Provider
export const AuthProvider = ({
  children,
}) => {

  // State
  const [user, setUser] =
    useState(null);

  const [token, setToken] =
    useState(null);

  const [isLoading, setIsLoading] =
    useState(true);

  // Initialize Auth
  useEffect(() => {

    let ignore = false;

    const initAuth = async () => {

      try {

        // Get Saved Token
        const savedToken =
          localStorage.getItem(
            "token"
          );

        // No Token
        if (!savedToken) {

          if (!ignore) {

            setIsLoading(false);

          }

          return;
        }

        // Verify Token
        const response =
          await API.get(
            "/auth/me",
            {

              headers: {

                Authorization:
                  `Bearer ${savedToken}`,

              },

            }
          );

        // Update State
        if (!ignore) {

          setUser(
            response.data.data.user
          );

          setToken(savedToken);
        }

      } catch (error) {

        console.error(
          "Authentication failed:",
          error
        );

        // Clear Invalid Data
        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "user"
        );

        if (!ignore) {

          setUser(null);

          setToken(null);

        }

      } finally {

        if (!ignore) {

          setIsLoading(false);

        }
      }
    };

    initAuth();

    return () => {

      ignore = true;

    };

  }, []);

  // Login
  const login = (
    userData,
    authToken
  ) => {

    setUser(userData);

    setToken(authToken);

    // Save to LocalStorage
    localStorage.setItem(
      "token",
      authToken
    );

    localStorage.setItem(

      "user",

      JSON.stringify(userData)

    );
  };

  // Logout
  const logout = () => {

    setUser(null);

    setToken(null);

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );
  };

  // Update User
  const updateUser = (
    updatedUser
  ) => {

    setUser(updatedUser);

    localStorage.setItem(

      "user",

      JSON.stringify(updatedUser)

    );
  };

  return (

    <AuthContext.Provider
      value={{

        user,

        token,

        isLoading,

        isAuthenticated:
          Boolean(user),

        login,

        logout,

        updateUser,

      }}
    >

      {children}

    </AuthContext.Provider>

  );
};

// Custom Hook
export const useAuth = () => {

  const context =
    useContext(AuthContext);

  if (!context) {

    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};

