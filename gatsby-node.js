const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const fetch = require(`node-fetch`);

// Function to extract GitHub repo info from URL
const extractGitHubInfo = (url) => {
  if (!url || !url.includes("github.com")) return null;

  const match = url.match(/github\.com\/([^\/]+\/[^\/]+)/);
  if (!match) return null;

  return match[1];
};

// Function to fetch GitHub repo data
const fetchGitHubData = async (repoPath) => {
  try {
    const response = await fetch(`https://api.github.com/repos/${repoPath}`);
    if (!response.ok) {
      console.warn(`GitHub API error for ${repoPath}: ${response.status}`);
      return null;
    }

    const data = await response.json();
    return {
      stars: data.stargazers_count,
      forks: data.forks_count,
      pushedAt: data.pushed_at,
    };
  } catch (error) {
    console.warn(`Failed to fetch GitHub data for ${repoPath}:`, error.message);
    return null;
  }
};

exports.onCreateNode = async ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = "posts" + createFilePath({ node, getNode });
    createNodeField({ name: `slug`, node, value });

    // Check if this is a project with a GitHub URL
    if (node.frontmatter && node.frontmatter.url) {
      const githubInfo = extractGitHubInfo(node.frontmatter.url);
      if (githubInfo) {
        const githubData = await fetchGitHubData(githubInfo);
        if (githubData) {
          createNodeField({
            name: `githubStarsCount`,
            node,
            value: githubData.stars,
          });
          createNodeField({
            name: `githubForksCount`,
            node,
            value: githubData.forks,
          });
          createNodeField({
            name: `githubPushedAt`,
            node,
            value: githubData.pushedAt,
          });
        }
      }
    }
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const postTemplate = path.resolve(`./src/templates/post.js`);
  const refTemplate = path.resolve(`./src/templates/ref.js`);

  const result = await graphql(`
    {
      allMarkdownRemark(sort: { frontmatter: { date: ASC } }, limit: 1000) {
        nodes {
          id
          fields {
            slug
          }
        }
      }
      publications: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/publications/" } }
      ) {
        nodes {
          fileAbsolutePath
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    );
    return;
  }

  const posts = result.data.allMarkdownRemark.nodes;
  const publications = result.data.publications.nodes;

  // Create blog post pages
  if (posts.length > 0) {
    posts.forEach((post, i) => {
      const previousPostId = i === 0 ? null : posts[i - 1].id;
      const nextPostId = i === posts.length - 1 ? null : posts[i + 1].id;

      createPage({
        path: post.fields.slug,
        component: postTemplate,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      });
    });
  }

  // Create ref pages for publications
  if (publications.length > 0) {
    publications.forEach((publication) => {
      const filename = publication.fileAbsolutePath
        .split("/")
        .pop()
        .replace(".md", "");

      createPage({
        path: `/ref/${filename}`,
        component: refTemplate,
        context: {
          filename: filename,
        },
      });
    });
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
        type MarkdownRemark implements Node {
            fields: MarkdownRemarkFields
        }
        
        type MarkdownRemarkFields {
            slug: String
            githubStarsCount: Int
            githubForksCount: Int
            githubPushedAt: Date
        }
        
        type MarkdownRemarkFrontmatter {
            title: String
            description: String
            url: String
            color: String
            order: Int
            name: String
            location: String
            link: String
            date: Date @dateformat
            startDate: Date @dateformat
            endDate: Date @dateformat
            startYear: Int
            endYear: Int
            semester: String
            tags: [String]
            message: String
            linkText: String
            linkTo: String
            enabled: Boolean
            email: String
            socials: [MarkdownRemarkFrontmatterSocials]
            photo: String
            buttonText: String
            buttonLink: String
            authors: [String]
            source: String
            year: Int
            month: Int
            type: String
            showcased: Boolean
            bib_entries: JSON
            resources: [MarkdownRemarkFrontmatterResources]
        }
        
        type MarkdownRemarkFrontmatterSocials {
            name: String
            url: String
        }
        
        type MarkdownRemarkFrontmatterResources {
            name: String
            url: String
        }
    `;
  createTypes(typeDefs);
};
