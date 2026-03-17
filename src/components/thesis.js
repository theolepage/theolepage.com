import React from "react";
import styled from "@emotion/styled";

import { useStaticQuery, graphql } from "gatsby";

import Section from "./section";
import Publication from "./publication";

const BlocksGrid = styled.div`
  margin: calc(var(--element-spacing) * 2) 0;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: calc(var(--element-spacing) * 2 - 4px);
`;

const Thesis = ({ data }) => {
  const query = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
        }
      }
    }
  `);

  const websiteAuthor = query?.site?.siteMetadata?.author || "";

  const publication = data.nodes.find((node) =>
    node.fileAbsolutePath.split("/").pop().replace(".md", "") === "thesis"
  );

  return (
    <Section title="Thesis">
      <BlocksGrid>
        <Publication
          key={publication.id}
          publication={publication}
          websiteAuthor={websiteAuthor}
        />
      </BlocksGrid>
    </Section>
  );
};

export default Thesis;
