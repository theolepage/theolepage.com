import React from "react";
import { graphql } from "gatsby";

import Page from "../components/page";
import Status from "../components/status";
import About from "../components/about";
import Research from "../components/research";
import Experience from "../components/experience";
import Education from "../components/education";
import Publications from "../components/publications";
import Posts from "../components/posts";
import Projects from "../components/projects";
import Talks from "../components/talks";
import Teaching from "../components/teaching";
import Misc from "../components/misc";

const IndexPage = ({ data }) => {
  const {
    showResearch,
    showExperience,
    showEducation,
    showPublications,
    showProjects,
    showPosts,
    showMisc,
    showTalks,
    showTeaching,
  } = data.home.frontmatter;

  return (
    <Page>
      <Status data={data.status} />
      <About data={data.about} />
      {showResearch && <Research data={data.research} />}
      {showExperience && <Experience data={data.experience} />}
      {showEducation && <Education data={data.education} />}
      {showPublications && <Publications data={data.publications} />}
      {showProjects && <Projects data={data.projects} />}
      {showPosts && <Posts data={data.posts} />}
      {showTalks && <Talks data={data.talks} />}
      {showTeaching && <Teaching data={data.teaching} />}
      {showMisc && (
        <Misc
          data={data.misc}
          skillsData={data.skills}
          teaching={data.teaching}
          talks={data.talks}
        />
      )}
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
    research: markdownRemark(fileAbsolutePath: { regex: "/research.md/" }) {
      html
    }
    home: markdownRemark(fileAbsolutePath: { regex: "/content/home.md/" }) {
      frontmatter {
        showResearch
        showExperience
        showEducation
        showPublications
        showProjects
        showPosts
        showMisc
        showTalks
        showTeaching
      }
    }
    misc: markdownRemark(fileAbsolutePath: { regex: "/misc.md/" }) {
      frontmatter {
        showTeaching
        showTalks
        attributes {
          name
          show
          entries {
            icon
            text
          }
        }
      }
    }
    skills: markdownRemark(fileAbsolutePath: { regex: "/skills.md/" }) {
      frontmatter {
        show
        skills {
          category
          items
        }
      }
    }
    status: markdownRemark(fileAbsolutePath: { regex: "/status.md/" }) {
      frontmatter {
        enabled
        message
        linkText
        linkTo
      }
    }
    experience: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/experience/" } }
      sort: { frontmatter: { order: ASC } }
    ) {
      nodes {
        id
        html
        frontmatter {
          title
          company
          companyUrl
          location
          date
          image
          internship
          order
          resources {
            name
            url
            image
          }
        }
      }
    }
    education: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/education/" } }
      sort: { frontmatter: { order: ASC } }
    ) {
      nodes {
        id
        html
        frontmatter {
          institution
          institutionUrl
          image
          degree
          location
          date
          grade
          order
          resources {
            name
            url
            image
          }
        }
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
    ) {
      nodes {
        id
        frontmatter {
          name
          description
          image
          imagePadding
          imagePosition
          url
          target
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
          event
          name
          location
          date
          startDate
          endDate
          resources {
            name
            url
          }
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
          resources {
            name
            url
          }
        }
      }
    }
    posts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/posts/" } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        id
        excerpt(pruneLength: 200)
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          color
          image
        }
      }
    }
  }
`;
