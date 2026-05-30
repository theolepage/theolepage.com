import React from "react";
import { graphql } from "gatsby";

import Page from "../components/page";
import Posts from "../components/posts";

const PostsPage = ({ data }) => {
  return (
    <Page title="Posts">
      <Posts data={data.posts} listing />
    </Page>
  );
};

export default PostsPage;

export const query = graphql`
  {
    posts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/posts/" } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        excerpt(pruneLength: 260)
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          color
        }
      }
    }
  }
`;
