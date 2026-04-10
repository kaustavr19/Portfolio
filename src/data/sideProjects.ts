import { SectionBlock } from "./projects";

export interface SideProject {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  description?: string;
  badge?: { label: string; variant: "teal" | "amber" | "muted" };
  url?: string;
  github?: string;
  tags?: string[];
  sections?: Array<{ title: string; blocks: SectionBlock[] }>;
}

export const sideProjects: SideProject[] = [
  {
    id: "stayput",
    emoji: "🧲",
    title: "StayPut",
    subtitle: "Attention management app · AI features · Firebase sync",
    description:
      "A calm, opinionated focus app for knowledge workers. No gamification. No streaks. Just you and the work.",
    badge: { label: "ACTIVE", variant: "teal" },
    url: "https://stayput-gentle-anchor-eight.vercel.app",
    github: "https://github.com/kaustavr19/stayput-gentle-anchor",
    tags: ["React 18", "TypeScript", "Firebase", "Groq AI", "Tailwind CSS"],
    sections: [
      {
        title: "Overview",
        blocks: [
          {
            type: "paragraph",
            text: "StayPut is a distraction-free focus application designed for knowledge workers. It provides structured session management without the noise of streaks, badges, or leaderboard pressure — just a clean space to do the work.",
          },
          {
            type: "callout",
            label: "Philosophy",
            text: "Gamification is noise. You don't need badges to do your work.",
          },
        ],
      },
      {
        title: "Key Features",
        blocks: [
          {
            type: "heading",
            text: "Session Modes",
          },
          {
            type: "bullets",
            items: [
              "Open — freeform uninterrupted focus",
              "Pomodoro — classic 25/5 work-break cycles",
              "Deep Work — extended blocks for high-focus tasks",
              "Custom — user-defined session lengths",
            ],
          },
          {
            type: "heading",
            text: "Distraction & Reflection Tools",
          },
          {
            type: "bullets",
            items: [
              "Distraction logging — capture what pulled you away without losing flow",
              "Parking Lot — a holding space for stray thoughts mid-session",
              "Session Reflection — structured end-of-session review",
              "Analytics with AI insights — patterns across your focus history",
            ],
          },
          {
            type: "heading",
            text: "AI Assist",
          },
          {
            type: "paragraph",
            text: "An AI-powered planning tab that generates actionable task breakdowns from a stated goal. Backed by Groq's Llama model. API keys stay local — never sent anywhere except Groq.",
          },
        ],
      },
      {
        title: "Tech Stack",
        blocks: [
          {
            type: "kpi-row",
            items: [
              { value: "React 18", label: "Frontend" },
              { value: "Firebase", label: "Auth & Sync" },
              { value: "Groq AI", label: "AI Planning" },
              { value: "Tailwind", label: "Styling" },
            ],
          },
        ],
      },
      {
        title: "Version 3 Highlights",
        blocks: [
          {
            type: "bullets",
            items: [
              "Assist goal planner with task tracking and AI breakdown",
              "Analytics dashboard with session trends",
              "XP-based tier progression and leaderboard",
              "Profile management and cloud sync across devices",
              "Mobile-responsive, dark mode supported",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "jotmd",
    emoji: "📝",
    title: "JotMD",
    subtitle: "Markdown editor · WYSIWYG · Drawing layer · No backend",
    description:
      "A clean, distraction-free markdown editor with live WYSIWYG preview, a Fabric.js drawing layer, three themes, and full import/export — all in the browser with no backend.",
    url: "https://jot-md.vercel.app",
    github: "https://github.com/kaustavr19/JotMD",
    tags: ["React 18", "Vite", "CodeMirror 6", "Tiptap v2", "Fabric.js"],
    sections: [
      {
        title: "Overview",
        blocks: [
          {
            type: "paragraph",
            text: "JotMD is a fully client-side markdown editor that keeps both a raw CodeMirror editor and a Tiptap WYSIWYG editor in sync — in real time. There's no backend, no accounts, no server. Everything lives in the browser.",
          },
        ],
      },
      {
        title: "Editor",
        blocks: [
          {
            type: "heading",
            text: "Three View Modes",
          },
          {
            type: "bullets",
            items: [
              "Split — raw markdown on the left, rendered preview on the right",
              "Markdown — fullscreen CodeMirror raw editor",
              "Preview — fullscreen WYSIWYG editor (Tiptap)",
            ],
          },
          {
            type: "heading",
            text: "Dual-Pane Live Sync",
          },
          {
            type: "paragraph",
            text: "CodeMirror 6 handles the raw markdown pane, Tiptap v2 handles the WYSIWYG pane. Edits in either pane reflect instantly in the other via tiptap-markdown bidirectional sync, with loop-prevention so changes don't echo back.",
          },
        ],
      },
      {
        title: "Slash Commands",
        blocks: [
          {
            type: "paragraph",
            text: "Type / anywhere in the WYSIWYG pane to open a floating command menu. Navigate with arrow keys, select with Enter, dismiss with Escape.",
          },
          {
            type: "bullets",
            items: [
              "/heading 1–3 — section headings",
              "/bullet — unordered list",
              "/numbered — ordered list",
              "/blockquote — indented quote block",
              "/code — fenced code block",
              "/divider — horizontal rule",
            ],
          },
        ],
      },
      {
        title: "Drawing Layer",
        blocks: [
          {
            type: "paragraph",
            text: "A Fabric.js canvas overlays the preview pane with a floating pill toolbar at the bottom.",
          },
          {
            type: "bullets",
            items: [
              "Pen — freehand drawing in 4 colors",
              "Highlighter — semi-transparent strokes in 5 colors",
              "Eraser — erase strokes by drawing over them",
              "Clear — remove all strokes at once",
            ],
          },
        ],
      },
      {
        title: "Tech Stack",
        blocks: [
          {
            type: "kpi-row",
            items: [
              { value: "React 18", label: "Framework" },
              { value: "CodeMirror 6", label: "Raw Editor" },
              { value: "Tiptap v2", label: "WYSIWYG" },
              { value: "Fabric.js", label: "Drawing" },
            ],
          },
          {
            type: "kpi-row",
            items: [
              { value: "Vite 5", label: "Bundler" },
              { value: "Tailwind", label: "Styling" },
              { value: "html2pdf.js", label: "PDF Export" },
              { value: "localStorage", label: "Autosave" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "ytmusic",
    emoji: "🎵",
    title: "YouTube Music Client",
    subtitle: "Reimagined UI · Immersive experience design",
  },
  {
    id: "apticrack",
    emoji: "⚡",
    title: "AptiCrack",
    subtitle: "Aptitude prep tool · Vibe-coded",
  },
];
