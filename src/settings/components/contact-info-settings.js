/**
 * WordPress dependencies
 */
import { TextControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { usePluginSettingsContext } from '../context';

const ContactInfoSettings = () => {
	const { options, setOptions } = usePluginSettingsContext();

	const {
		wps_blocks_contact_info: contactInfo = {
			phone_nr: '',
			phone_nr_second: '',
			phone_nr_platform: '',
			email_address: '',
			email_address_second: '',
		},
	} = options;

	return (
		<div>
			<TextControl
				label="Phone number"
				placeholder="+31 6 12345678"
				value={contactInfo?.phone_nr}
				onChange={(value) => {
					const newSettings = {
						...options.wps_blocks_contact_info,
						phone_nr: value,
					};
					setOptions({
						...options,
						wps_blocks_contact_info: newSettings,
					});
				}}
			/>
			<p>
				<small>Main phone number.</small>
			</p>
			<TextControl
				label="Phone number Second"
				placeholder="+31 6 12345678"
				value={contactInfo?.phone_nr_second}
				onChange={(value) => {
					const newSettings = {
						...options.wps_blocks_contact_info,
						phone_nr_second: value,
					};
					setOptions({
						...options,
						wps_blocks_contact_info: newSettings,
					});
				}}
			/>
			<p>
				<small>Secondary phone number.</small>
			</p>
			<TextControl
				label="Whatsapp number"
				placeholder="+31 6 12345678"
				value={contactInfo?.phone_nr_platform}
				onChange={(value) => {
					const newSettings = {
						...options.wps_blocks_contact_info,
						phone_nr_platform: value,
					};
					setOptions({
						...options,
						wps_blocks_contact_info: newSettings,
					});
				}}
			/>
			<p>
				<small>Number used for whatsapp.</small>
			</p>
			<TextControl
				label="Email"
				placeholder="contact@email.com"
				value={contactInfo?.email_address}
				onChange={(value) => {
					const newSettings = {
						...options.wps_blocks_contact_info,
						email_address: value,
					};
					setOptions({
						...options,
						wps_blocks_contact_info: newSettings,
					});
				}}
			/>
			<p>
				<small>Main email address ex. contact@email.com</small>
			</p>
			<TextControl
				label="Secondary email"
				placeholder="contact@email.com"
				value={contactInfo?.email_address_second}
				onChange={(value) => {
					const newSettings = {
						...options.wps_blocks_contact_info,
						email_address_second: value,
					};
					setOptions({
						...options,
						wps_blocks_contact_info: newSettings,
					});
				}}
			/>
			<p>
				<small>Secondary email address ex. contact@email.com</small>
			</p>
		</div>
	);
};

export default ContactInfoSettings;
