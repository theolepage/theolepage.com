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
                    <Button to="/resume">Read my resume</Button>
                </Content>
                <Photo src="/images/theo.jpg" />
            </Container>
        </Section>
    )
}

export default AboutPage