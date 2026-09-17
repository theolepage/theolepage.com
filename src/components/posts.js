import React from "react";
import styled from "@emotion/styled";

import Section from "./section";
import Post from "./post";
import Link from "./link";

const BlocksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: var(--element-spacing);

  margin-bottom: var(--element-spacing);
`;

const Posts = ({ data, listing }) => {
  const posts = listing ? data.nodes : data.nodes.slice(0, 3);

  return (
    <Section title="Posts" icon="posts">
      <BlocksGrid>
        {posts.map((post) => (
          <Post key={post.fields.slug} post={post} />
        ))}
      </BlocksGrid>

      {!listing && (
        <Link to="/posts" variant="secondary">See all blog posts →</Link>
      )}
    </Section>
  );
};

export default Posts;
