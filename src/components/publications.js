import React from "react";
import styled from "@emotion/styled";

import { useStaticQuery, graphql } from "gatsby";

import Section from "./section";
import Button from "./button";
import Icon from "./icon";
import Publication from "./publication";

const BlocksGrid = styled.div`
  margin: calc(var(--element-spacing) * 2) 0;
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
    return listing || publication.frontmatter.showcased === true;
  });

  return (
    <Section title="Publications">
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
        <Button to={"/publications"}>
          <Icon name="publications" />
          See all publications
        </Button>
      )}
    </Section>
  );
};

export default Publications;
