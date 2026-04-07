"use client";

import { useState, useCallback } from "react";

export type WindowId =
  | "work"
  | "lab"
  | "writing"
  | "about"
  | "terminal"
  | "gallery"
  | "readme"
  | "casestudy-cogentiq"
  | "casestudy-insurance"
  | "casestudy-eugenie";

export interface WindowState {
  id: WindowId;
  isOpen: boolean;
  isMinimised: boolean;
  zIndex: number;
  title: string;
}

const INITIAL_WINDOWS: WindowState[] = [
  { id: "work",     isOpen: false, isMinimised: false, zIndex: 10, title: "WORK/" },
  { id: "lab",      isOpen: false, isMinimised: false, zIndex: 10, title: "LAB/" },
  { id: "writing",  isOpen: false, isMinimised: false, zIndex: 10, title: "WRITING/" },
  { id: "about",    isOpen: false, isMinimised: false, zIndex: 10, title: "ABOUT.exe" },
  { id: "terminal", isOpen: false, isMinimised: false, zIndex: 10, title: "TERMINAL" },
  { id: "gallery",  isOpen: false, isMinimised: false, zIndex: 10, title: "GALLERY" },
  { id: "readme",   isOpen: false, isMinimised: false, zIndex: 10, title: "README.txt - Notepad" },
  { id: "casestudy-cogentiq",  isOpen: false, isMinimised: false, zIndex: 10, title: "Cogentiq" },
  { id: "casestudy-insurance", isOpen: false, isMinimised: false, zIndex: 10, title: "Insurance AI" },
  { id: "casestudy-eugenie",   isOpen: false, isMinimised: false, zIndex: 10, title: "Eugenie.ai" },
];

let zCounter = 100;

export function useWindowManager() {
  const [windows, setWindows] = useState<WindowState[]>(INITIAL_WINDOWS);

  const openWindow = useCallback((id: WindowId) => {
    zCounter += 1;
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, isOpen: true, isMinimised: false, zIndex: zCounter }
          : w
      )
    );
  }, []);

  const closeWindow = useCallback((id: WindowId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isOpen: false } : w))
    );
  }, []);

  const minimiseWindow = useCallback((id: WindowId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimised: true } : w))
    );
  }, []);

  const bringToFront = useCallback((id: WindowId) => {
    zCounter += 1;
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: zCounter } : w))
    );
  }, []);

  const openWindows = windows.filter((w) => w.isOpen);

  return {
    windows,
    openWindows,
    openWindow,
    closeWindow,
    minimiseWindow,
    bringToFront,
  };
}
