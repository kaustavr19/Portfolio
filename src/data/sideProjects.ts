export interface SideProject {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  badge?: { label: string; variant: "teal" | "amber" | "muted" };
}

export const sideProjects: SideProject[] = [
  {
    id: "stayput",
    emoji: "🧲",
    title: "StayPut",
    subtitle: "Attention management app · AI features · Chrome extension",
    badge: { label: "ACTIVE", variant: "teal" },
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
