import React from "react"
import { graphql } from "gatsby"
import styled from "@emotion/styled"

import SEO from "../../components/seo"

const Container = styled.div`
    width: 900px;
    margin: 80px auto;
`

export default (props) => {
    const { repository } = props.data
    const readme = repository.childReadme.childMarkdownRemark.html

    return (
        <Container>
            <SEO title={repository.name} />

            <div dangerouslySetInnerHTML={{ __html: readme }} />
        </Container>
    )
}

export const query = graphql`
    query($name: String!) {
        repository(name: { eq: $name }) {
            ...ProjectInformation
            childReadme {
                childMarkdownRemark {
                    html
                }
            }
        }
    }
`