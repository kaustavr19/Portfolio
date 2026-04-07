"use client";

import { useState, useRef, useCallback } from "react";
import { WindowId } from "@/hooks/useWindowManager";
import {
  FolderIcon, FlaskIcon, WritingIcon, DocumentIcon,
  PersonIcon, MonitorIcon, GalleryIcon,
} from "./RetroIcons";

interface IconDef {
  id: WindowId;
  label: string;
  ariaLabel: string;
}

const ICONS: IconDef[] = [
  { id: "work",     label: "WORK/",      ariaLabel: "Open Work folder — case studies" },
  { id: "lab",      label: "LAB/",       ariaLabel: "Open Lab folder — side projects" },
  { id: "writing",  label: "WRITING/",   ariaLabel: "Open Writing folder — articles" },
  { id: "readme",   label: "README.txt", ariaLabel: "Open README in Notepad" },
  { id: "about",    label: "ABOUT.exe",  ariaLabel: "Open About application" },
  { id: "terminal", label: "TERMINAL",   ariaLabel: "Open Terminal — interactive CV" },
  { id: "gallery",  label: "GALLERY",    ariaLabel: "Open Gallery — photography" },
];

const SVG_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  work:     FolderIcon,
  lab:      FlaskIcon,
  writing:  WritingIcon,
  readme:   DocumentIcon,
  about:    PersonIcon,
  terminal: MonitorIcon,
  gallery:  GalleryIcon,
};

interface Props {
  onOpen: (id: WindowId) => void;
  // Ref so Desktop can call clearSelection without re-render coupling
  clearSelectionRef?: React.MutableRefObject<(() => void) | null>;
}

export default function IconGrid({ onOpen, clearSelectionRef }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Expose clearSelection to parent (Desktop) via ref
  const clearSelection = useCallback(() => {
    setSelectedId(null);
    setFocusedIndex(null);
  }, []);
  if (clearSelectionRef) clearSelectionRef.current = clearSelection;

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      const total = ICONS.length;
      let next: number | null = null;

      if (e.key === "ArrowRight" || e.key === "ArrowDown") next = Math.min(index + 1, total - 1);
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = Math.max(index - 1, 0);
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = total - 1;
      else if (e.key === "Enter" || e.key === " ") {
        onOpen(ICONS[index].id);
        e.preventDefault();
        return;
      } else if (e.key === "Escape") {
        setSelectedId(null);
        return;
      }

      if (next !== null) {
        e.preventDefault();
        setFocusedIndex(next);
        const buttons = gridRef.current?.querySelectorAll<HTMLButtonElement>("[data-icon-btn]");
        buttons?.[next]?.focus();
      }
    },
    [onOpen]
  );

  return (
    <div
      ref={gridRef}
      role="grid"
      aria-label="Desktop icons"
      style={{
        position: "absolute",
        top: 16,
        left: 16,
        display: "grid",
        gap: 4,
        gridTemplateColumns: "80px",
      }}
    >
      {ICONS.map((icon, index) => {
        const IconSvg = SVG_MAP[icon.id];
        const isSelected = selectedId === icon.id;
        const isFocused = focusedIndex === index;

        return (
          <div key={icon.id} role="gridcell" style={{ position: "relative" }}>
            <button
              data-icon-btn
              role="gridcell"
              className="group flex flex-col items-center gap-1 focus:outline-none"
              style={{
                width: 76,
                padding: "4px 2px",
                background: isSelected ? "rgba(0,0,128,0.35)" : "transparent",
                border: "none",
                cursor: "pointer",
                ...(isFocused ? { outline: "1px dotted #fff" } : {}),
              }}
              aria-label={icon.ariaLabel}
              aria-selected={isSelected}
              tabIndex={index === 0 ? 0 : -1}
              onClick={(e) => {
                e.stopPropagation(); // don't bubble to desktop
                setSelectedId(icon.id);
              }}
              onDoubleClick={(e) => {
                e.stopPropagation();
                onOpen(icon.id);
              }}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onFocus={() => setFocusedIndex(index)}
            >
              {/* Icon — transparent SVG on wallpaper */}
              <div
                style={{
                  width: 48, height: 48,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  filter: "drop-shadow(1px 1px 1px rgba(0,0,0,0.5))",
                }}
              >
                {IconSvg && <IconSvg className="w-10 h-10" />}
              </div>

              {/* Label */}
              <span
                style={{
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: 9,
                  textAlign: "center",
                  lineHeight: 1.3,
                  padding: "1px 3px",
                  color: "#fff",
                  background: isSelected ? "#000080" : "transparent",
                  textShadow: !isSelected
                    ? "1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000"
                    : "none",
                }}
              >
                {icon.label}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
