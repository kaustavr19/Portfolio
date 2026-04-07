"use client";
import { useEffect, useRef } from "react";

export interface WallpaperCfg {
  sky: [string, string, string, string, string, string];
  hills: string; hillTop: string;
  meadow: string; meadowTop: string; fore: string; dirt: string; grass: string;
  cloud: string; cloudOp: number;
  sun: boolean; sx: number; sy: number; sc: string; sg: string; si: string;
  moon: boolean; mx: number; my: number;
  stars: boolean; animals: boolean; birds: boolean;
  fireflies: boolean; flowers: boolean;
}

// ── Colour helpers ────────────────────────────────────────────────────────
function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function darken(hex: string, f: number): string {
  const h = hex.replace("#", "");
  const r = Math.floor(parseInt(h.slice(0, 2), 16) * f);
  const g = Math.floor(parseInt(h.slice(2, 4), 16) * f);
  const b = Math.floor(parseInt(h.slice(4, 6), 16) * f);
  return `rgb(${r},${g},${b})`;
}

function seededRand(seed: number): number {
  const x = Math.sin(seed + 1) * 99999;
  return x - Math.floor(x);
}

// ── Cloud shapes: [relX%, relY%, relW%, relH%] inside cloud bounding box ─
const CLOUD_SHAPES = [
  // Large puffy cumulus
  [[0, 55, 50, 38], [18, 32, 38, 28], [44, 22, 30, 22], [68, 40, 28, 32], [84, 55, 16, 22]],
  // Medium rounded
  [[4, 52, 42, 38], [14, 28, 34, 28], [42, 38, 28, 28], [62, 50, 24, 30]],
  // Wide flat stratus
  [[0, 58, 68, 32], [8, 36, 48, 26], [52, 28, 38, 30], [78, 50, 22, 28]],
  // Small puff
  [[5, 48, 38, 40], [18, 22, 28, 30], [40, 34, 30, 34]],
  // Elongated
  [[0, 60, 55, 32], [12, 38, 42, 26], [50, 24, 32, 28], [74, 44, 26, 30], [88, 58, 12, 22]],
];

