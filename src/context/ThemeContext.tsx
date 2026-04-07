"use client";

// Dark mode removed. This stub is kept so existing imports don't break.
// The portfolio always uses the light/retro XP theme.
import React, { createContext, useContext } from "react";

interface ThemeContextValue {
  theme: "light";
}

const ThemeContext = createContext<ThemeContextValue>({ theme: "light" });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContext.Provider value={{ theme: "light" }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
