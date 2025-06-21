import React from "react";
import { graphql } from "gatsby";

import Page from "../components/page";
import Projects from "../components/projects";

const ProjectsPage = ({ data }) => {
  return (
    <Page title="Projects">
      <Projects data={data.projects} listing />
    </Page>
  );
};

export default ProjectsPage;

export const query = graphql`
  {
    projects: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/projects/" } }
      sort: { frontmatter: { order: ASC } }
    ) {
      nodes {
        id
        frontmatter {
          name
          description
          url
          color
          order
          showcased
        }
        fields {
          githubStarsCount
          githubForksCount
          githubPushedAt
        }
      }
    }
  }
`;