// ── Draw one frame ────────────────────────────────────────────────────────
function drawFrame(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  cfg: WallpaperCfg,
  cloudOffsets: number[],
) {
  ctx.clearRect(0, 0, W, H);

  // ── 1. SKY gradient ─────────────────────────────────────────────────────
  const skyH = H * 0.50;
  const skyGrad = ctx.createLinearGradient(0, 0, 0, skyH + H * 0.08);
  skyGrad.addColorStop(0,    cfg.sky[0]);
  skyGrad.addColorStop(0.28, cfg.sky[1]);
  skyGrad.addColorStop(0.56, cfg.sky[2]);
  skyGrad.addColorStop(0.78, cfg.sky[3]);
  skyGrad.addColorStop(0.92, cfg.sky[4]);
  skyGrad.addColorStop(1,    cfg.sky[5]);
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, W, H); // fills whole canvas — terrain will paint over bottom

  // ── 2. STARS ────────────────────────────────────────────────────────────
  if (cfg.stars) {
    for (let i = 0; i < 220; i++) {
      const sx = seededRand(i * 3    ) * W;
      const sy = seededRand(i * 3 + 1) * skyH * 0.88;
      const sz = 1 + seededRand(i * 3 + 2) * 1.8;
      ctx.globalAlpha = 0.45 + seededRand(i * 3 + 2) * 0.55;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(Math.round(sx), Math.round(sy), sz, sz);
    }
    ctx.globalAlpha = 1;
  }

  // ── 3. SUN ──────────────────────────────────────────────────────────────
  if (cfg.sun && cfg.sc) {
    const sunX  = (cfg.sx / 320) * W;
    const sunY  = (cfg.sy / 200) * skyH * 0.88;
    const sunSz = W * 0.038;

    // Outer atmospheric glow
    const glow = ctx.createRadialGradient(
      sunX + sunSz / 2, sunY + sunSz / 2, sunSz * 0.4,
      sunX + sunSz / 2, sunY + sunSz / 2, sunSz * 3.2,
    );
    glow.addColorStop(0,   hexToRgba(cfg.si || cfg.sc, 0.55));
    glow.addColorStop(0.4, hexToRgba(cfg.sg || cfg.sc, 0.25));
    glow.addColorStop(1,   hexToRgba(cfg.sg || cfg.sc, 0));
    ctx.fillStyle = glow;
    ctx.fillRect(sunX - sunSz * 2.5, sunY - sunSz * 2.5, sunSz * 7, sunSz * 7);

    // Sun square (Minecraft-style solid block)
    ctx.fillStyle = cfg.sc;
    ctx.fillRect(Math.round(sunX), Math.round(sunY), Math.round(sunSz), Math.round(sunSz));
  }

  // ── 4. MOON ─────────────────────────────────────────────────────────────
  if (cfg.moon) {
    const moonX  = (cfg.mx / 320) * W;
    const moonY  = (cfg.my / 200) * skyH * 0.88;
    const moonSz = W * 0.028;
    // Soft moon glow
    const mglow = ctx.createRadialGradient(
      moonX + moonSz / 2, moonY + moonSz / 2, 0,
      moonX + moonSz / 2, moonY + moonSz / 2, moonSz * 2.5,
    );
    mglow.addColorStop(0,   "rgba(200,220,255,0.3)");
    mglow.addColorStop(1,   "rgba(200,220,255,0)");
    ctx.fillStyle = mglow;
    ctx.fillRect(moonX - moonSz * 1.5, moonY - moonSz * 1.5, moonSz * 5, moonSz * 5);
    // Moon block
    ctx.fillStyle = "#dde8ff";
    ctx.fillRect(Math.round(moonX), Math.round(moonY), Math.round(moonSz), Math.round(moonSz));
  }

  // ── 5. TERRAIN ──────────────────────────────────────────────────────────
  // Strategy:
  //   • Fill entire bottom half with foreground grass colour (the "base")
  //   • Paint terrain strips back→front, each chained from the previous
  //   • Narrow strips (hills) sit on top of the base; to their sides the
  //     base shows through — which is correct (flat terrain at those x values)

  const terrainStart = H * 0.38; // y where the highest hill peak begins

  // Base fill — lowest terrain level covers everything below terrainStart
  ctx.fillStyle = cfg.fore;
  ctx.fillRect(0, terrainStart, W, H - terrainStart);

  // Strip definitions: [grassFrac, cliffFrac, x1Frac, x2Frac, topColor, cliffColor]
  // Chained top-to-bottom; x extents narrow for back strips (the hill), full for front
  type Strip = {
    gF: number; cF: number;
    x1: number; x2: number;
    top: string; cliff: string;
  };

  const S: Strip[] = [
    // ── Back hill silhouette (narrow, near horizon) ──
    { gF:0.016, cF:0.010, x1:0.10, x2:0.60, top:cfg.hills,    cliff:darken(cfg.hills,    0.62) },
    { gF:0.018, cF:0.012, x1:0.06, x2:0.70, top:cfg.hills,    cliff:darken(cfg.hills,    0.62) },
    { gF:0.022, cF:0.015, x1:0.02, x2:0.82, top:cfg.hillTop,  cliff:darken(cfg.hillTop,  0.62) },
    // ── Stepped mid-ground (progressively full-width) ──
    { gF:0.030, cF:0.020, x1:0.00, x2:0.93, top:cfg.meadowTop,cliff:darken(cfg.meadowTop,0.62) },
    { gF:0.038, cF:0.026, x1:0.00, x2:1.00, top:cfg.meadow,   cliff:darken(cfg.meadow,   0.62) },
    { gF:0.050, cF:0.034, x1:0.00, x2:1.00, top:cfg.grass,    cliff:darken(cfg.grass,    0.62) },
    // ── Near foreground step ──
    { gF:0.064, cF:0.044, x1:0.00, x2:1.00, top:cfg.grass,    cliff:darken(cfg.grass,    0.60) },
  ];

  let ty = terrainStart;

  for (const { gF, cF, x1, x2, top, cliff } of S) {
    const grassH = gF * H;
    const cliffH = cF * H;
    const rx     = x1 * W;
    const rw     = (x2 - x1) * W;

    // Grass top face
    ctx.fillStyle = top;
    ctx.fillRect(rx, ty, rw, grassH);

    // Cliff face — upper 72% dark green, lower 28% dirt brown
    ctx.fillStyle = cliff;
    ctx.fillRect(rx, ty + grassH, rw, cliffH * 0.72);
    ctx.fillStyle = darken(cfg.dirt, 0.9);
    ctx.fillRect(rx, ty + grassH + cliffH * 0.72, rw, cliffH * 0.28);

    ty += grassH + cliffH;
  }

  // Final foreground fill to the very bottom (seamless)
  ctx.fillStyle = cfg.fore;
  ctx.fillRect(0, ty, W, H - ty);

  // ── 6. CLOUDS ───────────────────────────────────────────────────────────
  const NUM_CLOUDS = 6;
  const cloudW = W * 0.145;
  // Fixed y offsets per cloud (fraction of skyH)
  const cloudYFracs = [0.06, 0.15, 0.22, 0.09, 0.28, 0.17];
  const cloudShapeIdx = [0, 2, 1, 4, 3, 1];

  ctx.globalAlpha = cfg.cloudOp;
  ctx.fillStyle   = cfg.cloud;

  for (let i = 0; i < NUM_CLOUDS; i++) {
    const cx  = cloudOffsets[i];
    const cy  = cloudYFracs[i] * skyH;
    const cw  = cloudW * (0.75 + (i % 3) * 0.25); // varied sizes
    const ch  = cw * 0.45;
    const blocks = CLOUD_SHAPES[cloudShapeIdx[i]];

    for (const [bx, by, bw, bh] of blocks) {
      ctx.fillRect(
        cx  + (bx / 100) * cw,
        cy  + (by / 100) * ch,
        (bw / 100) * cw,
        (bh / 100) * ch,
      );
    }
  }
  ctx.globalAlpha = 1;
}

