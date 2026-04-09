export interface ProcessStep {
  number: string;
  title: string;
}

export interface Metric {
  value: string;
  label: string;
}

export type SectionBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "bullets"; items: string[] }
  | { type: "callout"; text: string; label?: string }
  | { type: "kpi-row"; items: Array<{ value: string; label: string }> };

export interface CaseStudySection {
  title: string;
  blocks: SectionBlock[];
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tag: { label: string; variant: "amber" | "teal" | "muted" };
  metrics?: Metric[];
  process: ProcessStep[];
  sections?: CaseStudySection[];
  ndaNote?: string;
  wip?: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "cogentiq",
    title: "Cogentiq Design Language System",
    subtitle: "Fractal Analytics · May–Nov 2025 · Design Lead (Systems & Governance)",
    description:
      "Unified 10+ Cogentiq enterprise AI products under one design language system — 173 tokens, 42 components, enabling faster feature velocity, consistent UX, and shared governance across 6 designers and 10+ products.",
    tag: { label: "FEATURED", variant: "amber" },
    metrics: [
      { value: "173", label: "Design tokens" },
      { value: "42", label: "Components" },
      { value: "10+", label: "Products unified" },
      { value: "6", label: "Designers" },
    ],
    process: [
      { number: "01", title: "Stakeholder interviews — design, dev & leadership" },
      { number: "02", title: "Cross-product audit of all pattern variants" },
      { number: "03", title: "Token architecture: Core → Semantic → Component" },
      { number: "04", title: "Component library: 31 base + 11 agentic-specific" },
      { number: "05", title: "Governance model for system evolution" },
    ],
    sections: [
      {
        title: "Context & Challenge",
        blocks: [
          {
            type: "paragraph",
            text: "Fractal Analytics' Cogentiq platform is a suite of 10+ interconnected enterprise AI products serving hundreds of organisations. By mid-2025, the design ecosystem was fragmented — each product team had evolved its own patterns. Buttons looked slightly different. Colour systems didn't align. Typography varied. Developers received ambiguous handoffs. Designers spent cycles recreating components instead of solving user problems.",
          },
          {
            type: "callout",
            label: "The Problem",
            text: "Fragmentation had real impact: slower feature velocity, inconsistent user experience, duplicated effort, and design debt accumulating faster than it could be addressed.",
          },
          {
            type: "paragraph",
            text: "Leadership assigned us to build a unified design language system that could scale with the organisation and guide hundreds of designers and developers.",
          },
        ],
      },
      {
        title: "Research & Discovery",
        blocks: [
          {
            type: "paragraph",
            text: "Rather than imposing a system top-down, we started by understanding the problem from the inside — stakeholder interviews with product designers, developers, and engineering leaders across Fractal's Cogentiq division.",
          },
          { type: "heading", text: "Key Findings" },
          {
            type: "bullets",
            items: [
              "Design: Designers wanted a shared language to speed up work and focus on real problems.",
              "Development: Without token documentation, developers made assumptions about colour, spacing, and behaviour.",
              "Leadership: The organisation needed governance — who decides what's system-worthy?",
            ],
          },
          {
            type: "callout",
            label: "Surprising insight",
            text: "Designers actually wanted constraints. Constraints forced creativity on problems that mattered. Freedom on trivial choices felt like cognitive overhead. This shaped our entire approach.",
          },
        ],
      },
      {
        title: "Design Process",
        blocks: [
          { type: "heading", text: "Starting with an Audit" },
          {
            type: "paragraph",
            text: "We audited patterns across all 10+ products — every button, input, card, and modal variation. We found dozens of 'almost identical but slightly different' components that had evolved in isolation. This audit grounded us in reality and became our foundation.",
          },
          { type: "heading", text: "Token-First Architecture" },
          {
            type: "paragraph",
            text: "Start with tokens, not components. Tokens are the grammar of a design system — get the structure right and components follow naturally.",
          },
          {
            type: "kpi-row",
            items: [
              { value: "Core", label: "173 primitive tokens" },
              { value: "Semantic", label: "Purpose-mapped aliases" },
              { value: "Component", label: "Consumed by each component" },
            ],
          },
          { type: "heading", text: "Iterations" },
          {
            type: "bullets",
            items: [
              "Colour tokens: pruned from 200+ → 50 with consistent naming conventions",
              "Typography: simplified from 12 styles → 6 core scales",
              "Components: 31 base + 11 agentic-specific patterns",
            ],
          },
          { type: "heading", text: "Governance Layer" },
          {
            type: "paragraph",
            text: "Teams could request new components; the design system team reviewed them. If truly new (not a variant), it shipped. This prevented chaos while staying flexible.",
          },
        ],
      },
      {
        title: "Solution & Impact",
        blocks: [
          { type: "heading", text: "What Shipped" },
          {
            type: "bullets",
            items: [
              "173 design tokens across 7 core element categories",
              "31 base components + 11 agentic-specific components",
              "Accessibility guidelines covering WCAG standards",
              "White-labelling specifications",
              "Figma component library with full documentation",
            ],
          },
          { type: "heading", text: "Measured Impact" },
          {
            type: "kpi-row",
            items: [
              { value: "10+", label: "Products on system within 6 months" },
              { value: "~10%", label: "Pattern variance (down from ~40%)" },
              { value: "20–30%", label: "Faster feature implementation" },
            ],
          },
          {
            type: "paragraph",
            text: "Designers could focus on real problems. Developers knew exactly which token to use. Design critiques became about strategy, not debate.",
          },
        ],
      },
      {
        title: "Reflection & Learning",
        blocks: [
          {
            type: "paragraph",
            text: "This project taught me that design systems aren't about design. They're about governance, change management, and how organisations work.",
          },
          { type: "heading", text: "What I'd Do Differently" },
          {
            type: "bullets",
            items: [
              "Earlier accessibility involvement: Token decisions have accessibility implications — specialists belong at the start, not the end.",
              "Metrics from day one: Component usage, design-to-dev time, consistency scores drive evolution decisions.",
              "Customer feedback: Interview actual Cogentiq users — are our patterns intuitive to them?",
            ],
          },
          {
            type: "callout",
            label: "The bigger learning",
            text: "Building a design system requires research rigour beyond typical design. You're designing for designers and developers as users — different research, different metrics, different success measures. Systems design is underexplored territory.",
          },
        ],
      },
    ],
    ndaNote:
      "Figma component library and full documentation available on request — NDA applies to final screens.",
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
