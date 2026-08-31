// ============================================================
// ALL EDITABLE CONTENT LIVES HERE.
// Change copy, projects, or experience in this file only —
// the components read from it and never hardcode text.
// ============================================================

export const SITE = {
  name: "Asaad Sbihi",
  role: "Full-Stack AI Engineer",
  email: "asaadsbihi737@gmail.com",
  phone: "+212 700 264 040",
  phoneHref: "+212700264040",
  linkedin: "https://linkedin.com/in/asaad-sbihi",
  location: "Casablanca, Morocco",
  resume: "/resume.pdf",
  resumeFilename: "Asaad_Sbihi_CV.pdf", // name the browser saves it as
};

// Inquiry types in the contact modal. `id` is what openModal() takes.
export const TOPICS = [
  { id: "brief", label: "Project brief" },
  { id: "role", label: "Job opportunity" },
  { id: "other", label: "Something else" },
];

export const COPY_BY_TOPIC = {
  brief: {
    title: "Tell me what you're building",
    intro:
      "Scope, timeline, or a half-formed idea — all fine. I'll come back with questions and an honest read on whether I'm the right fit.",
  },
  role: {
    title: "Let's talk about the role",
    intro:
      "Send the team, the stack and what you need shipped. I'll reply with availability and where I'd add the most value.",
  },
  other: {
    title: "Say hello",
    intro: "Questions, collaborations, or just a hello — this reaches me directly.",
  },
};

export const NAV = [
  { label: "Selected\nWork", href: "#projects" },
  { label: "Stack &\nServices", href: "#services" },
];

