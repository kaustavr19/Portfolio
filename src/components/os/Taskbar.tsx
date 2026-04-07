"use client";

import { useEffect, useState } from "react";
import { WindowState, WindowId } from "@/hooks/useWindowManager";
import AccessibilityPanel from "./AccessibilityPanel";
import StartMenu from "./StartMenu";

interface Props {
  openWindows: WindowState[];
  activeId?: WindowId;
  onWindowClick: (id: WindowId) => void;
  onOpen: (id: WindowId) => void;
}

/** Unique K/OS logo mark for the start button */
function KOSLogo() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden style={{ flexShrink: 0, position: "relative", zIndex: 1 }}>
      {/* Outer circle */}
      <circle cx="11" cy="11" r="10" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1"/>
      {/* K glyph */}
      <line x1="7" y1="5" x2="7" y2="17" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
      <line x1="7" y1="11" x2="15" y2="5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
      <line x1="7" y1="11" x2="15" y2="17" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export default function Taskbar({ openWindows, activeId, onWindowClick, onOpen }: Props) {
  const [time, setTime] = useState("");
  const [showA11y, setShowA11y] = useState(false);
  const [showStart, setShowStart] = useState(false);

  useEffect(() => {
    function tick() {
      const now = new Date();
      setTime(`${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`);
    }
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);

  const visibleWindows = openWindows.filter((w) => !w.isMinimised);

  return (
    <>
      {showStart && (
        <StartMenu
          onOpen={onOpen}
          onClose={() => setShowStart(false)}
        />
      )}
      {showA11y && <AccessibilityPanel onClose={() => setShowA11y(false)} />}

      <nav
        role="toolbar"
        aria-label="Open applications"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: 40,
          display: "flex",
          alignItems: "center",
          paddingLeft: 4,
          paddingRight: 4,
          gap: 4,
          zIndex: 9000,
          background: "linear-gradient(to bottom, #3a7cd8 0%, #2264d6 6%, #1b52c2 18%, #1b52c2 80%, #1648b0 94%, #1040a0 100%)",
          borderTop: "1px solid #082a80",
          boxShadow: "inset 0 2px 0 #6098e8, inset 0 1px 0 rgba(255,255,255,0.3)",
          overflow: "hidden",
        }}
      >
        {/* ── Start button with K/OS logo ── */}
        <button
          aria-label="Open start menu"
          aria-expanded={showStart}
          onClick={() => { setShowStart((v) => !v); setShowA11y(false); }}
          style={{
            height: 34,
            paddingLeft: 10,
            paddingRight: 14,
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: showStart
              ? "linear-gradient(to bottom, #3aaa18 0%, #50c028 50%, #78d848 100%)"
              : "linear-gradient(to bottom, #78d848 0%, #50c028 25%, #3aaa18 50%, #48b828 75%, #58c830 100%)",
            border: "1px solid #1a6808",
            borderRadius: 13,
            boxShadow: showStart
              ? "inset 0 2px 3px rgba(0,0,0,0.3)"
              : "inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(0,0,0,0.25), 0 1px 3px rgba(0,0,0,0.5)",
            color: "#fff",
            fontFamily: "Tahoma, var(--font-jetbrains), monospace",
            fontWeight: 700,
            fontSize: 12,
            cursor: "pointer",
            flexShrink: 0,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {!showStart && (
            <div aria-hidden style={{ position: "absolute", top: 1, left: 6, right: 6, height: 14, background: "linear-gradient(to bottom, rgba(255,255,255,0.45), rgba(255,255,255,0.05))", borderRadius: 8, pointerEvents: "none" }}/>
          )}
          <KOSLogo />
          <span style={{ position: "relative", zIndex: 1, textShadow: "1px 1px 1px rgba(0,0,0,0.4)" }}>start</span>
        </button>

        {/* Separator */}
        <div style={{ width: 1, height: 28, background: "#0a3a9a", boxShadow: "1px 0 0 #4a70c8", flexShrink: 0 }} role="separator" />

        {/* Open window buttons */}
        <div role="group" aria-label="Open windows" style={{ display: "flex", gap: 3, flex: 1, overflow: "hidden", alignItems: "center" }}>
          {visibleWindows.map((w) => {
            const isActive = activeId === w.id;
            return (
              <button
                key={w.id}
                onClick={() => onWindowClick(w.id)}
                aria-pressed={isActive}
                aria-label={`Switch to ${w.title}`}
                style={{
                  height: 26,
                  paddingLeft: 8,
                  paddingRight: 8,
                  maxWidth: 140,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  fontFamily: "Tahoma, var(--font-jetbrains), monospace",
                  fontSize: 10,
                  fontWeight: isActive ? 700 : 400,
                  cursor: "pointer",
                  color: "#fff",
                  background: isActive
                    ? "linear-gradient(to bottom, #1442a8 0%, #1b52c2 100%)"
                    : "linear-gradient(to bottom, #2060cc 0%, #3070d8 100%)",
                  border: isActive ? "1px solid #0a3a9a" : "1px solid #4a80e0",
                  boxShadow: isActive
                    ? "inset 1px 1px 0 rgba(0,0,0,0.3)"
                    : "inset 0 1px 0 #6098e8",
                  borderRadius: 3,
                }}
              >
                {w.title}
              </button>
            );
          })}
        </div>

        {/* System tray */}
        <div
          style={{
            height: 28,
            paddingLeft: 8,
            paddingRight: 8,
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "linear-gradient(to bottom, #1040a8 0%, #1848b8 100%)",
            border: "1px solid #0a3a9a",
            boxShadow: "inset 1px 1px 0 rgba(0,0,0,0.3)",
            borderRadius: 2,
            flexShrink: 0,
          }}
        >
          <button
            onClick={() => { setShowA11y((v) => !v); setShowStart(false); }}
            aria-label="Open accessibility settings"
            aria-expanded={showA11y}
            title="Accessibility settings"
            style={{
              color: showA11y ? "#fff" : "#c8e0ff",
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: 13,
              background: showA11y ? "rgba(255,255,255,0.2)" : "none",
              border: "none",
              cursor: "pointer",
              padding: "0 2px",
              borderRadius: 2,
              lineHeight: 1,
            }}
          >
            ♿
          </button>
          <div style={{ width: 1, height: 16, background: "#0a3a9a" }} role="separator" />
          <time
            style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: 10, color: "#c8e0ff", fontVariantNumeric: "tabular-nums" }}
            dateTime={time}
            aria-label={`Current time: ${time}`}
          >
            {time}
          </time>
        </div>
      </nav>
    </>
  );
}
