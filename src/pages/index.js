import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import styled from "@emotion/styled"

import SEO from "../components/seo"
import Project from "../components/project"

const Container = styled.div`
    width: 900px;
    margin: 40px auto 80px auto;

    @media (max-width: 1000px) {
        width: 80%;
    }
`

const Projects = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    margin: 0px 0;
`

const Alert = styled.div`
    display: inline-block;
    display: none;

    margin: 30px 0 0 0;
    padding: 14px 32px;

    color: rgb(30, 30, 30);
    font-size: 16px;
    line-height: 1.75;
    text-align: center;

    background: #f2f7ff;
    border-left: 6px solid #377dff;
    border-radius: 6px;
`

const button = css`
    display: inline-block;

    margin: 16px 22px 0 0;
    padding: 12px 16px;

    font-size: 16px;
    color: rgb(0, 0, 0);

    background: rgb(255, 255, 255);
    border-radius: 6px;
    box-shadow: 0px 4px 8px rgba(47, 55, 71, 0.03), 0px 1px 2px rgba(47, 55, 71, 0.1);

    border: 1px solid rgb(245, 245, 245);

    transition: 0.2s background, 0.2s box-shadow, 0.4s transform;

    &:hover {
        text-decoration: none;

        background: rgb(245, 245, 245);
        box-shadow: 0px 4px 8px rgba(47, 55, 71, 0.06), 0px 1px 2px rgba(47, 55, 71, 0.1);
    }

    &:active {
        transform: scaleX(0.97) scaleY(0.94);
    }
`

export default ({ data }) => {
    return (
        <Container>
            <SEO />

            <h1>Theo Lepage</h1>

            <Alert>
                I am seeking an internship in Computer Vision or Machine Learning starting in January 2022.
            </Alert>

            <h2>About</h2>
            <div>
                <p>
                    I am <b>Theo Lepage</b>, a computer engineering student at <b>EPITA</b> based in Paris, France.
                    I am driven by experimentation and by understanding everything that computer science covers.
                    I am mainly motivated by the applications of <b>image processing and machine learning</b> in real world projects.
                </p>

                <Link to="/resume" css={button}>Read my resume</Link>
                or reach me at <a href="mailto:theo@theolepage.com">theo[at]theolepage.com</a>.
            </div>

            <h2>Personal projects</h2>
            <Projects>
                {data.projects.nodes.map(repo => <Project key={repo.id} project={repo} />)}
            </Projects>
            <a href="https://github.com/theolepage" css={button} target="_blank" rel="nofollow noopener noreferrer">
                See all projects on GitHub
                {/* <img src="/images/icons/icon-github.svg" alt="github" /> */}
            </a>

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