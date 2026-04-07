"use client";

import { useState } from "react";

export interface SidebarItem {
  label: string;
  icon?: string;
  action?: () => void;
}

export interface SidebarSection {
  title: string;
  icon: string;
  items: SidebarItem[];
}

interface Props {
  path: string;
  sidebarSections: SidebarSection[];
  onBack?: () => void;
  children: React.ReactNode;
  statusText?: string;
}

const MENU_ITEMS = ["File", "Edit", "View", "Favourites", "Tools", "Help"];

// XP Luna silver chrome toolbar button
function ToolbarBtn({
  label,
  icon,
  disabled = false,
  onClick,
  hasDropArrow,
}: {
  label: string;
  icon: string;
  disabled?: boolean;
  onClick?: () => void;
  hasDropArrow?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        height: 24,
        paddingLeft: 6,
        paddingRight: hasDropArrow ? 4 : 6,
        display: "flex",
        alignItems: "center",
        gap: 3,
        fontFamily: "Tahoma, var(--font-dm-sans), sans-serif",
        fontSize: 11,
        background: "none",
        border: "1px solid transparent",
        borderRadius: 2,
        color: disabled ? "#a0a0a0" : "#000",
        cursor: disabled ? "default" : "pointer",
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.background = "linear-gradient(to bottom, #f6f4ee, #dedad2)";
          e.currentTarget.style.borderColor = "#b0a898";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "none";
        e.currentTarget.style.borderColor = "transparent";
      }}
      aria-label={label}
      title={label}
    >
      <span style={{ fontSize: 14 }}>{icon}</span>
      <span>{label}</span>
      {hasDropArrow && <span style={{ fontSize: 8, marginLeft: 1 }}>▾</span>}
    </button>
  );
}

