const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions
  
    if (node.internal.type === `MarkdownRemark`)
    {
        const value = 'posts' + createFilePath({ node, getNode })
        createNodeField({name: `slug`, node, value})
    }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions
  
    const postTemplate = path.resolve(`./src/templates/post.js`)
  
    const result = await graphql(`
        {
            allMarkdownRemark(sort: {frontmatter: {date: ASC}}, limit: 1000) {
                nodes {
                    id
                    fields {
                        slug
                    }
                }
            }
        }
    `)
  
    if (result.errors)
    {
        reporter.panicOnBuild(
            `There was an error loading your blog posts`,
            result.errors
        )
        return
    }
  
    const posts = result.data.allMarkdownRemark.nodes
  
    if (posts.length == 0)
        return
    
    posts.forEach((post, i) => {
        const previousPostId = i === 0 ? null : posts[i - 1].id
        const nextPostId = i === posts.length - 1 ? null : posts[i + 1].id
  
        createPage({
            path: post.fields.slug,
            component: postTemplate,
            context: {
                id: post.id,
                previousPostId,
                nextPostId,
            }
        })
    })
}