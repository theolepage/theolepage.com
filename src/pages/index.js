import React from "react"
import { Link, graphql } from "gatsby"
import styled from "@emotion/styled"

import Project from "../components/project"

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

const Alert = styled.div`
    margin: 40px 0 0 0;
    padding: 18px 20px;

    color: rgb(30, 30, 30);
    font-size: 18px;
    line-height: 1.75;
    text-align: center;

    background: #f2f7ff;
    border-left: 6px solid #377dff;
    border-radius: 6px;
`

const About = styled.div`
    position: relative;
`

const Avatar = styled.img`
    position: absolute;
    top: 5px;
    left: -170px;

    width: 110px;

    border-radius: 100%;
`

export default ({ data }) => {
    return (
        <Container>
            <h1>Theo Lepage</h1>

            <h2>About</h2>
            <About>
                <Avatar src="/images/portrait.jpg" />
                <p>
                    I am <b>Theo Lepage</b>, a computer engineering student at <b>EPITA</b> based in Paris, France.
                    I work on tons of projects as I am driven by experimentation and by understanding everything that computer science covers.
                    I tend to include mainly <b>image processing and artificial intelligence</b> to my research fields as it is starting to be anchored in our daily lives.
                </p>
            </About>

            <Alert>
                I am seeking an internship in Computer Vision
                or Machine Learning starting in January 2022.
            </Alert>

            <h2>Professional experience</h2>
            <ul>
                <li>
                    This year I had the chance to work on <b>Holovibes</b>, a software to reconstruct holograms from interferograms through the GPU.
                    This project currently used in a medical setting to map the blood vessels composing the retina.
                </li>
                <li>
                    Starting from January 2020, I will be supervised by my school research laboratory to work on speaker recognition techniques.
                </li>
            </ul>
            <p>

            </p>
            <Link to="/resume">Read my resume</Link>

            <h2>Personal projects</h2>
            <p>
                A selection of the most significant projects I have worked on is presented below.
                Although, I encourage you to explore the others which are mostly open source.
                &nbsp;<Link to="/projects">See more projects &rarr;</Link>
            </p>
            <Projects>
                {data.projects.nodes.map(repo => <Project key={repo.id} project={repo} />)}
            </Projects>

            <h2>Contact</h2>
            <p>
                Do not hesitate to reach me at <u>theo[at]theolepage.com</u>.
            </p>

        </Container>
    )
}

export const query = graphql`
    {
        projects: allRepository {
            nodes {
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
            }
        }
    }
`