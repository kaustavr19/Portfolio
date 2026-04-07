"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BootLine {
  text: string;
  color: string;
  bold?: boolean;
  blank?: boolean;
}

const BOOT_LINES: BootLine[] = [
  { text: "PORTFOLIO/OS  v1.0.0  —  KAUSTAV", color: "#e6ddd4", bold: true },
  { text: "Copyright (C) 2025. All rights reserved.", color: "#6b6560" },
  { text: "", color: "", blank: true },
  { text: "CPU: Creative Intelligence @ 3.5yrs experience", color: "#6b6560" },
  { text: "Memory check: 4 case studies ... OK", color: "#7eb8a0" },
  { text: "Side projects: StayPut, AptiCrack, YT Music ... OK", color: "#7eb8a0" },
  { text: "IxDF certs: Information Viz, AI for Designers ... OK", color: "#7eb8a0" },
  { text: "Eugenie.ai docs: searching local archive ...", color: "#c8a97e" },
  { text: "", color: "", blank: true },
  { text: "Initialising design system .........", color: "#6b6560" },
  { text: "LOADING PORTFOLIO/OS ...", color: "#e6ddd4", bold: true },
];

const LINE_DELAY = 0.22; // seconds per line
const PROGRESS_START = BOOT_LINES.length * LINE_DELAY + 0.1;

interface Props {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: Props) {
  const [visible, setVisible] = useState(true);
  const [skipped, setSkipped] = useState(false);

  const totalDuration = PROGRESS_START + 0.8 + 0.4; // lines + progress bar + fade

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 500);
    }, totalDuration * 1000);

    const onKey = () => skip();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function skip() {
    if (skipped) return;
    setSkipped(true);
    setVisible(false);
    setTimeout(onComplete, 400);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex flex-col justify-center px-8 md:px-16"
          style={{ background: "#000", fontFamily: "var(--font-jetbrains), monospace" }}
          onClick={skip}
        >
          <div className="max-w-2xl mx-auto w-full">
            {BOOT_LINES.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * LINE_DELAY, duration: 0.15 }}
                className="text-sm leading-6"
                style={{
                  color: line.color,
                  fontWeight: line.bold ? 700 : 400,
                  minHeight: line.blank ? "1.5rem" : undefined,
                }}
              >
                {line.text}
              </motion.div>
            ))}

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: PROGRESS_START, duration: 0.1 }}
              className="mt-4 w-full h-0.5 rounded-full overflow-hidden"
              style={{ background: "#2e2a26" }}
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: PROGRESS_START, duration: 0.8, ease: "easeInOut" }}
                className="h-full rounded-full"
                style={{ background: "#c8a97e" }}
              />
            </motion.div>
          </div>

          {/* Skip hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-6 left-0 right-0 text-center text-xs"
            style={{ color: "#6b6560", fontFamily: "var(--font-jetbrains), monospace" }}
          >
            Press any key or click to skip
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
