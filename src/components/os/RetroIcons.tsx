"use client";

interface IconProps {
  className?: string;
}

// ── WORK/ — Golden yellow folder ───────────────────────────────────────────
export function FolderIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Tab */}
      <rect x="2" y="6" width="10" height="4" fill="#f8d040" stroke="#8a6000" strokeWidth="1"/>
      {/* Body */}
      <rect x="2" y="9" width="28" height="18" fill="#fce060" stroke="#8a6000" strokeWidth="1"/>
      {/* Inner highlight */}
      <line x1="3" y1="11" x2="29" y2="11" stroke="#ffe890" strokeWidth="1"/>
      <line x1="3" y1="10" x2="11" y2="10" stroke="#ffe890" strokeWidth="1"/>
      {/* Shadow at bottom */}
      <line x1="3" y1="26" x2="29" y2="26" stroke="#c8900a" strokeWidth="1" opacity="0.6"/>
    </svg>
  );
}

// ── LAB/ — Teal flask ──────────────────────────────────────────────────────
export function FlaskIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Neck clamp */}
      <rect x="11" y="3" width="10" height="2" fill="#186848"/>
      {/* Neck */}
      <rect x="13" y="5" width="6" height="8" fill="#d0f4ec" stroke="#186848" strokeWidth="1"/>
      {/* Flask body */}
      <path d="M13 13 L6 26 L26 26 L19 13 Z" fill="#d0f4ec" stroke="#186848" strokeWidth="1" strokeLinejoin="miter"/>
      {/* Liquid */}
      <path d="M9 22 L23 22 L26 26 L6 26 Z" fill="#40c0a0"/>
      {/* Highlight on liquid */}
      <path d="M9 22 L11 22 L8 26 L6 26 Z" fill="#70d8bc" opacity="0.6"/>
      {/* Bubbles */}
      <circle cx="13" cy="24" r="1.2" fill="#fff" opacity="0.8"/>
      <circle cx="18" cy="23" r="1" fill="#fff" opacity="0.8"/>
      <circle cx="21" cy="24.5" r="0.8" fill="#fff" opacity="0.7"/>
    </svg>
  );
}

// ── WRITING/ — White page with orange pencil ───────────────────────────────
export function WritingIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Page */}
      <path d="M4 4 L22 4 L28 10 L28 29 L4 29 Z" fill="#fff" stroke="#505060" strokeWidth="1" strokeLinejoin="miter"/>
      {/* Dog-ear */}
      <path d="M22 4 L22 10 L28 10" fill="#d8d8e8" stroke="#505060" strokeWidth="1" strokeLinejoin="miter"/>
      {/* Text lines */}
      <line x1="8" y1="15" x2="20" y2="15" stroke="#9090b0" strokeWidth="1"/>
      <line x1="8" y1="18" x2="22" y2="18" stroke="#9090b0" strokeWidth="1"/>
      <line x1="8" y1="21" x2="18" y2="21" stroke="#9090b0" strokeWidth="1"/>
      <line x1="8" y1="24" x2="21" y2="24" stroke="#9090b0" strokeWidth="1"/>
      {/* Pencil — orange body */}
      <g transform="rotate(-40 20 10)">
        <rect x="18" y="3" width="3" height="11" fill="#f0a020" stroke="#8a5800" strokeWidth="0.5"/>
        {/* Pencil tip */}
        <polygon points="18.5,14 20.5,14 19.5,17" fill="#f0d0a0"/>
        {/* Pencil tip dark */}
        <polygon points="19,15.5 20,15.5 19.5,17" fill="#2a1a0a"/>
        {/* Eraser */}
        <rect x="18" y="2" width="3" height="2" fill="#f08090" stroke="#8a5800" strokeWidth="0.5"/>
        {/* Metal band */}
        <rect x="18" y="3.8" width="3" height="1.2" fill="#c0c0c0" stroke="#8a8a8a" strokeWidth="0.3"/>
      </g>
    </svg>
  );
}

// ── README.txt — Cream document with blue lines ────────────────────────────
export function DocumentIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Page */}
      <path d="M5 3 L21 3 L27 9 L27 30 L5 30 Z" fill="#fffef8" stroke="#606070" strokeWidth="1" strokeLinejoin="miter"/>
      {/* Dog-ear */}
      <path d="M21 3 L21 9 L27 9" fill="#d8d8d0" stroke="#606070" strokeWidth="1" strokeLinejoin="miter"/>
      {/* Text lines — slightly blue for "document" feel */}
      <line x1="9" y1="14" x2="23" y2="14" stroke="#7080c0" strokeWidth="1"/>
      <line x1="9" y1="17" x2="23" y2="17" stroke="#7080c0" strokeWidth="1"/>
      <line x1="9" y1="20" x2="23" y2="20" stroke="#9090b8" strokeWidth="1"/>
      <line x1="9" y1="23" x2="18" y2="23" stroke="#9090b8" strokeWidth="1"/>
      {/* Title line (thicker / darker) */}
      <line x1="9" y1="11" x2="21" y2="11" stroke="#4050a0" strokeWidth="1.5"/>
    </svg>
  );
}

