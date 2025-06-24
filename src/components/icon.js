import React from "react";

import {
  Home,
  Files,
  Star,
  GitFork,
  Package,
  Presentation,
  FileUser,
  Newspaper,
  Info,
  ArrowRight,
} from "lucide-react";

const Icons = {
  home: Home,
  publications: Files,
  star: Star,
  fork: GitFork,
  projects: Package,
  talks: Presentation,
  resume: FileUser,
  posts: Newspaper,
  alert: Info,
  rightArrow: ArrowRight,
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
