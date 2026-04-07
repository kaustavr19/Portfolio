"use client";

import { useRef, useState, useEffect } from "react";
import IconGrid from "./IconGrid";
import { WindowId } from "@/hooks/useWindowManager";
// WallpaperCanvas replaced by inline AnimatedWallpaper below

interface Props { onOpen: (id: WindowId) => void; }

// ── Time of day ───────────────────────────────────────────────────────────

type TOD = "pre-dawn" | "morning" | "noon" | "afternoon" | "sunset" | "night";

function getTOD(h: number): TOD {
  if (h >= 5  && h < 7)  return "pre-dawn";
  if (h >= 7  && h < 12) return "morning";
  if (h >= 12 && h < 15) return "noon";
  if (h >= 15 && h < 19) return "afternoon";
  if (h >= 19 && h < 21) return "sunset";
  return "night";
}

interface Cfg {
  sky: [string, string, string, string, string, string];
  hills: string; hillTop: string;
  meadow: string; meadowTop: string; fore: string; dirt: string; grass: string;
  cloud: string; cloudOp: number;
  sun: boolean; sx: number; sy: number; sc: string; sg: string; si: string;
  moon: boolean; mx: number; my: number;
  stars: boolean; animals: boolean; birds: boolean;
  fireflies: boolean; flowers: boolean;
}

const CFG: Record<TOD, Cfg> = {
  "pre-dawn": {
    sky: ["#0d0520","#2a0d38","#6a2050","#c04858","#e88870","#f0c878"],
    hills: "#2e5016", hillTop: "#3a6820",
    meadow: "#254414", meadowTop: "#2c5018", fore: "#182c0c", dirt: "#0c1c08", grass: "#3a6820",
    cloud: "#d0a090", cloudOp: 0.45,
    sun: false, sx: 0, sy: 0, sc: "", sg: "", si: "",
    moon: true, mx: 237, my: 22,
    stars: true, animals: false, birds: false, fireflies: false, flowers: false,
  },
  "morning": {
    sky: ["#c4e4f8","#a0ccf0","#78b0e8","#5498d8","#3c80c8","#2c6ab8"],
    hills: "#5ab838", hillTop: "#6ad838",
    meadow: "#42941e", meadowTop: "#62c030", fore: "#2d7a10", dirt: "#5a3e18", grass: "#62c030",
    cloud: "#ffffff", cloudOp: 0.97,
    sun: true, sx: 51, sy: 10, sc: "#f8d840", sg: "#f0c820", si: "#fff4a0",
    moon: false, mx: 0, my: 0,
    stars: false, animals: true, birds: true, fireflies: false, flowers: true,
  },
  "noon": {
    sky: ["#aad4f8","#7cbcf0","#50a8e8","#2c8cd8","#1474c8","#085cb8"],
    hills: "#64c840", hillTop: "#7ae840",
    meadow: "#4aaa24", meadowTop: "#6ad838", fore: "#358818", dirt: "#5a3e18", grass: "#6ad838",
    cloud: "#ffffff", cloudOp: 0.98,
    sun: true, sx: 144, sy: 5, sc: "#fff860", sg: "#fffaaa", si: "#fffdd0",
    moon: false, mx: 0, my: 0,
    stars: false, animals: true, birds: true, fireflies: false, flowers: true,
  },
  "afternoon": {
    sky: ["#c8d8e8","#b0c0d0","#a0a8c0","#c09860","#d88040","#e06830"],
    hills: "#68b838", hillTop: "#5aaa28",
    meadow: "#50901e", meadowTop: "#58a828", fore: "#387018", dirt: "#5a3e18", grass: "#58a828",
    cloud: "#fff4e8", cloudOp: 0.92,
    sun: true, sx: 243, sy: 13, sc: "#f0a030", sg: "#f8b850", si: "#fdd070",
    moon: false, mx: 0, my: 0,
    stars: false, animals: true, birds: false, fireflies: false, flowers: true,
  },
  "sunset": {
    sky: ["#0c0820","#30083c","#681828","#c03018","#e06020","#f0a040"],
    hills: "#4a7020", hillTop: "#446018",
    meadow: "#385818", meadowTop: "#3c5814", fore: "#204010", dirt: "#2c1c0c", grass: "#406018",
    cloud: "#f06030", cloudOp: 0.7,
    sun: true, sx: 275, sy: 88, sc: "#f03010", sg: "#f86020", si: "#f89050",
    moon: false, mx: 0, my: 0,
    stars: false, animals: true, birds: false, fireflies: false, flowers: false,
  },
  "night": {
    sky: ["#020308","#04060e","#060814","#080a18","#0a0c1e","#0c1024"],
    hills: "#0e1c08", hillTop: "#142808",
    meadow: "#0a1406", meadowTop: "#0e2006", fore: "#060e04", dirt: "#0a0c08", grass: "#183810",
    cloud: "#1a2430", cloudOp: 0.35,
    sun: false, sx: 0, sy: 0, sc: "", sg: "", si: "",
    moon: true, mx: 232, my: 13,
    stars: true, animals: false, birds: false, fireflies: true, flowers: false,
  },
};

