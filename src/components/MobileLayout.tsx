"use client";

import { useState, useEffect, useRef } from "react";
import { caseStudies } from "@/data/projects";
import { sideProjects } from "@/data/sideProjects";
import { articles } from "@/data/writing";
import Tag from "@/components/ui/Tag";
import ProcessStep from "@/components/ui/ProcessStep";
import MetricCard from "@/components/ui/MetricCard";
import { AnimatedWallpaper, getTOD, CFG } from "@/components/os/AnimatedWallpaper";

// ── XP Luna palette ───────────────────────────────────────────────────────
const XP = {
  desktop:   "#c0c0c0",
  panel:     "#ece9d8",
  window:    "#ffffff",
  barTop:    "#5497e0",
  barMid:    "#2460c8",
  barBot:    "#1644a8",
  barText:   "#ffffff",
  btnFace:   "#d8d4cc",
  btnHi:     "#ffffff",
  btnSh:     "#888",
  btnDark:   "#424242",
  taskTop:   "#3a6ed8",
  taskBot:   "#1244a0",
  startTop:  "#5ec452",
  startBot:  "#2e8030",
  border:    "#888",
  borderOut: "#424242",
  text:      "#000000",
  textMed:   "#333333",
  textMut:   "#666666",
  amber:     "#c8a97e",
  teal:      "#008080",
};

const raised = {
  border: `1px solid ${XP.borderOut}`,
  boxShadow: `inset 1px 1px 0 ${XP.btnHi}, inset -1px -1px 0 ${XP.btnSh}, inset 2px 2px 0 #d4d4d4, inset -2px -2px 0 ${XP.btnDark}`,
};
const inset = {
  border: `1px solid ${XP.borderOut}`,
  boxShadow: `inset 1px 1px 0 ${XP.btnSh}, inset -1px -1px 0 ${XP.btnHi}, inset 2px 2px 0 ${XP.btnDark}, inset -2px -2px 0 #d4d4d4`,
};

// ── App definitions ───────────────────────────────────────────────────────
type AppId = "about" | "work" | "lab" | "writing" | "credentials";

const APPS: { id: AppId; icon: string; label: string }[] = [
  { id: "about",       icon: "📝", label: "About.txt" },
  { id: "work",        icon: "📁", label: "Work/" },
  { id: "lab",         icon: "🧪", label: "Lab/" },
  { id: "writing",     icon: "✏️", label: "Writing/" },
  { id: "credentials", icon: "🪪", label: "System" },
];

// ── XP Title bar ──────────────────────────────────────────────────────────
function TitleBar({ title, icon, noChrome }: { title: string; icon?: string; noChrome?: boolean }) {
  return (
    <div style={{
      background: `linear-gradient(to bottom, ${XP.barTop} 0%, ${XP.barMid} 40%, ${XP.barBot} 100%)`,
      padding: "4px 8px",
      display: "flex",
      alignItems: "center",
      gap: 6,
      userSelect: "none",
      flexShrink: 0,
    }}>
      {icon && <span style={{ fontSize: 13 }}>{icon}</span>}
      <span style={{
        fontFamily: `var(--font-dm-sans), 'Tahoma', system-ui`,
        fontSize: 11,
        fontWeight: 700,
        color: XP.barText,
        textShadow: "1px 1px 0 #0a2878",
        flex: 1,
        letterSpacing: "0.01em",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
      }}>{title}</span>
      {!noChrome && (
        <div style={{ display: "flex", gap: 2, flexShrink: 0 }}>
          {["_", "□"].map(b => (
            <span key={b} style={{
              width: 18, height: 16,
              background: `linear-gradient(to bottom, ${XP.btnFace}, #b8b4ac)`,
              ...raised,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 9, fontWeight: 700, color: XP.text, fontFamily: "monospace",
            }}>{b}</span>
          ))}
          <span style={{
            width: 18, height: 16,
            background: "linear-gradient(to bottom, #e87070, #c43030)",
            boxShadow: "inset 1px 1px 0 #ff9090, inset -1px -1px 0 #7a1818",
            border: `1px solid ${XP.borderOut}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 9, fontWeight: 700, color: "#fff", fontFamily: "monospace",
          }}>✕</span>
        </div>
      )}
    </div>
  );
}

// ── Status bar (top) ──────────────────────────────────────────────────────
function StatusBar({ time }: { time: string }) {
  return (
    <div style={{
      height: 26,
      background: `linear-gradient(to bottom, #2a5ad0, ${XP.taskBot})`,
      borderBottom: "1px solid #4a7ae8",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 10px",
      flexShrink: 0,
      zIndex: 100,
    }}>
      <span style={{
        color: "rgba(255,255,255,0.9)",
        fontSize: 10,
        fontFamily: `var(--font-dm-sans), Tahoma, system-ui`,
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        gap: 4,
      }}>
        <span style={{ fontSize: 12 }}>⊞</span> Portfolio OS
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 10, letterSpacing: 1 }}>▂▄▆</span>
        <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 11 }}>🔋</span>
        <span style={{
          color: "#ffffff",
          fontSize: 10,
          fontFamily: `var(--font-jetbrains), monospace`,
          fontWeight: 600,
        }}>{time}</span>
      </div>
    </div>
  );
}

