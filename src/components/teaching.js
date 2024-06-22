import React from "react"
import styled from "@emotion/styled"

import Section from "./section"
import Block from "./block"

const TEACHING = [
    {
        name: 'Introduction to Deep Neural Networks',
        location: 'EPITA',
        date: 'Spring 2023 - 2024'
    },
    {
        name: 'Python for Data Science',
        location: 'EPITA',
        date: 'Spring 2023 - 2024'
    },
    {
        name: 'Rust Programming',
        location: 'EPITA',
        date: 'Spring 2020'
    },
    {
        name: 'Unix / C Programming',
        location: 'EPITA',
        date: 'Fall 2019'
    },
]

const BlocksGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;

    margin-bottom: 15px;

    @media (max-width: 1000px) {
        display: block;
        margin-bottom: 0;
    }
`

const Teaching = () => {
    return (
        <Section title="Teaching">
            <BlocksGrid>
                {TEACHING.map(teaching =>
                    <Block
                        key={teaching.name}
                        title={teaching.name}
                        description={teaching.date + ' @ ' + teaching.location}
                    />
                )}
            </BlocksGrid>
        </Section>
    )
}

export default Teaching