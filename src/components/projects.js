import React from "react";
import styled from "@emotion/styled";
import { FolderOpen } from "lucide-react";

import Section from "./section";
import Project from "./project";
import Button from "./button";

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

const ProjectsIcon = styled(FolderOpen)`
  display: inline-block;
  position: relative;
  top: 2px;
  margin: 0 8px 0 0px;
  width: var(--icon-size);
  height: var(--icon-size);
  color: var(--color-default);
`;

const GithubIcon = styled.div`
  display: inline-block;

  position: relative;
  top: 2px;

  margin: 0 8px 0 0px;

  width: var(--icon-size);
  height: var(--icon-size);

  background-color: var(--color-default);

  mask: url(/images/icon-github.png) no-repeat center / contain;
`;

const Projects = ({ data, listing }) => {
  let projects = data.nodes;

  // If not in listing mode, only show showcased projects
  if (!listing) {
    projects = data.nodes.filter((project) => {
      return project.frontmatter.showcased === true;
    });
  }

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
            <ProjectsIcon />
            See all projects
          </Button>
        )}

        <Button to={"https://github.com/theolepage"}>
          <GithubIcon />
          Browse my GitHub
        </Button>
      </Buttons>
    </Section>
  );
};

export default Projects;
