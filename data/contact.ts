export const contactCategories = [
  { id: "job", label: "Job opportunity", hint: "Full-time or internship roles" },
  { id: "freelance", label: "Freelance project", hint: "A build or contract" },
  { id: "collab", label: "Collaboration", hint: "Open source or side projects" },
  { id: "question", label: "Technical question", hint: "About my work or code" },
  { id: "feedback", label: "Feedback", hint: "About this website" },
  { id: "other", label: "Something else", hint: "Anything that fits nowhere" },
] as const;

export type CategoryId = (typeof contactCategories)[number]["id"];

export const categoryLabel = (id: string) => contactCategories.find((c) => c.id === id)?.label ?? "General";
