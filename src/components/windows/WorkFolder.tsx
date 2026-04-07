"use client";

import { useState } from "react";
import { caseStudies, CaseStudy as CaseStudyType } from "@/data/projects";
import Tag from "@/components/ui/Tag";
import CaseStudy from "./CaseStudy";
import ExplorerShell, { SidebarSection } from "@/components/os/ExplorerShell";

const SIDEBAR: SidebarSection[] = [
  {
    title: "File and Folder Tasks",
    icon: "📋",
    items: [
      { label: "Open case study", icon: "📖" },
      { label: "Contact Kaustav", icon: "📧" },
    ],
  },
  {
    title: "Other Places",
    icon: "📍",
    items: [
      { label: "LAB/", icon: "🧪" },
      { label: "WRITING/", icon: "✍️" },
      { label: "ABOUT.exe", icon: "👤" },
      { label: "Desktop", icon: "🖥️" },
    ],
  },
  {
    title: "Details",
    icon: "ℹ️",
    items: [
      { label: "Work Folder" },
      { label: "3 case studies" },
      { label: "Fractal Analytics" },
      { label: "2023 – 2024" },
    ],
  },
];

export default function WorkFolder() {
  const [active, setActive] = useState<CaseStudyType | null>(null);

  return (
    <ExplorerShell
      path={active ? `C:\\Portfolio\\Work\\${active.title}` : "C:\\Portfolio\\Work"}
      sidebarSections={SIDEBAR}
      onBack={active ? () => setActive(null) : undefined}
      statusText={active ? `1 object selected` : `${caseStudies.length} objects`}
    >
      {active ? (
        <CaseStudy study={active} onBack={() => setActive(null)} />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <div style={{ fontFamily: "Tahoma, var(--font-dm-sans), sans-serif", fontSize: 10, fontWeight: 700, color: "#000080", textTransform: "uppercase", letterSpacing: "0.08em", paddingBottom: 4, marginBottom: 4, borderBottom: "1px solid #d4d0c8" }}>
            Case Studies
          </div>

          {caseStudies.map((study) => (
            <button
              key={study.id}
              onClick={() => setActive(study)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                padding: "5px 8px",
                textAlign: "left",
                background: "#fff",
                border: "1px solid #d4d0c8",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#e3efff"; e.currentTarget.style.borderColor = "#316ac5"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "#d4d0c8"; }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>📁</span>
                <div style={{ display: "flex", flexDirection: "column", gap: 1, minWidth: 0 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#000", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: "Tahoma, var(--font-dm-sans), sans-serif" }}>
                    {study.title}
                  </span>
                  <span style={{ fontFamily: "Tahoma, var(--font-dm-sans), sans-serif", fontSize: 10, color: "#555", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {study.subtitle}
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                <Tag label={study.tag.label} variant={study.tag.variant} />
                <span style={{ color: "#000080", fontSize: 14, fontWeight: 700 }}>›</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </ExplorerShell>
  );
}
