/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	InnerBlocks,
	useBlockProps,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalColorGradientControl as ColorGradientControl,
} from '@wordpress/block-editor';

import { PanelBody, ToggleControl, RangeControl } from '@wordpress/components';

/**
 * External dependencies
 */
import { SpacingList, BackgroundImage } from 'components/controls';
import classnames from 'classnames';

function Edit({ attributes, setAttributes }) {
	const INNER_BLOCKS_ALLOWED_BLOCKS = [
		'core/spacer',
		'core/group',
		'core/separator',
		'core/html',
		'core/heading',
		'core/paragraph',
		'core/list',
		'core/button',
	];
	const INNER_BLOCKS_TEMPLATE = [
		['core/heading', { placeholder: 'Heading' }],
		['core/paragraph', { placeholder: 'Paragraph' }],
		['core/buttons', {}],
	];
	const {
		className = '',
		media,
		focalPoint,
		backgroundBehaviour,
		dimRatio,
		swapLayout,
		colorValue,
		gradientValue,
		paddingVertical,
		paddingHorizontal,
		contentWidth,
		limitContentWidth,
	} = attributes;

	const style = {};
	const overlayStyle = {};

	const classes = classnames([
		className,
		'media-banner',
		contentWidth ? `has-width-${contentWidth}` : '',
		swapLayout ? 'media-banner--swap-layout' : '',
		limitContentWidth ? 'media-banner--limit-width' : '',
	]);
	const contentClasses = classnames([
		'media-banner__content',
		paddingVertical || paddingHorizontal ? 'has-content-spacing' : '',
		paddingVertical ? `has-padding-vertical-${paddingVertical}` : '',
		paddingHorizontal ? `has-padding-horizontal-${paddingHorizontal}` : '',
	]);

	const classesBackground = classnames([
		'media-banner__background',
		media && media.hasOwnProperty('url') ? 'has-background' : '',
		backgroundBehaviour ? `background-is-${backgroundBehaviour}` : '',
	]);

	const classesOverlay = classnames(['media-banner__overlay']);

	if (colorValue || gradientValue) {
		overlayStyle.background = colorValue || gradientValue;
	}

	if (contentWidth) {
		style['--media-banner-content-width'] = `${contentWidth}%`;
	}

	const marks = [
		{ value: 10 },
		{ value: 20 },
		{ value: 30 },
		{ value: 40 },
		{ value: 50 },
		{ value: 60 },
		{ value: 70 },
		{ value: 80 },
		{ value: 90 },
		{ value: 100 },
	];

	const mediaFocal =
		focalPoint?.x && focalPoint?.y ? focalPoint : { x: 0.5, y: 0.5 };

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Layout settings', 'wps-blocks')}
					initialOpen={true}
				>
					<ToggleControl
						label="Swap layout"
						checked={swapLayout}
						onChange={() => {
							setAttributes({
								swapLayout: !swapLayout,
							});
						}}
					/>
					<ToggleControl
						label="Limit content width"
						checked={limitContentWidth}
						onChange={() => {
							setAttributes({
								limitContentWidth: !limitContentWidth,
							});
						}}
					/>
					<RangeControl
						separatorType="none"
						isShiftStepEnabled
						label="Column custom size"
						marks={marks}
						value={contentWidth}
						onChange={(value) => {
							setAttributes({ contentWidth: value });
						}}
						allowReset
						resetFallbackValue={null}
						min={50}
						max={100}
						step={1}
					/>
				</PanelBody>
				<PanelBody
					title={__('Overlay settings', 'wps-blocks')}
					initialOpen={true}
				>
					<ColorGradientControl
						colorValue={colorValue}
						gradientValue={gradientValue}
						onColorChange={(newValue) =>
							setAttributes({ colorValue: newValue })
						}
						onGradientChange={(newValue) =>
							setAttributes({ gradientValue: newValue })
						}
					/>
				</PanelBody>
				<PanelBody title={__('Spacing')} initialOpen={false}>
					<SpacingList
						label="Padding Vertical"
						value={paddingVertical}
						onChange={(value) =>
							setAttributes({ paddingVertical: value })
						}
					/>
					<SpacingList
						label="Padding Horizontal"
						value={paddingHorizontal}
						onChange={(value) =>
							setAttributes({ paddingHorizontal: value })
						}
					/>
				</PanelBody>
				<PanelBody title={__('Image')} initialOpen={false}>
					<BackgroundImage
						media={media}
						onUpdate={(image) =>
							setAttributes({
								media: {
									id: image?.id,
									sizeSlug: 'full',
									url: image?.url,
								},
							})
						}
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
			</InspectorControls>
			<div {...useBlockProps({ className: classes, style })}>
				{media ? (
					<div className={classesBackground}>
						<img
							alt={media?.alt}
							src={media?.url}
							style={{
								objectPosition: `${mediaFocal.x * 100}% ${
									mediaFocal.y * 100
								}%`,
								opacity: dimRatio !== 100 ? `${dimRatio}%` : '',
							}}
						/>
					</div>
				) : (
					''
				)}
				{colorValue || gradientValue ? (
					<div className={classesOverlay} style={overlayStyle} />
				) : (
					''
				)}
				<div className={contentClasses}>
					<InnerBlocks
						template={INNER_BLOCKS_TEMPLATE}
						templateLock={false}
						allowedBlocks={INNER_BLOCKS_ALLOWED_BLOCKS}
					/>
				</div>
			</div>
		</>
	);
}
export default Edit;
