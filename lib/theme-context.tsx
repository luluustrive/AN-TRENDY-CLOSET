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
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") return "light";
    return (localStorage.getItem("theme-mode") as ThemeMode) || "light";
  });
  const [palette, setPaletteState] = useState<ColorPalette>(() => {
    if (typeof window === "undefined") return "classic";
    return (localStorage.getItem("theme-palette") as ColorPalette) || "classic";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("data-palette", palette);
  }, [theme, palette]);

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
