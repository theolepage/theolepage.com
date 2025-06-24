import React from "react";
import { graphql } from "gatsby";

import Page from "../components/page";
import Status from "../components/status";
import About from "../components/about";
import Publications from "../components/publications";
// import Posts from "../components/posts";
import Projects from "../components/projects";
import Talks from "../components/talks";
import Teaching from "../components/teaching";

const IndexPage = ({ data }) => {
  return (
    <Page>
      <Status data={data.status} />
      <About data={data.about} />
      <Publications data={data.publications} />
      {/* <Posts data={data.posts} /> */}
      <Projects data={data.projects} />
      <Talks data={data.talks} />
      <Teaching data={data.teaching} />
    </Page>
  );
};

export default IndexPage;

export const query = graphql`
  {
    about: markdownRemark(fileAbsolutePath: { regex: "/about.md/" }) {
      frontmatter {
        photo
        email
        socials {
          name
          url
        }
      }
      html
    }
    status: markdownRemark(fileAbsolutePath: { regex: "/status.md/" }) {
      frontmatter {
        enabled
        message
        linkText
        linkTo
      }
    }
    publications: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/publications/" } }
      sort: [{ frontmatter: { year: DESC } }, { frontmatter: { month: DESC } }]
    ) {
      nodes {
        frontmatter {
          title
          authors
          source
          year
          month
          type
          showcased
          bib_entries
          resources {
            name
            url
          }
        }
        fileAbsolutePath
      }
    }
    projects: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/projects/" } }
      sort: { frontmatter: { order: ASC } }
    ) {
      nodes {
        id
        frontmatter {
          name
          description
          url
          color
          order
          showcased
        }
        fields {
          githubStarsCount
          githubForksCount
          githubPushedAt
        }
      }
    }
    talks: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/talks/" } }
    ) {
      nodes {
        id
        frontmatter {
          name
          location
          date
          startDate
          endDate
          link
        }
      }
    }
    teaching: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/teaching/" } }
      sort: { frontmatter: { endYear: DESC } }
    ) {
      nodes {
        id
        frontmatter {
          name
          location
          startYear
          endYear
          semester
        }
      }
    }
    posts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/posts/" } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        excerpt
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
