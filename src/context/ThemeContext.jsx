import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [accentColor, setAccentColor] = useState("primary");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedAccent = localStorage.getItem("accentColor");
    const isDark =
      savedTheme === "dark" ||
      (!savedTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDarkMode(isDark);
    if (savedAccent) {
      setAccentColor(savedAccent);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("accentColor", accentColor);
    const root = document.documentElement;
    const colors = {
      primary: {
        light: "#22c55e",
        dark: "#4ade80",
        gradient: "from-green-500 to-green-600",
      },
      secondary: {
        light: "#3b82f6",
        dark: "#60a5fa",
        gradient: "from-blue-500 to-blue-600",
      },
      accent: {
        light: "#f97316",
        dark: "#fb923c",
        gradient: "from-orange-500 to-orange-600",
      },
    };
    root.style.setProperty(
      "--accent-color",
      colors[accentColor][darkMode ? "dark" : "light"],
    );
    root.style.setProperty("--accent-gradient", colors[accentColor].gradient);
  }, [accentColor, darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const changeAccentColor = (color) => {
    setAccentColor(color);
  };

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleTheme,
        accentColor,
        changeAccentColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
