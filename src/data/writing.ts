export interface Article {
  id: string;
  title: string;
  tags: string;
  featured?: boolean;
}

export const articles: Article[] = [
  {
    id: "chernobyl",
    title: "Chernobyl wasn't a nuclear failure — it was a UX failure",
    tags: "Design systems · Error states · High-stakes interfaces",
    featured: true,
  },
  {
    id: "llms-rural",
    title: "LLMs for rural health workers: a design challenge",
    tags: "IndiaHCI · AI accessibility · Community design",
  },
  {
    id: "stayput-origin",
    title: "Why I built a productivity app to fight my own distraction",
    tags: "StayPut origin · Attention design",
  },
];
