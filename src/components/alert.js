import React from "react"
import styled from "@emotion/styled"

import Section from "./section"
import Link from "./link"

const AlertElement = styled.div`
    width: 90%;

    margin: 0 auto;
    padding: 16px 32px;

    color: rgb(60, 60, 60);
    line-height: 1.75;
    text-align: center;

    background: #f2f7ff;
    border-left: 6px solid #377dff;
    border-radius: 6px;
`

const Alert = () => {
    return (
        <Section>
            <AlertElement>
                I am seeking an internship in Computer Vision or Machine Learning starting in January 2022.
                {' '}<Link to="/">Read my resume →</Link>
            </AlertElement>
        </Section>
    )
}

export default Alert