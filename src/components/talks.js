import React from "react"

import Section from "./section"
import Block from "./block"

import { TALKS } from "../../config/talks"

const Talks = () => {
    return (
        <Section title="Talks">
            {TALKS.map(talk =>
                <Block
                    key={talk.name}
                    title={talk.name}
                    info={talk.date + ' @ ' + talk.location}
                    url={talk.link}
                    wide_info
                />
            )}
        </Section>
    )
}

export default Talks