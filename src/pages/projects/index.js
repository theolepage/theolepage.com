import React from "react"
import { graphql } from "gatsby"
import styled from "@emotion/styled"

import SEO from "../../components/seo"
import Project from "../../components/project"

const Container = styled.div`
    width: 900px;
    margin: 80px auto;
`

const Projects = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    margin: 40px 0;
`

export default ({ data }) => {
    return (
        <Container>
            <SEO title="Projects" />

            <Projects>
                {data.projects.nodes.map(repo =>
                    <Project key={repo.id} project={repo} />
                )}
            </Projects>
        </Container>
    )
}

export const query = graphql`
    {
        projects: allRepository {
            nodes {
                ...ProjectInformation
            }
        }
    }
`