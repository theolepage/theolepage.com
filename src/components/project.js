import React from "react";
import styled from "@emotion/styled";
import { Star, GitFork } from "lucide-react";

import Block from "./block";

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: rgb(150, 150, 150);
`;

const StarIcon = styled(Star)`
  width: 14px;
  height: 14px;
  color: rgb(150, 150, 150);
`;

const ForkIcon = styled(GitFork)`
  width: 14px;
  height: 14px;
  color: rgb(150, 150, 150);
`;

const UnderDevelopmentContainer = styled.div`
  position: relative;

  width: 14px;
  height: 14px;
`;

const UnderDevelopment = styled.div`
  width: 100%;
  height: 100%;

  border-radius: 100%;
  border: 3px solid rgb(245, 245, 245);

  &:after {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    content: "";

    border-radius: 100%;
    border: 3px solid transparent;
    border-top-color: rgb(200, 200, 200);

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
            <UnderDevelopmentContainer>
              <UnderDevelopment />
            </UnderDevelopmentContainer>
          )}
          {githubStarsCount !== undefined && (
            <IconContainer>
              <StarIcon />
              <span>{githubStarsCount}</span>
            </IconContainer>
          )}
          {githubForksCount !== undefined && (
            <IconContainer>
              <ForkIcon />
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
