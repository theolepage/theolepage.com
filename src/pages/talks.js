import React from "react";
import { graphql } from "gatsby";

import Page from "../components/page";
import Talks from "../components/talks";

const TalksPage = ({ data }) => {
  return (
    <Page title="Talks">
      <Talks data={data.talks} listing />
    </Page>
  );
};

export default TalksPage;

export const query = graphql`
  {
    talks: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/talks/" } }
    ) {
      nodes {
        id
        frontmatter {
          name
          location
          date
          startDate
          endDate
          link
        }
      }
    }
  }
`;
