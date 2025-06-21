import React, { useMemo } from "react"

import Section from "./section"
import Block from "./block"

const formatAuthors = (authors) => {
    if (!authors || authors.length === 0) return '';

    // Bold Theo Lepage's name
    const formattedAuthors = authors.map(author =>
        author === 'Theo Lepage' ? '<b>Theo Lepage</b>' : author
    );

    // Apply comma logic
    if (formattedAuthors.length === 1) {
        return formattedAuthors[0];
    } else if (formattedAuthors.length === 2) {
        return formattedAuthors.join(' and ');
    } else {
        // For 3+ authors: comma between all names, and before "and" for the last name
        const allButLast = formattedAuthors.slice(0, -1);
        const last = formattedAuthors[formattedAuthors.length - 1];
        return allButLast.join(', ') + ', and ' + last;
    }
}

const showBibTeX = (publication) => {
    const bibText = publication.bib.trim();
    const newWindow = window.open('', '_blank');
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
}

const Publications = ({ data }) => {
    const publications = useMemo(() => {
        return data.nodes.map(node => {
            const { frontmatter, rawMarkdownBody, fileAbsolutePath } = node

            // Extract BibTeX from the markdown body
            const bib = rawMarkdownBody

            const publication = {
                name: frontmatter.title,
                authors: frontmatter.authors,
                journal: frontmatter.source,
                actions: frontmatter.actions || [],
                bib: bib,
            }

            if (bib && !publication.actions.some(action => action.name === "Cite")) {
                publication.actions.push({
                    name: "Cite",
                    do: () => showBibTeX(publication),
                });
            }

            return publication;
        });
    }, [data.nodes]);

    return (
        <Section title="Publications">
            {publications.map(publication =>
                <Block
                    key={publication.name}
                    title={publication.name}
                    info={publication.journal}
                    description={formatAuthors(publication.authors)}
                    actions={publication.actions}
                />
            )}
        </Section>
    )
}

export default Publications