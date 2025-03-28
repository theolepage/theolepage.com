import React from "react"
import styled from "@emotion/styled"

import Section from "./section"
import Link from "./link"

import { EMAIL_ADDRESS, SOCIALS } from "../../config/contact"

const ContactBox = styled.p`
    padding: 32px;

    text-align: center;

    border: 1px dashed rgb(210, 210, 210);
    background: rgb(252, 252, 252);
    border-radius: 6px;
`

const Socials = styled.span`
    @media (max-width: 800px) {
        display: block;
    }
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

const Social = ({ name, url }) => {
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
                Send me an email at <Link to={'mailto:' + EMAIL_ADDRESS}>{EMAIL_ADDRESS}</Link>
                {" "}
                <Socials>
                    or reach me on {SOCIALS.map(s => <Social key={s.name} name={s.name} url={s.url} />)}.
                </Socials>
            </ContactBox>
        </Section>
    )
}

export default Contact