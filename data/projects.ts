export type DiagramNode = {
  id: string;
  label: string;
  sub: string;
  x: number;
  y: number;
  w?: number;
  desc: string;
  group?: "local" | "external";
};
export type DiagramEdge = { from: string; to: string; label?: string };
export type Diagram = {
  title: string;
  caption: string;
  width: number;
  height: number;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  zone?: { x: number; y: number; w: number; h: number; label: string };
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  filter: "Real-time" | "Mobile" | "Systems" | "Web" | "Tools";
  summary: string;
  stack: string[];
  problem: string;
  role: string;
  contributions: string[];
  decisions: string[];
  features: string[];
  challenges: string[];
  diagram?: Diagram;
  workflow?: { label: string; desc: string }[];
  note?: string;
  interactive?: "scheduler";
  repo?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    slug: "kridavista",
    name: "Kridavista",
    category: "Real-Time Communication Platform",
    filter: "Real-time",
    summary:
      "A full-stack real-time communication and collaboration platform with low-latency bidirectional streams, secure auth and cloud deployment.",
    stack: ["Python", "FastAPI", "WebRTC", "Socket.IO", "PostgreSQL", "AWS EC2"],
    problem:
      "Real-time communication needs low-latency messaging and media delivery for many concurrent users, while keeping accounts and sessions secure and the service reliably online.",
    role: "Backend Engineer (Part-Time), Dec 2022 to Jul 2026. Architected the platform end to end, from responsive interfaces to the backend structure.",
    contributions: [
      "Developed scalable backend services in Python and FastAPI with a WebSocket-based architecture supporting concurrent user sessions.",
      "Designed authentication and session management using JWT and OAuth-based workflows.",
      "Engineered low-latency bidirectional data streams with WebRTC and Socket.IO, tuned for server load and continuous media delivery.",
      "Designed PostgreSQL schemas for relational user data, chat logs and live-streaming metadata, and optimized database structures and APIs for scalability and response time.",
      "Managed containerized deployments across Docker, AWS EC2, Vercel and Render.",
    ],
    decisions: [
      "WebRTC for media delivery and Socket.IO for messaging, giving bidirectional real-time channels.",
      "PostgreSQL as the relational store for users, chat history and streaming metadata.",
      "Token-based authentication (JWT) with OAuth workflows for session management.",
      "Containerized services so the same build can be deployed across EC2, Render and Vercel-hosted parts.",
    ],
    features: [
      "Real-time messaging and streaming",
      "Concurrent user sessions",
      "JWT + OAuth authentication",
      "Chat logs and live-streaming metadata persistence",
      "Always-on cloud deployment",
    ],
    challenges: [
      "Keeping latency low and server load under control while serving continuous media to concurrent sessions.",
      "Structuring the relational schema so chat logs and streaming metadata scale.",
      "Coordinating deployments across several hosting targets.",
    ],
    diagram: {
      title: "Kridavista: system architecture",
      caption:
        "Conceptual architecture based on the resume's project description, not a source-code walkthrough. Select a component.",
      width: 760,
      height: 330,
      nodes: [
        { id: "fe", label: "Frontend", sub: "Responsive UI", x: 20, y: 130, desc: "Responsive interfaces for chat and live sessions. The resume lists this as part of the end-to-end architecture." },
        { id: "auth", label: "Auth", sub: "JWT + OAuth", x: 20, y: 30, desc: "Secure authentication and session management using JWT and OAuth-based workflows." },
        { id: "api", label: "FastAPI backend", sub: "REST + WebSocket", x: 270, y: 130, w: 170, desc: "Python/FastAPI services with WebSocket-based architecture supporting concurrent user sessions." },
        { id: "rt", label: "Real-time layer", sub: "WebRTC + Socket.IO", x: 270, y: 240, w: 170, desc: "Low-latency bidirectional data streams for messaging and continuous media delivery." },
        { id: "db", label: "PostgreSQL", sub: "Users · chat · streams", x: 540, y: 130, desc: "Relational schemas for user data, chat logs and live-streaming metadata." },
        { id: "infra", label: "Deployment", sub: "Docker · EC2 · Render · Vercel", x: 540, y: 240, w: 200, desc: "Containerized services deployed across Docker, AWS EC2, Vercel and Render." },
      ],
      edges: [
        { from: "fe", to: "api" },
        { from: "auth", to: "api" },
        { from: "api", to: "rt" },
        { from: "api", to: "db" },
        { from: "rt", to: "infra" },
        { from: "db", to: "infra" },
      ],
    },
  },
  {
    slug: "hexawave",
    name: "HexaWave",
    category: "Privacy-Focused Android Messaging and Calling",
    filter: "Mobile",
    summary:
      "Serverless, end-to-end encrypted Android messaging, file transfer and voice calling between nearby devices over local Wi-Fi.",
    stack: ["Kotlin", "Jetpack Compose", "WebRTC", "BouncyCastle"],
    problem:
      "Most messengers depend on a backend server, cloud database or third-party relay. HexaWave explores a privacy-first alternative where nearby devices talk directly with none of those in the path.",
    role: "Architected the app and its cryptographic design.",
    contributions: [
      "Architected a privacy-first Android app for encrypted messaging, file transfer and voice calling directly between nearby devices over local Wi-Fi, with no backend server, cloud database or third-party relay.",
      "Designed a cryptographic identity system: Ed25519 signing, X25519 key agreement, Android Keystore-backed StrongBox private keys, and HKDF-derived AES-256-GCM / ChaCha20-Poly1305 session encryption.",
      "Built five custom binary wire protocols with replay and tamper protection.",
      "Integrated local-network WebRTC voice calling, with signaling carried over the app's own encrypted trust channel.",
      "Wrote over 100 JUnit tests covering cryptographic correctness, protocol encoding, and tamper and replay rejection.",
    ],
    decisions: [
      "No server at all: peers communicate directly, so there is no relay that could see or store traffic.",
      "Separate signing (Ed25519) and key-agreement (X25519) keys, with HKDF deriving session keys.",
      "Private keys held in the Android Keystore (StrongBox-backed).",
      "WebRTC signaling reuses the app's encrypted trust channel instead of an external signaling server.",
    ],
    features: [
      "End-to-end encrypted messaging and file transfer",
      "Direct device-to-device communication on local Wi-Fi",
      "AES-256-GCM and ChaCha20-Poly1305 session encryption",
      "Replay and tamper rejection",
      "Local-network WebRTC voice calling",
      "100+ JUnit tests",
    ],
    challenges: [
      "Designing binary wire protocols that reject replayed and tampered messages.",
      "Keeping identity keys hardware-protected while still supporting signing and key agreement.",
      "Carrying WebRTC call signaling securely without any signaling server.",
    ],
    note: "HexaWave works between devices on the same local Wi-Fi network. It does not claim to work across the public internet, and the local network is a requirement, not an optional path.",
    diagram: {
      title: "HexaWave: privacy model",
      caption:
        "Conceptual architecture based on the resume. Everything inside the dashed boundary stays on the local Wi-Fi network; nothing goes to a server. Select a component.",
      width: 760,
      height: 360,
      zone: { x: 10, y: 10, w: 740, h: 340, label: "Local Wi-Fi network only · no server, cloud DB or relay" },
      nodes: [
        { id: "disc", label: "Nearby devices", sub: "Local Wi-Fi peers", x: 30, y: 60, desc: "Two Android devices on the same local Wi-Fi network communicate directly." },
        { id: "id", label: "Identity", sub: "Ed25519 · Keystore/StrongBox", x: 30, y: 200, w: 200, desc: "Each device has a signing identity (Ed25519) with private keys backed by the Android Keystore (StrongBox)." },
        { id: "ka", label: "Key agreement", sub: "X25519 + HKDF", x: 290, y: 130, desc: "X25519 key agreement; HKDF derives the session keys." },
        { id: "enc", label: "Session encryption", sub: "AES-256-GCM / ChaCha20-Poly1305", x: 290, y: 250, w: 230, desc: "Messages and files are encrypted with AES-256-GCM or ChaCha20-Poly1305 session keys." },
        { id: "wire", label: "Wire protocols", sub: "5 binary · replay/tamper-safe", x: 560, y: 60, w: 180, desc: "Five custom binary wire protocols with replay and tamper protection." },
        { id: "call", label: "Voice calling", sub: "WebRTC on LAN", x: 560, y: 200, w: 180, desc: "Local-network WebRTC voice calls. Signaling is carried over the app's own encrypted trust channel." },
      ],
      edges: [
        { from: "disc", to: "id" },
        { from: "id", to: "ka" },
        { from: "ka", to: "enc" },
        { from: "enc", to: "wire" },
        { from: "enc", to: "call" },
      ],
    },
  },
  {
    slug: "swiftdrop",
    name: "SwiftDrop",
    category: "Cross-Platform Peer-to-Peer File Transfer",
    filter: "Systems",
    summary:
      "Private, serverless file transfer between Android, Windows and Linux over a local network, built on a shared Rust engine.",
    stack: ["Rust", "Kotlin", "Jetpack Compose", "Noise Protocol", "UniFFI"],
    problem:
      "Moving files between phones and desktops usually means a cloud service or account. SwiftDrop lets devices discover, pair and exchange files directly over a local network.",
    role: "Built the system across the Rust engine, the Windows/Linux CLI and the Android app.",
    contributions: [
      "Built a serverless file-transfer system spanning a Windows and Linux CLI and an Android app, with no cloud service or account required.",
      "Implemented end-to-end encrypted device pairing using the Noise protocol with human-verified short authentication codes.",
      "Implemented a chunked, checksum-verified transfer engine with crash-safe resume.",
      "Bound a shared Rust transfer engine into a native Android app via UniFFI, including Keystore-backed key storage and QR-code pairing.",
      "Covered the system with over 70 automated tests, including real-socket integration tests.",
    ],
    decisions: [
      "One shared Rust engine for all platforms rather than reimplementing transfer logic per platform.",
      "UniFFI bindings to expose the Rust engine to Kotlin.",
      "Noise-protocol pairing with a human-verified short authentication code to defend against impersonation.",
      "Chunking with checksums so interrupted transfers can resume safely.",
    ],
    features: [
      "Android ↔ Windows ↔ Linux transfers",
      "Local-network discovery and pairing",
      "Short authentication code verification",
      "QR-code pairing on Android",
      "Chunked, checksum-verified, crash-safe resumable transfers",
      "70+ automated tests",
    ],
    challenges: [
      "Sharing one Rust core across a CLI and an Android app via UniFFI.",
      "Making transfers resumable after crashes without corrupting files.",
      "Testing over real sockets, not just mocks.",
    ],
    workflow: [
      { label: "Discover", desc: "Devices find each other on the local network." },
      { label: "Pair", desc: "Devices pair, optionally by scanning a QR code on Android." },
      { label: "Authenticate", desc: "Noise-protocol handshake; users confirm a short authentication code." },
      { label: "Transfer", desc: "The file is sent in chunks, and interrupted transfers can resume." },
      { label: "Verify", desc: "Each chunk is checksum-verified so corruption is detected." },
    ],
    diagram: {
      title: "SwiftDrop: components",
      caption:
        "Conceptual architecture based on the resume. Select a component.",
      width: 760,
      height: 340,
      zone: { x: 10, y: 10, w: 740, h: 320, label: "Local network · no cloud service or account" },
      nodes: [
        { id: "and", label: "Android app", sub: "Kotlin · Compose · Keystore", x: 30, y: 60, w: 190, desc: "Native Android app with Jetpack Compose UI, Keystore-backed key storage and QR-code pairing." },
        { id: "cli", label: "Windows / Linux CLI", sub: "Desktop endpoints", x: 30, y: 210, w: 190, desc: "Command-line clients for Windows and Linux." },
        { id: "rust", label: "Shared Rust engine", sub: "Transfer core · UniFFI", x: 290, y: 135, w: 190, desc: "The shared Rust transfer engine, bound into Android through UniFFI and used by the CLI." },
        { id: "pair", label: "Secure pairing", sub: "Noise + short auth code", x: 540, y: 60, w: 190, desc: "End-to-end encrypted pairing with the Noise protocol and human-verified short authentication codes." },
        { id: "xfer", label: "Encrypted transfer", sub: "Chunks · checksums · resume", x: 540, y: 210, w: 190, desc: "Chunked, checksum-verified transfers with crash-safe resume." },
      ],
      edges: [
        { from: "and", to: "rust" },
        { from: "cli", to: "rust" },
        { from: "rust", to: "pair" },
        { from: "rust", to: "xfer" },
      ],
    },
  },
  {
    slug: "saimadad",
    name: "SaiMadad",
    category: "Anonymous Support Platform",
    filter: "Web",
    summary:
      "An open-source anonymous support and collaboration platform with zero-trust authentication and AI-assisted chat moderation.",
    stack: ["Next.js", "FastAPI", "PostgreSQL", "Firebase Auth", "JWT", "AI integration"],
    problem:
      "Anonymous support communities need to protect user identity and data while keeping real-time chat safe for everyone.",
    role: "Full Stack Developer (Part-Time), Aug 2024 to Oct 2025. Led development of the open-source platform.",
    contributions: [
      "Built a scalable anonymous support and collaboration platform with Next.js, FastAPI, PostgreSQL and secure authentication.",
      "Developed responsive frontend interfaces with optimized state management and API integrations.",
      "Implemented zero-trust authentication pipelines using Firebase and JWT to secure API endpoints.",
      "Implemented backend moderation pipelines and AI-driven filtering that parse, evaluate and filter real-time chat streams.",
      "Designed RESTful APIs, database schemas and secure user-access workflows; integrated Firebase push notifications.",
    ],
    decisions: [
      "Zero-trust posture: API endpoints are protected by Firebase + JWT rather than trusting the client.",
      "Moderation runs in the backend pipeline so it applies to every chat stream.",
      "Next.js frontend paired with a FastAPI REST backend.",
    ],
    features: [
      "Anonymous support and collaboration",
      "Firebase push notifications",
      "JWT-based authorization",
      "AI-assisted moderation and filtering",
      "Responsive interface",
    ],
    challenges: [
      "Balancing anonymity with authenticated, protected API access.",
      "Filtering real-time chat data streams for community safety.",
    ],
  },
  {
    slug: "algoverse",
    name: "AlgoVerse",
    category: "CPU Scheduling Simulator",
    filter: "Web",
    summary:
      "An interactive learning platform that visualizes FCFS, SJF, Priority and Round Robin scheduling with draggable processes and Gantt charts.",
    stack: ["Algorithm Simulation", "Data Visualization"],
    problem:
      "CPU scheduling is hard to grasp from static tables. Interactive simulation makes the differences between algorithms visible.",
    role: "Built the simulation and learning platform.",
    contributions: [
      "Built an interactive CPU scheduling simulation and learning platform visualizing FCFS, SJF, Priority and Round Robin.",
      "Implemented draggable process simulations, dynamic Gantt charts and performance-metric displays.",
    ],
    decisions: [
      "Make processes draggable so learners can experiment with arrival order.",
      "Show a Gantt chart plus metrics for every run.",
    ],
    features: ["FCFS, SJF, Priority, Round Robin", "Draggable processes", "Dynamic Gantt charts", "Waiting / turnaround metrics"],
    challenges: ["Rendering schedules dynamically as parameters change."],
    note: "The demo on this page is a small re-implementation written for this portfolio, not the original AlgoVerse app.",
    interactive: "scheduler",
  },
  {
    slug: "linux-music-player",
    name: "Linux Music Player & Downloader",
    category: "Linux Utility",
    filter: "Tools",
    summary:
      "A lightweight, Linux-native command-line tool that automates retrieval and processing of audio files without a GUI.",
    stack: ["Python", "REST APIs", "Linux CLI", "Data Extraction"],
    problem: "Fetching and converting audio usually means a heavy graphical app; this tool automates it from the terminal.",
    role: "Built the tool.",
    contributions: [
      "Built a lightweight Linux-native multimedia data-extraction tool in Python to automate retrieval and processing of audio files without a graphical interface.",
      "Integrated the YouTube API to query, fetch and transform streaming data into downloadable local formats.",
      "Optimized for minimal resource consumption using native command-line tooling and manual system configuration.",
    ],
    decisions: ["CLI-first, no GUI, to keep resource use minimal."],
    features: ["Command-line workflow", "YouTube API integration", "Download to local formats", "Low resource use"],
    challenges: ["Transforming streaming data into usable local audio files."],
  },
];

export const projectFilters = ["All", "Real-time", "Mobile", "Systems", "Web", "Tools"] as const;
