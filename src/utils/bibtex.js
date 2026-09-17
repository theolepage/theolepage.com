const BIBTEX_FIELD_ORDER = [
  "title",
  "author",
  "year",
  "booktitle",
  "journal",
  "institution",
  "type",
  "volume",
  "pages",
  "doi",
  "url",
];

export const generateBibTeX = ({ frontmatter, filename, siteUrl }) => {
  // Helper: BibTeX-safe string
  const safe = (str) => (str ? str.replace(/[{}]/g, "") : "");
  const toAbsoluteUrl = (url) =>
      url?.startsWith("/") ? `${siteUrl.replace(/\/$/, "")}${url}` : url;

  // BibTeX type
  let bibType = "Misc";
  if (frontmatter.type === "conference") bibType = "InProceedings";
  else if (frontmatter.type === "journal") bibType = "Article";
  else if (frontmatter.type === "report") bibType = "TechReport";
  else if (frontmatter.type === "thesis") bibType = "Thesis";

  // BibTeX key: basename of markdown file
  let bibKey = filename;
  if (frontmatter.key) {
    bibKey = frontmatter.key;
  }

  // Start BibTeX entry
  let bib = `@${bibType}{${bibKey},\n`;

  // Collect all fields to determine max field name length
  const fields = [];

  // Add bib_entries fields first (these have highest priority and can override anything)
  if (frontmatter.bib_entries) {
    Object.entries(frontmatter.bib_entries).forEach(([key, value]) => {
      // Skip empty values
      if (!value || value.trim() === "") return;
      fields.push([key, key === "url" ? safe(toAbsoluteUrl(value)) : safe(value)]);
    });
  }

  // Add standard fields only if not already provided in bib_entries
  if (frontmatter.title && !frontmatter.bib_entries?.title)
    fields.push(["title", safe(frontmatter.title)]);
  if (
    frontmatter.authors &&
    frontmatter.authors.length > 0 &&
    !frontmatter.bib_entries?.author
  ) {
    const bibtexAuthors = frontmatter.authors.map(name => {
      const parts = name.trim().split(/\s+/);
      const first = parts.slice(0, -1).join(' ');
      const last = parts.slice(-1)[0];
      return `${last}, ${first}`;
    }).join(" and ");

    fields.push(["author", bibtexAuthors]);
  }
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
      fields.push(["url", safe(toAbsoluteUrl(documentResource.url))]);
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
