import React from "react"
import { graphql } from "gatsby"
import styled from "@emotion/styled"

import Block from "./block"

const Icons = styled.div`
    position: absolute;
    bottom: 10px;
    right: 10px;

    width: 12px;
    height: 12px;    
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

const Project = ({ project }) => {
    const { color, underDevelopment } = parseProjectData(project)

    return (
        <Block
            key={project.name}
            title={project.name}
            description={project.description}
            url={project.url}
            corner={color}
        >
            <Icons>
                {underDevelopment && <UnderDevelopment />}
            </Icons>
        </Block>
    )
}

export default Project

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