export const MENU = [
  { label: "Work", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#path" },
  { label: "Contact", href: "#contact" },
];

export const HERO = {
  titleA: "Ship",
  titleB: "Smarter",
  sub: ["Intelligent web apps,", "built to scale"],
  meta: [
    { label: "Interface", value: "React · Next.js · TypeScript" },
    { label: "Systems", value: "Laravel · Python · APIs · MySQL" },
    { label: "Intelligence", value: "LLMs · RAG · Agents" },
  ],
  // Rotating strings for the typewriter inside the code card
  shipping: ['"AI copilots"', '"RAG search"', '"web platforms"', '"automations"'],
};

// ------------------------------------------------------------
// PROJECTS — tags drive the filter chips AND render on the card
// (uppercased by CSS). image: file in /public, e.g.
// "/projects/walili.jpg", or "" for the numbered gradient.
// url: "" hides the "View project" link.
// ------------------------------------------------------------
export const PROJECTS = [
  {
    title: "Graphic Services",
    desc: "Visual identity assets, graphic charters, and promotional branding materials.",
    tags: ["Design", "Infographie", "Branding"],
    image: "/projects/graphie-service.png",
    logo: true, // render the logo contained on a neutral tile, not cropped
    url: "",
  },
  {
    title: "Geeks Institute",
    desc: "Educational platform web tools, promotional graphics, and video recap assets.",
    tags: ["Développement", "Design", "Media"],
    image: "/projects/geeks.png",
    logo: true,
    url: "",
  },
  {
    title: "Walili Immobilier",
    desc: "Real estate visual charters, corporate logo layouts, and digital presentation decks.",
    tags: ["Design", "Infographie", "Branding"],
    image: "/projects/walili.png",
    logo: true,
    url: "",
  },
  {
    title: "Sazoum Inox",
    desc: "Corporate site for a stainless-steel fabrication firm in Mohammedia — services, portfolio pages, contact form and French SEO, built on Next.js.",
    tags: ["Développement", "Design", "Branding"],
    image: "/projects/sazoum-inox.png",
    logo: true,
    url: "https://www.sazoum-inox.com/",
  },
];

export const FILTERS = ["All", "Développement", "Design", "Infographie", "Branding", "Media"];

export const FEATURES = [
  {
    no: "#02",
    title: "Full-Stack Performance",
    body: "Clean architecture using Next.js, React, Laravel, and Node. Built for security, speed, and long-term scalability.",
  },
  {
    no: "#03",
    title: "AI & Automation Integration",
    body: "Integrating customized LLMs, vector search, RAG, and AI agents directly into web apps for intelligent user experiences.",
  },
  {
    no: "#04",
    title: "Visual & Aesthetic Edge",
    body: "Combining dynamic engineering with a background in visual design and branding to deliver sleek, interactive UI/UX.",
  },
];

// Each code line is an array of [text, className?] segments.
export const SLIDES = [
  {
    ghost: "Full-Stack",
    ink: "Engineer",
    role: "Full-Stack Developer",
    code: null, // null = show the portrait instead
  },
  {
    ghost: "AI-Focused",
    ink: "Builder",
    role: "AI Integration",
    code: [
      [["await ", "k"], ["llm.answer({"]],
      [["  context: retrieve(q),"]],
      [["  tone: "], ['"human"', "k"], [","]],
      [["  guardrails: "], ["true", "k"]],
      [["})"]],
    ],
  },
  {
    ghost: "Design-Led",
    ink: "Developer",
    role: "UI / UX Engineering",
    code: [
      [["grid: 12 col"]],
      [["type: Archivo / Inter"]],
      [["motion: 240ms ease-out"]],
      [["a11y: focus + contrast"]],
    ],
  },
];

export const LAYERS = [
  {
    num: "01 / Interface",
    title: "Frontend",
    body: "React, Next.js, JavaScript, HTML & CSS, Tailwind, responsive layouts, wireframes to production UI.",
  },
  {
    num: "02 / Server",
    title: "Backend",
    body: "PHP, Laravel, Node.js, REST APIs, MySQL, auth, e-commerce flows and admin dashboards.",
  },
  {
    num: "03 / Model",
    title: "AI layer",
    body: "LLM APIs, retrieval-augmented answers, chat assistants, prompt design and workflow automation.",
  },
  {
    num: "04 / Craft",
    title: "Design & growth",
    body: "UI/UX, brand systems, editorial layout, image retouching, SEO and Google Analytics.",
  },
];

export const JOBS = [
  {
    when: "May – Jun 2026",
    title: "Visual Designer & Graphic Artist",
    company: "Walili Group",
    body: "Brand identities and design systems for luxury real-estate: logos, premium brochures, large-format displays, editorial catalogues and advanced photo retouching for architectural projects.",
  },
  {
    when: "Oct 2025 – Feb 2026",
    title: "Web Developer Assistant — Internship",
    company: "Geeks Institute",
    body: "Shipped updates to the institutional platform in HTML, CSS and JavaScript, reworked user journeys and wireframes, and used Google Analytics traffic and conversion data to guide responsive, accessible and SEO fixes.",
  },
  {
    when: "Jun – Aug 2024",
    title: "Graphic Designer",
    company: "Graphie Services",
    body: "Print and digital assets — posters, flyers, business cards, social posts and short video — plus brand extensions from existing guidelines and print production follow-up on tight deadlines.",
  },
  {
    when: "2024",
    title: "Web Developer & Sales Consultant",
    company: "Technometis",
    body: "Built showcase sites and working e-commerce platforms, then sold them: B2B and B2C prospecting for digital services, which is where I learned to translate business goals into scope.",
  },
];

export const EDUCATION = [
  { title: "Specialised Technician Diploma — Digital Development (Full-Stack)", when: "2025" },
  { title: "Full-Stack Coding Bootcamp — Geeks Institute", when: "Apr – Nov 2024" },
  { title: "Entrepreneurial Innovation Programme — ISTA", when: "2024" },
  { title: "Baccalaureate, Experimental Sciences", when: "French option — Physics, 2022" },
];

export const LANGUAGES = [
  { title: "Arabic", when: "Native", level: "100%" },
  { title: "French", when: "Professional", level: "88%" },
  { title: "English", when: "Professional", level: "82%" },
];
