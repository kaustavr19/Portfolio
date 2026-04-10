"use client";

import { SideProject } from "@/data/sideProjects";
import Tag from "@/components/ui/Tag";

interface Props {
  project: SideProject;
  onBack: () => void;
}

const h3Style: React.CSSProperties = {
  fontFamily: "Tahoma, var(--font-dm-sans), sans-serif",
  fontSize: 10,
  fontWeight: 700,
  color: "#000080",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  paddingBottom: 4,
  marginBottom: 6,
  borderBottom: "1px solid #d4d0c8",
};

export default function LabProject({ project, onBack }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

      {/* Back link */}
      <button
        onClick={onBack}
        style={{
          alignSelf: "flex-start",
          fontFamily: "Tahoma, var(--font-dm-sans), sans-serif",
          fontSize: 11,
          color: "#316ac5",
          textDecoration: "underline",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        ← Back to LAB/
      </button>

      {/* Header */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, borderBottom: "2px solid #316ac5", paddingBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
          <span style={{ fontSize: 28, lineHeight: 1 }}>{project.emoji}</span>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <h2 style={{ fontFamily: "Tahoma, var(--font-dm-sans), sans-serif", fontSize: 16, fontWeight: 700, color: "#000080", lineHeight: 1.2, margin: 0 }}>
                {project.title}
              </h2>
              {project.badge && <Tag label={project.badge.label} variant={project.badge.variant} />}
            </div>
            <p style={{ fontFamily: "Tahoma, var(--font-dm-sans), sans-serif", fontSize: 10, color: "#555", margin: 0 }}>
              {project.subtitle}
            </p>
          </div>
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", paddingTop: 4 }}>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "Tahoma, var(--font-dm-sans), sans-serif",
                fontSize: 10,
                color: "#316ac5",
                textDecoration: "underline",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              🌐 Live Demo
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "Tahoma, var(--font-dm-sans), sans-serif",
                fontSize: 10,
                color: "#316ac5",
                textDecoration: "underline",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              💻 View Source
            </a>
          )}
        </div>

        {/* Tags */}
        {project.tags && (
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {project.tags.map((t) => (
              <span key={t} style={{
                fontFamily: "Tahoma, var(--font-dm-sans), sans-serif",
                fontSize: 9,
                background: "#e8eef8",
                border: "1px solid #b0c0e0",
                color: "#336",
                padding: "1px 6px",
              }}>{t}</span>
            ))}
          </div>
        )}
      </div>

      {/* Description */}
      {project.description && (
        <p style={{ fontFamily: "Tahoma, var(--font-dm-sans), sans-serif", fontSize: 12, lineHeight: 1.6, color: "#222", margin: 0 }}>
          {project.description}
        </p>
      )}

      {/* Sections */}
      {project.sections && project.sections.map((section) => (
        <div key={section.title} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={h3Style}>{section.title}</div>
          {section.blocks.map((block, i) => {
            if (block.type === "paragraph") return (
              <p key={i} style={{ fontFamily: "Tahoma, var(--font-dm-sans), sans-serif", fontSize: 11, lineHeight: 1.65, color: "#222", margin: 0 }}>
                {block.text}
              </p>
            );
            if (block.type === "heading") return (
              <p key={i} style={{ fontFamily: "Tahoma, var(--font-dm-sans), sans-serif", fontSize: 11, fontWeight: 700, color: "#000080", margin: "4px 0 0" }}>
                {block.text}
              </p>
            );
            if (block.type === "bullets") return (
              <ul key={i} style={{ margin: "0 0 0 16px", padding: 0, display: "flex", flexDirection: "column", gap: 4 }}>
                {block.items.map((item, j) => (
                  <li key={j} style={{ fontFamily: "Tahoma, var(--font-dm-sans), sans-serif", fontSize: 11, lineHeight: 1.6, color: "#222" }}>
                    {item}
                  </li>
                ))}
              </ul>
            );
            if (block.type === "callout") return (
              <div key={i} style={{ background: "#fff8e8", borderLeft: "3px solid #c8a000", padding: "10px 14px", display: "flex", flexDirection: "column", gap: 4 }}>
                {block.label && (
                  <span style={{ fontFamily: "Tahoma, var(--font-dm-sans), sans-serif", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#806000" }}>
                    {block.label}
                  </span>
                )}
                <p style={{ fontFamily: "Tahoma, var(--font-dm-sans), sans-serif", fontSize: 11, lineHeight: 1.65, color: "#5a3800", margin: 0, fontStyle: "italic" }}>
                  {block.text}
                </p>
              </div>
            );
            if (block.type === "kpi-row") return (
              <div key={i} style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {block.items.map((item, j) => (
                  <div key={j} style={{ flex: 1, minWidth: 80, background: "#f0f4ff", border: "1px solid #c0c8e8", padding: "8px 10px", textAlign: "center" }}>
                    <div style={{ fontFamily: "Tahoma, var(--font-dm-sans), sans-serif", fontSize: 14, fontWeight: 700, color: "#000080" }}>{item.value}</div>
                    <div style={{ fontFamily: "Tahoma, var(--font-dm-sans), sans-serif", fontSize: 9, color: "#555", lineHeight: 1.4 }}>{item.label}</div>
                  </div>
                ))}
              </div>
            );
            return null;
          })}
        </div>
      ))}
    </div>
  );
}
