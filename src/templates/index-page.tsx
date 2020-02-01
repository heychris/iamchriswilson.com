import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import { HTMLContent } from '../components/Content';

type IndexPageTemplateProps = {
	content: string;
};

type Props = {
	data: {
		markdownRemark: {
			html: string;
		};
	};
};

export const IndexPageTemplate: FC<IndexPageTemplateProps> = ({ content }) => (
	<div>
		<HTMLContent className="container" content={content} />
	</div>
);

IndexPageTemplate.propTypes = {
    content: PropTypes.string.isRequired
};

const IndexPage: FC<Props> = ({ data }) => {
	const { markdownRemark: post } = data;

	return (
		<Layout>
			<IndexPageTemplate content={post.html} />
		</Layout>
	);
};

IndexPage.propTypes = {
    data: PropTypes.any.isRequired
}

export default IndexPage;

export const pageQuery = graphql`
	query IndexPageTemplate {
		markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
			html
		}
	}
`;
