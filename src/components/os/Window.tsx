"use client";

import React, { useId, useState, createContext, useContext } from "react";
import { motion } from "framer-motion";
import { useDraggable } from "@/hooks/useDraggable";
import { WindowId } from "@/hooks/useWindowManager";

// Context so child components (ExplorerShell) can know if the window is maximized
export const WindowMaximizedCtx = createContext(false);
export const useWindowMaximized = () => useContext(WindowMaximizedCtx);

interface WindowProps {
  id: WindowId;
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  isMinimised: boolean;
  zIndex: number;
  defaultPosition: { x: number; y: number };
  defaultWidth?: number;
  defaultMaximized?: boolean;
  noPadding?: boolean;
  onClose: (id: WindowId) => void;
  onMinimise: (id: WindowId) => void;
  onFocus: (id: WindowId) => void;
}

// XP-style control button base
function ControlBtn({
  onClick,
  ariaLabel,
  gradient,
  border,
  children,
}: {
  onClick: () => void;
  ariaLabel: string;
  gradient: string;
  border: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      aria-label={ariaLabel}
      style={{
        width: 21, height: 18,
        background: gradient,
        border: `1px solid ${border}`,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.3)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", borderRadius: 3,
        position: "relative", overflow: "hidden",
      }}
    >
      <div aria-hidden style={{ position: "absolute", top: 1, left: 1, right: 1, height: 7, background: "linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(255,255,255,0.1))", borderRadius: 2, pointerEvents: "none" }} />
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
    </button>
  );
}

export default function Window({
  id,
  title,
  children,
  isOpen,
  isMinimised,
  zIndex,
  defaultPosition,
  defaultWidth = 820,
  defaultMaximized = false,
  noPadding = false,
  onClose,
  onMinimise,
  onFocus,
}: WindowProps) {
  const { setNodeRef, onMouseDown } = useDraggable(defaultPosition);
  const titleId = useId();
  const [isMaximized, setIsMaximized] = useState(defaultMaximized);

  if (!isOpen || isMinimised) return null;

  const maximizedStyle: React.CSSProperties = {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 40,
    width: "auto",
    maxWidth: "none",
    zIndex,
  };

  const normalStyle: React.CSSProperties = {
    position: "fixed",
    zIndex,
    width: defaultWidth,
    maxWidth: "calc(100vw - 32px)",
  };

  return (
    <WindowMaximizedCtx.Provider value={isMaximized}>
      <motion.div
          key={id}
          ref={isMaximized ? undefined : setNodeRef}
          initial={{ scale: 0.97, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.12 }}
          style={{
            ...(isMaximized ? maximizedStyle : normalStyle),
            background: "#ece9d8",
            border: "2px solid #0a246a",
            boxShadow: "2px 2px 8px rgba(0,0,0,0.4)",
            display: "flex",
            flexDirection: "column",
          }}
          role="dialog"
          aria-labelledby={titleId}
          aria-modal="false"
          onMouseDown={() => onFocus(id)}
          onKeyDown={(e) => { if (e.key === "Escape") { if (isMaximized) setIsMaximized(false); else onClose(id); } }}
          tabIndex={-1}
        >
          {/* ── XP titlebar ── */}
          <div
            className="titlebar-drag select-none"
            onMouseDown={isMaximized ? undefined : onMouseDown}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              height: 30,
              padding: "0 6px",
              gap: 4,
              background: "linear-gradient(to bottom, #94c4f8 0%, #4e98ec 12%, #2674da 30%, #1254bc 60%, #0c40a0 88%, #1252b8 100%)",
              borderBottom: "1px solid #082a80",
              overflow: "hidden",
              flexShrink: 0,
              cursor: isMaximized ? "default" : "grab",
            }}
          >
            {/* Gloss */}
            <div aria-hidden style={{ position: "absolute", top: 1, left: 0, right: 0, height: 10, background: "linear-gradient(to bottom, rgba(255,255,255,0.35), rgba(255,255,255,0.05))", pointerEvents: "none" }} />

            {/* XP flag icon */}
            <svg width="12" height="12" viewBox="0 0 16 16" aria-hidden style={{ flexShrink: 0, zIndex: 1 }}>
              <rect x="1" y="1" width="6" height="6" rx="1" fill="#e84c1c"/>
              <rect x="9" y="1" width="6" height="6" rx="1" fill="#7cc030"/>
              <rect x="1" y="9" width="6" height="6" rx="1" fill="#2264d6"/>
              <rect x="9" y="9" width="6" height="6" rx="1" fill="#f5c800"/>
            </svg>

            {/* Title */}
            <div
              id={titleId}
              style={{
                flex: 1,
                fontFamily: "Tahoma, var(--font-jetbrains), monospace",
                fontSize: 11,
                fontWeight: 700,
                color: "#fff",
                textShadow: "1px 1px 2px rgba(0,0,0,0.6)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                pointerEvents: "none",
                userSelect: "none",
                zIndex: 1,
              }}
            >
              {title}
            </div>

            {/* Control buttons: Minimise · Maximise/Restore · Close */}
            <div style={{ display: "flex", gap: 2, flexShrink: 0, zIndex: 1 }}>
              {/* Minimise */}
              <ControlBtn
                onClick={() => onMinimise(id)}
                ariaLabel={`Minimise ${title}`}
                gradient="linear-gradient(to bottom, #78c0ff 0%, #4898f0 30%, #2070d0 60%, #3880e0 100%)"
                border="#0a3a9a"
              >
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <line x1="1" y1="6" x2="7" y2="6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </ControlBtn>

              {/* Maximise / Restore */}
              <ControlBtn
                onClick={() => setIsMaximized((v) => !v)}
                ariaLabel={isMaximized ? `Restore ${title}` : `Maximise ${title}`}
                gradient="linear-gradient(to bottom, #78c0ff 0%, #4898f0 30%, #2070d0 60%, #3880e0 100%)"
                border="#0a3a9a"
              >
                {isMaximized ? (
                  // Restore icon: two overlapping squares
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <rect x="2" y="0" width="7" height="6" rx="0.5" stroke="#fff" strokeWidth="1.2"/>
                    <rect x="0" y="2" width="7" height="6" rx="0.5" fill="#2070d0" stroke="#fff" strokeWidth="1.2"/>
                  </svg>
                ) : (
                  // Maximize icon: single square
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <rect x="0.5" y="0.5" width="7" height="7" rx="0.5" stroke="#fff" strokeWidth="1.2"/>
                    <line x1="0.5" y1="2" x2="7.5" y2="2" stroke="#fff" strokeWidth="1.2"/>
                  </svg>
                )}
              </ControlBtn>

              {/* Close */}
              <ControlBtn
                onClick={() => onClose(id)}
                ariaLabel={`Close ${title}`}
                gradient="linear-gradient(to bottom, #ff8a70 0%, #f04030 30%, #c82020 60%, #e03828 100%)"
                border="#800808"
              >
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <line x1="1" y1="1" x2="7" y2="7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="7" y1="1" x2="1" y2="7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </ControlBtn>
            </div>
          </div>

          {/* Content */}
          <div
            role="document"
            style={{
              flex: 1,
              overflow: "auto",
              background: "#fff",
              padding: noPadding ? 0 : "16px 18px",
              minHeight: isMaximized ? 0 : noPadding ? 400 : 380,
              maxHeight: isMaximized ? "none" : noPadding ? 520 : 500,
            }}
          >
            {children}
          </div>
      </motion.div>
    </WindowMaximizedCtx.Provider>
  );
}
