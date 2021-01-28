import React from "react"
import { graphql } from "gatsby"
import styled from "@emotion/styled"

import SEO from "../../components/seo"
import Project from "../../components/project"

const Projects = styled.div`
    display: flex;
    justify-content: space-around;

    width: 95%;

    margin: 40px auto;
`

const Row = styled.div`
    width: 50%;
    max-width: 845px;
`

const Section = styled.div`
    margin-bottom: 60px;
`

const Cubes = styled.div`
    display: flex;
    flex-wrap: wrap;

    margin: 20px 0;
`

const Title = styled.div`
    font-size: 14px;
    color: rgb(100, 100, 100);
`

export default ({ data }) => {
    return (
        <div>
            <SEO title="Projects" />

            <Projects>
                <Row>
                    <Section>
                        <Title>Main projects</Title>
                        <Cubes>
                            <Project project={data.projects.nodes[0]} />
                            <Project project={data.projects.nodes[2]} />
                            <Project project={data.projects.nodes[0]} />
                            <Project project={data.projects.nodes[1]} />
                            <Project project={data.projects.nodes[2]} />
                        </Cubes>
                    </Section>

                    <Section>
                        <Title>Frameworks</Title>
                        <Cubes>
                            {data.projects.nodes.map(repo =>
                                <Project key={repo.id} project={repo} />
                            )}
                        </Cubes>
                    </Section>

                    <Section>
                        <Title>Tools</Title>
                        <Cubes>
                            <Project project={data.projects.nodes[2]} />
                            <Project project={data.projects.nodes[1]} />
                            <Project project={data.projects.nodes[1]} />
                            <Project project={data.projects.nodes[0]} />
                            <Project project={data.projects.nodes[2]} />
                            <Project project={data.projects.nodes[0]} />
                            <Project project={data.projects.nodes[1]} />
                        </Cubes>
                    </Section>
                </Row>

                <Row>
                    <Section>
                        <Title>AI & Machine learning</Title>
                        <Cubes>
                            <Project project={data.projects.nodes[0]} />
                            <Project project={data.projects.nodes[1]} />
                            <Project project={data.projects.nodes[2]} />
                        </Cubes>
                    </Section>

                    <Section>
                        <Title>Software and web apps</Title>
                        <Cubes>
                            <Project project={data.projects.nodes[2]} />
                            <Project project={data.projects.nodes[2]} />
                            <Project project={data.projects.nodes[0]} />
                            <Project project={data.projects.nodes[1]} />
                            <Project project={data.projects.nodes[0]} />
                            <Project project={data.projects.nodes[1]} />
                            <Project project={data.projects.nodes[0]} />
                        </Cubes>
                    </Section>

                    <Section>
                        <Title>Others</Title>
                        <Cubes>
                            <Project project={data.projects.nodes[0]} />
                            <Project project={data.projects.nodes[0]} />
                        </Cubes>
                    </Section>
                </Row>
            </Projects>
        </div>
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