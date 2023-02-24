/**
 * WordPress dependencies
 */
import {
	InspectorControls,
	RichText,
	useBlockProps,
	JustifyContentControl,
	BlockControls,
} from '@wordpress/block-editor';
import { PanelBody, ToggleControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * Internal dependencies
 */
import WhatsappButton from './assets/icon-whatsapp';

function Edit({ setAttributes, attributes }) {
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
		'wp-block-button',
		className,
		justification ? `is-aligned-${justification}` : '',
	);

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
						label="Show button"
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
					<p>
						Setup contact info data in plugin settings{' '}
						<a
							target="_blank"
							href="/wp-admin/options-general.php?page=wps_blocks_settings"
						>
							here
						</a>
					</p>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps({ className: classes })}>
				<div className="wps-whatsapp__link wp-block-button__link">
					<div className="wps-whatsapp__inner">
						<div className="wps-whatsapp__symbol">
							<WhatsappButton style={{ width: '1rem' }} />
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
