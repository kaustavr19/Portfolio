"use client";

import { CaseStudy as CaseStudyType } from "@/data/projects";
import Tag from "@/components/ui/Tag";
import MetricCard from "@/components/ui/MetricCard";
import ProcessStep from "@/components/ui/ProcessStep";

interface Props {
  study: CaseStudyType;
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

export default function CaseStudy({ study, onBack }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

      {/* Breadcrumb / back link — also accessible via toolbar Back button */}
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
        ← Back to WORK/
      </button>

      {/* Header */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4, borderBottom: "2px solid #316ac5", paddingBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8, flexWrap: "wrap" }}>
          <h2 style={{ fontFamily: "Tahoma, var(--font-dm-sans), sans-serif", fontSize: 16, fontWeight: 700, color: "#000080", lineHeight: 1.3, flex: 1 }}>
            {study.title}
          </h2>
          <Tag label={study.tag.label} variant={study.tag.variant} />
        </div>
        <p style={{ fontFamily: "Tahoma, var(--font-dm-sans), sans-serif", fontSize: 10, color: "#555" }}>
          {study.subtitle}
        </p>
      </div>

      {/* Description */}
      <p style={{ fontFamily: "Tahoma, var(--font-dm-sans), sans-serif", fontSize: 12, lineHeight: 1.6, color: "#222" }}>
        {study.description}
      </p>

      {/* WIP banner */}
      {study.wip && (
        <div style={{ background: "#fff8d0", border: "1px solid #c8a000", padding: "8px 12px", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: "Tahoma, var(--font-dm-sans), sans-serif", fontSize: 10, fontWeight: 700, color: "#806000", background: "#ffe070", border: "1px solid #c8a000", padding: "1px 6px" }}>
            IN PROGRESS
          </span>
          <span style={{ fontFamily: "Tahoma, var(--font-dm-sans), sans-serif", fontSize: 11, color: "#806000" }}>
            Content is being assembled. Check back soon.
          </span>
        </div>
      )}

      {/* Metrics */}
      {study.metrics && study.metrics.length > 0 && (
        <div>
          <div style={h3Style}>Impact</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {study.metrics.map((m) => (
              <MetricCard key={m.value} value={m.value} label={m.label} />
            ))}
          </div>
        </div>
      )}

      {/* Process */}
      {study.process.length > 0 && (
        <div>
          <div style={h3Style}>Process</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {study.process.map((step) => (
              <ProcessStep key={step.number} number={step.number} title={step.title} />
            ))}
          </div>
        </div>
      )}

      {/* Sections */}
      {study.sections && study.sections.map((section) => (
        <div key={section.title} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={h3Style}>{section.title}</div>
          {section.blocks.map((block, i) => {
            if (block.type === "paragraph") {
              return (
                <p key={i} style={{ fontFamily: "Tahoma, var(--font-dm-sans), sans-serif", fontSize: 11, lineHeight: 1.65, color: "#222", margin: 0 }}>
                  {block.text}
                </p>
              );
            }
            if (block.type === "heading") {
              return (
                <p key={i} style={{ fontFamily: "Tahoma, var(--font-dm-sans), sans-serif", fontSize: 11, fontWeight: 700, color: "#000080", margin: "4px 0 0" }}>
                  {block.text}
                </p>
              );
            }
            if (block.type === "bullets") {
              return (
                <ul key={i} style={{ margin: "0 0 0 16px", padding: 0, display: "flex", flexDirection: "column", gap: 4 }}>
                  {block.items.map((item, j) => (
                    <li key={j} style={{ fontFamily: "Tahoma, var(--font-dm-sans), sans-serif", fontSize: 11, lineHeight: 1.6, color: "#222" }}>
                      {item}
                    </li>
                  ))}
                </ul>
              );
            }
            if (block.type === "callout") {
              return (
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
            }
            if (block.type === "kpi-row") {
              return (
                <div key={i} style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {block.items.map((item, j) => (
                    <div key={j} style={{ flex: 1, minWidth: 80, background: "#f0f4ff", border: "1px solid #c0c8e8", padding: "8px 10px", textAlign: "center" }}>
                      <div style={{ fontFamily: "Tahoma, var(--font-dm-sans), sans-serif", fontSize: 16, fontWeight: 700, color: "#000080" }}>{item.value}</div>
                      <div style={{ fontFamily: "Tahoma, var(--font-dm-sans), sans-serif", fontSize: 9, color: "#555", lineHeight: 1.4 }}>{item.label}</div>
                    </div>
                  ))}
                </div>
              );
            }
            return null;
          })}
        </div>
      ))}

      {/* NDA note */}
      {study.ndaNote && (
        <div style={{ background: "#fff8d0", border: "1px solid #c8a000", padding: "8px 12px" }}>
          <p style={{ fontFamily: "Tahoma, var(--font-dm-sans), sans-serif", fontSize: 11, color: "#806000", lineHeight: 1.5 }}>
            🔒 {study.ndaNote}
          </p>
        </div>
      )}
    </div>
  );
}
