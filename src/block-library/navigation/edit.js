/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * External dependencies
 */
import classnames from 'classnames';

function Edit({ attributes }) {
	const { className = '' } = attributes;

	const classes = classnames([className]);

	return <div {...useBlockProps({ className: classes })}>Navigation</div>;
}
export default Edit;
