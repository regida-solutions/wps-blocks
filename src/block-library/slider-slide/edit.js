/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * External dependencies
 */
import classnames from 'classnames';

function Edit({ attributes }) {
	const INNER_BLOCKS_TEMPLATE = [['core/paragraph', {}]];

	const { className = '' } = attributes;
	const classes = classnames('wps-slider-slide', className);

	return (
		<div {...useBlockProps({ className: classes })}>
			<div className="wps-slider-slide__content">
				<InnerBlocks
					template={INNER_BLOCKS_TEMPLATE}
					templateLock={false}
				/>
			</div>
		</div>
	);
}
export default Edit;