export default function ExplorerShell({ path, sidebarSections, onBack, children, statusText }: Props) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  // Sidebar section header: XP blue gradient
  function SidebarSectionHeader({ section }: { section: SidebarSection }) {
    const isCollapsed = collapsed[section.title];
    return (
      <div style={{ margin: "0 6px 6px 6px" }}>
        <button
          onClick={() => setCollapsed((c) => ({ ...c, [section.title]: !c[section.title] }))}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "4px 8px",
            background: "linear-gradient(135deg, #2254a4 0%, #3a6ccc 60%, #5888e8 100%)",
            border: "none",
            borderRadius: isCollapsed ? "4px" : "4px 4px 0 0",
            color: "#fff",
            fontFamily: "Tahoma, var(--font-dm-sans), sans-serif",
            fontSize: 11,
            fontWeight: 700,
            cursor: "pointer",
            textAlign: "left",
            boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ fontSize: 12 }}>{section.icon}</span>
            {section.title}
          </span>
          <span style={{ fontSize: 9, opacity: 0.9 }}>{isCollapsed ? "▶" : "▼"}</span>
        </button>

        {!isCollapsed && (
          <div
            style={{
              background: "#fff",
              borderLeft: "3px solid #316ac5",
              borderRight: "1px solid #c0d0e8",
              borderBottom: "1px solid #c0d0e8",
              borderRadius: "0 0 3px 3px",
              padding: "4px 0",
            }}
          >
            {section.items.map((item, i) => (
              <button
                key={i}
                onClick={item.action}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "3px 10px",
                  background: "none",
                  border: "none",
                  fontFamily: "Tahoma, var(--font-dm-sans), sans-serif",
                  fontSize: 11,
                  color: item.action ? "#316ac5" : "#444",
                  textDecoration: item.action ? "underline" : "none",
                  cursor: item.action ? "pointer" : "default",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => { if (item.action) e.currentTarget.style.color = "#c02020"; }}
                onMouseLeave={(e) => { if (item.action) e.currentTarget.style.color = "#316ac5"; }}
              >
                {item.icon && <span style={{ fontSize: 12, flexShrink: 0 }}>{item.icon}</span>}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>

      {/* ── Menu bar ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: 20,
          paddingLeft: 2,
          background: "#ece9d8",
          borderBottom: "1px solid #d4d0c8",
          flexShrink: 0,
        }}
      >
        {MENU_ITEMS.map((item) => (
          <button
            key={item}
            style={{
              fontFamily: "Tahoma, var(--font-dm-sans), sans-serif",
              fontSize: 11,
              padding: "1px 8px",
              background: "none",
              border: "1px solid transparent",
              color: "#000",
              cursor: "pointer",
              height: "100%",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#316ac5"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#1a4a9a"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#000"; e.currentTarget.style.borderColor = "transparent"; }}
          >
            {item}
          </button>
        ))}
        {/* XP flag — right aligned */}
        <div style={{ marginLeft: "auto", marginRight: 6, display: "flex", alignItems: "center" }}>
          <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden>
            <rect x="1" y="1" width="6" height="6" rx="1" fill="#e84c1c"/>
            <rect x="9" y="1" width="6" height="6" rx="1" fill="#7cc030"/>
            <rect x="1" y="9" width="6" height="6" rx="1" fill="#2264d6"/>
            <rect x="9" y="9" width="6" height="6" rx="1" fill="#f5c800"/>
          </svg>
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: 32,
          padding: "0 4px",
          gap: 1,
          background: "linear-gradient(to bottom, #f8f6f0, #e4e0d8)",
          borderBottom: "1px solid #c8c4bc",
          flexShrink: 0,
        }}
      >
        <ToolbarBtn label="Back" icon="🔙" disabled={!onBack} onClick={onBack} hasDropArrow={!!onBack} />
        <ToolbarBtn label="Forward" icon="▶" disabled />
        <div style={{ width: 1, height: 20, background: "#b8b0a8", margin: "0 2px" }} />
        <ToolbarBtn label="Up" icon="⬆" disabled />
        <div style={{ width: 1, height: 20, background: "#b8b0a8", margin: "0 2px" }} />
        <ToolbarBtn label="Search" icon="🔍" disabled />
        <ToolbarBtn label="Folders" icon="📂" disabled />
        <div style={{ width: 1, height: 20, background: "#b8b0a8", margin: "0 2px" }} />
        {/* Views dropdown */}
        <button
          disabled
          style={{ height: 24, padding: "0 6px", background: "none", border: "1px solid transparent", borderRadius: 2, cursor: "default", display: "flex", alignItems: "center", gap: 2 }}
          title="Views"
          aria-label="Views"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="1" y="1" width="5" height="5" fill="#7090c0" rx="0.5"/>
            <rect x="8" y="1" width="5" height="5" fill="#7090c0" rx="0.5"/>
            <rect x="1" y="8" width="5" height="5" fill="#7090c0" rx="0.5"/>
            <rect x="8" y="8" width="5" height="5" fill="#7090c0" rx="0.5"/>
          </svg>
          <span style={{ fontSize: 8, color: "#555" }}>▾</span>
        </button>
      </div>

      {/* ── Address bar ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: 26,
          padding: "0 6px",
          gap: 6,
          background: "#ece9d8",
          borderBottom: "2px solid #b8b4ac",
          flexShrink: 0,
        }}
      >
        <span style={{ fontFamily: "Tahoma, var(--font-dm-sans), sans-serif", fontSize: 11, color: "#555", whiteSpace: "nowrap" }}>
          Address
        </span>
        <div
          style={{
            flex: 1,
            height: 20,
            background: "#fff",
            border: "2px inset #707070",
            display: "flex",
            alignItems: "center",
            paddingLeft: 4,
            paddingRight: 4,
            gap: 4,
            overflow: "hidden",
          }}
        >
          <span style={{ fontSize: 13, flexShrink: 0 }}>📁</span>
          <span style={{ fontFamily: "Tahoma, var(--font-dm-sans), sans-serif", fontSize: 11, color: "#000", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {path}
          </span>
        </div>
        <button
          disabled
          style={{
            height: 20,
            paddingLeft: 10,
            paddingRight: 10,
            fontFamily: "Tahoma, var(--font-dm-sans), sans-serif",
            fontSize: 11,
            background: "linear-gradient(to bottom, #7cc030, #5aa018)",
            border: "1px solid #3a8008",
            borderRadius: 2,
            color: "#fff",
            fontWeight: 700,
            cursor: "default",
          }}
        >
          Go
        </button>
      </div>

      {/* ── Main area: sidebar + content ── */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* Sidebar */}
        <div
          style={{
            width: 180,
            flexShrink: 0,
            background: "#d5e3f7",
            borderRight: "1px solid #b8d0ec",
            overflowY: "auto",
            paddingTop: 8,
            paddingBottom: 8,
          }}
        >
          {sidebarSections.map((section) => (
            <SidebarSectionHeader key={section.title} section={section} />
          ))}
        </div>

        {/* Content area */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            background: "#fff",
            padding: "8px",
          }}
        >
          {children}
        </div>
      </div>

      {/* ── Status bar ── */}
      <div
        style={{
          height: 22,
          paddingLeft: 10,
          paddingRight: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#ece9d8",
          borderTop: "1px solid #d4d0c8",
          flexShrink: 0,
        }}
      >
        <span style={{ fontFamily: "Tahoma, var(--font-dm-sans), sans-serif", fontSize: 11, color: "#333" }}>
          {statusText || "Ready"}
        </span>
        <div style={{ display: "flex", gap: 1 }}>
          <div style={{ width: 80, height: 14, border: "1px inset #b0a898", background: "#ece9d8" }} />
          <div style={{ width: 60, height: 14, border: "1px inset #b0a898", background: "#ece9d8" }} />
        </div>
      </div>

    </div>
  );
}
