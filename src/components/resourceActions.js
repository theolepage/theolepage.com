import React from "react";
import styled from "@emotion/styled";

import Link from "./link";
import Icon from "./icon";

export const RESOURCE_ICONS = {
  Document: "book",
  Slides: "talks",
  Code: "code",
  Video: "video",
  Website: "website",
  "Ref (BibTeX)": "share",
};

// Styled to match the plain-text <a> links rendered alongside it (see
// config/typography.js's global `a` styles), since a native <button> has
// none of that styling by default.
const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;

  border: 0;
  background: none;
  padding: 0;
  font: inherit;
  cursor: pointer;

  color: var(--color-accent);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`;

const ActionLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const ActionSeparator = styled.div`
  display: inline-block;
  margin-left: 8px;
  margin-right: 8px;
  color: color-mix(in srgb, var(--color-accent) 50%, white);
`;

const ResourceActions = ({ resources }) => {
  if (!resources || resources.length === 0) {
    return null;
  }

  return (
    <div>
      {resources.map((action, i) => {
        const iconName = RESOURCE_ICONS[action.name];
        const label = (
          <>
            {iconName && <Icon name={iconName} width={13} height={13} />}
            {action.name}
          </>
        );

        return (
          <span key={action.name}>
            {action.onClick ? (
              <ActionButton onClick={action.onClick}>{label}</ActionButton>
            ) : (
              <ActionLink to={action.url} external>
                {label}
              </ActionLink>
            )}
            {i !== resources.length - 1 && <ActionSeparator>/</ActionSeparator>}
          </span>
        );
      })}
    </div>
  );
};

export default ResourceActions;
