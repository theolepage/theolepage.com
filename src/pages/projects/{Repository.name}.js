import React from "react"
import { Link, graphql } from "gatsby"
import styled from "@emotion/styled"

import SEO from "../../components/seo"
import Project from "../../components/project"

const Header = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;

    padding: 20px 32px;

    background: #fff;

    border-bottom: 1px solid rgba(235, 235, 235, 1);
`

const GoBackToHome = styled(Link)`
    font-size: 16px;
    color: rgb(60, 60, 60);
`

const Button = styled.a`
    display: block;

    margin: 32px 0 0 0;
    padding: 20px 16px;

    text-align: center;
    font-size: 16px;
    color: #377dff;

    background-color: rgba(55, 125, 255, 0.1);
    border-radius: 8px;

    transition: all 0.2s;

    &:hover {
        text-decoration: none;
        color: white;

        background-color: #377dff;
    }

    &:active {
        transform: scaleX(0.97) scaleY(0.94);
    }
`

const Container = styled.div`
    display: flex;
    justify-content: center;

    margin: 80px 0;
`

const Sidebar = styled.div`
    margin-right: 120px;
    padding-top: 65px;
`

const Content = styled.div`
    max-width: 900px;
`

export default (props) => {
    const { repository } = props.data
    const readme = repository.childReadme.childMarkdownRemark.html

    console.log(repository)

    return (
        <div>
            <SEO title={repository.name} />

            <Header>
                <GoBackToHome to="/">
                    <svg style={{width: '16px', position: 'relative', top: '4px', left: '-8px', fill: 'rgb(60, 60, 60)'}} viewBox="0 0 512 512" enable-background="new 0 0 512 512" xmlSpace="preserve">
                        <path d="M408,178.5H96.9L239.7,35.7L204,0L0,204l204,204l35.7-35.7L96.9,229.5H408V178.5z"></path>
                    </svg>
                    Go back home
                </GoBackToHome>
            </Header>

            <Container>
                <Sidebar>
                    <Project project={repository} />

                    {repository.homepageUrl && <Button href={repository.homepageUrl} target="_blank" rel="nofollow noopener noreferrer">Go to website</Button>}
                    <Button href={repository.url} target="_blank" rel="nofollow noopener noreferrer">Go to GitHub page</Button>

                    {repository.repositoryTopics.edges.map(topic => <div>{topic.node.topic.name}</div>)}
                </Sidebar>
                <Content dangerouslySetInnerHTML={{ __html: readme }} />
            </Container>
        </div>

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