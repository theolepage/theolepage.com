import React from "react";
import { graphql } from "gatsby";

import Page from "../components/page";
import Publications from "../components/publications";

const PublicationsPage = ({ data }) => {
  return (
    <Page title="Publications">
      <Publications data={data.publications} listing />
    </Page>
  );
};

export default PublicationsPage;

export const query = graphql`
  {
    publications: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/publications/" } }
      sort: [{ frontmatter: { year: DESC } }, { frontmatter: { month: DESC } }]
    ) {
      nodes {
        frontmatter {
          title
          authors
          source
          year
          month
          type
          showcased
          bib_entries
          resources {
            name
            url
          }
        }
        fileAbsolutePath
      }
    }
  }
`;
