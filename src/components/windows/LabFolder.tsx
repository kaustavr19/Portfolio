"use client";

import { sideProjects } from "@/data/sideProjects";
import Tag from "@/components/ui/Tag";
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
  return (
    <ExplorerShell
      path="C:\\Portfolio\\Lab"
      sidebarSections={SIDEBAR}
      statusText={`${sideProjects.length} objects`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <div style={{ fontFamily: "Tahoma, var(--font-dm-sans), sans-serif", fontSize: 10, fontWeight: 700, color: "#000080", textTransform: "uppercase", letterSpacing: "0.08em", paddingBottom: 4, marginBottom: 4, borderBottom: "1px solid #d4d0c8" }}>
          Side Projects
        </div>

        {sideProjects.map((project) => (
          <div
            key={project.id}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              padding: "5px 8px",
              background: "#fff",
              border: "1px solid #d4d0c8",
            }}
          >
            <span style={{ fontSize: 22, lineHeight: 1, marginTop: 2, flexShrink: 0 }}>{project.emoji}</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#000", fontFamily: "Tahoma, var(--font-dm-sans), sans-serif" }}>
                  {project.title}
                </span>
                {project.badge && <Tag label={project.badge.label} variant={project.badge.variant} />}
              </div>
              <span style={{ fontFamily: "Tahoma, var(--font-dm-sans), sans-serif", fontSize: 10, color: "#555", lineHeight: 1.5 }}>
                {project.subtitle}
              </span>
            </div>
          </div>
        ))}
      </div>
    </ExplorerShell>
  );
}
