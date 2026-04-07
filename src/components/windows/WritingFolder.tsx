"use client";

import { articles } from "@/data/writing";
import ExplorerShell, { SidebarSection } from "@/components/os/ExplorerShell";

const SIDEBAR: SidebarSection[] = [
  {
    title: "Article Tasks",
    icon: "📝",
    items: [
      { label: "Read article", icon: "👁️" },
      { label: "View on Medium", icon: "🔗" },
    ],
  },
  {
    title: "Other Places",
    icon: "📍",
    items: [
      { label: "WORK/", icon: "📁" },
      { label: "LAB/", icon: "🧪" },
      { label: "Desktop", icon: "🖥️" },
    ],
  },
  {
    title: "Details",
    icon: "ℹ️",
    items: [
      { label: "Writing Archive" },
      { label: `${articles.length} articles` },
      { label: "Design · AI · HCI" },
    ],
  },
];

export default function WritingFolder() {
  return (
    <ExplorerShell
      path="C:\\Portfolio\\Writing"
      sidebarSections={SIDEBAR}
      statusText={`${articles.length} objects`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <div style={{ fontFamily: "Tahoma, var(--font-dm-sans), sans-serif", fontSize: 10, fontWeight: 700, color: "#000080", textTransform: "uppercase", letterSpacing: "0.08em", paddingBottom: 4, marginBottom: 4, borderBottom: "1px solid #d4d0c8" }}>
          Writing
        </div>

        {articles.map((article) => (
          <div
            key={article.id}
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: 4,
              padding: "6px 8px 6px 12px",
              background: "#fff",
              border: "1px solid #d4d0c8",
              overflow: "hidden",
            }}
          >
            {article.featured && (
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: "#316ac5" }} />
            )}
            <h3 style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.4, color: "#000", fontFamily: "Tahoma, var(--font-dm-sans), sans-serif" }}>
              {article.title}
            </h3>
            <p style={{ fontFamily: "Tahoma, var(--font-dm-sans), sans-serif", fontSize: 10, lineHeight: 1.5, color: "#555" }}>
              {article.tags}
            </p>
          </div>
        ))}
      </div>
    </ExplorerShell>
  );
}
