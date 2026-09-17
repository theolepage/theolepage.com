import React from "react";

import { Link as GatsbyLink } from "gatsby";

import { css } from "@emotion/react";

const style = css`
  border: 0;
  background: none;

  &:hover {
    text-decoration: none;
  }
`;

// "primary" is the default (no override, inherits the global blue accent
// link style). "secondary" is a muted gray that darkens on hover, for
// lower-emphasis actions like "See all", "Copy to clipboard", etc.
const secondaryStyle = css`
  display: inline-flex;
  align-items: center;
  gap: 6px;

  border: 0;
  background: none;
  padding: 0;
  font: inherit;
  cursor: pointer;

  color: var(--color-muted-1);
  text-decoration: none;

  transition: var(--transition-duration) color;

  &:hover {
    color: var(--color-title);
    text-decoration: none;
  }
`;

const Link = ({
  to,
  onClick,
  className,
  invisible,
  external,
  variant,
  children,
  ...props
}) => {
  const variantStyle = variant === "secondary" && secondaryStyle;

  if (!to)
    return (
      <button
        onClick={onClick}
        css={[invisible && style, variantStyle, { cursor: "pointer" }]}
        className={className}
      >
        {children}
      </button>
    );
  if (external || to.charAt(0) !== "/" || to.slice(-4).includes("."))
    return (
      <a
        css={[invisible && style, variantStyle]}
        className={className}
        href={to}
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        {children}
      </a>
    );
  return (
    <GatsbyLink
      css={[invisible && style, variantStyle]}
      className={className}
      to={to}
      {...props}
    >
      {children}
    </GatsbyLink>
  );
};

export default Link;
