"use client";

const MENU_ITEMS = ["File", "Edit", "Format", "View", "Help"];

const mono = "Lucida Console, Courier New, monospace";

function Divider({ double }: { double?: boolean }) {
  return (
    <div style={{
      borderTop: `${double ? 3 : 1}px ${double ? "double" : "solid"} #b0b0b0`,
      margin: "10px 0",
    }} />
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontFamily: mono, fontSize: 10, fontWeight: 700, color: "#316ac5", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>
        {label}
      </div>
      {children}
    </div>
  );
}

function Line({ children, indent }: { children: React.ReactNode; indent?: boolean }) {
  return (
    <div style={{ fontFamily: mono, fontSize: 12, color: "#000", lineHeight: 1.7, paddingLeft: indent ? 16 : 0 }}>
      {children}
    </div>
  );
}

function Arrow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: mono, fontSize: 12, lineHeight: 1.7, paddingLeft: 16, display: "flex", gap: 6 }}>
      <span style={{ color: "#316ac5", flexShrink: 0 }}>→</span>
      <span style={{ color: "#000" }}>{children}</span>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: mono, fontSize: 12, lineHeight: 1.7, paddingLeft: 16, display: "flex", gap: 6 }}>
      <span style={{ color: "#888", flexShrink: 0 }}>·</span>
      <span style={{ color: "#222" }}>{children}</span>
    </div>
  );
}

