/**
 * portfolio.ts — Single source of truth for all portfolio content.
 *
 * Update this file to customise what is displayed on the site.
 * No component changes are needed for content edits.
 */

import type {
  PersonalInfo,
  SkillCategory,
  Experience,
  Project,
  Accomplishment,
  EducationInfo,
  NavLink,
} from '@/types';

// ─── Personal Info ────────────────────────────────────────────────────────────

export const personal: PersonalInfo = {
  name: '[Your Name]',
  title: 'Software Engineer',
  tagline: 'Building for iOS · Web · AI',
  summary:
    'Results-driven Software Engineer with ~3+ years of experience in mobile, web, and AI-powered product development. Proven background in iOS engineering, frontend web applications, admin platforms, and multi-agent AI systems within enterprise and sports-tech environments. Strong track record of delivering scalable solutions, improving user experience, and driving innovation across cross-functional teams.',
  location: 'Ghaziabad, India',
  email: '[Email Address]',
  phone: '[Phone Number]',
  linkedin: '[LinkedIn URL]',
  github: '[GitHub URL]',
};

// ─── Skills ───────────────────────────────────────────────────────────────────
// Each category maps to a color variant defined in globals.css (.tag--{color})

export const skills: SkillCategory[] = [
  {
    category: 'Languages',
    color: 'primary',
    items: ['Swift', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'SCSS'],
  },
  {
    category: 'Frameworks & Libraries',
    color: 'accent',
    items: ['ReactJS', 'Material UI (MUI)', 'UIKit', 'OpenSeadragon'],
  },
  {
    category: 'Mobile Development',
    color: 'orange',
    items: [
      'iOS App Development',
      'UIKit',
      'BLE Integration',
      'UIImagePickerController',
      'UIActivityViewController',
    ],
  },
  {
    category: 'Web Development',
    color: 'teal',
    items: ['React', 'Responsive UI', 'Admin Panels', 'Progressive Web Apps'],
  },
  {
    category: 'AI / Automation',
    color: 'pink',
    items: ['Generative AI', 'Multi-Agent Systems', 'Conversational AI Platforms'],
  },
  {
    category: 'Backend & Infra',
    color: 'yellow',
    items: ['Docker', 'REST APIs', 'CI/CD fundamentals'],
  },
  {
    category: 'Tools & Platforms',
    color: 'violet',
    items: ['Xcode', 'Git / GitHub', 'Docker', 'Figma', 'Jira'],
  },
  {
    category: 'Soft Skills',
    color: 'neutral',
    items: [
      'Cross-functional Collaboration',
      'Problem Solving',
      'Product Thinking',
      'Ownership & Accountability',
      'Innovation Mindset',
    ],
  },
];

// ─── Work Experience ──────────────────────────────────────────────────────────

export const experiences: Experience[] = [
  {
    id: 1,
    title: 'Software Engineer',
    company: 'Adidas — India Tech Hub',
    period: 'Jan 2025 – Present',
    current: true,
    highlights: [
      'Contributed to enterprise architecture and innovation within the R&D Hub, building internal digital platforms and scalable software solutions.',
      'Developed native iOS applications and frontend web solutions for internal and consumer-facing use cases.',
      'Built AI-driven multi-agent chat platform to automate research workflows and concept creation using Generative AI.',
      'Designed admin panels with event management, user roles, forms, insights dashboards, notifications, and support bots.',
      'Worked on BLE-enabled mobile applications involving hardware connectivity, device state handling, and disconnection management.',
      'Participated in in-person demos, workshops, and innovation programs with global teams.',
      'Received Quarterly Superstar Award and multiple nominations for Courage, Ownership, and Teamplay.',
    ],
    tags: ['iOS', 'Swift', 'React', 'Generative AI', 'BLE', 'TypeScript'],
  },
  {
    id: 2,
    title: 'Junior Software Engineer',
    company: 'Adidas',
    period: 'Jun 2022 - Dec 2024',
    current: false,
    highlights: [
      'Completed structured engineering onboarding focused on frontend engineering standards, enterprise practices, and product delivery.',
      'Built foundational skills in scalable web development, UI engineering, and agile collaboration.',
    ],
    tags: ['Frontend', 'React', 'Agile'],
  },
];

