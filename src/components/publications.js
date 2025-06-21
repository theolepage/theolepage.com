import React, { useMemo } from "react";

import Section from "./section";
import Block from "./block";

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

const Publications = ({ data }) => {
  const publications = useMemo(() => {
    return data.nodes.map((node) => {
      const { frontmatter, fileAbsolutePath } = node;

      // Extract filename for preview image
      const filename = fileAbsolutePath.split("/").pop().replace(".md", "");
      const previewImage = `/images/publications/${filename}.png`;

      const publication = {
        name: frontmatter.title,
        authors: frontmatter.authors,
        journal: frontmatter.source,
        type: frontmatter.type,
        resources: frontmatter.resources ? [...frontmatter.resources] : [],
        previewImage: previewImage,
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
