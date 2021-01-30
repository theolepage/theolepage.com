import React from "react"
import styled from "@emotion/styled"

import Project from "../components/project"
import Button from "./button"

const ProjectsGrid = styled.div`
    display: grid;
    grid-template-rows: repeat(1, 130px);
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 30px;

    margin: 30px 0 16px 0;

    @media (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 680px) {
        grid-template-columns: repeat(1, 1fr);
    }
`

const Buttons = styled.div`
    display: flex;
`

const GithubIcon = styled.div`
    display: inline-block;

    position: relative;
    top: 2px;

    margin: 0 0 0 8px;

    width: 14px;
    height: 14px;

    background-color: rgb(60, 60, 60);

    mask: url(/images/icons/icon-github.svg) no-repeat center / contain;
`

export default ({data}) => {
    const projects = data.projects.nodes

    return (
        <div>
            <h2>Personal projects</h2>

            <ProjectsGrid>
                {projects.map(repo => <Project key={repo.id} project={repo} />)}
            </ProjectsGrid>

            <Buttons>
                <Button to={'https://github.com/theolepage'} external>
                    See all projects on GitHub
                    <GithubIcon />
                </Button>
            </Buttons>
        </div>
    )
}