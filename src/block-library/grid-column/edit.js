/**
 * WordPress dependencies
 */
import {
	InnerBlocks,
	useBlockProps,
	InspectorControls,
	PanelColorSettings,
	BlockVerticalAlignmentToolbar,
	withColors,
	ContrastChecker,
	BlockControls,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import classnames from 'classnames';
import { BackgroundImage } from 'components/controls';

function Edit({
	attributes,
	setAttributes,
	textColor,
	setTextColor,
	backgroundColor,
	setBackgroundColor,
}) {
	const {
		className = '',
		width = null,
		verticalAlign = '',
		media,
		focalPoint,
		backgroundBehaviour,
		dimRatio,
	} = attributes;

	const blockStyle = [];
	const style = {};

	const classes = classnames([
		'wps-grid-column',
		className,
		verticalAlign ? `vertical-align-${verticalAlign}` : '',
		backgroundColor.hasOwnProperty('class') ? backgroundColor.class : '',
		textColor.hasOwnProperty('class') ? textColor.class : '',
		media && media.hasOwnProperty('url') ? 'has-background' : '',
		[width ? `has-width-${width}` : ''],
	]);
	const classesOverlay = classnames([
		'wps-grid-column__overlay',
		media && media.hasOwnProperty('url') ? 'has-background' : '',
		backgroundColor.hasOwnProperty('class') ? backgroundColor.class : '',
		backgroundBehaviour ? `background-is-${backgroundBehaviour}` : '',
	]);

	if (width) {
		blockStyle['--column-width'] = `${width}%`;
	}

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
		if (dimRatio !== 100) {
			style.opacity = `${dimRatio}%`;
		}
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

	return (
		<>
			<BlockControls group="block">
				<BlockVerticalAlignmentToolbar
					onChange={(value) =>
						setAttributes({ verticalAlign: value })
					}
					value={verticalAlign}
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody
					title={__('Spacing', 'wps-blocks')}
					initialOpen={true}
				>
					<RangeControl
						separatorType="none"
						isShiftStepEnabled
						label="Column custom size"
						marks={marks}
						value={width}
						onChange={(value) => {
							setAttributes({ width: value });
						}}
						allowReset
						resetFallbackValue={null}
						min={10}
						max={100}
						step={1}
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

			<div {...useBlockProps({ className: classes, style: blockStyle })}>
				{media ? <div className={classesOverlay} style={style} /> : ''}
				<div className="wps-grid-column__inner">
					<InnerBlocks />
				</div>
			</div>
		</>
	);
}
export default compose([
	withColors({ textColor: 'color', backgroundColor: 'background-color' }),
])(Edit);
