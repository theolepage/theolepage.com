import React from "react"
import styled from "@emotion/styled"

import Section from "./section"
import Post from "./post"
import Button from "./button"

const PostsIcon = styled.div`
    display: inline-block;

    position: relative;
    top: 2px;

    margin: 0 8px 0 0px;

    width: 16px;
    height: 16px;

    background-color: rgb(60, 60, 60);

    mask: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLW5ld3NwYXBlciI+PHBhdGggZD0iTTQgMjJoMTZhMiAyIDAgMCAwIDItMlY0YTIgMiAwIDAgMC0yLTJIOGEyIDIgMCAwIDAtMiAydjE2YTIgMiAwIDAgMS0yIDJabTAgMGEyIDIgMCAwIDEtMi0ydi05YzAtMS4xLjktMiAyLTJoMiIvPjxwYXRoIGQ9Ik0xOCAxNGgtOCIvPjxwYXRoIGQ9Ik0xNSAxOGgtNSIvPjxwYXRoIGQ9Ik0xMCA2aDh2NGgtOFY2WiIvPjwvc3ZnPg==) no-repeat center / contain;
`

const Posts = ({data, listing}) => {
    let posts = data.posts.nodes
    if (!listing)
        posts = posts.slice(0, 3)
    
    return (
        <Section title="Posts">
            {posts.map(post => <Post key={post.fields.slug} post={post} />)}

            {!listing && <Button to={'/posts'}>
                <PostsIcon />
                See all blog posts
            </Button>}
        </Section>
    )
}

export default Posts