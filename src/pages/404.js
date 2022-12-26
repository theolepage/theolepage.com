import React from "react"
import styled from "@emotion/styled"
import { Global, css } from '@emotion/react'

import Page from "../components/page"
import Block from "../components/block"

// const YOUTUBE_VIDEO_ID = 'Aq2UOkoZBh0'

const Background = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    
    iframe, div {
        position: absolute;
        top: 0;
        left: 0;
        
        aspect-ratio: 16/9;
        width: 100%;
        height: auto;

        @media (max-aspect-ratio: 16/9) {
            display: none;
        }
    }

    div {
        z-index: 10;
    }
`

const Content = styled.div`
    z-index: 10;

    width: 450px;

    margin: 20px auto;

    @media (max-width: 600px) {
        width: 85%;
    }
`

const _404Page = () => {
    return (
        <Page title="Page not found">
            <Global
                styles={css`
                    html {
                        overflow: hidden;
                    }
                `}
            />

            <Background>
                {/* <iframe
                    src={'https://www.youtube.com/embed/' + YOUTUBE_VIDEO_ID + '?controls=0&autoplay=1&loop=1&playlist=' + YOUTUBE_VIDEO_ID}
                    title="youtube"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                /> */}

                {/* Used to prevent user interactions with the iframe */}
                {/* <div></div> */}
            </Background>

            <Content>
                <Block
                    title="Page not found"
                    description="<b>Oops!</b> The page that you are looking for does not exist..."
                    corner="#d4493f"
                />
            </Content>
        </Page>
    )
}

export default _404Page