"use client";

import { useState } from "react";
import { sideProjects, SideProject } from "@/data/sideProjects";
import Tag from "@/components/ui/Tag";
import LabProject from "./LabProject";
import ExplorerShell, { SidebarSection } from "@/components/os/ExplorerShell";

const SIDEBAR: SidebarSection[] = [
  {
    title: "Project Tasks",
    icon: "🔬",
    items: [
      { label: "View source code", icon: "💻" },
      { label: "Live demo", icon: "🌐" },
    ],
  },
  {
    title: "Other Places",
    icon: "📍",
    items: [
      { label: "WORK/", icon: "📁" },
      { label: "WRITING/", icon: "✍️" },
      { label: "Desktop", icon: "🖥️" },
    ],
  },
  {
    title: "Details",
    icon: "ℹ️",
    items: [
      { label: "Lab / Side Projects" },
      { label: `${sideProjects.length} experiments` },
      { label: "Design × Code × AI" },
    ],
  },
];

export default function LabFolder() {
  const [active, setActive] = useState<SideProject | null>(null);

  return (
    <ExplorerShell
      path={active ? `C:\\Portfolio\\Lab\\${active.title}` : "C:\\Portfolio\\Lab"}
      sidebarSections={SIDEBAR}
      onBack={active ? () => setActive(null) : undefined}
      statusText={active ? `1 object selected` : `${sideProjects.length} objects`}
    >
      {active ? (
        <LabProject project={active} onBack={() => setActive(null)} />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <div style={{ fontFamily: "Tahoma, var(--font-dm-sans), sans-serif", fontSize: 10, fontWeight: 700, color: "#000080", textTransform: "uppercase", letterSpacing: "0.08em", paddingBottom: 4, marginBottom: 4, borderBottom: "1px solid #d4d0c8" }}>
            Side Projects
          </div>

          {sideProjects.map((project) => (
            <button
              key={project.id}
              onClick={project.sections ? () => setActive(project) : undefined}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                padding: "5px 8px",
                textAlign: "left",
                background: "#fff",
                border: "1px solid #d4d0c8",
                cursor: project.sections ? "pointer" : "default",
              }}
              onMouseEnter={(e) => {
                if (project.sections) {
                  e.currentTarget.style.background = "#e3efff";
                  e.currentTarget.style.borderColor = "#316ac5";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.borderColor = "#d4d0c8";
              }}
            >
              <span style={{ fontSize: 22, lineHeight: 1, marginTop: 2, flexShrink: 0 }}>{project.emoji}</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#000", fontFamily: "Tahoma, var(--font-dm-sans), sans-serif" }}>
                    {project.title}
                  </span>
                  {project.badge && <Tag label={project.badge.label} variant={project.badge.variant} />}
                </div>
                <span style={{ fontFamily: "Tahoma, var(--font-dm-sans), sans-serif", fontSize: 10, color: "#555", lineHeight: 1.5 }}>
                  {project.subtitle}
                </span>
                {project.tags && (
                  <div style={{ display: "flex", gap: 3, flexWrap: "wrap", marginTop: 2 }}>
                    {project.tags.map((t) => (
                      <span key={t} style={{
                        fontFamily: "Tahoma, var(--font-dm-sans), sans-serif",
                        fontSize: 8,
                        background: "#e8eef8",
                        border: "1px solid #b0c0e0",
                        color: "#336",
                        padding: "1px 5px",
                      }}>{t}</span>
                    ))}
                  </div>
                )}
              </div>
              {project.sections && (
                <span style={{ color: "#000080", fontSize: 14, fontWeight: 700, flexShrink: 0, alignSelf: "center" }}>›</span>
              )}
            </button>
          ))}
        </div>
      )}
    </ExplorerShell>
  );
}
