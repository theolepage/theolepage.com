import React from "react"

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
    return (
        <Section title="Publications">
            {PUBLICATIONS.map(publication => {
                if (publication.bib) {
                    publication.actions.push({
                        'name': 'Cite',
                        'do': () => downloadBibFile(publication)
                    })
                }
                return (
                    <Block
                        key={publication.name}
                        title={publication.name}
                        info={publication.journal}
                        description={underlineCurrentAuthor(publication.authors)}
                        actions={publication.actions}
                    />
                )
            }
            )}
        </Section>
    )
}

export default Publications