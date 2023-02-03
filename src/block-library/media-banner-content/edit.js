/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	withColors,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';
import { compose } from '@wordpress/compose';

/**
 * External dependencies
 */
import { SpacingList } from 'components/controls';
import classnames from 'classnames';

const INNER_BLOCKS_ALLOWED_BLOCKS = [
	'core/spacer',
	'core/group',
	'core/spacer',
	'core/separator',
	'core/html',
	'core/heading',
	'core/paragraph',
	'core/list',
	'core/buttons',
	'core/button',
	'core/image',
	'core/embed',
	'core/pullquote',
	'core/code',
	'core/quote',
	'core/table',
	'core/verse',
	'core/preformatted',
	'core/column',
	'core/columns',
];
const INNER_BLOCKS_TEMPLATE = [
	['core/heading', { placeholder: 'Heading' }],
	['core/paragraph', { placeholder: 'Paragraph' }],
	['core/buttons', {}],
];

function Edit({ attributes, setAttributes }) {
	const {
		className = '',
		paddingVertical,
		paddingHorizontal,
		contentWidth,
		limitContentWidth,
		contentOffset,
	} = attributes;
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: classnames([
				'media-banner-content__inner',
				paddingVertical || paddingHorizontal
					? 'has-content-spacing'
					: '',
				paddingVertical
					? `has-padding-vertical-${paddingVertical}`
					: '',
				paddingHorizontal
					? `has-padding-horizontal-${paddingHorizontal}`
					: '',
			]),
		},
		{
			template: INNER_BLOCKS_TEMPLATE,
			templateLock: false,
			allowedBlocks: INNER_BLOCKS_ALLOWED_BLOCKS,
		},
	);

	const classes = classnames([
		className,
		'media-banner-content',
		contentWidth ? `has-width-${contentWidth}` : '',
		limitContentWidth ? 'media-banner-content--limit-width' : '',
	]);

	const style = {};
	if (contentWidth) {
		style['--media-banner-content-width'] = `${contentWidth}%`;
		style['--media-banner-content-offset'] = `${contentOffset}%`;
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

	const blockProps = useBlockProps({ className: classes, style });
	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Settings')} initialOpen={true}>
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
					<RangeControl
						separatorType="none"
						isShiftStepEnabled
						label="Content margin offset"
						marks={marks}
						value={contentOffset}
						onChange={(value) => {
							setAttributes({ contentOffset: value });
						}}
						allowReset
						resetFallbackValue={null}
						min={0}
						max={100}
						step={1}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<div {...innerBlocksProps} />
			</div>
		</>
	);
}

export default compose([
	withColors({
		textColor: 'color',
		backgroundColor: 'background-color',
	}),
])(Edit);
