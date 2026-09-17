import React, { useState } from "react";
import styled from "@emotion/styled";
import { useStaticQuery, graphql } from "gatsby";

import Block from "./block";
import Link from "./link";
import BibtexModal from "./bibtexModal";
import { generateBibTeX } from "../utils/bibtex";

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

const PublicationAuthors = ({ authors, websiteAuthor }) => {
  const formatAuthors = (authors) => {
    if (!authors || authors.length === 0) return "";

    // Bold website author's name
    const formattedAuthors = authors.map((author) =>
      author === websiteAuthor ? `<b>${author}</b>` : author
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

// Styled to match the plain-text <a> links rendered alongside it (see
// config/typography.js's global `a` styles), since a native <button> has
// none of that styling by default.
const ActionButton = styled.button`
  border: 0;
  background: none;
  padding: 0;
  font: inherit;
  cursor: pointer;

  color: var(--color-accent);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`;

const PublicationActions = ({ resources }) => {
  const ActionSeparator = styled.div`
    display: inline-block;
    margin-left: 5px;
    margin-right: 5px;
    // color: rgba(55, 125, 255, 0.6);
    color: color-mix(in srgb, var(--color-accent) 50%, white);
  `;

  if (!resources || resources.length === 0) {
    return null;
  }

  return (
    <div>
      {resources.map((action, i) => (
        <span key={action.name}>
          {action.onClick ? (
            <ActionButton onClick={action.onClick}>{action.name}</ActionButton>
          ) : (
            <Link to={action.url} external>
              {action.name}
            </Link>
          )}
          {i !== resources.length - 1 && <ActionSeparator>/</ActionSeparator>}
        </span>
      ))}
    </div>
  );
};

const Publication = ({ publication, websiteAuthor }) => {
  const [showBibtex, setShowBibtex] = useState(false);

  const query = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `);
  const siteUrl = query?.site?.siteMetadata?.siteUrl || "";

  const url = publication.frontmatter.resources.find(
    (resource) => resource.name === "Document"
  )?.url;

  const key = publication.fileAbsolutePath.split("/").pop().replace(".md", "");

  const resources = publication.frontmatter.resources.some(
    (resource) => resource.name === "Ref (BibTeX)"
  )
    ? publication.frontmatter.resources
    : [
        ...publication.frontmatter.resources,
        { name: "Ref (BibTeX)", onClick: () => setShowBibtex(true) },
      ];

  const bibText = generateBibTeX({
    frontmatter: publication.frontmatter,
    filename: key,
    siteUrl,
  });

  return (
    <>
      <Block
        title={publication.frontmatter.title}
        info={publication.frontmatter.year}
        image={`/images/publications/${key}.png`}
        imageActionUrl={url}
        border={false}
      >
        <PublicationItem>
          <PublicationSource>{publication.frontmatter.source}</PublicationSource>
          <PublicationAuthors
            authors={publication.frontmatter.authors}
            websiteAuthor={websiteAuthor}
          />
          <PublicationActions resources={resources} />
        </PublicationItem>
      </Block>
      {showBibtex && (
        <BibtexModal bibText={bibText} onClose={() => setShowBibtex(false)} />
      )}
    </>
  );
};

export default Publication;
