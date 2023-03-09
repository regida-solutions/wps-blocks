/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	withColors,
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
	'core/buttons',
	'core/button',
	'core/list',
];
const TEMPLATE = [
	['core/heading', { level: 3, content: __('Title', 'wps-blocks') }],
	['core/paragraph', { content: __('Description', 'wps-blocks') }],
	[
		'core/buttons',
		{},
		[['core/button', { content: __('Button', 'wps-blocks') }]],
	],
];

function Edit({
	attributes,
	setAttributes,
	textColor,
	backgroundColor,
	isSelected,
}) {
	const { className, spacingGeneral, aspectRatio } = attributes;

	const classes = classnames([
		'wps-card',
		className,
		backgroundColor.hasOwnProperty('class') ? backgroundColor.class : '',
		textColor.hasOwnProperty('class') ? textColor.class : '',
		aspectRatio ? `has-aspect-ratio` : '',
	]);

	const innerClasses = classnames([
		'wps-card__content',
		spacingGeneral
			? `has-content-spacing has-padding-general-${spacingGeneral}`
			: '',
	]);

	const style = {};

	if (aspectRatio) {
		style['--media-aspect-ratio'] = aspectRatio;
	}

	return (
		<>
			<InspectorControls>
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
			<div
				{...useBlockProps({ className: classes, style: { ...style } })}
			>
				<div className="wps-card__media">
					<Image
						setAttributes={setAttributes}
						isSelected={isSelected}
						attributes={attributes}
						hasAspectRatio={true}
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
