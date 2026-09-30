export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const staticMode = process.env.NEXT_PUBLIC_STATIC === "1";
export const asset = (path: string) => `${basePath}${path}`;

export const site = {
  name: "Harsh Kumar Singh",
  initials: "HK",
  title: "Backend Engineer | Full Stack Developer | Software Engineer",
  location: "Delhi, India",
  email: "harshblank@gmail.com",
  github: "https://github.com/harshuopjs",
  githubUser: "harshuopjs",
  githubAccounts: [
    { user: "harshuopjs", url: "https://github.com/harshuopjs" },
    { user: "harshuopjs-software", url: "https://github.com/harshuopjs-software" },
  ],
  hiddenRepos: ["336-days-to-wedding"],
  linkedin: "https://www.linkedin.com/in/engi-harsh",
  linkedinHandle: "engi-harsh",
  legacyPortfolio: "https://yantraworks.cloud",
  resume: asset("/Harsh_Kumar_Singh_Resume.pdf"),
  resumeFile: "Harsh_Kumar_Singh_Resume.pdf",

  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.yantraworks.cloud").replace(/\/+$/, ""),
  description:
    "Backend engineer and full stack developer from Delhi. I build real-time systems, secure authentication and encrypted peer-to-peer apps.",
};

export const nav = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "github", label: "GitHub" },
  { id: "contact", label: "Contact" },
] as const;
