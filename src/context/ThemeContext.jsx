// import { createContext } from "react";
// export const ThemeContext = createContext();
import React, { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    // Additional logic to persist dark mode preference can be added here
    if (!darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };

  const textColor = darkMode ? "#ffffff" : "#000000";
  const bgColor = darkMode ? "#1a202c" : "#ffffff";

  return (
    <ThemeContext.Provider
      value={{ darkMode, toggleDarkMode, textColor, bgColor }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
