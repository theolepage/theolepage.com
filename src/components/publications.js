import React, { useMemo } from "react";

import Section from "./section";
import Block from "./block";

// Define the order of BibTeX fields
const BIBTEX_FIELD_ORDER = [
  "title",
  "author",
  "year",
  "booktitle",
  "journal",
  "institution",
  "pages",
  "doi",
  "url",
];

const formatAuthors = (authors) => {
  if (!authors || authors.length === 0) return "";

  // Bold Theo Lepage's name
  const formattedAuthors = authors.map((author) =>
    author === "Theo Lepage" ? "<b>Theo Lepage</b>" : author,
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

function generateBibTeX({ frontmatter, filename }) {
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
      (resource) => resource.name === "Document",
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
}

const showBibTeX = (publication) => {
  const bibText = publication.bib.trim();
  const newWindow = window.open("", "_blank");
  newWindow.document.write(`
        <html>
            <head>
                <title>BibTeX: ${publication.name}</title>
                <style>
                    body {
                        font-family: 'Courier New', monospace;
                        font-size: 14px;
                        line-height: 1.5;
                        background-color: #f5f5f5;
                        margin: 0;
                    }
                    pre {
                        display: block;
                        max-width: 800px;
                        margin: 32px;
                        padding: 16px;
                        background-color: white;
                        border-radius: 4px;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
                        white-space: pre;
                        overflow-x: auto;
                    }
                </style>
            </head>
            <body>
                <pre>${bibText}</pre>
            </body>
        </html>
    `);
  newWindow.document.close();
};

const Publications = ({ data }) => {
  const publications = useMemo(() => {
    return data.nodes.map((node) => {
      const { frontmatter, fileAbsolutePath } = node;

      // Generate BibTeX from metadata
      const bib = generateBibTeX({
        frontmatter,
        filename: fileAbsolutePath.split("/").pop().replace(".md", ""),
      });

      // Extract filename for preview image
      const filename = fileAbsolutePath.split("/").pop().replace(".md", "");
      const previewImage = `/images/publications/${filename}.png`;

      const publication = {
        name: frontmatter.title,
        authors: frontmatter.authors,
        journal: frontmatter.source,
        type: frontmatter.type,
        resources: frontmatter.resources ? [...frontmatter.resources] : [],
        bib: bib,
        previewImage: previewImage,
      };

      if (
        !publication.resources.some(
          (resource) => resource.name === "Ref (BibTeX)",
        )
      ) {
        publication.resources.push({
          name: "Ref (BibTeX)",
          do: () => showBibTeX(publication),
        });
      }

      return publication;
    });
  }, [data.nodes]);

  return (
    <Section title="Publications">
      {publications.map((publication) => (
        <Block
          key={publication.name}
          title={publication.name}
          info={publication.journal}
          description={formatAuthors(publication.authors)}
          actions={publication.resources}
          previewImage={publication.previewImage}
        />
      ))}
    </Section>
  );
};

export default Publications;
