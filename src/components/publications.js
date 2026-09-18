import React from "react";
import styled from "@emotion/styled";

import { useStaticQuery, graphql } from "gatsby";

import Section from "./section";
import Link from "./link";
import Icon from "./icon";
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

  const nonThesisPublications = data.nodes.filter(
    (publication) => publication.frontmatter.type !== "thesis"
  );
  const publications = nonThesisPublications.filter(
    (publication) => listing || publication.frontmatter.showcased === true
  );
  const hasMore = nonThesisPublications.length > publications.length;

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

      {hasMore && (
        <Link to="/publications" variant="secondary">
          See all publications <Icon name="rightArrow" width={14} height={14} style={{ marginTop: 2 }} />
        </Link>
      )}
    </Section>
  );
};

export default Publications;
