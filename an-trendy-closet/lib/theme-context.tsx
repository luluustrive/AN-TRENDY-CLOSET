"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type ThemeMode = "light" | "dark";
export type ColorPalette = "classic" | "rose" | "emerald" | "midnight";

interface ThemeContextType {
  theme: ThemeMode;
  palette: ColorPalette;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  setPalette: (palette: ColorPalette) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>("light");
  const [palette, setPaletteState] = useState<ColorPalette>("classic");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme-mode") as ThemeMode;
    const savedPalette = localStorage.getItem("theme-palette") as ColorPalette;

    if (savedTheme) {
      setThemeState(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }

    if (savedPalette) {
      setPaletteState(savedPalette);
      document.documentElement.setAttribute("data-palette", savedPalette);
    } else {
      document.documentElement.setAttribute("data-palette", "classic");
    }
  }, []);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem("theme-mode", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };

  const setPalette = (newPalette: ColorPalette) => {
    setPaletteState(newPalette);
    localStorage.setItem("theme-palette", newPalette);
    document.documentElement.setAttribute("data-palette", newPalette);
  };

  return (
    <ThemeContext.Provider value={{ theme, palette, toggleTheme, setTheme, setPalette }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
