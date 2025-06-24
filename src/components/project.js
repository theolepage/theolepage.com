import React from "react";
import styled from "@emotion/styled";

import Block from "./block";
import Icon from "./icon";

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: var(--size-tiny);
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--color-muted-2);
`;

const UnderDevelopmentIconContainer = styled.div`
  position: relative;

  width: 12px;
  height: 12px;
`;

const UnderDevelopmentIcon = styled.div`
  width: 100%;
  height: 100%;

  border-radius: 100%;
  border: 2px solid rgb(220, 220, 220);

  &:after {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    content: "";

    border-radius: 100%;
    border: 2px solid transparent;
    border-top-color: var(--color-muted-2);

    animation: spin 2s infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const Project = ({ project }) => {
  const { name, description, url, color } = project.frontmatter;
  const { githubStarsCount, githubForksCount, githubPushedAt } =
    project.fields || {};

  const isUnderDevelopment =
    githubPushedAt &&
    new Date(githubPushedAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  return (
    <Block
      key={project.id}
      title={name}
      url={url}
      corner={color}
      info={
        <IconsContainer>
          {isUnderDevelopment && (
            <UnderDevelopmentIconContainer>
              <UnderDevelopmentIcon />
            </UnderDevelopmentIconContainer>
          )}
          {githubStarsCount !== null && (
            <IconContainer>
              <Icon name="star" width={14} height={14} />
              <span>{githubStarsCount}</span>
            </IconContainer>
          )}
          {githubForksCount !== null && (
            <IconContainer>
              <Icon name="fork" width={14} height={14} />
              <span>{githubForksCount}</span>
            </IconContainer>
          )}
        </IconsContainer>
      }
    >
      {description}
    </Block>
  );
};

export default Project;
