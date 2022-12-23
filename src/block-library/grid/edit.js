/**
 * WordPress dependencies
 */
import {
	InnerBlocks,
	useBlockProps,
	BlockVerticalAlignmentToolbar,
	JustifyContentControl,
	BlockControls,
	InspectorControls,
	PanelColorSettings,
	withColors,
	ContrastChecker,
	BlockAlignmentToolbar,
} from '@wordpress/block-editor';

import { PanelBody, ToggleControl } from '@wordpress/components';

import { __ } from '@wordpress/i18n';
/**
 * External dependencies
 */
import { SpacingList, BackgroundImage } from 'components/controls';
import classnames from 'classnames';
import { compose } from '@wordpress/compose';

function Edit({
	attributes,
	setAttributes,
	textColor,
	setTextColor,
	backgroundColor,
	setBackgroundColor,
}) {
	const INNER_BLOCKS_ALLOWED_BLOCKS = ['wps/grid-column'];
	const INNER_BLOCKS_TEMPLATE = [['wps/grid-column', {}]];
	const {
		horizontalAlign = '',
		verticalAlign = '',
		className = '',
		columnGap = '',
		columnPadding = '',
		columnAlign = '',
		paddingVertical = '',
		paddingHorizontal = '',
		columnEqualHeight = false,
		fullHeight = false,
		contentCenter = false,
		media,
		focalPoint,
		backgroundBehaviour,
		dimRatio,
	} = attributes;

	const classes = classnames([
		'wps-grid',
		className,
		backgroundColor.hasOwnProperty('class') ? backgroundColor.class : '',
		textColor.hasOwnProperty('class') ? textColor.class : '',
		paddingVertical ? `u-padding-vertical-${paddingVertical}` : '',
		paddingHorizontal ? `u-padding-horizontal-${paddingHorizontal}` : '',
		horizontalAlign ? `horizontal-align-${horizontalAlign}` : '',
		verticalAlign ? `vertical-align-${verticalAlign}` : '',
		fullHeight ? `is-full-height` : '',
		contentCenter ? `is-content-center` : '',
		columnGap ? `column-gap-${columnGap}` : '',
		columnPadding ? `column-padding-${columnPadding}` : '',
		columnAlign ? `column-align${columnAlign}` : '',
		columnEqualHeight ? `column-equal-height` : '',
	]);
	const classesOverlay = classnames([
		'wps-grid__overlay',
		media && media.hasOwnProperty('url') ? 'has-background' : '',
		backgroundColor.hasOwnProperty('class') ? backgroundColor.class : '',
		backgroundBehaviour ? `background-is-${backgroundBehaviour}` : '',
	]);
	const style = {};

	if (media) {
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
		style.opacity = dimRatio !== 100 ? `${dimRatio}%` : '';
	}

	return (
		<>
			<BlockControls group="block">
				<BlockVerticalAlignmentToolbar
					onChange={(value) =>
						setAttributes({ verticalAlign: value })
					}
					value={verticalAlign}
				/>
				<JustifyContentControl
					allowedControls={['left', 'center', 'right']}
					value={horizontalAlign}
					onChange={(value) => {
						setAttributes({ horizontalAlign: value });
					}}
				/>
				<BlockAlignmentToolbar
					label={__('Column alignment')}
					value={columnAlign}
					controls={['wide', 'full']}
					onChange={(value) => {
						setAttributes({ columnAlign: value });
					}}
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody
					title={__('Settings', 'wps-blocks')}
					initialOpen={true}
				>
					<h3>{__('Grid Spacings')}</h3>
					<SpacingList
						label="Grid vertical padding"
						value={paddingVertical}
						onChange={(value) =>
							setAttributes({ paddingVertical: value })
						}
					/>
					<SpacingList
						label="Grid horizontal padding"
						value={paddingHorizontal}
						onChange={(value) =>
							setAttributes({ paddingHorizontal: value })
						}
					/>
					<h3>{__('Column Spacings')}</h3>
					<SpacingList
						label="Column padding"
						value={columnPadding}
						onChange={(value) =>
							setAttributes({ columnPadding: value })
						}
					/>
					<SpacingList
						label="Column gap"
						value={columnGap}
						onChange={(value) =>
							setAttributes({ columnGap: value })
						}
					/>
					<h3>{__('Height adjustment')}</h3>
					<ToggleControl
						label="Make grid full screen height"
						checked={fullHeight}
						onChange={() => {
							setAttributes({
								fullHeight: !fullHeight,
								/* Turn off center content if full height is turned off */
								contentCenter:
									fullHeight && contentCenter
										? !contentCenter
										: contentCenter,
							});
						}}
					/>
					<ToggleControl
						label="Center full height content"
						checked={contentCenter}
						onChange={() => {
							setAttributes({ contentCenter: !contentCenter });
						}}
					/>
					<ToggleControl
						label="Columns equal height"
						checked={columnEqualHeight}
						onChange={() => {
							setAttributes({
								columnEqualHeight: !columnEqualHeight,
							});
						}}
					/>
				</PanelBody>
				<PanelBody
					title={__('Backgrounds', 'wps-blocks')}
					initialOpen={false}
				>
					<ContrastChecker
						textColor={textColor.color}
						backgroundColor={backgroundColor.color}
					/>
					<PanelColorSettings
						title={__('Color settings')}
						colorSettings={[
							{
								value: textColor.color,
								onChange: setTextColor,
								label: __('Text color'),
							},
							{
								value: backgroundColor.color,
								onChange: setBackgroundColor,
								label: __('Background color'),
							},
						]}
					/>
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
			</InspectorControls>
			<div {...useBlockProps({ className: classes })}>
				{media ? <div className={classesOverlay} style={style} /> : ''}
				<InnerBlocks
					template={INNER_BLOCKS_TEMPLATE}
					templateLock={false}
					allowedBlocks={INNER_BLOCKS_ALLOWED_BLOCKS}
				/>
			</div>
		</>
	);
}
export default compose([
	withColors({ textColor: 'color', backgroundColor: 'background-color' }),
])(Edit);
