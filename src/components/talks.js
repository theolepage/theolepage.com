import React from "react"

import Section from "./section"
import Block from "./block"

const TALKS = [
    {
        name: 'Self-Supervised Learning for Speaker Recognition',
        location: 'Callyope — France',
        date: 'Dec. 2024',
    },
    {
        name: 'Additive Margin in Contrastive Self-Supervised Frameworks to Learn Discriminative Speaker Representations',
        location: 'Odyssey — Canada',
        date: 'Jun. 2024',
    },
    {
        name: 'Experimenting with Additive Margins for Contrastive Self-Supervised Speaker Verification',
        location: 'INTERSPEECH — Ireland',
        date: 'Aug. 2023',
    },
    {
        name: 'Label-Efficient Self-Supervised Speaker Verification With Information Maximization and Contrastive Learning',
        location: 'INTERSPEECH — South Korea',
        date: 'Sep. 2022',
    },
    {
        name: 'Lightning Talks on SSL applied to Speaker and Language Recognition',
        location: 'LRDE — France',
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