import React from 'react'
import PropTypes from "prop-types";
import { IndexPageTemplate } from '../../templates/index-page'

type IndexPagePreviewProps = {
    entry: {
        getIn: Function;
    };
};

const IndexPagePreview: React.FC<IndexPagePreviewProps> = ({ entry }) => {
  return <IndexPageTemplate content={entry.getIn(['data', 'content'])} />
};

IndexPagePreview.propTypes = {
    entry: PropTypes.exact({
        getIn: PropTypes.func.isRequired
    }).isRequired
};

export default IndexPagePreview
