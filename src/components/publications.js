import React from "react";
import styled from "@emotion/styled";

import { useStaticQuery, graphql } from "gatsby";

import Section from "./section";
import Link from "./link";
import Publication from "./publication";

const BlocksGrid = styled.div`
  margin-bottom: var(--element-spacing);
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: calc(var(--element-spacing) * 2 - 4px);
`;

const Publications = ({ data, listing }) => {
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

  const publications = data.nodes.filter((publication) => {
    return publication.frontmatter.type !== "thesis" && (listing || publication.frontmatter.showcased === true);
  });

  return (
    <Section title="Publications" icon="publications">
      <BlocksGrid>
        {publications.map((publication) => (
          <Publication
            key={publication.id}
            publication={publication}
            websiteAuthor={websiteAuthor}
          />
        ))}
      </BlocksGrid>

      {!listing && (
        <Link to="/publications" variant="secondary">See all publications →</Link>
      )}
    </Section>
  );
};

export default Publications;
