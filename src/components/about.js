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
        margin: 0 auto 32px auto;
    }
`

const AboutPage = () => {
    return (
        <Section title="About">
            <Container>
                <Content>
                    <p>
                        I am Theo Lepage, a <b>Ph.D. student</b> in <b>Machine Learning</b> at
                        {' '}<Link to="https://www.sorbonne-universite.fr/en">Sorbonne University</Link> and
                        {' '}<Link to="https://www.lre.epita.fr/">EPITA Research Laboratory</Link>, based in Paris, France.
    
                        My research focuses on <b>self-supervised learning</b> for producing attack-agnostic representations
                        for <b>speaker and language recognition</b>. Through artificial intelligence, my aim is to enable computers to understand our world.
                    </p>
                    <Button to="/resume">Read my resume</Button>
                </Content>
                <Photo src="/images/theo.jpg" />
            </Container>
        </Section>
    )
}

export default AboutPage