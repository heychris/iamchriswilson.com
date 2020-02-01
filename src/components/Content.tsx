import React from 'react';
import PropTypes from 'prop-types';

type HtmlContentProps = {
	content: string;
	className?: string;
};

export const HTMLContent: React.SFC<HtmlContentProps> = ({
	content,
	className
}) => (
	<div className={className} dangerouslySetInnerHTML={{ __html: content }} />
);

HTMLContent.propTypes = {
    content: PropTypes.string.isRequired,
    className: PropTypes.string
};

type ContentProps = {
	content: React.ReactNode;
	className?: string;
};
const Content: React.FC<ContentProps> = ({ content, className }) => (
	<div className={className}>{content}</div>
);

Content.propTypes = {
    content: PropTypes.string.isRequired,
    className: PropTypes.string
};
export default Content;
