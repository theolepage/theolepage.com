import React from "react";
import styled from "@emotion/styled";

import Section from "./section";
import Project from "./project";
import Button from "./button";
import Icon from "./icon";

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--element-spacing);

  margin-bottom: var(--element-spacing);

  @media (max-width: 1000px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--element-spacing);
`;

const GithubIcon = styled.div`
  display: inline-block;

  width: 16px;
  height: 16px;

  background-color: var(--color-default);

  mask: url(/images/socials/icon-github.png) no-repeat center / contain;
`;

// Explicit `order` takes priority (ascending) over everything else;
// projects without an `order` fall back to the GitHub repo's last push
// date (most recently active first).
const sortProjects = (projects) =>
  [...projects].sort((a, b) => {
    const { order: orderA } = a.frontmatter;
    const { order: orderB } = b.frontmatter;

    if (orderA != null || orderB != null) {
      if (orderA == null) return 1;
      if (orderB == null) return -1;
      return orderA - orderB;
    }

    const pushedAtA = a.fields?.githubPushedAt;
    const pushedAtB = b.fields?.githubPushedAt;
    return new Date(pushedAtB) - new Date(pushedAtA);
  });

const Projects = ({ data, listing }) => {
  const projects = sortProjects(
    data.nodes.filter((project) => {
      return listing || project.frontmatter.showcased === true;
    })
  );

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