// ── Component ─────────────────────────────────────────────────────────────
export default function WallpaperCanvas({ cfg }: { cfg: WallpaperCfg }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    // Initialise cloud x-offsets spread evenly across 1.4× the canvas width
    const NUM_CLOUDS  = 6;
    const cloudSpeeds = [0.28, 0.20, 0.32, 0.17, 0.38, 0.23];
    let cloudOffsets  = Array.from({ length: NUM_CLOUDS }, () => 0); // filled on first resize

    let W = 0, H = 0;

    function resize() {
      const newW = canvas.offsetWidth  * DPR;
      const newH = canvas.offsetHeight * DPR;
      if (newW === W && newH === H) return;
      W = newW; H = newH;
      canvas.width  = W;
      canvas.height = H;
      // Spread clouds across width on first init
      if (cloudOffsets.every(o => o === 0)) {
        cloudOffsets = Array.from({ length: NUM_CLOUDS }, (_, i) => (i / NUM_CLOUDS) * W * 1.4 - W * 0.1);
      }
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    let raf = 0;
    function animate() {
      raf = requestAnimationFrame(animate);
      resize(); // handles canvas resize smoothly
      // Advance clouds left → right, wrap when past right edge
      const cloudW = W * 0.145 * 1.25; // max cloud width
      for (let i = 0; i < NUM_CLOUDS; i++) {
        cloudOffsets[i] += cloudSpeeds[i];
        if (cloudOffsets[i] > W + cloudW) cloudOffsets[i] = -cloudW * 1.4;
      }
      drawFrame(ctx, W, H, cfg, cloudOffsets);
    }
    animate();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [cfg]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
      aria-hidden
    />
  );
}