// ── Static positions (deterministic) ─────────────────────────────────────

const STARS = Array.from({ length: 28 }, (_, i) => ({
  x: ((i * 37 + 11) % 300) + 10,
  y: ((i * 23 + 7)  % 90)  + 3,
  s: i % 4 === 0 ? 3 : 2,
  delay: `${((i * 37) % 28) * 0.1}s`,
  dur:   `${2.2 + (i % 3) * 0.5}s`,
}));

const FIREFLIES = Array.from({ length: 14 }, (_, i) => ({
  x: ((i * 43 + 17) % 272) + 24,
  y: ((i * 31 + 13) % 48)  + 134,
  delay: `${((i * 43) % 28) * 0.1}s`,
}));

const BLADES = [5,16,30,45,59,75,91,107,125,141,158,176,194,211,229,246,262,278,294,310];

// topY (SVG y) of each 32px-wide hill column, left→right
const HILL_COLS = [128, 120, 112, 105, 100, 103, 108, 112, 120, 126];

// ── Flat 2D trees ─────────────────────────────────────────────────────────

// Flat pixel-art pine tree — triangular canopy, trunk base at local y=50
function FlatPineTree({ x = 0, y = 0 }: { x?: number; y?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {/* Trunk */}
      <rect x={10} y={38} width={6}  height={12} fill="#6b3a1e" />
      <rect x={11} y={38} width={4}  height={12} fill="#8a4a28" />
      {/* Canopy tiers — narrowest at top */}
      <rect x={11} y={0}  width={4}  height={6}  fill="#3a8c18" />
      <rect x={9}  y={6}  width={8}  height={7}  fill="#44a020" />
      <rect x={6}  y={13} width={14} height={8}  fill="#4ab828" />
      <rect x={3}  y={21} width={20} height={8}  fill="#4eae2a" />
      <rect x={0}  y={29} width={26} height={9}  fill="#50b830" />
      {/* Shadow side */}
      <rect x={13} y={6}  width={4}  height={32} fill="#2e7010" opacity={0.35} />
    </g>
  );
}

// Flat pixel-art oak tree — rounded blob canopy, trunk base at local y=53
function FlatOakTree({ x = 0, y = 0 }: { x?: number; y?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {/* Trunk */}
      <rect x={18} y={40} width={8}  height={13} fill="#6b3a1e" />
      <rect x={19} y={40} width={5}  height={13} fill="#8a4a28" />
      {/* Canopy blob */}
      <rect x={10} y={32} width={24} height={10} fill="#3d9828" />
      <rect x={4}  y={22} width={36} height={12} fill="#4eae2e" />
      <rect x={0}  y={12} width={44} height={12} fill="#56c034" />
      <rect x={4}  y={4}  width={36} height={10} fill="#4eae2e" />
      <rect x={12} y={0}  width={20} height={6}  fill="#3d9828" />
      {/* Shadow clusters */}
      <rect x={4}  y={16} width={10} height={6}  fill="#2e7018" opacity={0.5} />
      <rect x={30} y={18} width={10} height={6}  fill="#2e7018" opacity={0.5} />
      <rect x={16} y={6}  width={12} height={5}  fill="#2e7018" opacity={0.5} />
      {/* Shadow right edge */}
      <rect x={34} y={12} width={10} height={20} fill="#2e7018" opacity={0.25} />
    </g>
  );
}

// Minecraft-accurate sheep: grey wool, grey face, brown legs
function Sheep({ x = 0, y = 0, flip = false }: { x?: number; y?: number; flip?: boolean }) {
  const W = 42;
  const tx = flip ? `translate(${x + W} ${y}) scale(-1 1)` : `translate(${x} ${y})`;
  return (
    <g transform={tx}>
      {/* Wool body — top face (lightest grey) */}
      <rect x={8}  y={2}  width={30} height={4}  fill="#f0f0e8" />
      {/* Wool body — side face (mid grey) */}
      <rect x={8}  y={6}  width={30} height={10} fill="#c8c8c0" />
      {/* Wool body — bottom shading */}
      <rect x={8}  y={14} width={30} height={4}  fill="#a8a8a0" />
      {/* Wool texture blocks */}
      <rect x={12} y={6}  width={6}  height={5}  fill="#b8b8b0" />
      <rect x={22} y={8}  width={7}  height={4}  fill="#c0c0b8" />
      <rect x={32} y={6}  width={4}  height={5}  fill="#b0b0a8" />
      {/* Head (grey, same family as wool) */}
      <rect x={0}  y={8}  width={10} height={10} fill="#909088" />
      {/* Head top face */}
      <rect x={0}  y={8}  width={10} height={3}  fill="#a8a8a0" />
      {/* White blaze marking */}
      <rect x={3}  y={9}  width={4}  height={3}  fill="#e8e8e0" />
      {/* Eye */}
      <rect x={1}  y={11} width={3}  height={3}  fill="#111111" />
      <rect x={1}  y={11} width={1}  height={1}  fill="#444444" />
      {/* Pink snout */}
      <rect x={0}  y={14} width={7}  height={4}  fill="#c07878" />
      <rect x={1}  y={15} width={2}  height={2}  fill="#883030" />
      <rect x={4}  y={15} width={2}  height={2}  fill="#883030" />
      {/* Legs — tan/brown Minecraft legs */}
      <rect x={10} y={18} width={5}  height={10} fill="#7a7060" />
      <rect x={17} y={18} width={5}  height={10} fill="#6a6050" />
      <rect x={27} y={18} width={5}  height={10} fill="#7a7060" />
      <rect x={34} y={18} width={5}  height={10} fill="#6a6050" />
      {/* Hooves */}
      <rect x={10} y={26} width={5}  height={2}  fill="#222018" />
      <rect x={17} y={26} width={5}  height={2}  fill="#222018" />
      <rect x={27} y={26} width={5}  height={2}  fill="#222018" />
      <rect x={34} y={26} width={5}  height={2}  fill="#222018" />
      {/* Tail */}
      <rect x={38} y={4}  width={4}  height={5}  fill="#e8e8e0" />
    </g>
  );
}

