// ============================================================
// ALL EDITABLE CONTENT LIVES HERE.
// Change copy, projects, or experience in this file only —
// the components read from it and never hardcode text.
// ============================================================

export const SITE = {
  name: "Asaad Sbihi",
  role: "Visual Creator & Tech-Driven Designer",
  email: "asaadsbihi737@gmail.com",
  phone: "+212 724 269 257",
  phoneHref: "+212724269257",
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
  titleA: "Design",
  titleB: "Shipped",
  sub: ["Brand & motion,", "engineered to ship"],
  meta: [
    { label: "Brand", value: "Identity · Charters · Print" },
    { label: "Motion", value: "Editing · Motion Design · Reels" },
    { label: "Build", value: "React · Next.js · Web" },
  ],
  // Rotating strings for the typewriter inside the code card
  shipping: ['"brand systems"', '"promo films"', '"ad campaigns"', '"web builds"'],
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
    desc: "Visual identity assets and graphic charters, plus a run of designed advertising creatives — social and display ad sets built from each brand's guidelines.",
    tags: ["Design", "Infographie", "Ads"],
    image: "/projects/graphie-service.png",
    logo: true, // render the logo contained on a neutral tile, not cropped
    url: "",
    // Clicking the card opens a case-study modal (see ProjectModal.jsx).
    caseStudy: {
      title: "Graphic Services — Social Media Campaign & Brand Identity",
      intro:
        "Execution of targeted social media promotional campaigns and commercial print collateral. The primary objective was maintaining a strict, consistent Brand Identity Charter (Charte Graphique) across diverse promotional materials—utilizing standardized typography, consistent yellow-black color palettes, geometric frames, and unified contact footers.",
      role: "Brand Consistency • Social Media Graphics • Product Packaging & Print Design",
      // Files live in public/images/graphic-services/. A missing file falls
      // back to the captioned placeholder tile (see ProjectModal.jsx).
      gallery: [
        {
          src: "/images/graphic-services/poste1.png",
          caption: "T-Shirt Printing Promo",
          note: "High-contrast yellow vector overlay with a t-shirt mockup and bulleted selling points.",
        },
        {
          src: "/images/graphic-services/poste2.png",
          caption: "Product Labeling & Packaging",
          note: "Custom cosmetic product packaging presentation with badge elements and a clear CTA.",
        },
        {
          src: "/images/graphic-services/poste3.png",
          caption: "Custom Wooden Stamps",
          note: "Product-feature layout highlighting custom sizes and multi-surface applications.",
        },
        {
          src: "/images/graphic-services/poste4.png",
          caption: "Business Cards / Cartes de Visite",
          note: "Clean mockup layout demonstrating paper weight (300g), finishing options, and corner treatments.",
        },
      ],
    },
  },
  {
    title: "Geeks Institute",
    desc: "Educational platform web tools, promotional graphics, and video recap assets.",
    tags: ["Développement", "Media", "Design"],
    image: "/projects/geeks.png",
    logo: true,
    url: "",
    // "Avant vs Après" case study — see ProjectModal.jsx. Feed images live in
    // public/images/geeks-institute/; a missing file shows a labelled placeholder.
    caseStudy: {
      title: "Geeks Institute — Brand Identity & Content Strategy Transformation",
      intro:
        "Designed and implemented a unified Brand Identity Charter to elevate Geeks Institute's social media presence. The strategy transformed a previously fragmented feed into a cohesive, structured, and modern tech aesthetic, significantly improving brand recognition and content organization.",
      role: "Brand Identity • Visual Strategy • Video Editing • Social Media Design",
      compare: {
        before: {
          label: "Avant la Charte Graphique",
          src: "/images/geeks-institute/feed-before.jpg",
          note: "Mixed formats, organic footage, inconsistent lighting, and unaligned color schemes.",
        },
        after: {
          label: "Après la Charte Graphique",
          src: "/images/geeks-institute/feed-after.jpg",
          note: "Unified dark-blue/tech palette, structured typography for bootcamp announcements, consistent lower-thirds, 3D elements, and cohesive partner branding.",
        },
      },
    },
  },
  {
    title: "Walili Immobilier",
    desc: "Real estate visual charters, corporate logo layouts, and digital presentation decks.",
    tags: ["Design", "Branding", "Ads"],
    image: "/projects/walili.png",
    logo: true,
    url: "",
    // Video/motion case study — see ProjectModal.jsx. Drop the compressed reel
    // at public/videos/walili-showcase.mp4; a missing file shows a placeholder.
    caseStudy: {
      title: "Walili Immobilier & W Agency — Luxury Real-Estate Visual Strategy",
      intro:
        "An end-to-end visual and motion engagement for Walili Immobilier and its in-house creative arm, W Agency — repositioning the brand at the premium tier of the Moroccan real-estate market. The work runs the full lifecycle: from the problem, through a single visual and motion system, to how it changed the way the brand shows up.",
      role: "Brand Identity • Visual Strategy • Panoramic Carousels • Motion Design",
      sections: [
        {
          heading: "The Problem",
          body:
            "Walili was competing for high-value listings with a fragmented visual presence — inconsistent layouts, ad-hoc colour, and nothing tying social, print, and pitch material together. Premium properties were being marketed with mid-market design, and every new asset started from a blank page.",
        },
        {
          heading: "The Visual & Motion Solution",
          body:
            "One brand charter: a gold-on-charcoal palette, a disciplined type scale, geometric framing, and a templated grid — then extended into motion. Property walkthroughs became panoramic multi-slide carousels; the flagship promo became a fully produced reel with kinetic typography, colour grade, and sound design. A single system, applied from one Instagram post to a full campaign.",
        },
        {
          heading: "The Impact",
          body:
            "The feed now reads as one confident brand, and the marketing team ships on-brand collateral without a designer in the loop. Listings are presented at the tier they actually sit in, and the motion work gives Walili a format local competitors aren't producing.",
        },
      ],
      video: {
        heading: "Featured Video / Motion Showcase",
        src: "/videos/walili-showcase.mp4",
        poster: "",
        label: "Real-Estate Promo — Motion Design Showcase",
        note:
          "The flagship promo, produced start to finish — edit, motion typography, transitions, sound design, and colour grade. Kinetic text and gold light accents carry the brand system into motion, turning a property tour into a few seconds of premium film.",
      },
      tools: ["Adobe Premiere Pro", "After Effects", "Photoshop", "Illustrator"],
    },
  },
  {
    title: "Sazoum Inox",
    desc: "Corporate site for a stainless-steel fabrication firm in Mohammedia — services, portfolio pages, contact form and French SEO on Next.js — plus the designed social and print ad creatives drawn from the brand's identity.",
    tags: ["Développement", "Design", "Media"],
    image: "/projects/sazoum-inox.png",
    logo: true,
    url: "https://www.sazoum-inox.com/",
  },
  {
    title: "AgriConnect",
    desc: "Direct-to-consumer AgTech e-commerce platform & visual identity playbook with integrated media campaigns.",
    tags: ["Développement", "Ads", "Media"],
    image: "/projects/agriconnect.svg",
    logo: true,
    url: "https://agriconnect-e-commer-3y6x.bolt.host/",
  },
];