// ── Nav bar (bottom) ──────────────────────────────────────────────────────
function NavBar({ onBack, showBack }: { onBack: () => void; showBack: boolean }) {
  const navBtn = {
    flex: 1,
    height: "100%",
    background: "transparent",
    border: "none",
    color: "#ffffff",
    fontSize: 18,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 1,
  } as const;

  return (
    <div style={{
      height: 48,
      background: `linear-gradient(to bottom, ${XP.taskTop}, ${XP.taskBot})`,
      borderTop: "2px solid #5b8ef0",
      display: "flex",
      alignItems: "stretch",
      flexShrink: 0,
      zIndex: 100,
    }}>
      <button onClick={showBack ? onBack : undefined}
        style={{ ...navBtn, opacity: showBack ? 1 : 0.3, fontSize: 16 }}>
        ◄
      </button>
      <button style={navBtn}>⊞</button>
      <button style={{ ...navBtn, fontSize: 14, fontWeight: 100 }}>▭</button>
    </div>
  );
}

// ── Home screen app icon ──────────────────────────────────────────────────
function AppIcon({ icon, label, onTap }: { icon: string; label: string; onTap: () => void }) {
  return (
    <button
      onClick={onTap}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
        background: "rgba(0,0,0,0.25)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        border: "1px solid rgba(255,255,255,0.25)",
        borderRadius: 14,
        padding: "10px 6px",
        cursor: "pointer",
        width: "100%",
      }}
    >
      <span style={{ fontSize: 34, lineHeight: 1 }}>{icon}</span>
      <span style={{
        fontSize: 10,
        color: "#ffffff",
        textShadow: "0 1px 3px rgba(0,0,0,0.9), 0 0 6px rgba(0,0,0,0.6)",
        fontWeight: 600,
        fontFamily: `var(--font-dm-sans), Tahoma, system-ui`,
        whiteSpace: "nowrap",
      }}>{label}</span>
    </button>
  );
}

