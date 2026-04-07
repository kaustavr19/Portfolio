export interface ProcessStep {
  number: string;
  title: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tag: { label: string; variant: "amber" | "teal" | "muted" };
  metrics?: Metric[];
  process: ProcessStep[];
  ndaNote?: string;
  wip?: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "cogentiq",
    title: "Cogentiq — Agentic AI Command Centre",
    subtitle: "Fractal Analytics · 2024 · Enterprise UX · AI Interface Design",
    description:
      "Designed the end-to-end UX for an agentic AI platform serving enterprise data teams. Responsible for the AI interaction model, command architecture, and the Design Language System that unified 12 product surfaces.",
    tag: { label: "FEATURED", variant: "amber" },
    metrics: [
      { value: "12", label: "Product surfaces" },
      { value: "DLS", label: "Design system built" },
      { value: "AI", label: "Interaction model" },
    ],
    process: [
      { number: "01", title: "Discovery & stakeholder interviews" },
      { number: "02", title: "AI interaction model design" },
      { number: "03", title: "DLS architecture" },
      { number: "04", title: "Usability validation" },
    ],
    ndaNote:
      "Full case study available on request — NDA applies to final screens.",
  },
  {
    id: "insurance",
    title: "Insurance AI Underwriting Platform",
    subtitle: "Fractal Analytics · 2023–24 · Process Documentation Only",
    description:
      "Designed UX for an AI-powered underwriting platform serving a major insurance client. NDA applies to outputs — this documents process and design decisions only.",
    tag: { label: "PROCESS ONLY", variant: "teal" },
    process: [
      { number: "01", title: "Stakeholder mapping" },
      { number: "02", title: "Mental model research" },
      { number: "03", title: "Information architecture" },
      { number: "04", title: "Interaction design" },
      { number: "05", title: "Accessibility audit" },
    ],
    ndaNote:
      "Final screens are NDA-protected. The focus here is on how I think, not just what I made.",
  },
  {
    id: "eugenie",
    title: "Eugenie.ai — Predictive Maintenance Dashboard",
    subtitle: "2023 · Industrial IoT · ML Interface Design",
    description:
      "UX design for a machine learning predictive maintenance platform. Content being compiled — check back soon.",
    tag: { label: "WIP", variant: "muted" },
    process: [],
    wip: true,
  },
];
