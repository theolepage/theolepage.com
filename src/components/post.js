import React from "react";

import Block from "./block";

const Post = ({ post }) => {
  return (
    <Block
      title={post.frontmatter.title}
      info={post.frontmatter.date}
      url={post.fields.slug}
      image={post.frontmatter.image}
      imageLandscape
      // headerAlignItems="center"
    >
      {post.excerpt}
    </Block>
  );
};

export default Post;
