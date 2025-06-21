import React from "react";
import styled from "@emotion/styled";

import Block from "./block";

const Icons = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;

  width: 12px;
  height: 12px;
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
  const { githubStarsCount, githubPushedAt } = project.fields || {};

  const isUnderDevelopment =
    githubPushedAt &&
    new Date(githubPushedAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  return (
    <Block
      key={project.id}
      title={name}
      description={description}
      url={url}
      corner={color}
      info={githubStarsCount && githubStarsCount}
    >
      <Icons>{isUnderDevelopment && <UnderDevelopment />}</Icons>
    </Block>
  );
};

export default Project;
