import React from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"

const Container = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    font-family: 'Questrial', sans-serif;
`

const Title = styled.div`
    font-size: 45px;
    font-weight: 600;
    color: #ff6363;
`

const Subtitle = styled.div`
    margin-top: 24px;

    font-size: 28px;
    color: rgb(30, 30, 30);
`

const GoBackHome = styled(Link)`
    display: inline-block;

    margin-top: 80px;

    font-size: 24px;
    color: rgb(100, 100, 100);
`

export default () => {
    return (
        <Container>
            <Title>Oops!</Title>
            <Subtitle>We cannot seem to find the page you are looking for.</Subtitle>
            <GoBackHome to="/">Go to main page</GoBackHome>
        </Container>
    )
}