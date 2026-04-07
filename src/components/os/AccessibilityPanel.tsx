"use client";

import { useA11y, FontSize, ColorBlindMode } from "@/context/AccessibilityContext";

interface Props {
  onClose: () => void;
}

const CB_MODES: { id: ColorBlindMode; label: string; sub: string }[] = [
  { id: "none",         label: "Normal",       sub: "full colour"  },
  { id: "protanopia",   label: "Protanopia",   sub: "red-blind"    },
  { id: "deuteranopia", label: "Deuteranopia", sub: "green-blind"  },
  { id: "tritanopia",   label: "Tritanopia",   sub: "blue-blind"   },
];

const FONT_LABELS: Record<FontSize, string> = { sm: "A−", md: "A", lg: "A+" };

export default function AccessibilityPanel({ onClose }: Props) {
  const { fontSize, colorBlind, increaseFontSize, decreaseFontSize, setColorBlind } = useA11y();

  const btnBase: React.CSSProperties = {
    fontFamily: "var(--font-jetbrains), monospace",
    cursor: "pointer",
    border: "1px solid #888",
    borderRadius: 2,
    background: "linear-gradient(to bottom, #f0f0f0, #d8d8d8)",
    boxShadow: "inset 0 1px 0 #fff, inset 0 -1px 0 #b0b0b0",
    color: "#000",
  };

  const activeBtnStyle: React.CSSProperties = {
    ...btnBase,
    background: "linear-gradient(to bottom, #316ac5, #4878d8)",
    color: "#fff",
    border: "1px solid #1a4a9a",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3)",
  };

  return (
    <div
      role="dialog"
      aria-label="Accessibility settings"
      style={{
        position: "fixed",
        bottom: 44,
        right: 8,
        width: 260,
        background: "#ece9d8",
        border: "2px solid #0a246a",
        boxShadow: "2px 2px 8px rgba(0,0,0,0.45)",
        zIndex: 9500,
      }}
    >
      {/* XP-style titlebar */}
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 30,
          padding: "0 6px",
          background: "linear-gradient(to bottom, #94c4f8 0%, #4e98ec 12%, #2674da 30%, #1254bc 60%, #0c40a0 88%, #1252b8 100%)",
          borderBottom: "1px solid #082a80",
          overflow: "hidden",
        }}
      >
        {/* Gloss */}
        <div aria-hidden style={{ position: "absolute", top: 1, left: 0, right: 0, height: 10, background: "linear-gradient(to bottom, rgba(255,255,255,0.35), rgba(255,255,255,0.05))", pointerEvents: "none" }} />
        <span style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: 11, fontWeight: 700, color: "#fff", textShadow: "1px 1px 2px rgba(0,0,0,0.6)", zIndex: 1 }}>
          ♿ Accessibility
        </span>
        <button
          onClick={onClose}
          aria-label="Close accessibility panel"
          style={{
            ...btnBase,
            width: 21, height: 18,
            background: "linear-gradient(to bottom, #ff8a70 0%, #f04030 30%, #c82020 60%, #e03828 100%)",
            border: "1px solid #800808",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5), 0 1px 2px rgba(0,0,0,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative", overflow: "hidden", zIndex: 1,
          }}
        >
          <div aria-hidden style={{ position: "absolute", top: 1, left: 1, right: 1, height: 7, background: "linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(255,255,255,0.1))", borderRadius: 2, pointerEvents: "none" }} />
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" style={{ position: "relative", zIndex: 1 }}>
            <line x1="1" y1="1" x2="7" y2="7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="7" y1="1" x2="1" y2="7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: 14 }}>

        {/* ── Font Size ── */}
        <section>
          <h3 style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: 10, fontWeight: 700, color: "#000080", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8, paddingBottom: 4, borderBottom: "1px solid #d4d0c8" }}>
            Text Size
          </h3>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <button
              onClick={decreaseFontSize}
              disabled={fontSize === "sm"}
              aria-label="Decrease text size"
              style={{ ...btnBase, width: 36, height: 28, fontSize: 13, fontWeight: 700, opacity: fontSize === "sm" ? 0.4 : 1 }}
            >
              A−
            </button>

            {/* Size indicator */}
            <div style={{ flex: 1, display: "flex", gap: 3 }}>
              {(["sm", "md", "lg"] as FontSize[]).map((s) => (
                <div
                  key={s}
                  style={{
                    flex: 1, height: 8, borderRadius: 2,
                    background: FONT_LABELS[s] <= FONT_LABELS[fontSize] ? "#316ac5" : "#d4d0c8",
                    border: "1px solid #b0b0b0",
                  }}
                />
              ))}
            </div>

            <button
              onClick={increaseFontSize}
              disabled={fontSize === "lg"}
              aria-label="Increase text size"
              style={{ ...btnBase, width: 36, height: 28, fontSize: 15, fontWeight: 700, opacity: fontSize === "lg" ? 0.4 : 1 }}
            >
              A+
            </button>
          </div>
          <p style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: 9, color: "#555", marginTop: 4, textAlign: "center" }}>
            {fontSize === "sm" ? "Small" : fontSize === "md" ? "Normal" : "Large"}
          </p>
        </section>

        {/* ── Colour Blindness ── */}
        <section>
          <h3 style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: 10, fontWeight: 700, color: "#000080", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8, paddingBottom: 4, borderBottom: "1px solid #d4d0c8" }}>
            Colour Vision
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
            {CB_MODES.map((mode) => {
              const active = colorBlind === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => setColorBlind(mode.id)}
                  aria-pressed={active}
                  aria-label={`${mode.label} colour vision mode — ${mode.sub}`}
                  style={{
                    ...(active ? activeBtnStyle : btnBase),
                    padding: "5px 4px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <span style={{ fontSize: 10, fontWeight: 700 }}>{mode.label}</span>
                  <span style={{ fontSize: 8, opacity: 0.75 }}>{mode.sub}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ── Colour swatches preview ── */}
        <div style={{ display: "flex", gap: 3, height: 8 }} aria-hidden>
          {["#e84c1c","#7cc030","#2264d6","#f5c800","#000080","#ece9d8"].map((c) => (
            <div key={c} style={{ flex: 1, background: c, border: "1px solid #808080" }} />
          ))}
        </div>

      </div>
    </div>
  );
}
