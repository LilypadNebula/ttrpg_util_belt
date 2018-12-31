module.exports = {
  siteMetadata: {
    title: `TTRPG Utility Belt`,
    description: `A utility belt of helpful tools for your tabletop roleplaying games`,
    author: `@lilypadnebula`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-plugin-layout',
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [
          require('tailwindcss')('./tailwind.js'),
          require('autoprefixer'),
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `TTRPG Utility Belt`,
        short_name: `UtilBelt`,
        start_url: `/`,
        background_color: `#794acf`,
        theme_color: `#794acf`,
        display: `standalone`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    'gatsby-plugin-offline',
  ],
}
