import React from "react";
import styled from "@emotion/styled";

import Section from "./section";
import Project from "./project";
import Button from "./button";
import Icon from "./icon";

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing);

  margin-bottom: var(--spacing);

  @media (max-width: 1000px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing);
`;

const GithubIcon = styled.div`
  display: inline-block;

  width: 16px;
  height: 16px;

  background-color: var(--color-default);

  mask: url(/images/icon-github.png) no-repeat center / contain;
`;

const Projects = ({ data, listing }) => {
  const projects = data.nodes.filter((project) => {
    return listing || project.frontmatter.showcased === true;
  });

  return (
    <Section title="Projects">
      <ProjectsGrid>
        {projects.map((project) => (
          <Project key={project.id} project={project} />
        ))}
      </ProjectsGrid>

      <Buttons>
        {!listing && (
          <Button to={"/projects"}>
            <Icon name="projects" />
            See all projects
          </Button>
        )}

        {listing && (
          <Button to={"https://github.com/theolepage"}>
            <GithubIcon />
            Browse my GitHub
          </Button>
        )}
      </Buttons>
    </Section>
  );
};

export default Projects;