// ─── Projects ─────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: 1,
    title: 'AI-Powered Multi-Agent Research Platform',
    description:
      'Conversational multi-agent platform to automate research and concept generation workflows. Users interact with multiple AI agents for idea generation, task automation, and knowledge retrieval.',
    category: 'AI / Automation',
    tags: ['Generative AI', 'React', 'Multi-Agent', 'Chat UI'],
    highlights: [
      'Multi-agent conversational architecture',
      'Automated research & concept generation',
      'Significant reduction in manual research effort',
    ],
  },
  {
    id: 2,
    title: 'Native iOS Mobile Applications',
    description:
      'iOS apps with custom UI components, image sharing flows, camera/gallery integration, and Bluetooth device connectivity. Tackled advanced rendering, gesture navigation, and sharing workflow challenges.',
    category: 'iOS / Mobile',
    tags: ['Swift', 'UIKit', 'BLE', 'iOS'],
    highlights: [
      'Custom UI components & optimised sharing flows',
      'BLE hardware connectivity & state handling',
      'Advanced gesture navigation & camera integration',
    ],
  },
  {
    id: 3,
    title: 'Enterprise Admin Panel',
    description:
      'Feature-rich admin platform with event management, roles & permissions, forms, notifications, search, analytics, and chatbot support. Scalable reusable component architecture.',
    category: 'Web / Frontend',
    tags: ['ReactJS', 'JavaScript', 'Material UI', 'CSS'],
    highlights: [
      'Event management & roles/permissions modules',
      'Analytics dashboard & notification system',
      'Scalable reusable component architecture',
    ],
  },
  {
    id: 4,
    title: 'Image Carousel & Media Experience',
    description:
      'Dynamic image carousel with skeleton loaders, lazy loading, smooth scrolling, and image download capability. Significantly improved content browsing UX and performance.',
    category: 'Web / Frontend',
    tags: ['ReactJS', 'MUI', 'JavaScript'],
    highlights: [
      'Skeleton loaders & lazy loading for performance',
      'Smooth scrolling & image download support',
      'Enhanced content browsing UX',
    ],
  },
  {
    id: 5,
    title: 'Sports-Tech Innovation Initiatives',
    description:
      'Football-related digital experiences and Progressive Web Apps in collaboration with global Adidas teams, aimed at improving sports engagement and fan experiences.',
    category: 'Sports-Tech',
    tags: ['Web Apps', 'PWA', 'Frontend', 'React'],
    highlights: [
      'Football innovation digital experiences',
      'Progressive Web App architecture',
      'Cross-functional global team collaboration',
    ],
  },
];

// ─── Accomplishments ──────────────────────────────────────────────────────────

export const accomplishments: Accomplishment[] = [
  {
    id: 1,
    title: 'Quarterly Superstar Award',
    description: 'Recognised for outstanding contribution to engineering and product delivery.',
    icon: '🏆',
  },
  {
    id: 2,
    title: 'AI Innovation Builder',
    description: 'Built next-generation AI systems aligned with enterprise innovation goals.',
    icon: '🤖',
  },
  {
    id: 3,
    title: 'Multi-Domain Delivery',
    description: 'Delivered production-grade mobile and web solutions across multiple domains.',
    icon: '🚀',
  },
  {
    id: 4,
    title: 'Global Collaboration',
    description: 'Collaborated with global stakeholders across business and engineering teams.',
    icon: '🌍',
  },
];

// ─── Education ────────────────────────────────────────────────────────────────

export const education: EducationInfo = {
  degree: "Bachelor's Degree in Engineering",
  institution: 'Delhi Technological University',
  location: 'Delhi, India',
  year: '[Year]',
};

// ─── Navigation ───────────────────────────────────────────────────────────────
// href values must match section element ids prefixed with '#'

export const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
];
