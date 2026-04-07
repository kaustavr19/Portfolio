"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type FontSize = "sm" | "md" | "lg";
export type ColorBlindMode = "none" | "protanopia" | "deuteranopia" | "tritanopia";

interface A11yContextValue {
  fontSize: FontSize;
  colorBlind: ColorBlindMode;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  setColorBlind: (mode: ColorBlindMode) => void;
}

const A11yContext = createContext<A11yContextValue>({
  fontSize: "md",
  colorBlind: "none",
  increaseFontSize: () => {},
  decreaseFontSize: () => {},
  setColorBlind: () => {},
});

const FONT_ZOOM: Record<FontSize, string> = { sm: "0.88", md: "1", lg: "1.15" };
const SIZES: FontSize[] = ["sm", "md", "lg"];

function applyFontSize(size: FontSize) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (document.documentElement.style as any).zoom = FONT_ZOOM[size];
}

function applyColorBlind(mode: ColorBlindMode) {
  if (mode === "none") {
    document.documentElement.style.filter = "";
  } else {
    document.documentElement.style.filter = `url(#cb-${mode})`;
  }
}

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [fontSize, setFontSize] = useState<FontSize>("md");
  const [colorBlind, setColorBlindState] = useState<ColorBlindMode>("none");

  // Restore from localStorage on mount
  useEffect(() => {
    const savedSize = localStorage.getItem("a11y-font") as FontSize | null;
    const savedCb = localStorage.getItem("a11y-cb") as ColorBlindMode | null;
    if (savedSize && SIZES.includes(savedSize)) {
      setFontSize(savedSize);
      applyFontSize(savedSize);
    }
    if (savedCb) {
      setColorBlindState(savedCb);
      applyColorBlind(savedCb);
    }
  }, []);

  function increaseFontSize() {
    setFontSize((prev) => {
      const next = SIZES[Math.min(SIZES.indexOf(prev) + 1, SIZES.length - 1)];
      applyFontSize(next);
      localStorage.setItem("a11y-font", next);
      return next;
    });
  }

  function decreaseFontSize() {
    setFontSize((prev) => {
      const next = SIZES[Math.max(SIZES.indexOf(prev) - 1, 0)];
      applyFontSize(next);
      localStorage.setItem("a11y-font", next);
      return next;
    });
  }

  function setColorBlind(mode: ColorBlindMode) {
    setColorBlindState(mode);
    applyColorBlind(mode);
    localStorage.setItem("a11y-cb", mode);
  }

  return (
    <A11yContext.Provider value={{ fontSize, colorBlind, increaseFontSize, decreaseFontSize, setColorBlind }}>
      {children}
    </A11yContext.Provider>
  );
}

export function useA11y() {
  return useContext(A11yContext);
}