// Category filter buttons. `label` is what shows in the UI; `tag` is the
// value matched against each project's `tags` array (see PROJECTS above).
export const FILTERS = [
  { label: "All", tag: "All" },
  { label: "Dev", tag: "Développement" },
  { label: "Design", tag: "Design" },
  { label: "Media", tag: "Media" },
  { label: "Ads", tag: "Ads" },
];

export const FEATURES = [
  {
    no: "#02",
    title: "One Visual System",
    body: "Charters, ad creative and promo films built from a single identity — every asset ships on-brand, from one post to a full campaign.",
  },
  {
    no: "#03",
    title: "Motion That Converts",
    body: "Editing, motion graphics and event recaps cut for pacing and platform — the hook lands in three seconds and holds to the last frame.",
  },
  {
    no: "#04",
    title: "Built, Not Just Designed",
    body: "React and Next.js execution behind the design — responsive, accessible, measured, and shipped to production, not left as a mockup.",
  },
];

// Each code line is an array of [text, className?] segments.
export const SLIDES = [
  {
    ghost: "Visual",
    ink: "Creator",
    role: "Branding & Art Direction",
    code: null, // null = show the portrait instead
  },
  {
    ghost: "Motion",
    ink: "Designer",
    role: "Video & Motion Graphics",
    code: [
      [["comp: "], ["1920×1080 · 25fps", "k"]],
      [["type: kinetic / lower-thirds"]],
      [["grade: "], ["teal + gold", "k"]],
      [["cut: hook in "], ["3s", "k"]],
    ],
  },
  {
    ghost: "Design-Led",
    ink: "Developer",
    role: "Front-End Implementation",
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
    num: "01 / Craft",
    title: "Design",
    body: "Graphic charters and luxury brand systems with a minimalist edge — disciplined typography, vector art and 3D illustration that make a brand look inevitable.",
  },
  {
    num: "02 / Growth",
    title: "Ads & Marketing",
    body: "B2B marketing strategy turned into conversion-focused assets — ad creatives, landing visuals and performance branding built to move a metric, not just fill a feed.",
  },
  {
    num: "03 / Motion",
    title: "Video & Motion",
    body: "Editing, event recap montages and motion graphics — cut with deliberate pacing so the story lands in the first three seconds and holds to the last frame.",
  },
  {
    num: "04 / Interface",
    title: "Frontend",
    body: "React, Next.js, JavaScript, HTML & CSS, Tailwind — responsive, accessible layouts that take the design from mockup to production.",
  },
  {
    num: "05 / Server",
    title: "Backend",
    body: "PHP, Laravel, Node.js, REST APIs, MySQL — auth, e-commerce flows and admin dashboards behind the interface.",
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
