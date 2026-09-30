export type Role = {
  role: string;
  org: string;
  type?: string;
  start: string;
  end: string;
  location?: string;
  points: string[];
  tags: string[];
};

export const experience: Role[] = [
  {
    role: "Assistant Store Manager",
    org: "Blinkit (Eternal)",
    location: "Delhi",
    start: "Aug 2026",
    end: "Aug 2026",
    points: [
      "Managed day-to-day dark-store operations, coordinating order fulfillment and dispatch to maintain on-time delivery standards.",
      "Supervised store staff and delivery partners, maintaining productivity and service-quality standards during peak demand.",
      "Monitored inventory levels and replenishment cycles to minimize stock-outs and operational discrepancies.",
    ],
    tags: ["Operations", "Inventory", "Team supervision"],
  },
  {
    role: "LLM Post Trainer",
    org: "EtharaAI",
    type: "Internship",
    start: "Feb 2026",
    end: "Jul 2026",
    points: [
      "Evaluated and improved large language model responses for real-world production scenarios across multiple datasets.",
      "Built structured evaluation and scoring workflows to guide prompt and response-quality improvements.",
      "Scraped and curated training data from web sources and GitHub pull requests to support model fine-tuning.",
      "Collaborated with the AI team on prompt analysis and quality-improvement pipelines.",
    ],
    tags: ["LLM evaluation", "Prompt analysis", "Data curation"],
  },
  {
    role: "Full Stack Developer",
    org: "SaiMadad",
    type: "Part-Time",
    start: "Aug 2024",
    end: "Oct 2025",
    points: [
      "Built a scalable anonymous support and collaboration platform using Next.js, FastAPI, PostgreSQL and secure authentication.",
      "Developed responsive frontend interfaces with optimized state management and API integrations.",
      "Implemented backend moderation pipelines and AI-assisted filtering for real-time chat safety.",
      "Designed RESTful APIs, database schemas and secure user-access workflows.",
      "Integrated Firebase push notifications and JWT-based authorization for protected services.",
    ],
    tags: ["Next.js", "FastAPI", "PostgreSQL", "Firebase", "JWT"],
  },
  {
    role: "Backend Engineer",
    org: "Kridavista",
    type: "Part-Time",
    start: "Dec 2022",
    end: "Jul 2026",
    points: [
      "Developed scalable backend services for a real-time communication and collaboration platform using Python, FastAPI and a WebSocket-based architecture, supporting concurrent user sessions.",
      "Designed secure authentication and session-management systems using JWT and OAuth-based workflows.",
      "Engineered low-latency media and messaging pipelines supporting concurrent user communication and streaming.",
      "Managed cloud deployments and containerized services across Docker, AWS EC2, Vercel and Render.",
      "Optimized PostgreSQL database structures and backend APIs for scalability, response time and resource efficiency.",
    ],
    tags: ["Python", "FastAPI", "WebSockets", "PostgreSQL", "Docker", "AWS EC2"],
  },
];

export const education = [
  { school: "Guru Gobind Singh Indraprastha University", place: "Delhi, India", degree: "B.Tech in Computer Science Engineering", period: "2023 to 2027 (expected)" },
  { school: "Government Sarvodaya Bal Vidyalaya", place: "Delhi, India", degree: "Senior Secondary School (Class 11 and 12)", period: "Completed 2023" },
  { school: "Joseph and Mary Public School", place: "Delhi, India", degree: "Secondary School (Class 10)", period: "Completed 2021" },
];

export const certifications = [
  { name: "Google Cybersecurity Professional Certificate", issuer: "Coursera" },
  { name: "Web Development Masterclass", issuer: "Udemy" },
  { name: "Java Programming Certificate", issuer: "" },
  { name: "Mid-Level JavaScript Developer", issuer: "Certificates.dev" },
];

export const achievements = [
  { title: "Felicitated and awarded at BharatPreneurs 2026", detail: "" },
  { title: "Selected for pre-incubation at DTU-IIF", detail: "" },
  { title: "First place, internal Smart India Hackathon 2025", detail: "JIMS EMTC" },
  { title: "Ninth place, internal Smart India Hackathon 2024", detail: "JIMS EMTC" },
  { title: "Runner-up, VCT Hashtag Competition", detail: "Team WARDEN" },
  { title: "IIC Activity Award", detail: "National Startup Day" },
];
