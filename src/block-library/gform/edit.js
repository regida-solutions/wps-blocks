/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import { BaseControl, PanelBody, ColorPicker } from '@wordpress/components';

/**
 * External dependencies
 */
import classnames from 'classnames';

function Edit({ attributes, setAttributes }) {
	const {
		className = '',
		buttonTextColor,
		buttonHoverColor,
		buttonBackgroundColor,
		errorColor,
		requiredColor,
	} = attributes;

	const classes = classnames(className, ['wps-gform']);

	const ALLOWED_BLOCKS = [
		'gravityforms/form',
		'core/paragraph',
		'core/heading',
	];

	const TEMPLATE = [
		[
			'gravityforms/form',
			{
				title: false,
				description: false,
				ajax: true,
				inputPrimaryColor: '#204ce5',
			},
		],
	];

	const style = {
		'--gf-button-background': buttonBackgroundColor || '#6a38ff',
		'--gf-button-text': buttonTextColor || '#fff',
		'--gf-button-hover': buttonHoverColor || '#542ccc',
		'--gf-error-color': buttonHoverColor || '#c02b0a',
		'--gf-required-color': requiredColor || '#c02b0a',
	};

	const blocksProps = useBlockProps({ className: classes, style });
	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			templateLock: 'all',
			lock: { remove: true },
			template: TEMPLATE,
			allowedBlocks: ALLOWED_BLOCKS,
		},
	);

	return (
		<>
			<InspectorControls group="styles">
				<PanelBody title={__('Custom form colors')} initialOpen={false}>
					<BaseControl
						id="button-text-color"
						label="Button text color"
						__nextHasNoMarginBottom={true}
					>
						<ColorPicker
							color={buttonTextColor}
							onChange={(value) =>
								setAttributes({ buttonTextColor: value })
							}
							enableAlpha
							defaultValue="#fff"
						/>
					</BaseControl>
					<hr />
					<BaseControl
						id="button-bg-color"
						label="Button background color"
						__nextHasNoMarginBottom={true}
					>
						<ColorPicker
							color={buttonBackgroundColor}
							onChange={(value) =>
								setAttributes({ buttonBackgroundColor: value })
							}
							enableAlpha
							defaultValue="#6a38ff"
						/>
					</BaseControl>
					<hr />
					<BaseControl
						id="button-hover-color"
						label="Button hover color"
						__nextHasNoMarginBottom={true}
					>
						<ColorPicker
							color={buttonHoverColor}
							onChange={(value) =>
								setAttributes({ buttonHoverColor: value })
							}
							enableAlpha
							defaultValue="#542ccc"
						/>
					</BaseControl>
					<hr />
					<BaseControl
						id="error-color"
						label="Error color"
						__nextHasNoMarginBottom={true}
					>
						<ColorPicker
							color={errorColor}
							onChange={(value) =>
								setAttributes({ errorColor: value })
							}
							enableAlpha
							defaultValue="#c02b0a"
						/>
					</BaseControl>
					<hr />
					<BaseControl
						id="required-color"
						label="Required color"
						__nextHasNoMarginBottom={true}
					>
						<ColorPicker
							color={requiredColor}
							onChange={(value) =>
								setAttributes({ requiredColor: value })
							}
							enableAlpha
							defaultValue="#c02b0a"
						/>
					</BaseControl>
				</PanelBody>
			</InspectorControls>
			<div {...blocksProps}>
				<div className="wps-gform__inner">
					<div {...innerBlocksProps} />
				</div>
			</div>
		</>
	);
}

export default Edit;