// Minecraft horse: brown body, cream mane/tail, grey lower legs
function Horse({ x = 0, y = 0, flip = false }: { x?: number; y?: number; flip?: boolean }) {
  const W = 46;
  const tx = flip ? `translate(${x + W} ${y}) scale(-1 1)` : `translate(${x} ${y})`;
  return (
    <g transform={tx}>
      {/* Body — top face (lighter reddish-brown) */}
      <rect x={10} y={6}  width={30} height={4}  fill="#a85c2a" />
      {/* Body — main side */}
      <rect x={10} y={10} width={30} height={10} fill="#8b4820" />
      {/* Body — belly shading */}
      <rect x={10} y={18} width={30} height={4}  fill="#6a3818" />
      {/* Neck */}
      <rect x={6}  y={1}  width={10} height={12} fill="#8b4820" />
      <rect x={8}  y={1}  width={8}  height={4}  fill="#a85c2a" />
      {/* Head */}
      <rect x={0}  y={1}  width={11} height={11} fill="#7a3c18" />
      {/* Head top face */}
      <rect x={0}  y={1}  width={11} height={3}  fill="#8c4c24" />
      {/* White blaze on face */}
      <rect x={2}  y={4}  width={5}  height={6}  fill="#ddd4c0" />
      {/* Eye */}
      <rect x={1}  y={4}  width={2}  height={3}  fill="#111111" />
      <rect x={2}  y={4}  width={1}  height={1}  fill="#555555" />
      {/* Nostril */}
      <rect x={0}  y={9}  width={3}  height={2}  fill="#4a2010" />
      {/* Mane — cream/golden, along neck */}
      <rect x={6}  y={0}  width={8}  height={3}  fill="#d4b870" />
      <rect x={8}  y={3}  width={4}  height={9}  fill="#c4a860" />
      {/* Tail */}
      <rect x={40} y={4}  width={6}  height={4}  fill="#d4b870" />
      <rect x={42} y={8}  width={4}  height={8}  fill="#c4a860" />
      <rect x={43} y={15} width={3}  height={5}  fill="#b49850" />
      {/* Legs — upper brown, lower grey (Minecraft horse legs) */}
      <rect x={12} y={22} width={6}  height={7}  fill="#7a3c18" />
      <rect x={12} y={29} width={6}  height={5}  fill="#b0a898" />
      <rect x={20} y={22} width={6}  height={7}  fill="#6a3010" />
      <rect x={20} y={29} width={6}  height={5}  fill="#a09888" />
      <rect x={30} y={22} width={6}  height={7}  fill="#7a3c18" />
      <rect x={30} y={29} width={6}  height={5}  fill="#b0a898" />
      <rect x={38} y={22} width={6}  height={7}  fill="#6a3010" />
      <rect x={38} y={29} width={6}  height={5}  fill="#a09888" />
      {/* Hooves */}
      <rect x={12} y={32} width={6}  height={2}  fill="#1e1810" />
      <rect x={20} y={32} width={6}  height={2}  fill="#1e1810" />
      <rect x={30} y={32} width={6}  height={2}  fill="#1e1810" />
      <rect x={38} y={32} width={6}  height={2}  fill="#1e1810" />
    </g>
  );
}