export default function Notepad() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 460 }}>
      {/* Notepad menu bar */}
      <div style={{ display: "flex", alignItems: "center", height: 20, paddingLeft: 2, background: "#ece9d8", borderBottom: "1px solid #d4d0c8", flexShrink: 0 }}>
        {MENU_ITEMS.map((item) => (
          <button
            key={item}
            style={{ fontFamily: "Tahoma, sans-serif", fontSize: 11, padding: "1px 8px", background: "none", border: "1px solid transparent", color: "#000", cursor: "pointer", height: "100%" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#316ac5"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#1a4a9a"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#000"; e.currentTarget.style.borderColor = "transparent"; }}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Content area */}
      <div
        style={{ flex: 1, background: "#fff", overflowY: "auto", padding: "10px 14px" }}
        aria-label="README.txt contents"
      >
        <div style={{ fontFamily: mono, fontSize: 14, fontWeight: 700, color: "#000", marginBottom: 2 }}>
          README.txt
        </div>
        <Divider double />

        {/* Identity */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontFamily: mono, fontSize: 18, fontWeight: 700, color: "#000080", lineHeight: 1.2 }}>Kaustav Roy</div>
          <div style={{ fontFamily: mono, fontSize: 12, color: "#444", marginTop: 2 }}>Design Consultant · AI &amp; Enterprise UX</div>
          <div style={{ fontFamily: mono, fontSize: 11, color: "#888", marginTop: 1 }}>Bengaluru, India</div>
        </div>

        <Divider />

        {/* Tagline */}
        <div style={{ fontFamily: mono, fontSize: 12, color: "#333", fontStyle: "italic", lineHeight: 1.6, marginBottom: 14, paddingLeft: 2, borderLeft: "3px solid #316ac5" }}>
          &nbsp;Specialising in explainable AI design,<br/>
          &nbsp;human-in-the-loop systems, and design<br/>
          &nbsp;for complex decision-making workflows.
        </div>

        <Divider />

        {/* Currently */}
        <Section label="Currently">
          <Line><span style={{ fontWeight: 700 }}>Design Consultant, Insurance AI</span></Line>
          <Line indent>Fractal Analytics · Bengaluru</Line>
          <Line indent>Jan 2026 – Present (3.5 yrs total)</Line>
        </Section>

        {/* Applying */}
        <Section label="Applying">
          <Line>MSc HCI / MA Creative Innovation — <span style={{ fontWeight: 700 }}>2025</span></Line>
          <div style={{ marginTop: 4 }}>
            {[
              "University of Bristol",
              "University of Birmingham",
              "City, University of London",
              "University of Glasgow",
              "University of Edinburgh",
              "University of York",
              "Newcastle University",
            ].map((u) => <Arrow key={u}>{u}</Arrow>)}
          </div>
        </Section>

        <Divider />

        {/* Background */}
        <Section label="Background">
          <Line>Featured at Google I/O 2024.</Line>
          <Line>11% cost &amp; carbon reduction (90-day MVP).</Line>
          <Line>National hackathon judge.</Line>
          <Line>Wildlife photographer — Untamed Snaps.</Line>
        </Section>

        {/* Skills */}
        <Section label="Skills">
          {[
            "Design for AI · Explainable AI (XAI)",
            "Design Systems · Information Viz",
            "Enterprise UX · Interaction Design",
            "User Research · Accessibility (WCAG)",
            "Figma · Lovable · Claude Code",
            "HTML/CSS · SQL · Python",
          ].map((s) => (
            <Bullet key={s}>{s}</Bullet>
          ))}
        </Section>

        <Divider />

        {/* Education */}
        <Section label="Education">
          <Line><span style={{ fontWeight: 700 }}>B.Tech Computer Science</span> · Distinction</Line>
          <Line indent>UEM Kolkata · <span style={{ color: "#316ac5", fontWeight: 700 }}>CGPA 9.45 / 10.0</span></Line>
          <Line indent>2019 – 2023</Line>
        </Section>

        {/* Certifications */}
        <Section label="Certifications">
          <Bullet>Google UX Design</Bullet>
          <Bullet>IxDF — AI for Designers</Bullet>
          <Bullet>IxDF — Information Visualization</Bullet>
          <Bullet>IxDF — Design for the 21st Century (Don Norman)</Bullet>
          <Bullet>Photography Specialization (Michigan State Univ.)</Bullet>
          <Bullet>Y Combinator Startup School (2022)</Bullet>
        </Section>

        {/* Awards */}
        <Section label="Awards">
          <Bullet>Star Award – Eureka · Fractal (Mar 2026)</Bullet>
          <Bullet>Google I/O 2024 Featured</Bullet>
          <Bullet>Google Vendor — shortlisted from 6,000+</Bullet>
          <Bullet>Vice Chancellor&apos;s Award · UEM (2023, 2022)</Bullet>
        </Section>

        <Divider double />

        {/* Contact */}
        <Section label="Contact">
          <Line>
            <a href="mailto:kaustav.roy.design@gmail.com" style={{ fontFamily: mono, fontSize: 12, color: "#316ac5", textDecoration: "underline" }}>
              kaustav.roy.design@gmail.com
            </a>
          </Line>
          <Line>
            <a href="https://linkedin.com/in/kaustavr19" target="_blank" rel="noopener noreferrer" style={{ fontFamily: mono, fontSize: 12, color: "#316ac5", textDecoration: "underline" }}>
              linkedin.com/in/kaustavr19
            </a>
          </Line>
        </Section>

        <Divider double />
        <div style={{ fontFamily: mono, fontSize: 9, color: "#888", textAlign: "center" }}>
          README.txt — Portfolio/OS v1.0 — Kaustav Roy 2025
        </div>
      </div>

      {/* Status bar */}
      <div style={{ height: 20, paddingLeft: 10, paddingRight: 10, display: "flex", alignItems: "center", justifyContent: "space-between", background: "#ece9d8", borderTop: "1px solid #d4d0c8", flexShrink: 0 }}>
        <span style={{ fontFamily: "Tahoma, sans-serif", fontSize: 10, color: "#555" }}>Ln 1, Col 1</span>
        <span style={{ fontFamily: "Tahoma, sans-serif", fontSize: 10, color: "#888" }}>README.txt · 2 KB</span>
      </div>
    </div>
  );
}
