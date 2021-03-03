import React from "react"
import { graphql } from "gatsby"
import styled from "@emotion/styled"

import SEO from "../components/seo"
import About from "../components/about"
import Research from "../components/research"
import Projects from "../components/projects"

const Container = styled.div`
    width: 800px;
    margin: 40px auto 80px auto;

    @media (max-width: 900px) {
        width: 80%;
    }
`

export default ({ data }) => {
    return (
        <Container>
            <SEO />

            <h1>Theo Lepage</h1>

            <About />
            <Research />
            <Projects data={data} />
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