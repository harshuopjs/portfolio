export type SkillGroup = {
  id: string;
  title: string;
  blurb: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  { id: "lang", title: "Programming Languages", blurb: "Languages used across backend, mobile, systems and scripting work.", items: ["Python", "Java", "C", "C++", "Kotlin", "JavaScript"] },
  { id: "backend", title: "Backend & Real-Time", blurb: "APIs and real-time communication.", items: ["FastAPI", "Express.js", "Next.js", "REST APIs", "WebRTC", "Socket.IO", "WebSockets"] },
  { id: "frontend", title: "Frontend", blurb: "Responsive interfaces.", items: ["HTML", "CSS", "Tailwind CSS", "JavaScript", "Next.js"] },
  { id: "db", title: "Databases", blurb: "Relational and managed data stores.", items: ["PostgreSQL", "MySQL", "Firebase"] },
  { id: "sec", title: "Authentication & Security", blurb: "Securing accounts, sessions and APIs.", items: ["JWT", "OAuth", "Firebase Authentication", "Zero-Trust API Security"] },
  { id: "cloud", title: "Cloud & DevOps", blurb: "Containerized deployment and delivery.", items: ["Docker", "AWS EC2", "Vercel", "Render", "Git", "GitHub", "CI/CD deployment workflows"] },
  { id: "os", title: "Operating Systems", blurb: "Daily development environments.", items: ["Arch Linux", "i3", "KDE Plasma", "Ubuntu 24.04 LTS", "Windows"] },
];

export const skillProjects: Record<string, string[]> = {
  Python: ["Kridavista", "Linux Music Player & Downloader"],
  FastAPI: ["Kridavista", "SaiMadad"],
  WebRTC: ["Kridavista", "HexaWave"],
  "Socket.IO": ["Kridavista"],
  WebSockets: ["Kridavista"],
  PostgreSQL: ["Kridavista", "SaiMadad"],
  "AWS EC2": ["Kridavista"],
  Docker: ["Kridavista"],
  Vercel: ["Kridavista"],
  Render: ["Kridavista"],
  JWT: ["Kridavista", "SaiMadad"],
  OAuth: ["Kridavista"],
  "Firebase Authentication": ["SaiMadad"],
  "Zero-Trust API Security": ["SaiMadad"],
  "Next.js": ["SaiMadad"],
  Kotlin: ["HexaWave", "SwiftDrop"],
  "REST APIs": ["SaiMadad", "Linux Music Player & Downloader"],
  Firebase: ["SaiMadad"],
};
