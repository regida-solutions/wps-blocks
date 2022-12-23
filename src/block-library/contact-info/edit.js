/**
 * WordPress dependencies
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, Disabled, ToggleControl } from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';
import { __ } from '@wordpress/i18n';

function Edit({ attributes, setAttributes }) {
	const {
		showPhoneOne,
		showPhoneTwo,
		showPhonePlatform,
		showEmailOne,
		showEmailTwo,
		enableUrl,
		enableIcon,
	} = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Settings', 'wps-blocks')}
					initialOpen={true}
				>
					<ToggleControl
						label="Show phone number one"
						checked={showPhoneOne}
						onChange={() => {
							setAttributes({ showPhoneOne: !showPhoneOne });
						}}
					/>
					<ToggleControl
						label="Show phone number two"
						checked={showPhoneTwo}
						onChange={() => {
							setAttributes({ showPhoneTwo: !showPhoneTwo });
						}}
					/>
					<ToggleControl
						label="Show whatsapp number"
						checked={showPhonePlatform}
						onChange={() => {
							setAttributes({
								showPhonePlatform: !showPhonePlatform,
							});
						}}
					/>
					<ToggleControl
						label="Show email number one"
						checked={showEmailOne}
						onChange={() => {
							setAttributes({ showEmailOne: !showEmailOne });
						}}
					/>
					<ToggleControl
						label="Show email number two"
						checked={showEmailTwo}
						onChange={() => {
							setAttributes({ showEmailTwo: !showEmailTwo });
						}}
					/>
					<ToggleControl
						label="Add link"
						checked={enableUrl}
						onChange={() => {
							setAttributes({ enableUrl: !enableUrl });
						}}
					/>
					<ToggleControl
						label="Enable icon"
						checked={enableIcon}
						onChange={() => {
							setAttributes({ enableIcon: !enableIcon });
						}}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()}>
				<Disabled>
					<ServerSideRender
						block="wps/contact-info"
						attributes={{ ...attributes }}
					/>
				</Disabled>
			</div>
		</>
	);
}
export default Edit;
