import React from "react";

import Block from "./block";

const Post = ({ post }) => {
  return (
    <Block
      title={post.frontmatter.title}
      info={post.frontmatter.date}
      url={"/" + post.fields.slug}
      corner={post.frontmatter.color}
    >
      {post.excerpt}
    </Block>
  );
};

export default Post;
