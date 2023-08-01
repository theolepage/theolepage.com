import React from "react"

import Section from "./section"
import Block from "./block"

const PUBLICATIONS = [
    {
        name: 'Experimenting with Additive Margins for Contrastive Self-Supervised Speaker Verification',
        authors: 'Theo Lepage, and Reda Dehak',
        journal: 'INTERSPEECH 2023',
        actions: [
            { name: 'Article', url: 'https://arxiv.org/abs/2306.03664' },
            // { name: 'Slides', url: '/uploads/lepage_interspeech_2022_slides.pdf' },
            // { name: 'Video', url: 'https://youtu.be/Ndhzm6Krj7Q' },
            { name: 'Code', url: 'https://github.com/theolepage/sslsv' }
        ]
    },
    {
        name: 'Label-Efficient Self-Supervised Speaker Verification With Information Maximization and Contrastive Learning',
        authors: 'Theo Lepage, and Reda Dehak',
        journal: 'INTERSPEECH 2022',
        actions: [
            { name: 'Article', url: 'https://arxiv.org/abs/2207.05506' },
            { name: 'Slides', url: '/uploads/lepage_interspeech_2022_slides.pdf' },
            { name: 'Video', url: 'https://youtu.be/Ndhzm6Krj7Q' },
            { name: 'Code', url: 'https://github.com/theolepage/sslsv' }
        ]
    },
    {
        name: 'Self-supervised learning applied to speaker and language recognition',
        authors: 'Theo Lepage',
        journal: 'LRDE Students Seminar 2021',
        actions: [
            { name: 'Report', url: '/uploads/lepage_lrde_2021_report.pdf' },
            { name: 'Slides', url: '/uploads/lepage_lrde_2021_slides.pdf' },
            { name: 'Video',  url: 'https://youtu.be/7txwJlIrKO0' }
        ]
    }
]

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