"use client";

import { useEffect, useRef, useState } from "react";
import { WindowId } from "@/hooks/useWindowManager";

interface Props {
  onOpen: (id: WindowId) => void;
  onClose: () => void;
}

interface MenuItem {
  label: string;
  sub?: string;
  icon: string;
  id?: WindowId;
  separator?: boolean;
}

const PINNED: MenuItem[] = [
  { label: "Internet Explorer",    icon: "🌐", sub: "Portfolio Browser" },
  { label: "Outlook Express",      icon: "📧", sub: "Email Client" },
];

const APPS: MenuItem[] = [
  { label: "WORK/",       icon: "📁", id: "work",     sub: "Case Studies" },
  { label: "LAB/",        icon: "🧪", id: "lab",      sub: "Side Projects" },
  { label: "WRITING/",    icon: "✍️",  id: "writing",  sub: "Articles & Essays" },
  { label: "ABOUT.exe",   icon: "👤", id: "about",    sub: "Profile & Info" },
  { label: "TERMINAL",    icon: "🖥️", id: "terminal", sub: "Interactive CV" },
  { label: "GALLERY",     icon: "🖼️", id: "gallery",  sub: "Photography" },
  { label: "README.txt",  icon: "📄", id: "readme",   sub: "Notepad" },
];

const SYSTEM: MenuItem[] = [
  { label: "My Documents",   icon: "📂" },
  { label: "My Pictures",    icon: "🖼️" },
  { label: "My Computer",    icon: "💻" },
  { label: "Control Panel",  icon: "⚙️" },
  { separator: true, label: "", icon: "" },
  { label: "Help and Support", icon: "❓" },
  { label: "Search",           icon: "🔍" },
  { label: "Run…",             icon: "▶" },
];

function UserBanner() {
  return (
    <div
      style={{
        background: "linear-gradient(to right, #1a5cc8 0%, #2264d6 60%, #4080e0 100%)",
        padding: "8px 12px",
        display: "flex",
        alignItems: "center",
        gap: 10,
        borderBottom: "2px solid #0a3a9a",
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: 40, height: 40,
          background: "#fff",
          border: "2px solid #6098e8",
          borderRadius: 2,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22, flexShrink: 0,
        }}
      >
        👤
      </div>
      <div>
        <div style={{ fontFamily: "Tahoma, sans-serif", fontSize: 13, fontWeight: 700, color: "#fff", textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}>
          Kaustav
        </div>
        <div style={{ fontFamily: "Tahoma, sans-serif", fontSize: 10, color: "#c8e0ff" }}>
          Senior UX Designer
        </div>
      </div>
    </div>
  );
}

function MenuRow({ item, onClick, compact }: { item: MenuItem; onClick?: () => void; compact?: boolean }) {
  const [hovered, setHovered] = useState(false);

  if (item.separator) {
    return <div style={{ height: 1, background: "#d4d0c8", margin: "3px 0" }} />;
  }
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: compact ? "3px 10px" : "4px 12px",
        background: hovered ? "#316ac5" : "none",
        border: "none",
        cursor: onClick ? "pointer" : "default",
        textAlign: "left",
      }}
    >
      <span style={{ fontSize: compact ? 16 : 20, flexShrink: 0, width: compact ? 20 : 24, textAlign: "center" }}>{item.icon}</span>
      <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
        <span style={{ fontFamily: "Tahoma, sans-serif", fontSize: compact ? 11 : 12, fontWeight: 600, color: hovered ? "#fff" : "#000", whiteSpace: "nowrap" }}>
          {item.label}
        </span>
        {item.sub && (
          <span style={{ fontFamily: "Tahoma, sans-serif", fontSize: 9, color: hovered ? "#c8e0ff" : "#666" }}>{item.sub}</span>
        )}
      </div>
    </button>
  );
}

export default function StartMenu({ onOpen, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    // slight delay so the start-button click doesn't immediately close
    const t = setTimeout(() => document.addEventListener("mousedown", handler), 50);
    return () => { clearTimeout(t); document.removeEventListener("mousedown", handler); };
  }, [onClose]);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        bottom: 40,
        left: 0,
        width: 380,
        zIndex: 9100,
        border: "2px solid #0a246a",
        boxShadow: "4px 4px 12px rgba(0,0,0,0.5)",
        display: "flex",
        flexDirection: "column",
        background: "#ece9d8",
      }}
      role="menu"
      aria-label="Start menu"
    >
      {/* User banner */}
      <UserBanner />

      {/* Two-column body */}
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>

        {/* Left column — pinned + apps */}
        <div
          style={{
            flex: 1,
            background: "#fff",
            borderRight: "1px solid #d4d0c8",
            display: "flex",
            flexDirection: "column",
            paddingTop: 4,
            paddingBottom: 4,
            overflow: "hidden",
          }}
        >
          {/* Pinned (greyed out — decorative) */}
          {PINNED.map((item) => (
            <MenuRow key={item.label} item={item} />
          ))}
          <div style={{ height: 1, background: "#d4d0c8", margin: "4px 0" }} />
          {/* Portfolio apps */}
          {APPS.map((item) => (
            <MenuRow
              key={item.label}
              item={item}
              onClick={item.id ? () => { onOpen(item.id!); onClose(); } : undefined}
            />
          ))}
        </div>

        {/* Right column — system places */}
        <div
          style={{
            width: 160,
            background: "#d5e3f7",
            borderLeft: "1px solid #b8d0ec",
            display: "flex",
            flexDirection: "column",
            paddingTop: 6,
            paddingBottom: 6,
          }}
        >
          <div style={{ fontFamily: "Tahoma, sans-serif", fontSize: 9, fontWeight: 700, color: "#316ac5", padding: "0 10px 4px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            My Computer
          </div>
          {SYSTEM.map((item, i) => (
            <MenuRow key={i} item={item} compact />
          ))}
        </div>
      </div>

      {/* Footer — Log Off / Turn Off */}
      <div
        style={{
          background: "linear-gradient(to bottom, #1a5cc8 0%, #1040a0 100%)",
          display: "flex",
          justifyContent: "flex-end",
          gap: 6,
          padding: "6px 10px",
          borderTop: "2px solid #0a3a9a",
        }}
      >
        {[
          { label: "Log Off", icon: "🔓" },
          { label: "Turn Off Computer", icon: "⏻" },
        ].map(({ label, icon }) => (
          <button
            key={label}
            style={{
              fontFamily: "Tahoma, sans-serif",
              fontSize: 11,
              fontWeight: 700,
              color: "#fff",
              textShadow: "1px 1px 1px rgba(0,0,0,0.4)",
              background: "linear-gradient(to bottom, #4a80e0, #2060c8)",
              border: "1px solid #0a3a9a",
              borderRadius: 2,
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3)",
              padding: "3px 10px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
            onClick={onClose}
          >
            <span>{icon}</span> {label}
          </button>
        ))}
      </div>
    </div>
  );
}
