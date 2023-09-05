/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * External dependencies
 */
import classnames from 'classnames';

function Edit({ attributes }) {
	const { className } = attributes;

	const classes = classnames([
		'wps-content-disabler',
		'alignfull',
		className,
	]);

	return (
		<div {...useBlockProps({ className: classes })}>
			<h6 className="wps-content-disabler__intro">Content is disabled</h6>
			<div className="wps-content-disabler__inner">
				<InnerBlocks />
			</div>
		</div>
	);
}
export default Edit;
