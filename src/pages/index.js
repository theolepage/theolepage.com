import React from "react"
import styled from "@emotion/styled"

import Layout from "../components/layout"

const Container = styled.div`
    width: 800px;
    margin: 80px auto;
`

export default function Home() {
    return (
        <Container>
            <h1>Theo Lepage</h1>

            <h2>About</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim interdum accumsan. Donec ornare, sem quis consequat commodo, ipsum purus malesuada ex, non suscipit felis neque eget massa. Morbi vitae est dictum, sollicitudin massa id, cursus neque. Vestibulum elementum metus a dignissim consectetur. Mauris mauris purus, consequat sit amet aliquet vel, interdum at ante. Fusce eu fringilla augue. Fusce quis eros vel magna tempus mollis vel semper felis. Nam sit amet egestas ligula.
                <a href="">This a link</a>
            </p>

            <h2>Project</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim interdum accumsan. Donec ornare, sem quis consequat commodo, ipsum purus malesuada ex, non suscipit felis neque eget massa. Morbi vitae est dictum, sollicitudin massa id, cursus neque. Vestibulum elementum metus a dignissim consectetur. Mauris mauris purus, consequat sit amet aliquet vel, interdum at ante. Fusce eu fringilla augue. Fusce quis eros vel magna tempus mollis vel semper felis. Nam sit amet egestas ligula.
            </p>

            <h2>Contact</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim interdum accumsan. Donec ornare, sem quis consequat commodo, ipsum purus malesuada ex, non suscipit felis neque eget massa. Morbi vitae est dictum, sollicitudin massa id, cursus neque. Vestibulum elementum metus a dignissim consectetur. Mauris mauris purus, consequat sit amet aliquet vel, interdum at ante. Fusce eu fringilla augue. Fusce quis eros vel magna tempus mollis vel semper felis. Nam sit amet egestas ligula.
            </p>

        </Container>
    )
}