// Minecraft chicken: white body, orange beak, red comb/wattle, thin orange legs
function Chicken({ x = 0, y = 0, flip = false }: { x?: number; y?: number; flip?: boolean }) {
  const W = 16;
  const tx = flip ? `translate(${x + W} ${y}) scale(-1 1)` : `translate(${x} ${y})`;
  return (
    <g transform={tx}>
      {/* Body — white, rounded rectangle */}
      <rect x={3}  y={6}  width={12} height={9}  fill="#f0f0e8" />
      {/* Body top face */}
      <rect x={3}  y={6}  width={12} height={3}  fill="#ffffff" />
      {/* Body bottom shading */}
      <rect x={3}  y={13} width={12} height={2}  fill="#d0d0c8" />
      {/* Wing detail */}
      <rect x={4}  y={8}  width={8}  height={5}  fill="#d8d8d0" />
      <rect x={4}  y={8}  width={8}  height={2}  fill="#e8e8e0" />
      {/* Tail feathers (sticking up/back) */}
      <rect x={13} y={2}  width={3}  height={6}  fill="#f0f0e8" />
      <rect x={14} y={1}  width={2}  height={3}  fill="#e0e0d8" />
      {/* Head */}
      <rect x={0}  y={3}  width={8}  height={6}  fill="#f0f0e8" />
      <rect x={0}  y={3}  width={8}  height={2}  fill="#ffffff" />
      {/* Red comb */}
      <rect x={1}  y={0}  width={3}  height={4}  fill="#e02020" />
      <rect x={5}  y={1}  width={2}  height={3}  fill="#e02020" />
      {/* Eye */}
      <rect x={1}  y={4}  width={2}  height={2}  fill="#111111" />
      <rect x={2}  y={4}  width={1}  height={1}  fill="#555555" />
      {/* Beak */}
      <rect x={0}  y={6}  width={3}  height={2}  fill="#f0a020" />
      {/* Red wattle */}
      <rect x={0}  y={7}  width={2}  height={2}  fill="#d01818" />
      {/* Thin orange legs */}
      <rect x={6}  y={15} width={2}  height={5}  fill="#d49020" />
      <rect x={10} y={15} width={2}  height={5}  fill="#d49020" />
      {/* Feet (3-toed) */}
      <rect x={4}  y={19} width={4}  height={1}  fill="#d49020" />
      <rect x={9}  y={19} width={4}  height={1}  fill="#d49020" />
    </g>
  );
}

function PixelFlower({ x = 0, y = 0, color = "#f5c800", delay = "0s" }: {
  x?: number; y?: number; color?: string; delay?: string;
}) {
  const p = 3, cx = p + p / 2, cy = p * 5;
  return (
    <g transform={`translate(${x} ${y})`}>
      <g>
        <animateTransform attributeName="transform" type="rotate"
          values={`0 ${cx} ${cy}; 4 ${cx} ${cy}; 0 ${cx} ${cy}; -4 ${cx} ${cy}; 0 ${cx} ${cy}`}
          dur="5s" begin={delay} repeatCount="indefinite" />
        <rect x={p}     y={0}         width={p} height={p} fill={color} />
        <rect x={0}     y={p}         width={p} height={p} fill={color} />
        <rect x={p}     y={p}         width={p} height={p} fill="#c85800" />
        <rect x={p * 2} y={p}         width={p} height={p} fill={color} />
        <rect x={p}     y={p * 2}     width={p} height={p} fill={color} />
        <rect x={p}     y={p * 3}     width={p} height={p * 2} fill="#4a9020" />
        <rect x={p * 2} y={p * 3 + 1} width={p} height={p - 1} fill="#5aaa28" />
        <rect x={0}     y={p * 3 + 2} width={p} height={p - 1} fill="#5aaa28" />
      </g>
    </g>
  );
}

function GrassBlade({ x = 0, y = 0, height = 13, delay = "0s", color = "#4aaa20", tipColor = "#62c030" }: {
  x?: number; y?: number; height?: number; delay?: string; color?: string; tipColor?: string;
}) {
  const w = 2, px = 1;
  return (
    <g transform={`translate(${x} ${y - height})`}>
      <g>
        <animateTransform attributeName="transform" type="rotate"
          values={`-7 ${px} ${height}; 7 ${px} ${height}; -7 ${px} ${height}`}
          dur="3.2s" begin={delay} repeatCount="indefinite" />
        <rect x={0} y={2} width={w} height={height - 2} fill={color} />
        <rect x={0} y={0} width={w} height={2}          fill={tipColor} />
      </g>
    </g>
  );
}

function PixelSun({ x, y, sc, sg, si }: { x: number; y: number; sc: string; sg: string; si: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-6} y={-6} width={35} height={35} fill={sg} opacity={0.2} />
      <rect x={0}  y={0}  width={22} height={22} fill={sc} />
      <rect x={3}  y={3}  width={16} height={16} fill={sg} />
      <rect x={6}  y={6}  width={10} height={10} fill={si} />
      <rect x={8}  y={-6} width={6}  height={5}  fill={sc} />
      <rect x={8}  y={24} width={6}  height={5}  fill={sc} />
      <rect x={-8} y={8}  width={6}  height={6}  fill={sc} />
      <rect x={24} y={8}  width={6}  height={6}  fill={sc} />
      <rect x={-5} y={-5} width={5}  height={5}  fill={sc} />
      <rect x={22} y={-5} width={5}  height={5}  fill={sc} />
      <rect x={-5} y={22} width={5}  height={5}  fill={sc} />
      <rect x={22} y={22} width={5}  height={5}  fill={sc} />
    </g>
  );
}

