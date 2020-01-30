var proxy = require("http-proxy-middleware");

module.exports = {
	siteMetadata: {
		title: "Chris Wilson, a quality focused developer",
		description: "The personal website of Chris Wilson, a web developer"
	},
	plugins: [
		"gatsby-plugin-react-helmet",
		"gatsby-plugin-typescript",
		"gatsby-plugin-sass",
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: "Chris Wilson, a quality focused developer",
				short_name: "Chris Wilson",
				start_url: "/",
				background_color: "#2f4c54",
				theme_color: "#2f4c54",
				icons: [
					{
						src: "static/img/android-chrome-192x192.png",
						sizes: "192x192",
						type: "image/png"
					},
					{
						src: "static/img/android-chrome-512x512.png",
						sizes: "512x512",
						type: "image/png"
					}
				],
				// Enables "Add to Homescreen" prompt and disables browser UI (including back button)
				// see https://developers.google.com/web/fundamentals/web-app-manifest/#display
				display: "standalone",
				icon: "static/img/favicon-32x32.png" // This path is relative to the root of the site.
			}
		},
		`gatsby-transformer-remark`,
		{
			// keep as first gatsby-source-filesystem plugin for gatsby image support
			resolve: "gatsby-source-filesystem",
			options: {
				path: `${__dirname}/static/img`,
				name: "uploads"
			}
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				path: `${__dirname}/src/pages`,
				name: "pages"
			}
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				path: `${__dirname}/src/img`,
				name: "images"
			}
		},
		{
			resolve: "gatsby-plugin-netlify-cms",
			options: {
				modulePath: `${__dirname}/src/cms/cms.js`
			}
		},
		"gatsby-plugin-netlify" // make sure to keep it last in the array
	],
	// for avoiding CORS while developing Netlify Functions locally
	// read more: https://www.gatsbyjs.org/docs/api-proxy/#advanced-proxying
	developMiddleware: app => {
		app.use(
			"/.netlify/functions/",
			proxy({
				target: "http://localhost:9000",
				pathRewrite: {
					"/.netlify/functions/": ""
				}
			})
		);
	}
};