// ── ABOUT.exe — Person with blue shirt ────────────────────────────────────
export function PersonIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Head — flesh tone */}
      <circle cx="16" cy="9" r="6" fill="#f4c898" stroke="#8a5830" strokeWidth="1"/>
      {/* Hair */}
      <path d="M10 9 Q10 3 16 3 Q22 3 22 9" fill="#4a2a0a"/>
      {/* Eyes */}
      <circle cx="14" cy="9" r="0.8" fill="#2a1a08"/>
      <circle cx="18" cy="9" r="0.8" fill="#2a1a08"/>
      {/* Smile */}
      <path d="M14 12 Q16 13.5 18 12" stroke="#8a5830" strokeWidth="0.8" fill="none"/>
      {/* Body — blue shirt */}
      <path d="M6 28 C6 20 10 17 16 17 C22 17 26 20 26 28 Z" fill="#4080c8" stroke="#1a4a8a" strokeWidth="1"/>
      {/* Collar */}
      <line x1="13" y1="17" x2="16" y2="21" stroke="#ffffffaa" strokeWidth="1"/>
      <line x1="19" y1="17" x2="16" y2="21" stroke="#ffffffaa" strokeWidth="1"/>
    </svg>
  );
}

// ── TERMINAL — CRT monitor with green glow ────────────────────────────────
export function MonitorIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Monitor body */}
      <rect x="2" y="3" width="28" height="20" rx="2" fill="#c8ccd4" stroke="#606878" strokeWidth="1"/>
      {/* Bevel highlight */}
      <rect x="3" y="4" width="26" height="1" fill="#e8eaf0" opacity="0.8"/>
      {/* Screen */}
      <rect x="4" y="5" width="24" height="15" rx="1" fill="#001810" stroke="#303830" strokeWidth="0.5"/>
      {/* Screen scanlines effect */}
      <rect x="4" y="5" width="24" height="15" fill="url(#scanlines)" opacity="0.15"/>
      {/* Green terminal text */}
      <text x="6" y="13" fontFamily="monospace" fontSize="4.5" fill="#00e040">$ _</text>
      <rect x="6" y="15" width="8" height="1" fill="#00b030" opacity="0.6"/>
      {/* Screen glow */}
      <rect x="4" y="5" width="24" height="15" fill="#00ff40" opacity="0.04"/>
      {/* Stand */}
      <rect x="13" y="23" width="6" height="4" fill="#a0a8b0" stroke="#606878" strokeWidth="1"/>
      <rect x="10" y="27" width="12" height="2" rx="0" fill="#a0a8b0" stroke="#606878" strokeWidth="1"/>
    </svg>
  );
}

// ── GALLERY — Bliss-inspired mini painting ────────────────────────────────
export function GalleryIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Frame */}
      <rect x="2" y="2" width="28" height="28" rx="0" fill="#a87840" stroke="#6a4a20" strokeWidth="1.5"/>
      {/* Inner frame */}
      <rect x="5" y="5" width="22" height="22" rx="0" fill="#fffef8" stroke="#7a5428" strokeWidth="0.5"/>
      {/* Sky */}
      <rect x="5" y="5" width="22" height="12" fill="#6ab0e0"/>
      {/* Hills */}
      <polygon points="5,17 10,12 15,15 20,11 27,14 27,27 5,27" fill="#52a830"/>
      {/* Hill highlight */}
      <polygon points="10,12 13,13 15,15 17,12 20,11 20,13 17,14 15,16 13,15 10,14" fill="#72c850" opacity="0.7"/>
      {/* Sun */}
      <circle cx="23" cy="8" r="3" fill="#f8d040" stroke="#e0a820" strokeWidth="0.5"/>
      {/* Small cloud */}
      <ellipse cx="10" cy="7" rx="3" ry="1.5" fill="white" opacity="0.9"/>
    </svg>
  );
}

// ── Icon map ──────────────────────────────────────────────────────────────
export const RETRO_ICON_MAP: Record<string, (p: IconProps) => JSX.Element> = {
  work:     FolderIcon,
  lab:      FlaskIcon,
  writing:  WritingIcon,
  readme:   DocumentIcon,
  about:    PersonIcon,
  terminal: MonitorIcon,
  gallery:  GalleryIcon,
};
