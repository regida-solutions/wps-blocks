/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	PanelColorSettings,
	withColors,
	ContrastChecker,
	InnerBlocks,
} from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import { PanelBody } from '@wordpress/components';
/**
 * External dependencies
 */
import { Image } from 'components';
import classnames from 'classnames';
/**
 * Internal dependencies
 */
import { SpacingList } from 'components/controls';

const ALLOWED_BLOCKS = [
	'core/heading',
	'core/paragraph',
	'core/button',
	'core/list',
];
const TEMPLATE = [
	['core/heading', { level: 3, content: __('Title', 'wps-blocks') }],
	['core/paragraph', { content: __('Description', 'wps-blocks') }],
	['core/button', { content: __('Button', 'wps-blocks') }],
];

function Edit({
	attributes,
	setAttributes,
	textColor,
	setTextColor,
	backgroundColor,
	setBackgroundColor,
	isSelected,
}) {
	const { className, spacingGeneral } = attributes;

	const classes = classnames([
		'wps-card',
		className,
		backgroundColor.hasOwnProperty('class') ? backgroundColor.class : '',
		textColor.hasOwnProperty('class') ? textColor.class : '',
	]);

	const innerClasses = classnames([
		'wps-card__content',
		spacingGeneral
			? `has-content-spacing has-padding-general-${spacingGeneral}`
			: '',
	]);

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Colors', 'wps-blocks')}
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
				</PanelBody>
				<PanelBody
					title={__('Spacing', 'wps-blocks')}
					initialOpen={false}
				>
					<SpacingList
						label="Padding (general)"
						value={spacingGeneral}
						onChange={(value) =>
							setAttributes({ spacingGeneral: value })
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps({ className: classes })}>
				<div className="wps-card__media">
					<Image
						setAttributes={setAttributes}
						isSelected={isSelected}
						attributes={attributes}
					/>
				</div>
				<div className={innerClasses}>
					<InnerBlocks
						allowedBlocks={ALLOWED_BLOCKS}
						template={TEMPLATE}
					/>
				</div>
			</div>
		</>
	);
}

export default compose([
	withColors({ textColor: 'color', backgroundColor: 'background-color' }),
])(Edit);
