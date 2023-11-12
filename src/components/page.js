import React, { useEffect, useState } from "react"
import styled from "@emotion/styled"

import Link from "../components/link"
import SEO from "../components/seo"

const Container = styled.div`
`

const Header = styled.div`
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;

    background: #fff;
    border-bottom: 1px solid rgba(235, 235, 235, ${props => (props.top ? '0' : '1')});

    transition: border-bottom 0.3s;
`

const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    padding: 16px 48px;

    @media (max-width: 1000px) {
        width: 90%;

        margin: auto;
        padding-left: 0;
        padding-right: 0;
    }
`

const SiteTitle = styled(Link)`
    font-size: 22px;
    color: #000;
    font-family: 'Questrial', sans-serif;
`

const HomepageLink = styled(Link)`
    color: rgb(120, 120, 120);

    transition: color 0.3s;

    &:hover {
        color: rgb(0, 0, 0);
    }
`

const Body = styled.div`
    padding-top: 120px;
`

const BodyWrapper = styled.div`
    width: 860px;

    margin: auto;

    @media (max-width: 1000px) {
        width: 90%;
    }
`

const Page = ({ title, children }) => {
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        const onScroll = () => setOffset(window.pageYOffset)
        setOffset(window.pageYOffset)
        window.removeEventListener('scroll', onScroll)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <Container>
            <SEO title={title} />

            <Header top={offset === 0}>
                <HeaderWrapper>
                    <SiteTitle to="/" invisible>
                        Theo Lepage
                    </SiteTitle>
                    <HomepageLink
                        to="/"
                        activeStyle={{ display: 'none' }}
                        invisible
                    >
                        ← Homepage
                    </HomepageLink>
                </HeaderWrapper>
            </Header>

            <Body>
                <BodyWrapper>
                    {children}
                </BodyWrapper>
            </Body>
        </Container>
    )
}

export default Page