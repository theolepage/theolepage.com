import React from "react"

import Section from "./section"
import Post from "./post"
import Button from "./button"

const Posts = ({data, listing}) => {
    let posts = data.posts.nodes
    if (!listing)
        posts = posts.slice(0, 3)
    
    return (
        <Section title="Posts">
            {posts.map(post => <Post key={post.fields.slug} post={post} />)}

            {!listing && <Button to={'/posts'}>See all blog posts</Button>}
        </Section>
    )
}

export default Posts