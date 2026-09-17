import React from "react";
import { Link, graphql } from "gatsby";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import Page from "../components/page";

const HERO_IMAGE_HEIGHT = 360;

const Article = styled.article`
  position: relative;
  z-index: 1;

  margin: 0 -80px;
  padding: 0 80px;

  background: white;
  border-radius: 0;

  ${(props) =>
    props.hasImage &&
    css`
      padding-top: 60px;
      border-top: 4px solid ${props.color || "black"};
    `}
`;

const ArticleHeader = styled.div`
  margin-bottom: 50px;
`;

const HeroSection = styled.div`
  position: relative;

  ${(props) =>
    props.hasImage &&
    css`
      padding-top: 60px;
    `}
`;

const ArticleImageWrapper = styled.div`
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);

  width: 100vw;
  height: ${HERO_IMAGE_HEIGHT}px;

  overflow: hidden;

  background: rgb(250, 250, 250);
  opacity: 0.75;
`;

const ArticleImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;

  user-select: none;
  -webkit-user-drag: none;
`;

const ArticleImageFade = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 50%;

  background: linear-gradient(
    to bottom,
    color-mix(in srgb, var(--background-primary) 0%, transparent) 0%,
    var(--background-primary) 100%
  );
  pointer-events: none;
`;

const ArticleTitle = styled.h1`
  margin-top: 0 !important;
  margin-bottom: 28px;

  font-size: 32px;
`;

const ArticleTags = styled.div`
  display: flex;
  flex-wrap: wrap;

  margin-top: 20px;
  margin-bottom: 16px;
`;

const ArticleTag = styled.div`
  margin: 0 8px 8px 0;
  padding: 4px 6px;

  font-size: 14px;
  color: rgb(40, 40, 40);

  white-space: nowrap;

  background: rgb(242, 247, 255);
  border: 1px solid rgb(200, 221, 255);
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

  margin-bottom: 80px;
`;

const NavigationElement = styled.div`
  max-width: 45%;
`;

const PostTemplate = ({ data: { site, previous, next, markdownRemark: post } }) => {
  return (
    <Page
      title={post.frontmatter.title}
      description={post.excerpt}
      fullWidthHeaderBorder={!!post.frontmatter.image}
    >
      <HeroSection hasImage={!!post.frontmatter.image}>
        {post.frontmatter.image && (
          <ArticleImageWrapper>
            <ArticleImage src={post.frontmatter.image} alt="" draggable={false} />
            <ArticleImageFade />
          </ArticleImageWrapper>
        )}
        <Article
          className="post"
          hasImage={!!post.frontmatter.image}
          color={post.frontmatter.color}
        >
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
              {site.siteMetadata.author} • {post.frontmatter.date} • {post.fields.readingTime.text}
            </ArticleDate>
          </ArticleHeader>

          <ArticleBody dangerouslySetInnerHTML={{ __html: post.html }} />
        </Article>
      </HeroSection>

      {(previous || next) && (
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
      )}
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
        author
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        color
        tags
        image
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
