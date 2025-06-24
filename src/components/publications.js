import React, { useMemo } from "react";
import styled from "@emotion/styled";
import { useStaticQuery, graphql } from "gatsby";

import Section from "./section";
import Block from "./block";
import Link from "./link";
import Button from "./button";
import Icon from "./icon";

const BlocksGrid = styled.div`
  margin: calc(var(--spacing) * 2) 0;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: calc(var(--spacing) * 2 - 4px);
`;

const PublicationItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  margin-top: 4px;
`;

const PublicationSource = styled.span`
  color: var(--color-muted-1);
  font-weight: 600;
`;

const PublicationAuthors = ({ authors }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
        }
      }
    }
  `);

  // Add fallback values in case siteMetadata is undefined
  const siteMetadata = data?.site?.siteMetadata || {
    author: "",
  };

  const formatAuthors = (authors) => {
    if (!authors || authors.length === 0) return "";

    // Bold website author's name
    const formattedAuthors = authors.map((author) =>
      author === siteMetadata.author ? `<b>${author}</b>` : author
    );

    // Apply comma logic
    if (formattedAuthors.length === 1) {
      return formattedAuthors[0];
    } else if (formattedAuthors.length === 2) {
      return formattedAuthors.join(" and ");
    } else {
      // For 3+ authors: comma between all names, and before "and" for the last name
      const allButLast = formattedAuthors.slice(0, -1);
      const last = formattedAuthors[formattedAuthors.length - 1];
      return allButLast.join(", ") + ", and " + last;
    }
  };

  const Authors = styled.div`
    color: var(--color-muted-2);
  `;

  return (
    <Authors dangerouslySetInnerHTML={{ __html: formatAuthors(authors) }} />
  );
};

const PublicationActions = ({ resources }) => {
  const Actions = styled.div`
    // margin-top: 4px;
  `;

  const ActionSeparator = styled.div`
    display: inline-block;
    margin-left: 5px;
    margin-right: 5px;
    color: rgba(55, 125, 255, 0.6);
  `;

  if (!resources || resources.length === 0) {
    return null;
  }

  return (
    <Actions>
      {resources.map((action, i) => (
        <span key={action.name}>
          <Link to={action.url} external>
            {action.name}
          </Link>
          {i !== resources.length - 1 && <ActionSeparator>/</ActionSeparator>}
        </span>
      ))}
    </Actions>
  );
};

const Publications = ({ data, listing }) => {
  const publications = useMemo(() => {
    let filteredNodes = data.nodes;

    // If not in listing mode, only show showcased publications
    if (!listing) {
      filteredNodes = data.nodes.filter((node) => {
        return node.frontmatter.showcased === true;
      });
    }

    return filteredNodes.map((node) => {
      const { frontmatter, fileAbsolutePath } = node;

      const filename = fileAbsolutePath.split("/").pop().replace(".md", "");

      const publication = {
        name: frontmatter.title,
        year: frontmatter.year,
        authors: frontmatter.authors,
        source: frontmatter.source,
        type: frontmatter.type,
        resources: frontmatter.resources ? [...frontmatter.resources] : [],
        image: `/images/publications/${filename}.png`,
      };

      if (
        !publication.resources.some(
          (resource) => resource.name === "Ref (BibTeX)"
        )
      ) {
        publication.resources.push({
          name: "Ref (BibTeX)",
          url: `/ref/${filename}`,
        });
      }

      return publication;
    });
  }, [data.nodes, listing]);

  return (
    <Section title="Publications">
      <BlocksGrid>
        {publications.map((publication) => (
          <Block
            key={publication.name}
            title={publication.name}
            info={publication.year}
            image={publication.image}
            imageActionUrl={
              publication.resources.find(
                (resource) => resource.name === "Document"
              )?.url
            }
            border={false}
          >
            <PublicationItem>
              <PublicationSource>{publication.source}</PublicationSource>
              <PublicationAuthors authors={publication.authors} />
              <PublicationActions resources={publication.resources} />
            </PublicationItem>
          </Block>
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
