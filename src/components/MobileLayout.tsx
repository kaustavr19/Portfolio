"use client";

import { caseStudies } from "@/data/projects";
import { sideProjects } from "@/data/sideProjects";
import { articles } from "@/data/writing";
import Tag from "@/components/ui/Tag";
import ProcessStep from "@/components/ui/ProcessStep";
import MetricCard from "@/components/ui/MetricCard";
import { useTheme } from "@/context/ThemeContext";

export default function MobileLayout() {
  useTheme();

  return (
    <div
      className="min-h-screen px-5 py-8 flex flex-col gap-12"
      style={{ background: "var(--desktop-bg)", color: "var(--text-primary)" }}
    >
      {/* Header */}
      <header className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-mono text-sm font-bold text-accent-amber">K/OS</h1>
          <h2 className="font-serif text-2xl font-semibold leading-tight">Kaustav</h2>
          <p className="font-mono text-[11px] text-text-muted">
            Senior UX Designer · Applying MSc HCI 2025
          </p>
        </div>
        <div style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: 11, color: "var(--text-muted)" }}>
          v1.0
        </div>
      </header>

      {/* About blurb */}
      <section className="flex flex-col gap-3">
        <p
          className="font-serif italic text-lg leading-snug"
          style={{ color: "var(--text-primary)" }}
        >
          I make AI legible to humans. And sometimes the other way around.
        </p>
        <p className="text-sm text-text-secondary leading-relaxed">
          3.5 years designing enterprise AI at Fractal Analytics. Side projects at 1am.
          National hackathon judge. Bird photographer.
        </p>
      </section>

      {/* Work */}
      <section className="flex flex-col gap-4">
        <h2
          className="font-mono text-[10px] uppercase tracking-widest"
          style={{ color: "var(--text-muted)" }}
        >
          Work/
        </h2>
        {caseStudies.map((study) => (
          <div
            key={study.id}
            className="rounded-xl border p-4 flex flex-col gap-3"
            style={{ background: "var(--window-bg)", borderColor: "var(--os-border)" }}
          >
            <div className="flex items-start gap-2 flex-wrap">
              <h3 className="font-serif text-base font-semibold flex-1 leading-snug">
                {study.title}
              </h3>
              <Tag label={study.tag.label} variant={study.tag.variant} />
            </div>
            <p className="font-mono text-[10px] text-text-muted">{study.subtitle}</p>
            <p className="text-sm text-text-secondary leading-relaxed">{study.description}</p>
            {study.metrics && (
              <div className="flex gap-2">
                {study.metrics.map((m) => (
                  <MetricCard key={m.value} value={m.value} label={m.label} />
                ))}
              </div>
            )}
            {study.process.length > 0 && (
              <div className="flex flex-col gap-0">
                {study.process.map((step) => (
                  <ProcessStep key={step.number} number={step.number} title={step.title} />
                ))}
              </div>
            )}
            {study.ndaNote && (
              <p
                className="font-mono text-[10px] rounded-lg p-3 border"
                style={{ color: "#c8a97e", background: "#c8a97e0a", borderColor: "#c8a97e22" }}
              >
                {study.ndaNote}
              </p>
            )}
          </div>
        ))}
      </section>

      {/* Lab */}
      <section className="flex flex-col gap-4">
        <h2
          className="font-mono text-[10px] uppercase tracking-widest"
          style={{ color: "var(--text-muted)" }}
        >
          Lab/
        </h2>
        {sideProjects.map((project) => (
          <div
            key={project.id}
            className="rounded-xl border p-4 flex items-start gap-3"
            style={{ background: "var(--window-bg)", borderColor: "var(--os-border)" }}
          >
            <span className="text-2xl leading-none">{project.emoji}</span>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-text-primary">{project.title}</span>
                {project.badge && (
                  <Tag label={project.badge.label} variant={project.badge.variant} />
                )}
              </div>
              <span className="font-mono text-[10px] text-text-muted">{project.subtitle}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Writing */}
      <section className="flex flex-col gap-4">
        <h2
          className="font-mono text-[10px] uppercase tracking-widest"
          style={{ color: "var(--text-muted)" }}
        >
          Writing/
        </h2>
        {articles.map((article) => (
          <div
            key={article.id}
            className="relative rounded-xl border p-4 overflow-hidden"
            style={{ background: "var(--window-bg)", borderColor: "var(--os-border)" }}
          >
            {article.featured && (
              <div
                className="absolute left-0 top-0 bottom-0 w-0.5"
                style={{ background: "#c8a97e" }}
              />
            )}
            <h3 className="font-serif text-base font-medium leading-snug text-text-primary mb-1.5">
              {article.title}
            </h3>
            <p className="font-mono text-[10px] text-text-muted">{article.tags}</p>
          </div>
        ))}
      </section>

      {/* About */}
      <section className="flex flex-col gap-4">
        <h2
          className="font-mono text-[10px] uppercase tracking-widest"
          style={{ color: "var(--text-muted)" }}
        >
          About/
        </h2>
        <div
          className="rounded-xl border p-4 flex flex-col gap-3"
          style={{ background: "var(--window-bg)", borderColor: "var(--os-border)" }}
        >
          <div className="flex flex-wrap gap-2">
            <Tag label="Enterprise UX" variant="amber" />
            <Tag label="AI Interaction Design" variant="teal" />
            <Tag label="Design Systems" variant="purple" />
            <Tag label="Hackathon Judge" variant="green" />
          </div>
          <p className="font-mono text-[11px] text-text-secondary">
            B.Tech CST · UEM Kolkata · CGPA 9.45
          </p>
          <p className="font-mono text-[11px] text-text-secondary">
            IxDF — Information Visualization · IxDF — AI for Designers
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col gap-3 pt-4 border-t" style={{ borderColor: "var(--os-border)" }}>
        <p className="font-mono text-[10px] text-text-muted text-center">
          Applying to Bristol · Birmingham · City · Glasgow · Edinburgh · York · Newcastle
        </p>
        <div className="flex gap-2 justify-center">
          <a
            href="mailto:hello@example.com"
            className="font-mono text-[11px] px-4 py-2 rounded-lg border"
            style={{
              background: "var(--titlebar-bg)",
              borderColor: "var(--os-border)",
              color: "var(--text-secondary)",
            }}
          >
            Email ↗
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] px-4 py-2 rounded-lg border"
            style={{
              background: "var(--titlebar-bg)",
              borderColor: "var(--os-border)",
              color: "var(--text-secondary)",
            }}
          >
            LinkedIn ↗
          </a>
        </div>
        <p className="font-mono text-[9px] text-center" style={{ color: "var(--text-muted)" }}>
          PORTFOLIO/OS v1.0.0
        </p>
      </footer>
    </div>
  );
}
