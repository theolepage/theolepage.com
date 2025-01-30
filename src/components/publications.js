import React, { useMemo } from "react"

import Section from "./section"
import Block from "./block"

import { PUBLICATIONS } from "../../config/publications"

const underlineCurrentAuthor = (authors) => {
    return authors.replace('Theo Lepage', '<u>Theo Lepage</u>')
}

const downloadBibFile = (publication) => {
    const blob = new Blob(
        [publication.bib.trim()],
        { type: "text/plain;charset=utf-8" }
    )
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a");
    a.href = url;
    a.download = `${publication.bib.match(/@[\w]+{([^,]+)/)[1]}.bib`;
    a.click();
    URL.revokeObjectURL(url)
}

const Publications = () => {
    const publications = useMemo(() => {
        return PUBLICATIONS.map(publication => {
            if (publication.bib && !publication.actions.some(action => action.name === "Cite")) {
                publication.actions.push({
                    name: "Cite",
                    do: () => downloadBibFile(publication),
                });
            }
            return publication;
        });
    }, []);

    return (
        <Section title="Publications">
            {publications.map(publication =>
                <Block
                    key={publication.name}
                    title={publication.name}
                    info={publication.journal}
                    description={underlineCurrentAuthor(publication.authors)}
                    actions={publication.actions}
                />
            )}
        </Section>
    )
}

export default Publications