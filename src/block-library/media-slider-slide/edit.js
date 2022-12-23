/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * External dependencies
 */
import { Image } from 'components';
import classnames from 'classnames';

function Edit({ attributes, setAttributes, isSelected }) {
	const { className = '' } = attributes;
	const classes = classnames('wps-media-slider-slide', className);

	return (
		<div {...useBlockProps({ className: classes })}>
			<div className="wps-media-slider-slide__media">
				<Image
					className="wps-hero__image"
					attributes={attributes}
					setAttributes={setAttributes}
					isSelected={isSelected}
				/>
			</div>
		</div>
	);
}
export default Edit;
