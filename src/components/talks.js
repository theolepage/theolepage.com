import React from "react"

import Section from "./section"
import Block from "./block"

const TALKS = [
    {
        name: 'Self-Supervised Learning for Speaker Recognition',
        location: 'Callyope — Paris, France',
        date: 'Dec. 2024',
    },
    {
        name: 'Lightning Talks on SSL applied to Speaker and Language Recognition',
        location: 'LRDE — Paris, France',
        date: 'Jan. - Sep. 2021',
        link: 'https://www.youtube.com/watch?v=_zBMZ22n6Lk&list=PLi4WQQO33eqU22Le1MFwgqRUtjdptCm6h'
    }
]

const Talks = () => {
    return (
        <Section title="Talks">
            {TALKS.map(talk =>
                <Block
                    key={talk.name}
                    title={talk.name}
                    info={talk.date + ' @ ' + talk.location}
                    url={talk.link}
                />
            )}
        </Section>
    )
}

export default Talks