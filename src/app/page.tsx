"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BootSequence from "@/components/os/BootSequence";
import Desktop from "@/components/os/Desktop";
import Taskbar from "@/components/os/Taskbar";
import Window from "@/components/os/Window";
import { useWindowManager, WindowId } from "@/hooks/useWindowManager";
import { useIsDesktop } from "@/hooks/useIsDesktop";

// Window contents
import WorkFolder from "@/components/windows/WorkFolder";
import LabFolder from "@/components/windows/LabFolder";
import WritingFolder from "@/components/windows/WritingFolder";
import AboutApp from "@/components/windows/AboutApp";
import Terminal from "@/components/windows/Terminal";
import GalleryApp from "@/components/windows/GalleryApp";
import Notepad from "@/components/windows/Notepad";

// Mobile layout
import MobileLayout from "@/components/MobileLayout";

const WINDOW_CONFIG: Record<
  WindowId,
  { title: string; defaultPosition: { x: number; y: number }; defaultWidth?: number; defaultMaximized?: boolean; noPadding?: boolean }
> = {
  work:                 { title: "WORK/",        defaultPosition: { x: 100, y: 30 }, defaultWidth: 900, defaultMaximized: true, noPadding: true },
  lab:                  { title: "LAB/",         defaultPosition: { x: 110, y: 35 }, defaultWidth: 900, defaultMaximized: true, noPadding: true },
  writing:              { title: "WRITING/",     defaultPosition: { x: 120, y: 40 }, defaultWidth: 900, defaultMaximized: true, noPadding: true },
  about:                { title: "ABOUT.exe",    defaultPosition: { x: 130, y: 45 }, defaultWidth: 900, defaultMaximized: true, noPadding: true },
  terminal:             { title: "TERMINAL",          defaultPosition: { x: 140, y: 50 }, defaultWidth: 700, noPadding: true },
  gallery:              { title: "GALLERY",            defaultPosition: { x: 150, y: 50 }, defaultWidth: 700 },
  readme:               { title: "README.txt - Notepad", defaultPosition: { x: 180, y: 60 }, defaultWidth: 520, noPadding: true },
  "casestudy-cogentiq": { title: "Cogentiq",    defaultPosition: { x: 160, y: 55 }, defaultWidth: 800 },
  "casestudy-insurance":{ title: "Insurance AI", defaultPosition: { x: 170, y: 60 }, defaultWidth: 800 },
  "casestudy-eugenie":  { title: "Eugenie.ai",   defaultPosition: { x: 180, y: 65 }, defaultWidth: 800 },
};

function WindowContent({ id }: { id: WindowId }) {
  switch (id) {
    case "work":    return <WorkFolder />;
    case "lab":     return <LabFolder />;
    case "writing": return <WritingFolder />;
    case "about":   return <AboutApp />;
    case "terminal":return <Terminal />;
    case "gallery": return <GalleryApp />;
    case "readme":  return <Notepad />;
    default:        return null;
  }
}

export default function Page() {
  const [booted, setBooted] = useState(false);
  const isDesktop = useIsDesktop();
  const { windows, openWindows, openWindow, closeWindow, minimiseWindow, bringToFront } =
    useWindowManager();

  // Lock body scroll on desktop, free it on mobile
  useEffect(() => {
    document.body.style.overflow = isDesktop ? "hidden" : "auto";
    return () => { document.body.style.overflow = ""; };
  }, [isDesktop]);

  const activeWindow = openWindows
    .filter((w) => !w.isMinimised)
    .sort((a, b) => b.zIndex - a.zIndex)[0];

  return (
    <>
      {/* Boot sequence — only on desktop, skipped on mobile */}
      {!booted && isDesktop && (
        <BootSequence onComplete={() => setBooted(true)} />
      )}

      {/* Desktop OS — desktop only */}
      {isDesktop && (
        <AnimatePresence>
          {booted && (
            <motion.div
              key="desktop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              style={{ position: "fixed", inset: 0, zIndex: 1 }}
            >
              {/* Desktop wallpaper + icons */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 40 }}>
                <Desktop onOpen={openWindow} />
              </div>

              {/* Windows */}
              {windows.map((win) => {
                const cfg = WINDOW_CONFIG[win.id];
                return (
                  <Window
                    key={win.id}
                    id={win.id}
                    title={cfg.title}
                    isOpen={win.isOpen}
                    isMinimised={win.isMinimised}
                    zIndex={win.zIndex}
                    defaultPosition={cfg.defaultPosition}
                    defaultWidth={cfg.defaultWidth}
                    defaultMaximized={cfg.defaultMaximized}
                    noPadding={cfg.noPadding}
                    onClose={closeWindow}
                    onMinimise={minimiseWindow}
                    onFocus={bringToFront}
                  >
                    <WindowContent id={win.id} />
                  </Window>
                );
              })}

              {/* Taskbar */}
              <Taskbar
                openWindows={openWindows}
                activeId={activeWindow?.id}
                onOpen={openWindow}
                onWindowClick={(id) => {
                  const win = windows.find((w) => w.id === id);
                  if (win?.isMinimised) openWindow(id);
                  else bringToFront(id);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Mobile layout — shown immediately, no boot sequence */}
      {!isDesktop && <MobileLayout />}
    </>
  );
}
