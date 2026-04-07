"use client";

interface ProcessStepProps {
  number: string;
  title: string;
}

export default function ProcessStep({ number, title }: ProcessStepProps) {
  return (
    <div className="flex items-start gap-3 py-2 border-b" style={{ borderColor: "var(--os-border)" }}>
      <span className="font-mono text-[11px] text-accent-amber flex-shrink-0 mt-0.5">
        {number}
      </span>
      <span className="text-sm text-text-secondary">{title}</span>
    </div>
  );
}
