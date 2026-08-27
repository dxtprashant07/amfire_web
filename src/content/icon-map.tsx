import {
  BarChart3,
  Bot,
  Clock,
  Cloud,
  Code2,
  GraduationCap,
  Headphones,
  HomeIcon,
  LayoutGrid,
  Lock,
  MessageCircle,
  MonitorSmartphone,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  Zap,
  type LucideIcon,
} from "lucide-react";

// Content editable from the admin panel can only reference icons from this
// list (stored as the string key) — keeps the DB free of component
// references while still letting admins pick a visual per row.
export const iconMap = {
  Zap,
  Target,
  ShieldCheck,
  Sparkles,
  LayoutGrid,
  Clock,
  GraduationCap,
  Bot,
  HomeIcon,
  Lock,
  Headphones,
  Cloud,
  Code2,
  Smartphone,
  MonitorSmartphone,
  MessageCircle,
  BarChart3,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconMap;
export const iconNames = Object.keys(iconMap) as IconName[];

export function Icon({ name, size = 20, className }: { name: string; size?: number; className?: string }) {
  const Cmp = iconMap[name as IconName] ?? Zap;
  return <Cmp size={size} className={className} />;
}
