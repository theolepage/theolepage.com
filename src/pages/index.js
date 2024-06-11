import React from "react"
import { graphql } from "gatsby"

import Page from "../components/page"
// import Alert from "../components/alert"
import About from "../components/about"
import Contact from "../components/contact"
import Publications from "../components/publications"
// import Posts from "../components/posts"
import Talks from "../components/talks"
import Teaching from "../components/teaching"
import Projects from "../components/projects"

const IndexPage = ({ data }) => {
  return (
    <Page>
      {/* <Alert /> */}
      <About />
      <Contact />
      <Publications />
      {/* <Posts data={data} /> */}
      <Talks />
      <Teaching />
      <Projects data={data} />
    </Page>
  )
}

export default IndexPage

export const query = graphql`
{
  projects: allRepository {
    nodes {
      ...ProjectInformation
    }
  }
  posts: allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
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
`