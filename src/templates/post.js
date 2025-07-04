import React from "react";
import { Link, graphql } from "gatsby";
import styled from "@emotion/styled";

import Page from "../components/page";

const ArticleHeader = styled.div`
  margin-bottom: 50px;
`;

const ArticleTitle = styled.h1`
  margin-bottom: 10px;

  font-size: 32px;
`;

const ArticleTags = styled.div`
  display: flex;

  margin-top: 20px;
  margin-bottom: 16px;
`;

const ArticleTag = styled.div`
  margin-right: 8px;
  padding: 4px 6px;

  font-size: 14px;
  color: rgb(40, 40, 40);

  background: rgb(242, 247, 255);
  border: 1px solid rgb(218, 232, 255);
  border-radius: var(--border-radius);
`;

const ArticleDate = styled.p`
  color: rgb(100, 100, 100);
`;

const ArticleBody = styled.section`
  margin-bottom: 100px;
`;

const Navigation = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  margin-bottom: 100px;
`;

const NavigationElement = styled.div`
  max-width: 45%;
`;

const PostTemplate = ({ data: { previous, next, markdownRemark: post } }) => {
  return (
    <Page title={post.frontmatter.title} description={post.excerpt}>
      <article className="post">
        <ArticleHeader>
          <ArticleTitle>{post.frontmatter.title}</ArticleTitle>
          {post.frontmatter.tags && (
            <ArticleTags>
              {post.frontmatter.tags.map((tag, index) => (
                <ArticleTag key={index}>{tag}</ArticleTag>
              ))}
            </ArticleTags>
          )}
          <ArticleDate>
            {post.frontmatter.date} — {post.fields.readingTime.text}
          </ArticleDate>
        </ArticleHeader>

        <ArticleBody dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>

      <Navigation>
        <NavigationElement>
          {previous && (
            <Link to={"/" + previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
        </NavigationElement>
        <NavigationElement>
          {next && (
            <Link to={"/" + next.fields.slug} rel="next">
              {next.frontmatter.title} →
            </Link>
          )}
        </NavigationElement>
      </Navigation>
    </Page>
  );
};

export default PostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        color
        tags
      }
      fields {
        readingTime {
          text
        }
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
