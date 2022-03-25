import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";

// eslint-disable-next-line
export const IndexPageTemplate = ({ heading, body }) => {
  return (
    <div className="container">
      <h2>{heading}</h2>
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  );
};

const IndexPage = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        heading={frontmatter.heading}
        body={html} />
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      html
      frontmatter {
        heading
      }
    }
  }
`;