function PixelMoon({ x = 232, y = 13 }: { x?: number; y?: number }) {
  const f = "#f0f0d0", c = "#c8c8a8";
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-5}  y={-5}  width={35} height={35} fill="#d8d870" opacity={0.1} />
      <rect x={6}   y={0}   width={13} height={3}  fill={f} />
      <rect x={3}   y={3}   width={19} height={3}  fill={f} />
      <rect x={0}   y={6}   width={26} height={13} fill={f} />
      <rect x={3}   y={19}  width={19} height={3}  fill={f} />
      <rect x={6}   y={22}  width={13} height={3}  fill={f} />
      <rect x={5}   y={8}   width={5}  height={3}  fill={c} />
      <rect x={14}  y={14}  width={6}  height={3}  fill={c} />
      <rect x={3}   y={16}  width={3}  height={3}  fill={c} />
    </g>
  );
}

function Stars() {
  return (
    <>
      {STARS.map((s, i) => (
        <g key={i} transform={`translate(${s.x} ${s.y})`}>
          <animate attributeName="opacity" values="0.9;0.3;0.9;1;0.7;0.9"
            dur={s.dur} begin={s.delay} repeatCount="indefinite" />
          {/* 2×2 bright core */}
          <rect x={0} y={0} width={2} height={2} fill="#ffffff" />
          {/* Cross arms on larger stars for a twinkle shape */}
          {s.s === 3 && <>
            <rect x={0}  y={-1} width={2} height={1} fill="#ffffff" opacity={0.5} />
            <rect x={0}  y={2}  width={2} height={1} fill="#ffffff" opacity={0.5} />
            <rect x={-1} y={0}  width={1} height={2} fill="#ffffff" opacity={0.5} />
            <rect x={2}  y={0}  width={1} height={2} fill="#ffffff" opacity={0.5} />
          </>}
        </g>
      ))}
    </>
  );
}

function Firefly({ x, y, delay = "0s" }: { x: number; y: number; delay?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g>
        <animateTransform attributeName="transform" type="translate"
          values="0 0; 3 -5; 6 -2; 3 -8; 0 -3; -3 -6; 0 0"
          dur="5s" begin={delay} repeatCount="indefinite" />
        <rect x={-5} y={-5} width={13} height={13} fill="#a0ff50" opacity="0">
          <animate attributeName="opacity" values="0;0.25;0;0.3;0"
            dur="2.8s" begin={delay} repeatCount="indefinite" />
        </rect>
        <rect x={0} y={0} width={3} height={3} fill="#d8ff70" opacity="0">
          <animate attributeName="opacity" values="0;0;0.9;1;0.6;0"
            dur="2.8s" begin={delay} repeatCount="indefinite" />
        </rect>
      </g>
    </g>
  );
}

// ── Windmill ──────────────────────────────────────────────────────────────

function Windmill({ x = 0, y = 0 }: { x?: number; y?: number }) {
  // Blades rotate around local (12, 12). Tower base at local y=50.
  return (
    <g transform={`translate(${x} ${y})`}>
      {/* Tower — from hub down to base */}
      <rect x={8}  y={12} width={8}  height={38} fill="#d0c8b8" />
      <rect x={9}  y={12} width={6}  height={38} fill="#e0d8c8" />
      <rect x={8}  y={12} width={1}  height={38} fill="#b8b0a0" />
      {/* Door at base */}
      <rect x={10} y={42} width={4}  height={8}  fill="#6a5030" />
      {/* Spinning blades — exactly centred on (12, 12) */}
      <g>
        <animateTransform attributeName="transform" type="rotate"
          from="0 12 12" to="360 12 12" dur="6s" repeatCount="indefinite" />
        {/* Top blade: x centred at 12, extends from y=0 to y=12 */}
        <rect x={10} y={0}  width={4} height={12} fill="#e8d8a8" />
        {/* Right blade: y centred at 12, extends from x=12 to x=24 */}
        <rect x={12} y={10} width={12} height={4} fill="#d8c898" />
        {/* Bottom blade */}
        <rect x={10} y={12} width={4} height={12} fill="#e8d8a8" />
        {/* Left blade: extends from x=0 to x=12 */}
        <rect x={0}  y={10} width={12} height={4} fill="#d8c898" />
      </g>
      {/* Hub — 4×4 centred on (12, 12) */}
      <rect x={10} y={10} width={4} height={4} fill="#807060" />
    </g>
  );
}

// ── Hot Air Balloon ───────────────────────────────────────────────────────

