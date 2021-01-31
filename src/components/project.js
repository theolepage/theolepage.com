import React from "react"
import { Link, graphql } from "gatsby"
import styled from "@emotion/styled"

const BlockLink = styled(Link)`
    &:hover {
        text-decoration: none;
    }
`

const Block = styled.div`
    display: block;
    position: relative;

    padding: 20px 22px;

    min-width: 250px;
    height: 130px;

    border-radius: 6px;
    background: #fff;
    box-shadow: 0px 4px 8px rgba(47, 55, 71, 0.03), 0px 1px 3px rgba(47, 55, 71, 0.1);

    overflow: hidden;

    transition: 0.2s box-shadow, 0.3s transform;

    &:hover {
        text-decoration: none;

        box-shadow: 0px 4px 8px rgba(47, 55, 71, 0.06), 0px 1px 3px rgba(47, 55, 71, 0.11);

        transform: translateY(-4px);
    }
`

const Header = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;

    height: 4px;

    background: #6EE5C8;
    opacity: 0.7;
`

const Title = styled.div`
    font-size: 14px;
    color: rgb(30, 30, 30);
`

const Description = styled.div`
    margin-top: 8px;

    font-size: 12px;
    color: rgb(100, 100, 100);
    line-height: 1.5em;

    opacity: 1;

    transition: opacity 0.2s;
`

const Icons = styled.div`
    width: 12px;
    height: 12px;
    position: absolute;
    bottom: 10px; right: 10px;
`

const UnderDevelopment = styled.div`
    width: 100%;
    height: 100%;

    border-radius: 100%;
    border: 3px solid rgb(245, 245, 245);

    &:after {
        position: absolute;
        top: 0px; left: 0px; right: 0px; bottom: 0px;
        content: '';

        border-radius: 100%;
        border: 3px solid transparent;
        border-top-color: rgb(200, 200, 200);

        animation: spin 2s infinite;
    }

    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`

const parseProjectData = (project) => {
    // Determine color
    let color = ''
    project.repositoryTopics.edges.forEach(topic => {
        let value = topic.node.topic.name
        if (value.startsWith('meta-project-color')) {
            let parts = value.split('-')
            if (parts.length === 4)
                color = '#' + parts[3]
        }
    })

    // Determine if project is under development
    const dateLastPush = Date.parse(project.pushedAt)
    const dateNow = Date.now()
    const diffTime = Math.abs(dateNow - dateLastPush)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const isUnderDevelopment = diffDays < 30

    return {
        color: color,
        underDevelopment: isUnderDevelopment
    }
}

export default function Project({ project }) {
    const { color, underDevelopment } = parseProjectData(project)

    return (
        <BlockLink to={project.url} target="_blank" rel="nofollow noopener noreferrer">
            <Block>
                <Header style={{ background: color }} />

                <Icons>
                    {underDevelopment && <UnderDevelopment />}
                </Icons>

                <Title>{project.name}</Title>

                <Description>{project.description}</Description>
            </Block>
        </BlockLink>
    )
}

export const query = graphql`
    fragment ProjectInformation on Repository {
        id
        name
        url
        homepageUrl
        description
        pushedAt
        createdAt
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
`