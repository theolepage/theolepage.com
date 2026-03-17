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
  Share
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
