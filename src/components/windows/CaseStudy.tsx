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
