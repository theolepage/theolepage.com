import React from "react";

import {
  Home,
  Files,
  File,
  Star,
  GitFork,
  Package,
  Presentation,
  FileUser,
  Newspaper,
  Info,
  ArrowRight,
  Copy,
  Check,
  Mail,
  BookText,
  Share,
  Download,
  Printer,
  MapPin,
  Calendar,
  Award,
  FlaskConical,
  Bot,
  Sailboat,
  Globe,
  Linkedin,
  Github,
  AppWindow,
  X,
  Microscope,
  Briefcase,
  GraduationCap,
  LayoutGrid,
  School,
  SquarePlay,
  Code
} from "lucide-react";

const Icons = {
  home: Home,
  publications: Files,
  publication: File,
  star: Star,
  fork: GitFork,
  projects: Package,
  talks: Presentation,
  resume: FileUser,
  posts: Newspaper,
  alert: Info,
  rightArrow: ArrowRight,
  copy: Copy,
  check: Check,
  email: Mail,
  book: BookText,
  share: Share,
  download: Download,
  print: Printer,
  location: MapPin,
  calendar: Calendar,
  award: Award,
  science: FlaskConical,
  robotics: Bot,
  sailing: Sailboat,
  website: Globe,
  linkedin: Linkedin,
  github: Github,
  app: AppWindow,
  package: Package,
  close: X,
  research: Microscope,
  experience: Briefcase,
  education: GraduationCap,
  misc: LayoutGrid,
  teaching: School,
  video: SquarePlay,
  code: Code,
};

const Icon = ({ name, width = 16, height = 16, color, ...props }) => {
  const LucideIcon = Icons[name];
  if (!LucideIcon) return null;
  return (
    <LucideIcon
      width={width}
      height={height}
      color={color}
      style={{ width, height, color, ...props.style, flexShrink: 0 }}
      {...props}
    />
  );
};

export default Icon;
