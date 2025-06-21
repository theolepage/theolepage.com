import React from "react";
import styled from "@emotion/styled";
import { FolderOpen } from "lucide-react";

import Section from "./section";
import Project from "./project";
import Button from "./button";

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(1, 140px);
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 16px;

  margin-bottom: 16px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const ProjectsIcon = styled(FolderOpen)`
  display: inline-block;
  position: relative;
  top: 2px;
  margin: 0 8px 0 0px;
  width: 16px;
  height: 16px;
  color: rgb(60, 60, 60);
`;

const GithubIcon = styled.div`
  display: inline-block;

  position: relative;
  top: 2px;

  margin: 0 8px 0 0px;

  width: 16px;
  height: 16px;

  background-color: rgb(60, 60, 60);

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

      {!listing && (
        <Button css={{ marginRight: "16px" }} to={"/projects"}>
          <ProjectsIcon />
          See all projects
        </Button>
      )}

      <Button to={"https://github.com/theolepage"}>
        <GithubIcon />
        Browse my GitHub
      </Button>
    </Section>
  );
};

export default Projects;
