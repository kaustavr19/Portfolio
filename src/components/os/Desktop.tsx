"use client";

import { useRef, useState, useEffect } from "react";
import IconGrid from "./IconGrid";
import { WindowId } from "@/hooks/useWindowManager";
import { AnimatedWallpaper, getTOD, CFG } from "./AnimatedWallpaper";

interface Props { onOpen: (id: WindowId) => void; }

export default function Desktop({ onOpen }: Props) {
  const clearSelectionRef = useRef<(() => void) | null>(null);
  const [hour, setHour] = useState(() => new Date().getHours());

  useEffect(() => {
    const tick = () => setHour(new Date().getHours());
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      role="application"
      aria-label="Portfolio OS desktop"
      style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", background: "#008080" }}
      onClick={() => clearSelectionRef.current?.()}
    >
      <AnimatedWallpaper cfg={CFG[getTOD(hour)]} />
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <IconGrid onOpen={onOpen} clearSelectionRef={clearSelectionRef} />
      </div>
    </div>
  );
}
