import React from "react";
import styled from "@emotion/styled";

import Block from "./block";
import Link from "./link";

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
          <Link to={action.url} external>
            {action.name}
          </Link>
          {i !== resources.length - 1 && <ActionSeparator>/</ActionSeparator>}
        </span>
      ))}
    </div>
  );
};

const formatDate = (year, month) => {
  if (!year) return "";

  if (!month) return year.toString();

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${monthNames[month - 1]} ${year}`;
};

const Publication = ({ publication, websiteAuthor }) => {
  const url = publication.frontmatter.resources.find(
    (resource) => resource.name === "Document"
  )?.url;

  const key = publication.fileAbsolutePath.split("/").pop().replace(".md", "");

  if (
    !publication.frontmatter.resources.some(
      (resource) => resource.name === "Ref (BibTeX)"
    )
  ) {
    publication.frontmatter.resources.push({
      name: "Ref (BibTeX)",
      url: `/ref/${key}`,
    });
  }

  const formattedDate = formatDate(
    publication.frontmatter.year,
    publication.frontmatter.month
  );

  return (
    <Block
      title={publication.frontmatter.title}
      info={formattedDate}
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
        <PublicationActions resources={publication.frontmatter.resources} />
      </PublicationItem>
    </Block>
  );
};

export default Publication;
