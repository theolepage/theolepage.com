import React from "react"
import styled from "@emotion/styled"

import Section from "./section"
import Button from "./button"
import Link from "./link"

const Container = styled.div`
    display: flex;
    align-items: flex-start;

    @media (max-width: 800px) {
        flex-wrap: wrap;
        flex-direction: column-reverse;
    }
`

const Content = styled.div`
`

const Photo = styled.img`
    width: 110px;
    
    margin: 0 0 0 32px;

    border-radius: 100%;

    @media (max-width: 800px) {
        // display: none;
        width: 90px;

        margin: 0 auto 32px auto;
    }
`

const ResumeIcon = styled.div`
    display: inline-block;

    position: relative;
    top: 2px;

    margin: 0 8px 0 0px;

    width: 16px;
    height: 16px;

    background-color: rgb(60, 60, 60);

    mask: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWZpbGUtdXNlciI+PHBhdGggZD0iTTE0IDJ2NGEyIDIgMCAwIDAgMiAyaDQiLz48cGF0aCBkPSJNMTUgMThhMyAzIDAgMSAwLTYgMCIvPjxwYXRoIGQ9Ik0xNSAySDZhMiAyIDAgMCAwLTIgMnYxNmEyIDIgMCAwIDAgMiAyaDEyYTIgMiAwIDAgMCAyLTJWN3oiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEzIiByPSIyIi8+PC9zdmc+) no-repeat center / contain;
`

const AboutPage = () => {
    return (
        <Section title="">
            <Container>
                <Content>
                    <p>
                        I am Theo Lepage, a <b>Ph.D. student</b> in <b>Artificial Intelligence</b> at
                        {' '}<Link to="https://www.sorbonne-universite.fr/en">Sorbonne University</Link> and
                        {' '}<Link to="https://www.lre.epita.fr/">EPITA Research Laboratory</Link>, based in Paris, France.

                        My research focuses on <b>self-supervised learning</b> frameworks to develop robust representations
                        for <b>speaker and language recognition</b>. Through machine learning and speech processing, my aim is to enhance communications between humans and computers.
                    </p>
                    <Button to="/resume">
                        <ResumeIcon />
                        Read my resume
                    </Button>
                </Content>
                <Photo src="/images/theo.jpg" />
            </Container>
        </Section>
    )
}

export default AboutPage