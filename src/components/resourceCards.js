import React from "react";
import styled from "@emotion/styled";

import Link from "./link";
import Icon from "./icon";

const ResourcesRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;

  margin-top: 10px;
`;

const ResourceImage = styled.img`
  flex-shrink: 0;

  width: 90px;
  height: 50px;
  margin-bottom: 0;

  object-fit: cover;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);

  opacity: 0.85;
  transition: opacity var(--transition-duration);
`;

const ResourceTitle = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;

  font-size: var(--size-tiny);
  color: var(--color-muted-1);

  white-space: nowrap;

  font-weight: 600;

  transition: color var(--transition-duration);
`;

const ResourceCard = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;

  text-decoration: none;

  &:hover {
    text-decoration: none;

    ${ResourceTitle} {
      color: var(--color-title);
    }

    ${ResourceImage} {
      opacity: 1;
    }
  }
`;

// LinkedIn-style "featured media" cards: image + title, the whole card
// links out. Shares the same {name, url, image} shape as the plain-text
// resource actions (publications/talks/teaching) — just a different
// visual treatment for when a resource also has a preview image.
const ResourceCards = ({ resources }) => {
  if (!resources || resources.length === 0) {
    return null;
  }

  return (
    <ResourcesRow>
      {resources.map((resource) => (
        <ResourceCard key={resource.url} to={resource.url} external>
          {resource.image && <ResourceImage src={resource.image} alt="" />}
          <ResourceTitle>
            {resource.name}
            <Icon name="external" width={12} height={12} />
          </ResourceTitle>
        </ResourceCard>
      ))}
    </ResourcesRow>
  );
};

export default ResourceCards;
