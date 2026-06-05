// client/src/context/ThemeContext.jsx

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

// Create Context
const ThemeContext =
  createContext();

// Provider
export const ThemeProvider = ({
  children,
}) => {

  // Load saved theme
  const [isDark, setIsDark] =
    useState(() => {

      try {

        const savedTheme =
          localStorage.getItem("theme");

        // Default = dark mode
        if (!savedTheme) {

          return true;

        }

        return savedTheme === "dark";

      } catch (error) {

        console.error(
          "Theme load error:",
          error
        );

        return true;
      }
    });

  // Apply Theme
  useEffect(() => {

    const root =
      document.documentElement;

    if (isDark) {

      root.classList.add("dark");

    } else {

      root.classList.remove("dark");

    }

    // Save theme
    localStorage.setItem(
      "theme",
      isDark ? "dark" : "light"
    );

  }, [isDark]);

  // Toggle Theme
  const toggleTheme = () => {

    setIsDark((prev) => !prev);

  };

  return (

    <ThemeContext.Provider
      value={{
        isDark,
        toggleTheme,
      }}
    >

      {children}

    </ThemeContext.Provider>

  );
};

// Custom Hook
export const useTheme = () => {

  const context =
    useContext(ThemeContext);

  if (!context) {

    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
};

