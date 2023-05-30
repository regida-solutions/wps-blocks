/**
 * WordPress dependencies
 */
import {
	InspectorControls,
	useBlockProps,
	AlignmentControl,
	BlockControls,
} from '@wordpress/block-editor';
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
		textAlign,
	} = attributes;

	return (
		<>
			<BlockControls group="block">
				<AlignmentControl
					value={textAlign}
					onChange={(newAlign) =>
						setAttributes({
							textAlign: newAlign,
						})
					}
				/>
			</BlockControls>
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
