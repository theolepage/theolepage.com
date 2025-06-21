module.exports = {
  siteMetadata: {
    title: `Theo Lepage`,
    siteUrl: `https://theolepage.com`,
    description: `Learn more about me and my projects.`,
    author: `Theo Lepage`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Theo Lepage · Website`,
        short_name: `Theo Lepage`,
        start_url: `/`,
        background_color: `#1e77e3`,
        theme_color: `#1e77e3`,
        display: `standalone`,
        icon: `static/favicon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `react-helmet`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `config/typography`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-external-links`,
            options: {
              target: `_blank`,
              rel: `nofollow noopener noreferrer`,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 900,
              showCaptions: true,
            },
          },
          {
            resolve: `gatsby-remark-katex`,
            options: {
              strict: `ignore`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-reading-time`,
        ],
      },
    },
    {
      resolve: "gatsby-plugin-simple-analytics",
      options: {
        trackPageViews: true,
      },
    },
  ],
};
