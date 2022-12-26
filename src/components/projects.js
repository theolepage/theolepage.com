import React from "react"
import styled from "@emotion/styled"

import Section from "./section"
import Project from "./project"
import Button from "./button"

const ProjectsGrid = styled.div`
    display: grid;
    grid-template-rows: repeat(1, 140px);
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 15px;

    margin-bottom: 15px;

    @media (max-width: 1000px) {
        display: block;
        margin-bottom: 0;
    }
`

const GithubIcon = styled.div`
    display: inline-block;

    position: relative;
    top: 2px;

    margin: 0 0 0 8px;

    width: 14px;
    height: 14px;

    background-color: rgb(60, 60, 60);

    mask: url(/images/icon-github.png) no-repeat center / contain;
`

const get_order = project => {
    let order = ''
    project.repositoryTopics.edges.forEach(topic => {
        let value = topic.node.topic.name
        if (value.startsWith('meta-project-order')) {
            let parts = value.split('-')
            if (parts.length === 4)
                order = parts[3]
        }
    })

    return (order === '') ? Infinity : parseInt(order)
}

const Projects = ({data}) => {
    let projects = data.projects.nodes

    // Sort projects by order
    projects.sort((a, b) => {
        const a_order = get_order(a)
        const b_order = get_order(b)

        if (a_order < b_order)
            return -1
        else if (b_order < a_order)
            return 1
        return 0
    })

    return (
        <Section title="Projects">
            <ProjectsGrid>
                {projects.map(repo => <Project key={repo.id} project={repo} />)}
            </ProjectsGrid>

            <Button to={'https://github.com/theolepage'}>
                See all projects on GitHub
                <GithubIcon />
            </Button>
        </Section>
    )
}

export default Projects