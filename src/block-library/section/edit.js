/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InnerBlocks,
	useBlockProps,
	InspectorControls,
	withColors,
	BlockControls,
	BlockAlignmentToolbar,
} from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import { PanelBody } from '@wordpress/components';

/**
 * External dependencies
 */
import classnames from 'classnames';
import { isEmpty } from 'lodash';

/**
 * Internal dependencies
 */
import { BackgroundImage, SpacingList } from 'components/controls';

function Edit({ attributes, setAttributes, textColor, backgroundColor }) {
	const {
		className,
		spacingVertical,
		media,
		focalPoint,
		backgroundBehaviour,
		dimRatio,
		innerContentWidth = '',
	} = attributes;

	const classes = classnames([
		'wps-section',
		className,
		spacingVertical ? 'has-vertical-spacing' : '',
		spacingVertical ? `u-padding-vertical-${spacingVertical}` : '',
		innerContentWidth ? `inner-content-align${innerContentWidth}` : '',
		textColor.hasOwnProperty('class') ? textColor.class : '',
		media && media.hasOwnProperty('url') ? 'has-background' : '',
		!isEmpty(media) && backgroundColor.hasOwnProperty('class')
			? backgroundColor.class
			: '',
	]);

	const classesOverlay = classnames([
		'wps-section__overlay',
		media && media.hasOwnProperty('url') ? 'has-background' : '',
		isEmpty(media) && backgroundColor.hasOwnProperty('class')
			? backgroundColor.class
			: '',
		backgroundBehaviour ? `background-is-${backgroundBehaviour}` : '',
	]);

	const style = {};

	if (!isEmpty(media)) {
		if (media.hasOwnProperty('url')) {
			style.backgroundImage = `url(${media.url})`;
		}
		if (focalPoint) {
			if (
				focalPoint.hasOwnProperty('x') &&
				focalPoint.hasOwnProperty('y')
			) {
				style.backgroundPosition = `${focalPoint.x * 100}% ${
					focalPoint.y * 100
				}%`;
			}
		}
	}
	style.opacity = dimRatio !== 100 ? `${dimRatio}%` : '';

	return (
		<>
			<BlockControls group="block">
				<BlockAlignmentToolbar
					label={__('Inner Content Width')}
					value={innerContentWidth}
					controls={['wide', 'full']}
					onChange={(value) => {
						setAttributes({ innerContentWidth: value });
					}}
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody
					title={__('Backgrounds', 'wps-blocks')}
					initialOpen={false}
				>
					<BackgroundImage
						media={media}
						onUpdate={(image) => setAttributes({ media: image })}
						onRemove={() =>
							setAttributes({ media: {}, focalPoint: {} })
						}
						focalPoint={focalPoint}
						onFocalChange={(focalData) =>
							setAttributes({ focalPoint: focalData })
						}
						behaviour={backgroundBehaviour}
						behaviourSettings
						onBehaveChange={(value) =>
							setAttributes({ backgroundBehaviour: value })
						}
						rangeSettings
						range={dimRatio}
						onRangeChange={(newDimRation) => {
							setAttributes({ dimRatio: newDimRation });
						}}
					/>
				</PanelBody>
				<PanelBody
					title={__('Spacing', 'wps-blocks')}
					initialOpen={false}
				>
					<h3>Paddings</h3>
					<SpacingList
						label="Padding vertical"
						value={spacingVertical}
						onChange={(value) =>
							setAttributes({ spacingVertical: value })
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps({ className: classes })}>
				{!isEmpty(media) || backgroundColor ? (
					<div className={classesOverlay} style={style} />
				) : (
					''
				)}
				<div className="wps-section__inner">
					<InnerBlocks />
				</div>
			</div>
		</>
	);
}

export default compose([
	withColors({ textColor: 'color', backgroundColor: 'background-color' }),
])(Edit);