// ── App drawer ────────────────────────────────────────────────────────────
function AppDrawer({
  open,
  onClose,
  onOpen,
}: {
  open: boolean;
  onClose: () => void;
  onOpen: (id: AppId) => void;
}) {
  return (
    <div style={{
      position: "absolute",
      inset: 0,
      zIndex: 50,
      pointerEvents: open ? "all" : "none",
      background: open ? "rgba(0,0,0,0.45)" : "transparent",
      transition: "background 0.3s",
    }} onClick={onClose}>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "72%",
          background: XP.panel,
          transform: open ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          borderRadius: "16px 16px 0 0",
          overflow: "hidden",
          boxShadow: "0 -6px 24px rgba(0,0,0,0.4)",
          border: "1px solid rgba(255,255,255,0.6)",
          borderBottom: "none",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 4px" }}>
          <div style={{ width: 36, height: 4, background: "#aaa", borderRadius: 2 }} />
        </div>
        {/* Drawer title bar */}
        <div style={{
          background: `linear-gradient(to bottom, ${XP.barTop}, ${XP.barBot})`,
          padding: "5px 14px",
          color: "#fff",
          fontFamily: `var(--font-dm-sans), Tahoma, system-ui`,
          fontSize: 12,
          fontWeight: 700,
          textShadow: "1px 1px 0 #0a2878",
          flexShrink: 0,
        }}>
          All Applications
        </div>
        {/* Apps grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 2,
          padding: 16,
          overflowY: "auto",
          flex: 1,
        }}>
          {APPS.map((app) => (
            <button
              key={app.id}
              onClick={() => { onOpen(app.id); onClose(); }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "12px 8px",
                borderRadius: 8,
              }}
            >
              <div style={{
                width: 52,
                height: 52,
                background: `linear-gradient(135deg, #e8e4dc, #c8c4bc)`,
                ...raised,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
              }}>
                {app.icon}
              </div>
              <span style={{
                fontSize: 11,
                color: XP.text,
                fontFamily: `var(--font-dm-sans), Tahoma, system-ui`,
                textAlign: "center",
                fontWeight: 500,
              }}>{app.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Content: About ────────────────────────────────────────────────────────
function AboutScreen() {
  return (
    <div style={{ padding: "12px 12px 24px" }}>
      <div style={{ ...raised, background: XP.window, borderRadius: 4, padding: "14px 16px" }}>
        <p style={{
          fontFamily: `var(--font-playfair), Georgia, serif`,
          fontStyle: "italic",
          fontSize: 15,
          lineHeight: 1.6,
          color: XP.text,
          marginBottom: 12,
        }}>
          I make AI legible to humans. And sometimes the other way around.
        </p>
        <p style={{ fontSize: 13, lineHeight: 1.7, color: XP.textMed, marginBottom: 12 }}>
          3.5 years designing enterprise AI at Fractal Analytics. Side projects at 1am.
          National hackathon judge. Bird photographer.
        </p>
        <div style={{
          fontFamily: `var(--font-jetbrains), monospace`,
          fontSize: 10,
          color: XP.amber,
          background: "#c8a97e12",
          border: "1px solid #c8a97e40",
          padding: "5px 10px",
          display: "inline-block",
          marginBottom: 16,
        }}>
          Senior UX Designer · Applying MSc HCI 2025
        </div>
        <div style={{ ...inset, background: XP.panel, padding: "8px 10px" }}>
          <p style={{ fontSize: 11, fontFamily: `var(--font-jetbrains), monospace`, color: XP.textMut, margin: 0, lineHeight: 1.7 }}>
            Applying to Bristol · Birmingham · City · Glasgow<br />
            Edinburgh · York · Newcastle
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Content: Work ─────────────────────────────────────────────────────────
function WorkScreen() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "12px 12px 24px" }}>
      {caseStudies.map((study) => (
        <div key={study.id} style={{ ...raised, borderRadius: 4, overflow: "hidden" }}>
          <TitleBar title={study.title.length > 34 ? study.title.slice(0, 34) + "…" : study.title} icon="📄" />
          <div style={{ background: XP.window, padding: "12px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8, flexWrap: "wrap" }}>
              <h3 style={{
                fontFamily: `var(--font-playfair), Georgia, serif`,
                fontSize: 14,
                fontWeight: 600,
                lineHeight: 1.3,
                color: XP.text,
                flex: 1,
                margin: 0,
              }}>{study.title}</h3>
              <Tag label={study.tag.label} variant={study.tag.variant} />
            </div>
            <div style={{ ...inset, background: XP.panel, padding: "4px 8px", fontSize: 10, fontFamily: `var(--font-jetbrains), monospace`, color: XP.textMut }}>
              {study.subtitle}
            </div>
            <p style={{ fontSize: 12.5, lineHeight: 1.65, color: XP.textMed, margin: 0 }}>
              {study.description}
            </p>
            {study.metrics && (
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {study.metrics.map((m) => (
                  <MetricCard key={m.value} value={m.value} label={m.label} />
                ))}
              </div>
            )}
            {study.process.length > 0 && (
              <div style={{ borderTop: `1px solid ${XP.desktop}`, paddingTop: 6 }}>
                {study.process.map((step) => (
                  <ProcessStep key={step.number} number={step.number} title={step.title} />
                ))}
              </div>
            )}
            {study.ndaNote && (
              <div style={{
                background: "#fffbe8",
                border: "1px solid #d4b800",
                padding: "7px 10px",
                fontSize: 10,
                fontFamily: `var(--font-jetbrains), monospace`,
                color: "#6a5000",
                display: "flex",
                gap: 6,
                alignItems: "flex-start",
              }}>
                <span>⚠</span>
                <span>{study.ndaNote}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Content: Lab ──────────────────────────────────────────────────────────
function LabScreen() {
  return (
    <div style={{ padding: "12px 12px 24px" }}>
      <div style={{ ...raised, background: XP.window, borderRadius: 4 }}>
        {sideProjects.map((project, i) => (
          <div key={project.id} style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 14px",
            borderBottom: i < sideProjects.length - 1 ? `1px solid ${XP.desktop}` : "none",
          }}>
            <span style={{ fontSize: 22, lineHeight: 1, flexShrink: 0 }}>{project.emoji}</span>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: XP.text }}>{project.title}</span>
                {project.badge && <Tag label={project.badge.label} variant={project.badge.variant} />}
              </div>
              <span style={{ fontSize: 10, fontFamily: `var(--font-jetbrains), monospace`, color: XP.textMut }}>
                {project.subtitle}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Content: Writing ──────────────────────────────────────────────────────
function WritingScreen() {
  return (
    <div style={{ padding: "12px 12px 24px" }}>
      <div style={{ ...raised, background: XP.window, borderRadius: 4 }}>
        {articles.map((article, i) => (
          <div key={article.id} style={{
            padding: "12px 14px",
            borderBottom: i < articles.length - 1 ? `1px solid ${XP.desktop}` : "none",
            borderLeft: article.featured ? `3px solid ${XP.amber}` : "3px solid transparent",
          }}>
            <h3 style={{
              fontFamily: `var(--font-playfair), Georgia, serif`,
              fontSize: 13.5,
              fontWeight: 500,
              lineHeight: 1.4,
              color: XP.text,
              marginBottom: 4,
            }}>{article.title}</h3>
            <p style={{ fontSize: 10, fontFamily: `var(--font-jetbrains), monospace`, color: XP.textMut, margin: 0 }}>
              {article.tags}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Content: Credentials ──────────────────────────────────────────────────
function CredentialsScreen() {
  return (
    <div style={{ padding: "12px 12px 24px" }}>
      <div style={{ ...raised, background: XP.window, borderRadius: 4, padding: "14px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          <Tag label="Enterprise UX" variant="amber" />
          <Tag label="AI Interaction Design" variant="teal" />
          <Tag label="Design Systems" variant="purple" />
          <Tag label="Hackathon Judge" variant="green" />
        </div>
        <div style={{ ...inset, background: XP.panel, padding: "10px 12px", display: "flex", flexDirection: "column", gap: 5 }}>
          <p style={{ fontSize: 12, fontFamily: `var(--font-jetbrains), monospace`, color: XP.textMed, margin: 0 }}>
            B.Tech CST · UEM Kolkata · CGPA 9.45
          </p>
          <p style={{ fontSize: 12, fontFamily: `var(--font-jetbrains), monospace`, color: XP.textMed, margin: 0 }}>
            IxDF — Information Visualization
          </p>
          <p style={{ fontSize: 12, fontFamily: `var(--font-jetbrains), monospace`, color: XP.textMed, margin: 0 }}>
            IxDF — AI for Designers
          </p>
        </div>
      </div>
    </div>
  );
}

// ── App screen wrapper ────────────────────────────────────────────────────
const APP_META: Record<AppId, { title: string; icon: string }> = {
  about:       { title: "About.txt — Notepad",               icon: "📝" },
  work:        { title: "Work/ — My Documents",              icon: "📁" },
  lab:         { title: "Lab/ — My Computer",                icon: "🧪" },
  writing:     { title: "Writing/ — Notepad",                icon: "✏️" },
  credentials: { title: "System Properties — Credentials",   icon: "🪪" },
};

function AppScreen({ id }: { id: AppId }) {
  const { title, icon } = APP_META[id];
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: XP.desktop }}>
      <TitleBar title={title} icon={icon} noChrome />
      <div style={{ flex: 1, overflowY: "auto" }}>
        {id === "about"       && <AboutScreen />}
        {id === "work"        && <WorkScreen />}
        {id === "lab"         && <LabScreen />}
        {id === "writing"     && <WritingScreen />}
        {id === "credentials" && <CredentialsScreen />}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────
export default function MobileLayout() {
  const [screen, setScreen] = useState<AppId | "home">("home");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [time, setTime] = useState("12:00 PM");
  const [hour, setHour] = useState(12);
  const [exitToast, setExitToast] = useState(false);
  const touchStartY = useRef(0);
  const lastBackAt = useRef(0);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = now.getHours();
      const m = String(now.getMinutes()).padStart(2, "0");
      const ampm = h >= 12 ? "PM" : "AM";
      const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
      setTime(`${h12}:${m} ${ampm}`);
      setHour(h);
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  const goBack = () => {
    if (drawerOpen) { setDrawerOpen(false); return; }
    if (screen !== "home") {
      const now = Date.now();
      if (now - lastBackAt.current < 2000) {
        setScreen("home");
        setExitToast(false);
      } else {
        lastBackAt.current = now;
        setExitToast(true);
        setTimeout(() => setExitToast(false), 2000);
      }
    }
  };

  const showBack = screen !== "home" || drawerOpen;

  return (
    <div
      style={{ position: "fixed", inset: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}
      onTouchStart={(e) => { touchStartY.current = e.touches[0].clientY; }}
      onTouchEnd={(e) => {
        const dy = touchStartY.current - e.changedTouches[0].clientY;
        if (screen === "home" && !drawerOpen && dy > 60) setDrawerOpen(true);
        if (drawerOpen && dy < -60) setDrawerOpen(false);
      }}
    >
      <StatusBar time={time} />

      {/* ── Main viewport ─────────────────────────────────────────────── */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>

        {/* Wallpaper (always rendered behind everything) */}
        <AnimatedWallpaper cfg={CFG[getTOD(hour)]} />

        {/* Home screen — app icons on wallpaper */}
        <div style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          opacity: screen === "home" ? 1 : 0,
          pointerEvents: screen === "home" ? "all" : "none",
          transition: "opacity 0.2s",
        }}>
          {/* App icons grid — top-left, 4 columns */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 10,
            padding: "16px 14px",
          }}>
            {APPS.map((app) => (
              <AppIcon
                key={app.id}
                icon={app.icon}
                label={app.label}
                onTap={() => setScreen(app.id)}
              />
            ))}
          </div>

          {/* Swipe-up indicator */}
          <div style={{
            position: "absolute",
            bottom: 16,
            left: 0, right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}>
            <span style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: 18,
              textShadow: "0 1px 4px rgba(0,0,0,0.8)",
            }}>↑</span>
            <span style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: 10,
              fontFamily: `var(--font-dm-sans), Tahoma, system-ui`,
              textShadow: "0 1px 3px rgba(0,0,0,0.9)",
              letterSpacing: "0.05em",
            }}>swipe up for all apps</span>
          </div>
        </div>

        {/* Double-back toast */}
        {exitToast && (
          <div style={{
            position: "absolute",
            bottom: 72,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 99,
            background: "rgba(20,20,20,0.88)",
            color: "#fff",
            fontSize: 12,
            fontFamily: `var(--font-dm-sans), Tahoma, system-ui`,
            padding: "8px 18px",
            borderRadius: 20,
            whiteSpace: "nowrap",
            boxShadow: "0 2px 12px rgba(0,0,0,0.5)",
            pointerEvents: "none",
          }}>
            Press back again to close
          </div>
        )}

        {/* App detail screens — slide up from bottom */}
        {(["about", "work", "lab", "writing", "credentials"] as AppId[]).map((id) => (
          <div
            key={id}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              transform: screen === id ? "translateY(0)" : "translateY(100%)",
              transition: "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            <AppScreen id={id} />
          </div>
        ))}

        {/* App drawer */}
        <AppDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          onOpen={(id) => setScreen(id)}
        />
      </div>

      <NavBar onBack={goBack} showBack={showBack} />
    </div>
  );
}
