"use client";

const TILES = [
  { label: "Wildlife photography", gradient: "linear-gradient(135deg, #1a2e1c 0%, #0e1a10 100%)" },
  { label: "Wildlife photography", gradient: "linear-gradient(135deg, #1a2810 0%, #0e1808 100%)" },
  { label: "Murkir Haari (Bengali theatre)", gradient: "linear-gradient(135deg, #1e0e18 0%, #120812 100%)" },
  { label: "Cultural work", gradient: "linear-gradient(135deg, #1a1020 0%, #100a18 100%)" },
];

export default function GalleryApp() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-2">
        {TILES.map((tile, i) => (
          <div
            key={i}
            className="relative rounded-lg overflow-hidden aspect-square flex items-end"
            style={{ background: tile.gradient, minHeight: 140 }}
          >
            {/* Placeholder icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl opacity-20">📷</span>
            </div>
            {/* Label */}
            <div
              className="relative w-full px-3 py-2"
              style={{
                background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
              }}
            >
              <p className="font-mono text-[9px] text-text-muted">{tile.label}</p>
            </div>
          </div>
        ))}
      </div>
      <p
        className="font-mono text-[10px] text-center"
        style={{ color: "var(--text-muted)" }}
      >
        The human behind the interface.
      </p>
    </div>
  );
}
