/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

require("dotenv").config({
    path: `.env`,
})

module.exports = {
    siteMetadata: {
        title: `Theo Lepage`,
        author: `Theo Lepage`
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-emotion`,
        {
            resolve: `gatsby-plugin-typography`,
            options: {
                pathToConfigModule: `config/typography`,
            },
        },
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: "gatsby-remark-external-links",
                        options: {
                            target: "_blank",
                            rel: "nofollow noopener noreferrer"
                        }
                    },
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 900,
                        },
                    },
                ],
            },
        },
        {
            resolve: `gatsby-source-github-repos`,
            options: {
                token: process.env.GITHUB_API_TOKEN,
                query: "user:theolepage topic:theoworldcom-show fork:true",
                limit: 10
            },
        }
    ],
}
