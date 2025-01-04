import React from "react"

import Section from "./section"
import Block from "./block"

import { PUBLICATIONS } from "../../config/publications"

const underlineCurrentAuthor = (authors) => {
    return authors.replace('Theo Lepage', '<u>Theo Lepage</u>')
}

const Publications = () => {

    return (
        <Section title="Publications">
            {PUBLICATIONS.map(publication =>
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