import React, { useState } from "react";
import { graphql } from "gatsby";
import { navigate } from "gatsby";
import styled from "@emotion/styled";

import Page from "../components/page";
import Button from "../components/button";
import Icon from "../components/icon";

const Background = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: var(--background-secondary);
`;

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 1000px;

  @media (max-width: 1100px) {
    width: 90%;
  }
`;

const BibTeXPre = styled.pre`
  display: block;
  max-width: 1000px;

  padding: var(--element-spacing);

  white-space: pre;
  overflow-x: auto;

  color: black;
  font-family: monospace;

  background-color: white;
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
`;

const BIBTEX_FIELD_ORDER = [
  "title",
  "author",
  "year",
  "booktitle",
  "journal",
  "institution",
  "type",
  "pages",
  "doi",
  "url",
];

const generateBibTeX = ({ frontmatter, filename }) => {
  // Helper: BibTeX-safe string
  const safe = (str) => (str ? str.replace(/[{}]/g, "") : "");

  // BibTeX type
  let bibType = "Misc";
  if (frontmatter.type === "conference") bibType = "InProceedings";
  else if (frontmatter.type === "journal") bibType = "Article";
  else if (frontmatter.type === "report") bibType = "TechReport";

  // BibTeX key: basename of markdown file
  const bibKey = filename;

  // Start BibTeX entry
  let bib = `@${bibType}{${bibKey},\n`;

  // Collect all fields to determine max field name length
  const fields = [];

  // Add bib_entries fields first (these have highest priority and can override anything)
  if (frontmatter.bib_entries) {
    Object.entries(frontmatter.bib_entries).forEach(([key, value]) => {
      // Skip empty values
      if (!value || value.trim() === "") return;
      fields.push([key, safe(value)]);
    });
  }

  // Add standard fields only if not already provided in bib_entries
  if (frontmatter.title && !frontmatter.bib_entries?.title)
    fields.push(["title", safe(frontmatter.title)]);
  if (
    frontmatter.authors &&
    frontmatter.authors.length > 0 &&
    !frontmatter.bib_entries?.author
  )
    fields.push(["author", frontmatter.authors.join(" and ")]);
  if (frontmatter.year && !frontmatter.bib_entries?.year)
    fields.push(["year", frontmatter.year]);

  // Conference/journal-specific fields (only if not in bib_entries)
  if (
    frontmatter.type === "conference" &&
    frontmatter.source &&
    !frontmatter.bib_entries?.booktitle
  )
    fields.push(["booktitle", safe(frontmatter.source)]);
  if (
    frontmatter.type === "journal" &&
    frontmatter.source &&
    !frontmatter.bib_entries?.journal
  )
    fields.push(["journal", safe(frontmatter.source)]);

  // Auto-add URL from "Document" resource if not already in bib_entries
  if (!frontmatter.bib_entries?.url && frontmatter.resources) {
    const documentResource = frontmatter.resources.find(
      (resource) => resource.name === "Document"
    );
    if (documentResource && documentResource.url) {
      fields.push(["url", safe(documentResource.url)]);
    }
  }

  // Calculate max field name length for alignment
  const maxFieldLength = Math.max(...fields.map(([field]) => field.length));

  // Sort fields according to the defined order
  fields.sort(([fieldA], [fieldB]) => {
    const indexA = BIBTEX_FIELD_ORDER.indexOf(fieldA);
    const indexB = BIBTEX_FIELD_ORDER.indexOf(fieldB);

    // If both fields are in the order array, sort by their position
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }
    // If only fieldA is in the order array, it comes first
    if (indexA !== -1) return -1;
    // If only fieldB is in the order array, it comes first
    if (indexB !== -1) return 1;
    // If neither field is in the order array, maintain original order
    return 0;
  });

  // Add fields with aligned equals signs
  fields.forEach(([field, value]) => {
    const padding = " ".repeat(maxFieldLength - field.length);
    bib += `  ${field}${padding} = {${value}},\n`;
  });

  // Remove trailing comma and close
  bib = bib.replace(/,\n$/, "\n") + "}";

  return bib;
};

const RefPage = ({ data, pageContext }) => {
  const { filename } = pageContext;
  const [copied, setCopied] = useState(false);

  const publication = data.allMarkdownRemark.nodes.find(
    (node) =>
      node.fileAbsolutePath.split("/").pop().replace(".md", "") === filename
  );

  if (!publication) {
    navigate("/404");
    return null;
  }

  const { frontmatter } = publication;

  const bibText = generateBibTeX({ frontmatter, filename });

  const handleCopyClick = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(bibText);

    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <Page title={`${frontmatter.title} (BibTeX)`} layout={false}>
      <Background />
      <Content>
        <BibTeXPre>{bibText}</BibTeXPre>
        <Button onClick={handleCopyClick}>
          {copied ? (
            <>
              Copied{" "}
              <Icon
                name="check"
                color="#39bd3f"
                width={18}
                height={18}
                strokeWidth={2.75}
              />
            </>
          ) : (
            <>
              Copy to clipboard <Icon name="copy" />
            </>
          )}
        </Button>
      </Content>
    </Page>
  );
};

export default RefPage;

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/publications/" } }
    ) {
      nodes {
        frontmatter {
          title
          authors
          source
          year
          month
          type
          bib_entries
          resources {
            name
            url
          }
        }
        fileAbsolutePath
      }
    }
  }
`;
