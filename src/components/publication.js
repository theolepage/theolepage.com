import React, { useState } from "react";
import styled from "@emotion/styled";
import { useStaticQuery, graphql } from "gatsby";

import Block from "./block";
import ResourceActions from "./resourceActions";
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
          <ResourceActions resources={resources} />
        </PublicationItem>
      </Block>
      {showBibtex && (
        <BibtexModal bibText={bibText} onClose={() => setShowBibtex(false)} />
      )}
    </>
  );
};

export default Publication;
