import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import './all.scss';

const TemplateWrapper: React.FC = ({ children }) => (
	<StaticQuery
		query={graphql`
			query HeadingQuery {
				site {
					siteMetadata {
						title
						description
					}
				}
			}
		`}
		render={data => (
			<main>
				<Helmet>
					<html lang="en" />

					<title>{data.site.siteMetadata.title}</title>

					<meta
						name="description"
						content={data.site.siteMetadata.description}
					/>

					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/img/apple-touch-icon.png"
					/>
					<link
						rel="icon"
						type="image/png"
						href="/img/favicon-32x32.png"
						sizes="32x32"
					/>
					<link
						rel="icon"
						type="image/png"
						href="/img/favicon-16x16.png"
						sizes="16x16"
					/>

					<link
						rel="mask-icon"
						href="/img/safari-pinned-tab.svg"
						color="#ff4400"
					/>
					<meta name="theme-color" content="#fff" />

					<meta property="og:type" content="website" />
					<meta property="og:title" content={data.site.siteMetadata.title} />
					<meta property="og:url" content="https://www.iamchriswilson.com" />
					<meta property="og:image" content="/img/og-image.jpg" />
				</Helmet>
				<article>
                    <header>
                        <h1><a href="/" title="Personal Website of Chris Wilson | Homepage">Chris Wilson</a></h1>
                    </header>

                    {children}
                </article>
			</main>
		)}
	/>
);

TemplateWrapper.propTypes = {
    children: PropTypes.any.isRequired
}

export default TemplateWrapper;
