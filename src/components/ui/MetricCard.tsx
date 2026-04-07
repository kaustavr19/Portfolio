"use client";

interface MetricCardProps {
  value: string;
  label: string;
}

export default function MetricCard({ value, label }: MetricCardProps) {
  return (
    <div
      className="flex-1 rounded-lg p-3 border flex flex-col gap-0.5"
      style={{ background: "var(--titlebar-bg)", borderColor: "var(--os-border)" }}
    >
      <span className="font-mono text-lg font-bold text-accent-amber leading-tight">
        {value}
      </span>
      <span className="font-mono text-[10px] text-text-muted">{label}</span>
    </div>
  );
}
