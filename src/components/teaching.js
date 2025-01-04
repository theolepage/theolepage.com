import React from "react"
import styled from "@emotion/styled"

import Section from "./section"
import Block from "./block"

import { TEACHING } from "../../config/teaching"

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