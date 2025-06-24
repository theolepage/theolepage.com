import React from "react";
import styled from "@emotion/styled";

import Section from "./section";
import Post from "./post";
import Button from "./button";
import Icon from "./icon";

const BlocksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: var(--spacing);

  margin-bottom: var(--spacing);
`;

const Posts = ({ data, listing }) => {
  let posts = data.nodes;
  if (!listing) posts = posts.slice(0, 3);

  return (
    <Section title="Posts">
      <BlocksGrid>
        {posts.map((post) => (
          <Post key={post.fields.slug} post={post} />
        ))}
      </BlocksGrid>

      {!listing && (
        <Button to={"/posts"}>
          <Icon name="posts" />
          See all blog posts
        </Button>
      )}
    </Section>
  );
};

export default Posts;
