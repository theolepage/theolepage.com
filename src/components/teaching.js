import React from "react"
import styled from "@emotion/styled"

import Section from "./section"
import Block from "./block"

const BlocksGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 15px;

    margin-bottom: 15px;

    @media (max-width: 1000px) {
        display: block;
        margin-bottom: 0;
    }
`

const Teaching = ({ data }) => {
    const teaching = data.nodes

    const formatDate = (startYear, endYear, semester) => {
        if (startYear === endYear) {
            return `${semester} ${startYear}`
        } else {
            return `${semester} ${startYear} - ${endYear}`
        }
    }

    return (
        <Section title="Teaching">
            <BlocksGrid>
                {teaching.map(course => {
                    const dateString = formatDate(
                        course.frontmatter.startYear,
                        course.frontmatter.endYear,
                        course.frontmatter.semester
                    )
                    return (
                        <Block
                            key={course.id}
                            title={course.frontmatter.name}
                            description={dateString + ' @ ' + course.frontmatter.location}
                        />
                    )
                })}
            </BlocksGrid>
        </Section>
    )
}

export default Teaching