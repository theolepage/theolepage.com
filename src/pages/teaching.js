import React from "react";
import { graphql } from "gatsby";

import Page from "../components/page";
import Teaching from "../components/teaching";

const TeachingPage = ({ data }) => {
  return (
    <Page title="Teaching">
      <Teaching data={data.teaching} listing />
    </Page>
  );
};

export default TeachingPage;

export const query = graphql`
  {
    teaching: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/teaching/" } }
      sort: { frontmatter: { endYear: DESC } }
    ) {
      nodes {
        id
        frontmatter {
          name
          location
          startYear
          endYear
          semester
          resources {
            name
            url
          }
        }
      }
    }
  }
`;