function HotAirBalloon() {
  return (
    <g>
      {/* Horizontal drift right → left */}
      <animateTransform attributeName="transform" type="translate"
        from="360 25" to="-60 25" dur="120s" repeatCount="indefinite" />
      <g>
        {/* Gentle vertical bob */}
        <animateTransform attributeName="transform" type="translate"
          values="0 0; 0 -3; 0 0; 0 2; 0 0" dur="7s" repeatCount="indefinite" />
        {/* Balloon — coloured stripes */}
        <rect x={5}  y={0}  width={12} height={2} fill="#ff3030" />
        <rect x={2}  y={2}  width={18} height={3} fill="#ff7020" />
        <rect x={0}  y={5}  width={22} height={3} fill="#ffee20" />
        <rect x={0}  y={8}  width={22} height={3} fill="#30c050" />
        <rect x={0}  y={11} width={22} height={3} fill="#2080f0" />
        <rect x={2}  y={14} width={18} height={3} fill="#9020d0" />
        <rect x={5}  y={17} width={12} height={2} fill="#ff3030" />
        {/* Ropes */}
        <rect x={4}  y={19} width={1}  height={4} fill="#9a6828" />
        <rect x={17} y={19} width={1}  height={4} fill="#9a6828" />
        {/* Basket */}
        <rect x={4}  y={23} width={14} height={7} fill="#8a5828" />
        <rect x={5}  y={23} width={12} height={2} fill="#a07038" />
        <rect x={4}  y={23} width={1}  height={7} fill="#6a4020" />
        <rect x={17} y={23} width={1}  height={7} fill="#6a4020" />
      </g>
    </g>
  );
}

// ── Shooting Star ─────────────────────────────────────────────────────────

function ShootingStar({ x = 280, y = 8, delay = "0s" }: { x?: number; y?: number; delay?: string }) {
  return (
    <g transform={`translate(${x} ${y})`} opacity="0">
      <animate attributeName="opacity"
        values="0;0;1;0.8;0.3;0;0;0;0;0"
        keyTimes="0;0.05;0.1;0.2;0.28;0.35;0.5;0.7;0.85;1"
        dur="14s" begin={delay} repeatCount="indefinite" />
      <animateTransform additive="sum" attributeName="transform" type="translate"
        values="0 0; -50 25; -50 25; 0 0"
        keyTimes="0; 0.35; 0.9; 1"
        dur="14s" begin={delay} repeatCount="indefinite" />
      {/* Diagonal streak — head at lower-left, tail fades upper-right */}
      <rect x={0} y={4} width={4} height={2} fill="#ffffff" />
      <rect x={4} y={2} width={3} height={2} fill="#e8e8ff" opacity="0.7" />
      <rect x={7} y={0} width={3} height={2} fill="#c0c0ff" opacity="0.35" />
    </g>
  );
}

// ── Butterfly ─────────────────────────────────────────────────────────────

function Butterfly({ x = 0, y = 0, delay = "0s" }: { x?: number; y?: number; delay?: string }) {
  return (
    <g>
      {/* Oval drift path */}
      <animateTransform attributeName="transform" type="translate"
        values={`${x} ${y}; ${x+8} ${y-4}; ${x+14} ${y}; ${x+8} ${y+4}; ${x} ${y}; ${x-6} ${y-2}; ${x} ${y}`}
        dur="12s" begin={delay} repeatCount="indefinite" />
      {/* Left wing — flap by shrinking/growing width */}
      <rect x={-6} y={0} width={5} height={4} fill="#cc66ff" opacity="0.9">
        <animate attributeName="width" values="5;1;5;1;5" dur="0.35s" begin={delay} repeatCount="indefinite" />
      </rect>
      {/* Right wing */}
      <rect x={2}  y={0} width={5} height={4} fill="#cc66ff" opacity="0.9">
        <animate attributeName="width" values="5;1;5;1;5" dur="0.35s" begin={delay} repeatCount="indefinite" />
      </rect>
      {/* Body */}
      <rect x={-1} y={-1} width={3} height={7} fill="#222222" />
      {/* Antennae */}
      <rect x={-1} y={-3} width={1} height={2} fill="#444444" />
      <rect x={2}  y={-3} width={1} height={2} fill="#444444" />
    </g>
  );
}

// ── Pixel Rabbit ──────────────────────────────────────────────────────────

function PixelRabbit() {
  return (
    <g>
      {/* Horizontal hop across meadow (left → right) */}
      <animateTransform attributeName="transform" type="translate"
        from="-20 130" to="340 130" dur="50s" repeatCount="indefinite" />
      <g>
        {/* Vertical hop cycle */}
        <animateTransform attributeName="transform" type="translate"
          values="0 0; 0 -6; 0 0; 0 -5; 0 0; 0 0; 0 0; 0 0"
          keyTimes="0; 0.05; 0.1; 0.15; 0.22; 0.4; 0.7; 1"
          dur="2.8s" repeatCount="indefinite" />
        {/* Ears */}
        <rect x={3}  y={-8} width={3}  height={7}  fill="#e0d0d0" />
        <rect x={8}  y={-9} width={3}  height={8}  fill="#e0d0d0" />
        <rect x={4}  y={-7} width={1}  height={5}  fill="#d090a0" />
        <rect x={9}  y={-8} width={1}  height={6}  fill="#d090a0" />
        {/* Body */}
        <rect x={1}  y={0}  width={13} height={9}  fill="#e8e0d8" />
        <rect x={0}  y={2}  width={2}  height={5}  fill="#ddd5cc" />
        {/* Head */}
        <rect x={0}  y={-5} width={9}  height={7}  fill="#e8e0d8" />
        {/* Eye */}
        <rect x={1}  y={-4} width={2}  height={2}  fill="#ff2050" />
        {/* Nose */}
        <rect x={0}  y={0}  width={3}  height={1}  fill="#f080a0" />
        {/* Tail */}
        <rect x={12} y={1}  width={4}  height={4}  fill="#ffffff" />
        {/* Legs */}
        <rect x={2}  y={9}  width={4}  height={5}  fill="#d8d0c8" />
        <rect x={8}  y={9}  width={4}  height={5}  fill="#d8d0c8" />
        <rect x={1}  y={13} width={6}  height={2}  fill="#c8c0b8" />
        <rect x={8}  y={13} width={6}  height={2}  fill="#c8c0b8" />
      </g>
    </g>
  );
}

