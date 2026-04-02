import type { NavLink } from "@/types";

/** Desktop "Solutions" dropdown */
export const solutionsLinks: NavLink[] = [
  { label: "Web Development", href: "/services/web-development" },
  { label: "Mobile Apps", href: "/services/mobile-apps" },
  { label: "AI Agents & Automation", href: "/services/ai-agents" },
  { label: "Cloud & DevOps", href: "/services/cloud-devops" },
  { label: "UI / UX Design", href: "/services/ui-ux-design" },
];

/** Desktop "About" dropdown */
export const aboutLinks: NavLink[] = [
  { label: "Our Story", href: "/about" },
  { label: "Work & Case Studies", href: "/work" },
  { label: "Careers", href: "/careers" },
];

/** Top-level nav links (not dropdowns) */
export const mainNavLinks: NavLink[] = [
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/** Footer — Services column */
export const footerServicesLinks: NavLink[] = [
  { label: "Web Development", href: "/services/web-development" },
  { label: "Mobile Apps", href: "/services/mobile-apps" },
  { label: "AI Agents", href: "/services/ai-agents" },
  { label: "Automation", href: "/services/automation" },
  { label: "Cloud & DevOps", href: "/services/cloud-devops" },
  { label: "UI / UX Design", href: "/services/ui-ux-design" },
];

/** Footer — Company column */
export const footerCompanyLinks: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
];
