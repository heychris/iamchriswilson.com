import React from "react";
import PropTypes from "prop-types";
import { IndexPageTemplate } from "../../templates/index-page";

const IndexPagePreview = ({ entry }) => {
	return <IndexPageTemplate content={entry.getIn(["data", "content"])} />;
};

IndexPagePreview.propTypes = {
	entry: PropTypes.shape({
		getIn: PropTypes.func
	})
};

export default IndexPagePreview;
