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

    margin: 16px 0;
    padding: 26px 22px;

    width: 280px;
    height: 160px;

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
    font-size: 16px;
    color: rgb(30, 30, 30);
`

const Description = styled.div`
    margin-top: 8px;

    font-size: 14px;
    color: rgb(100, 100, 100);
    line-height: 1.6em;

    opacity: 1;

    transition: opacity 0.2s;
`

const Icons = styled.div`
    width: 16px;
    height: 16px;
    position: absolute;
    bottom: 24px; right: 22px;
`

const UnderDevelopment = styled.div`
    width: 100%;
    height: 100%;

    border-radius: 100%;
    border: 4px solid rgb(240, 240, 240);

    &:after {
        position: absolute;
        top: 0px; left: 0px; right: 0px; bottom: 0px;
        content: '';

        border-radius: 100%;
        border: 4px solid transparent;
        border-top-color: rgba(55, 125, 255, 0.8);
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
        let parts = topic.node.topic.name.split('-')
        if (parts.length === 3 && parts[1] === 'color')
            color = '#' + parts[2]
    })

    // Determine if project is under development
    const dateLastPush = Date.parse(project.pushedAt)
    const dateNow = Date.now()
    const diffTime = Math.abs(dateNow - dateLastPush)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const isUnderDevelopment = diffDays < 30

    return {
        name: project.name,
        description: project.description,
        color: color,
        underDevelopment: isUnderDevelopment
    }
}

export default function Project({ project }) {
    const data = parseProjectData(project)

    return (
        <BlockLink to={'/projects/' + data.name}>
            <Block>
                <Header style={{ background: data.color }} />

                <Icons>
                    {data.underDevelopment && <UnderDevelopment />}
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
        repositoryTopics {
            edges {
                node {
                    topic {
                        name
                    }
                }
            }
        }id
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
`