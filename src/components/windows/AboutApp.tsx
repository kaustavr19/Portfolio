"use client";

import Tag from "@/components/ui/Tag";
import ExplorerShell, { SidebarSection } from "@/components/os/ExplorerShell";

const SIDEBAR: SidebarSection[] = [
  {
    title: "System Tasks",
    icon: "⚙️",
    items: [
      { label: "View Resume", icon: "📄" },
      { label: "Send Email", icon: "📧" },
      { label: "LinkedIn Profile", icon: "🔗" },
    ],
  },
  {
    title: "Other Places",
    icon: "📍",
    items: [
      { label: "WORK/", icon: "📁" },
      { label: "LAB/", icon: "🧪" },
      { label: "WRITING/", icon: "✍️" },
      { label: "Desktop", icon: "🖥️" },
    ],
  },
  {
    title: "Details",
    icon: "ℹ️",
    items: [
      { label: "Kaustav Roy" },
      { label: "Design Consultant" },
      { label: "Fractal Analytics" },
      { label: "Bengaluru, India" },
    ],
  },
];

const listItem: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: 8,
  padding: "5px 8px",
  background: "#fff",
  border: "1px solid #d4d0c8",
};

const sectionLabel: React.CSSProperties = {
  fontFamily: "Tahoma, var(--font-dm-sans), sans-serif",
  fontSize: 10,
  fontWeight: 700,
  color: "#000080",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  paddingBottom: 4,
  borderBottom: "1px solid #d4d0c8",
  marginBottom: 4,
};

export default function AboutApp() {
  return (
    <ExplorerShell
      path="C:\\Portfolio\\About.exe"
      sidebarSections={SIDEBAR}
      statusText="System Information"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 14, padding: "4px 0" }}>

        {/* Heading */}
        <div style={{ borderBottom: "2px solid #316ac5", paddingBottom: 8 }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.4, color: "#000080", fontFamily: "Tahoma, var(--font-dm-sans), sans-serif" }}>
            Design Consultant — AI Systems &amp; Enterprise UX
          </h2>
          <p style={{ fontFamily: "Tahoma, var(--font-dm-sans), sans-serif", fontSize: 11, color: "#555", marginTop: 3 }}>
            Fractal Analytics · Bengaluru, India · 3.5 years
          </p>
        </div>

        {/* Summary */}
        <p style={{ fontSize: 12, lineHeight: 1.65, color: "#222", fontFamily: "Tahoma, var(--font-dm-sans), sans-serif" }}>
          Design Consultant specialising in AI-powered enterprise platforms — explainable AI interfaces,
          human-in-the-loop decisioning, and design for complex, high-stakes workflows. Featured at
          Google I/O 2024. Shortlisted as Google official vendor from 6,000+ international contenders.
          National hackathon judge. Wildlife photographer behind Untamed Snaps.
        </p>

        {/* Research interests */}
        <div>
          <div style={sectionLabel}>Research Interests</div>
          <p style={{ fontFamily: "Tahoma, var(--font-dm-sans), sans-serif", fontSize: 11, lineHeight: 1.6, color: "#333" }}>
            Human–Computer Interaction (HCI) · Explainable AI (XAI) UX · Enterprise AI &amp; Decision Support ·
            Human-in-the-Loop ML · Information Visualization · Design for Safety-Critical Systems ·
            Sustainability-Driven Design · Design Thinking
          </p>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          <Tag label="Explainable AI" variant="teal" />
          <Tag label="Enterprise UX" variant="amber" />
          <Tag label="Design Systems" variant="purple" />
          <Tag label="Human-in-the-Loop" variant="green" />
          <Tag label="Hackathon Judge" variant="amber" />
          <Tag label="Google I/O 2024" variant="teal" />
        </div>

        {/* Awards */}
        <div>
          <div style={sectionLabel}>Recognition</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {[
              { year: "2026", label: "Star Award – Eureka · Fractal Analytics" },
              { year: "2026", label: "Entrepreneurial Thinking Award · Fractal" },
              { year: "2025", label: "Teach to Learn Award · Cogentiq Design System" },
              { year: "2024", label: "Google I/O Featured · Asset & Process Dashboards" },
              { year: "2024", label: "Google Vendor · Shortlisted from 6,000+" },
              { year: "2023", label: "Vice Chancellor's Award · UEM Kolkata" },
            ].map(({ year, label }) => (
              <div key={label} style={listItem}>
                <span style={{ fontFamily: "Tahoma, var(--font-dm-sans), sans-serif", fontSize: 10, color: "#316ac5", fontWeight: 700, flexShrink: 0, minWidth: 30 }}>{year}</span>
                <span style={{ fontFamily: "Tahoma, var(--font-dm-sans), sans-serif", fontSize: 11, color: "#000" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <div style={sectionLabel}>Certifications</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {[
              "Google UX Design",
              "AI for Designers — Interaction Design Foundation",
              "Information Visualization — IxDF",
              "Design for the 21st Century — Don Norman (IxDF)",
              "Design Thinking: The Ultimate Guide",
              "Photography Specialization — Michigan State University",
              "Y Combinator Startup School (2022)",
            ].map((cert) => (
              <div key={cert} style={listItem}>
                <span style={{ color: "#316ac5", fontSize: 10, flexShrink: 0, marginTop: 2 }}>▶</span>
                <span style={{ fontFamily: "Tahoma, var(--font-dm-sans), sans-serif", fontSize: 11, color: "#000" }}>{cert}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <div style={sectionLabel}>Education</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <div style={{ ...listItem, flexDirection: "column", alignItems: "flex-start" }}>
              <p style={{ fontFamily: "Tahoma, var(--font-dm-sans), sans-serif", fontSize: 11, color: "#000", fontWeight: 600 }}>
                B.Tech Computer Science — Bachelor&apos;s with Distinction
              </p>
              <p style={{ fontFamily: "Tahoma, var(--font-dm-sans), sans-serif", fontSize: 10, color: "#555", marginTop: 2 }}>
                University of Engineering &amp; Management, Kolkata · 2019–2023 · CGPA 9.45 / 10.0
              </p>
            </div>
            <div style={{ ...listItem, flexDirection: "column", alignItems: "flex-start" }}>
              <p style={{ fontFamily: "Tahoma, var(--font-dm-sans), sans-serif", fontSize: 11, color: "#000", fontWeight: 600 }}>
                Higher Secondary, Computer Science
              </p>
              <p style={{ fontFamily: "Tahoma, var(--font-dm-sans), sans-serif", fontSize: 10, color: "#555", marginTop: 2 }}>
                Patha Bhavan, Kolkata · 2017–2019
              </p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div style={{ display: "flex", gap: 8 }}>
          {[
            { href: "mailto:kaustav.roy.design@gmail.com", label: "📧  Email ↗" },
            { href: "https://linkedin.com/in/kaustavr19", label: "🔗  LinkedIn ↗" },
          ].map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              style={{
                fontFamily: "Tahoma, var(--font-dm-sans), sans-serif",
                fontSize: 11,
                padding: "4px 14px",
                background: "linear-gradient(to bottom, #f0f0f0, #d8d8d8)",
                border: "1px solid #888",
                borderRadius: 2,
                boxShadow: "inset 0 1px 0 #fff, inset 0 -1px 0 #b0b0b0",
                color: "#000",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              {label}
            </a>
          ))}
        </div>

      </div>
    </ExplorerShell>
  );
}
