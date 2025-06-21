import React, { useMemo } from "react";
import styled from "@emotion/styled";
import { Files } from "lucide-react";

import Section from "./section";
import Block from "./block";
import Link from "./link";
import Button from "./button";

const BlocksGrid = styled.div`
  margin: 32px 0;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 28px;
`;

const PublicationItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  margin-top: 2px;
`;

const PublicationSource = styled.span`
  color: rgb(80, 80, 80);
  font-weight: 600;
`;

const PublicationAuthors = ({ authors }) => {
  const formatAuthors = (authors) => {
    if (!authors || authors.length === 0) return "";

    // Bold Theo Lepage's name
    const formattedAuthors = authors.map((author) =>
      author === "Theo Lepage" ? "<b>Theo Lepage</b>" : author
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
    color: rgb(120, 120, 120);
  `;

  return (
    <Authors dangerouslySetInnerHTML={{ __html: formatAuthors(authors) }} />
  );
};

const PublicationActions = ({ resources }) => {
  const Actions = styled.div`
    margin-top: 8px;
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
          <Link to={action.url}>{action.name}</Link>
          {i !== resources.length - 1 && <ActionSeparator>/</ActionSeparator>}
        </span>
      ))}
    </Actions>
  );
};

const PublicationsIcon = styled(Files)`
  display: inline-block;
  position: relative;
  top: 2px;
  margin: 0 8px 0 0px;
  width: 16px;
  height: 16px;
  color: rgb(60, 60, 60);
`;

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
          url: `./ref/${filename}`,
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
          <PublicationsIcon />
          See all publications
        </Button>
      )}
    </Section>
  );
};

export default Publications;
