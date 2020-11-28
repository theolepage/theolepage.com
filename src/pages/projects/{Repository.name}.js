import React from "react"
import { graphql } from "gatsby"
import styled from "@emotion/styled"

const Container = styled.div`
    width: 900px;
    margin: 80px auto;
`

export default (props) => {
    const { repository } = props.data
    const readme = repository.childReadme.childMarkdownRemark.html

    return (
        <Container>
            <div dangerouslySetInnerHTML={{ __html: readme }} />
        </Container>
    )
}

export const query = graphql`
    query($name: String!) {
        repository(name: { eq: $name }) {
            id
            name
            url
            homepageUrl
            description
            pushedAt
            repositoryTopics {
                edges {
                    node {
                        topic {
                            name
                        }
                    }
                }
            }
            childReadme {
                childMarkdownRemark {
                    html
                }
            }
        }
    }
`