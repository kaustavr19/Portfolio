"use client";

import { useEffect, useState } from "react";

const CV_LINES = [
  "KAUSTAV — Senior UX Designer & Product Builder",
  "────────────────────────────────────────",
  "Experience  : 3.5 yrs @ Fractal Analytics",
  "Education   : B.Tech CST, UEM Kolkata (CGPA 9.45)",
  "Certs       : IxDF — Info Viz, AI for Designers",
  "Hackathons  : National-level judge",
  "Research    : IndiaHCI interest, Chernobyl UX thread",
  "",
  "Applying → Bristol CIE · Birmingham · City · Glasgow",
  "────────────────────────────────────────",
];

const CHAR_SPEED = 18; // ms per character
const LINE_PAUSE = 60; // ms between lines

export default function Terminal() {
  const [phase, setPhase] = useState<"prompt" | "typing" | "done">("prompt");
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  // After mounting, start typing sequence
  useEffect(() => {
    const t = setTimeout(() => setPhase("typing"), 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase !== "typing") return;
    if (currentLine >= CV_LINES.length) {
      setPhase("done");
      return;
    }

    const line = CV_LINES[currentLine];

    if (currentChar < line.length) {
      const t = setTimeout(() => {
        setCurrentChar((c) => c + 1);
      }, CHAR_SPEED);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, LINE_PAUSE);
      return () => clearTimeout(t);
    }
  }, [phase, currentLine, currentChar]);

  const partialLine =
    phase === "typing" && currentLine < CV_LINES.length
      ? CV_LINES[currentLine].slice(0, currentChar)
      : "";

  return (
    <div
      className="rounded-b-window min-h-[300px] p-0"
      style={{ background: "#000", fontFamily: "var(--font-jetbrains), monospace" }}
    >
      <div className="p-5 text-sm leading-6">
        {/* First prompt */}
        <div className="flex gap-2">
          <span style={{ color: "#7eb8a0" }}>kaustav@portfolio</span>
          <span style={{ color: "#6b6560" }}>:~$</span>
          <span style={{ color: "#e6ddd4" }}>cat cv.txt</span>
        </div>

        {/* Typed output */}
        {visibleLines.map((line, i) => (
          <div key={i} style={{ color: "#a09890" }}>
            {line || "\u00a0"}
          </div>
        ))}

        {/* Currently typing line */}
        {phase === "typing" && (
          <div style={{ color: "#a09890" }}>
            {partialLine}
            <span
              className="cursor-blink inline-block w-2 h-4 align-text-bottom ml-px"
              style={{ background: "#c8a97e" }}
            />
          </div>
        )}

        {/* Final prompt with blinking cursor */}
        {phase === "done" && (
          <div className="flex gap-2 mt-1">
            <span style={{ color: "#7eb8a0" }}>kaustav@portfolio</span>
            <span style={{ color: "#6b6560" }}>:~$</span>
            <span
              className="cursor-blink inline-block w-2 h-4 align-text-bottom"
              style={{ background: "#c8a97e" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
