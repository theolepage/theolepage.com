import React from "react"
import styled from "@emotion/styled"

import Button from "./button"

const EMAIL_ADDRESS = 'theo@theolepage.com'

const ABOUT_TEXT = `
    I am <b>Theo Lepage</b>, a computer engineering student
    at <b>EPITA</b> based in Paris, France.
    I am driven by experimentation and by understanding everything
    that computer science covers.
    I am mainly motivated by the applications of <b>image processing and
    machine learning</b> in real world projects.
`

const ALERT_TEXT = `
    I am seeking an internship in Computer Vision or
    Machine Learning starting in January 2022.
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

const Actions = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;

    text-align: center;

    div {
        margin-top: 16px;
    }
`

export default () => {
    return (
        <div>
            <Alert dangerouslySetInnerHTML={{ __html: ALERT_TEXT }} />

            <h2>About</h2>
            <div>
                <p dangerouslySetInnerHTML={{ __html: ABOUT_TEXT }} />

                <Actions>
                    <Button to="/resume">Read my resume</Button>
                    <div>
                        or reach me at <a href={'mailto:' + EMAIL_ADDRESS}>
                            {EMAIL_ADDRESS.replace('@', '[at]')}</a>.
                    </div>
                </Actions>
            </div>
        </div>
    )
}