// ── Wallpaper ─────────────────────────────────────────────────────────────

function AnimatedWallpaper({ cfg }: { cfg: Cfg }) {
  return (
    <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      shapeRendering="crispEdges"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", imageRendering: "pixelated", zIndex: 0 }}
      aria-hidden>

      {/* Sky strips */}
      <rect x="0" y="0"   width="320" height="20"  fill={cfg.sky[0]} />
      <rect x="0" y="20"  width="320" height="20"  fill={cfg.sky[1]} />
      <rect x="0" y="40"  width="320" height="20"  fill={cfg.sky[2]} />
      <rect x="0" y="60"  width="320" height="20"  fill={cfg.sky[3]} />
      <rect x="0" y="80"  width="320" height="20"  fill={cfg.sky[4]} />
      <rect x="0" y="100" width="320" height="100" fill={cfg.sky[5]} />

      {cfg.stars && <Stars />}
      {cfg.stars && <>
        <ShootingStar x={270} y={8}  delay="0s"   />
        <ShootingStar x={220} y={18} delay="5s"   />
        <ShootingStar x={295} y={12} delay="9.5s" />
      </>}
      {cfg.moon  && <PixelMoon x={cfg.mx} y={cfg.my} />}
      {cfg.sun   && <PixelSun x={cfg.sx} y={cfg.sy} sc={cfg.sc} sg={cfg.sg} si={cfg.si} />}

      {/* Cloud 1 – 90s drift */}
      <g>
        <animateTransform attributeName="transform" type="translate"
          from="-80 0" to="400 0" dur="90s" repeatCount="indefinite" />
        <rect x="16" y="3"  width="35" height="6" fill={cfg.cloud} opacity={cfg.cloudOp} />
        <rect x="10" y="10" width="51" height="6" fill={cfg.cloud} opacity={cfg.cloudOp} />
        <rect x="3"  y="16" width="64" height="6" fill={cfg.cloud} opacity={cfg.cloudOp} />
        <rect x="6"  y="22" width="58" height="6" fill={cfg.cloud} opacity={cfg.cloudOp} />
        <rect x="6"  y="27" width="58" height="3" fill="#c8d8e8"   opacity={cfg.cloudOp * 0.3} />
      </g>
      {/* Cloud 2 – 72s drift */}
      <g>
        <animateTransform attributeName="transform" type="translate"
          from="-80 0" to="400 0" dur="72s" begin="-24s" repeatCount="indefinite" />
        <rect x="6"  y="29" width="38" height="6" fill={cfg.cloud} opacity={cfg.cloudOp} />
        <rect x="0"  y="35" width="51" height="6" fill={cfg.cloud} opacity={cfg.cloudOp} />
        <rect x="3"  y="42" width="45" height="6" fill={cfg.cloud} opacity={cfg.cloudOp} />
        <rect x="3"  y="46" width="45" height="3" fill="#c8d8e8"   opacity={cfg.cloudOp * 0.25} />
      </g>
      {/* Cloud 3 – 58s drift */}
      <g>
        <animateTransform attributeName="transform" type="translate"
          from="-80 0" to="400 0" dur="58s" begin="-42s" repeatCount="indefinite" />
        <rect x="6"  y="51" width="26" height="6" fill={cfg.cloud} opacity={cfg.cloudOp} />
        <rect x="0"  y="58" width="38" height="6" fill={cfg.cloud} opacity={cfg.cloudOp} />
        <rect x="3"  y="64" width="32" height="6" fill={cfg.cloud} opacity={cfg.cloudOp} />
      </g>

      {/* Hot air balloon — daytime only */}
      {cfg.flowers && <HotAirBalloon />}

      {/* Birds — M-wing silhouettes in sky */}
      {cfg.birds && <>
        <g>
          <animateTransform attributeName="transform" type="translate"
            from="-60 0" to="380 0" dur="75s" repeatCount="indefinite" />
          <rect x={0}  y={44} width={4} height={2} fill="#1a1a3e" />
          <rect x={6}  y={44} width={4} height={2} fill="#1a1a3e" />
          <rect x={3}  y={46} width={4} height={2} fill="#1a1a3e" />
          <rect x={16} y={41} width={4} height={2} fill="#1a1a3e" />
          <rect x={22} y={41} width={4} height={2} fill="#1a1a3e" />
          <rect x={19} y={43} width={4} height={2} fill="#1a1a3e" />
          <rect x={34} y={44} width={4} height={2} fill="#1a1a3e" />
          <rect x={40} y={44} width={4} height={2} fill="#1a1a3e" />
          <rect x={37} y={46} width={4} height={2} fill="#1a1a3e" />
        </g>
        <g>
          <animateTransform attributeName="transform" type="translate"
            from="-60 0" to="380 0" dur="100s" begin="-60s" repeatCount="indefinite" />
          <rect x={0}  y={66} width={4} height={2} fill="#1a1a3e" />
          <rect x={6}  y={66} width={4} height={2} fill="#1a1a3e" />
          <rect x={3}  y={68} width={4} height={2} fill="#1a1a3e" />
          <rect x={18} y={63} width={4} height={2} fill="#1a1a3e" />
          <rect x={24} y={63} width={4} height={2} fill="#1a1a3e" />
          <rect x={21} y={65} width={4} height={2} fill="#1a1a3e" />
        </g>
      </>}

      {/* ── Flat front-facing terrain ─────────────────────────────────── */}

      {/* Hill columns — each 32 px wide, flat front view */}
      {HILL_COLS.map((topY, col) => {
        const cx = col * 32;
        return (
          <g key={col}>
            {/* Earth/dirt body */}
            <rect x={cx} y={topY + 6} width={32} height={145 - topY - 6} fill={cfg.dirt} />
            {/* Grass-to-earth border (1px dark line for separation) */}
            <rect x={cx} y={topY + 5} width={32} height={1} fill={cfg.fore} />
            {/* Grass layer */}
            <rect x={cx} y={topY} width={32} height={5} fill={cfg.hillTop} />
          </g>
        );
      })}

      {/* Trees (planted on their column's topY) */}
      <FlatPineTree x={5}   y={78} />
      <FlatOakTree  x={32}  y={67} />
      <FlatPineTree x={70}  y={62} />
      <FlatOakTree  x={237} y={59} />
      <FlatPineTree x={272} y={70} />
      <FlatPineTree x={294} y={76} />
      {/* Windmill — on the peak of the hill, tower base at terrain topY=100 */}
      <Windmill x={140} y={50} />

      {/* Meadow platform — flat */}
      <rect x={0} y={142} width={320} height={5} fill={cfg.meadowTop} />
      <rect x={0} y={147} width={320} height={1} fill={cfg.fore} />
      <rect x={0} y={148} width={320} height={22} fill={cfg.dirt} />

      {/* Animals — standing on meadow (feet at y=145) */}
      {cfg.animals && <>
        <Sheep   x={42}  y={117} />
        <Horse   x={128} y={111} />
        <Sheep   x={215} y={117} flip />
        <Chicken x={95}  y={125} />
        <Chicken x={188} y={127} flip />
        <Chicken x={255} y={125} />
        <PixelRabbit />
      </>}

      {cfg.flowers && <>
        <PixelFlower x={22}  y={139} color="#f5c800" delay="0s"   />
        <PixelFlower x={48}  y={142} color="#ffaacc" delay="0.5s" />
        <PixelFlower x={93}  y={138} color="#d8eaff" delay="1.1s" />
        <PixelFlower x={141} y={140} color="#f5c800" delay="0.3s" />
        <PixelFlower x={170} y={136} color="#ffaacc" delay="0.8s" />
        <PixelFlower x={208} y={139} color="#d8eaff" delay="0.4s" />
        <PixelFlower x={253} y={138} color="#f5c800" delay="1.3s" />
        <PixelFlower x={285} y={141} color="#ffaacc" delay="0.6s" />
        {/* Butterflies drifting above the flowers */}
        <Butterfly x={52}  y={128} delay="0s"   />
        <Butterfly x={158} y={130} delay="2.3s" />
        <Butterfly x={262} y={127} delay="4.7s" />
      </>}

      {/* Foreground block — flat grass + dark edge + dirt body */}
      <rect x={0} y={167} width={320} height={5} fill={cfg.grass} />
      <rect x={0} y={172} width={320} height={1} fill={cfg.fore} />
      <rect x={0} y={173} width={320} height={27} fill={cfg.dirt} />

      {/* Grass blades — rooted at top of foreground grass */}
      {BLADES.map((bx, i) => (
        <GrassBlade key={bx} x={bx} y={167}
          height={i % 3 === 0 ? 14 : i % 3 === 1 ? 11 : 13}
          delay={`${(i * 0.23) % 1.2}s`}
          color={cfg.meadow} tipColor={cfg.grass} />
      ))}

      {/* Fireflies — night only */}
      {cfg.fireflies && FIREFLIES.map((f, i) => (
        <Firefly key={i} x={f.x} y={f.y} delay={f.delay} />
      ))}
    </svg>
  );
}

// ── Desktop ───────────────────────────────────────────────────────────────

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
