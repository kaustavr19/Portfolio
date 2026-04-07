"use client";

interface TagProps {
  label: string;
  variant?: "amber" | "teal" | "muted" | "purple" | "green";
}

// XP-style solid tags — visible on white content backgrounds
const styles: Record<string, { bg: string; color: string; border: string }> = {
  amber:  { bg: "#fff8d0", color: "#806000", border: "#c8a000" },
  teal:   { bg: "#d0f4ec", color: "#006848", border: "#40c0a0" },
  muted:  { bg: "#f0f0f0", color: "#505050", border: "#b0b0b0" },
  purple: { bg: "#ece0f8", color: "#5c3080", border: "#9060c0" },
  green:  { bg: "#d8f8d0", color: "#206010", border: "#50a030" },
};

export default function Tag({ label, variant = "amber" }: TagProps) {
  const s = styles[variant];
  return (
    <span
      style={{
        fontFamily: "var(--font-jetbrains), monospace",
        fontSize: 9,
        padding: "1px 6px",
        borderRadius: 2,
        border: `1px solid ${s.border}`,
        background: s.bg,
        color: s.color,
        fontWeight: 700,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}
