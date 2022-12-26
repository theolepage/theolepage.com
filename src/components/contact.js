import React from "react"
import styled from "@emotion/styled"

import Section from "./section"
import Link from "./link"

const EMAIL_ADDRESS = 'theo@theolepage.com'

const SOCIALS = [
    { name: 'twitter',  url: 'https://twitter.com/thdoteo' },
    { name: 'github',   url: 'https://github.com/theolepage/' },
    { name: 'scholar',  url: 'https://scholar.google.com/citations?user=q1MqhVgAAAAJ&hl=en&oi=ao' },
    { name: 'linkedin', url: 'https://www.linkedin.com/in/theolepage/' }
]

const ContactBox = styled.p`
    padding: 32px;

    text-align: center;

    border: 1px solid rgb(230, 230, 230);
    background: rgb(252, 252, 252);
    border-radius: 6px;
`

const SocialLink = styled(Link)`
    position: relative;
    top: 4px;

    cursor: pointer;

    margin-left: 8px;
`

const SocialIcon = styled.img`
    width: 20px;

    filter: grayscale(100%);
    opacity: 0.5;
    
    transition: all 0.3s;
    
    &[src*="github"] {
        opacity: 0.3;
    }

    &:hover {
        filter: grayscale(0%);
        opacity: 1;
    }
`

const Social = ({name, url}) => {
    return (
        <SocialLink to={url}>
            <SocialIcon alt={'icon-' + name} src={'/images/icon-' + name + '.png'} />
        </SocialLink>
    )
}

const Contact = () => {
    return (
        <Section>
            <ContactBox>
                Send me an email at <Link to={'mailto:' + EMAIL_ADDRESS}>{EMAIL_ADDRESS}</Link> or reach me on
                {SOCIALS.map(s => <Social key={s.name} name={s.name} url={s.url} />)}.
            </ContactBox>
        </Section>
    )
}

export default Contact