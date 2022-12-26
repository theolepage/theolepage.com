import React from "react"

import Section from "./section"
import Block from "./block"

const TEACHING = [
    {
        name: 'Unix / C Programming',
        location: 'EPITA',
        date: 'Fall 2019'
    },
    {
        name: 'Rust Programming',
        location: 'EPITA',
        date: 'Spring 2020'
    }
]

const Teaching = () => {
    return (
        <Section title="Teaching">
            {TEACHING.map(teaching =>
                <Block
                    key={teaching.name}
                    title={teaching.name}
                    info={teaching.location + ' / ' + teaching.date}
                />
            )}
        </Section>
    )
}

export default Teaching