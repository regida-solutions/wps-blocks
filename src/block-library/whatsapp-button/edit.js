/**
 * WordPress dependencies
 */
import {
	InspectorControls,
	InnerBlocks,
	RichText,
	useBlockProps,
	JustifyContentControl,
	BlockControls,
} from '@wordpress/block-editor';
import { PanelBody, ToggleControl, TextControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
/**
 * External dependencies
 */
import classnames from 'classnames';

function Edit({ setAttributes, attributes }) {
	const INNER_BLOCKS_ALLOWED_BLOCKS = ['wps/icon'];

	const {
		className = '',
		label,
		message,
		showOnLarge,
		customNumber,
		justification,
	} = attributes;

	const classes = classnames(
		'wps-whatsapp',
		className,
		justification ? `is-aligned-${justification}` : '',
	);

	const hasIconBlock = useSelect((select) => {
		return !!select('core/blocks').getBlockType('wps/icon');
	}, []);
	const template = hasIconBlock
		? [['wps/icon', { icon: 'whatsapp', type: 'brands' }]]
		: [];

	return (
		<>
			<BlockControls group="block">
				<JustifyContentControl
					allowedControls={['left', 'center', 'right']}
					value={justification}
					onChange={(value) => {
						setAttributes({ justification: value });
					}}
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody
					title={__('Settings', 'wps-blocks')}
					initialOpen={true}
				>
					<TextControl
						label={__('Default message', 'wps-blocks')}
						value={message}
						onChange={(value) => setAttributes({ message: value })}
					/>
					<ToggleControl
						label="Show button option"
						help={
							showOnLarge
								? __('Show on large screen.', 'wps-blocks')
								: __('Hidden on large screens.', 'wps-blocks')
						}
						checked={showOnLarge}
						onChange={() => {
							setAttributes({ showOnLarge: !showOnLarge });
						}}
					/>
					<TextControl
						label={__('Custom phone number', 'wps-blocks')}
						value={customNumber}
						onChange={(value) =>
							setAttributes({ customNumber: value })
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps({ className: classes })}>
				<div className="wps-whatsapp__link">
					<div className="wps-whatsapp__inner">
						<div className="wps-whatsapp__symbol">
							<InnerBlocks
								template={template}
								templateLock={true}
								allowedBlocks={INNER_BLOCKS_ALLOWED_BLOCKS}
							/>
						</div>
						<div className="wps-whatsapp__text">
							<RichText
								tagName="p"
								className="wps-whatsapp__label"
								placeholder={__('Button text', 'wps-blocks')}
								value={label}
								onChange={(value) =>
									setAttributes({ label: value })
								}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
export default Edit;
