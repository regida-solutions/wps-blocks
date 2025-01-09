/**
 * WordPress dependencies
 */
import { TextControl, TextareaControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { usePluginSettingsContext } from '../context';

const GFSettings = () => {
	const { options, setOptions } = usePluginSettingsContext();

	const {
		wps_blocks_gravity_forms: gf = {
			confirmation_message: '',
			form_ids: '',
		},
	} = options;

	return (
		<>
			<TextareaControl
				label="Gravity forms custom confirmation message"
				placeholder=""
				help={
					<p>
						{__(
							'You can use gutenberg markup ex: <!-- wp:block {"ref":1597} /-->',
						)}
					</p>
				}
				value={gf?.confirmation_message}
				onChange={(value) => {
					const newSettings = {
						...options.wps_blocks_gravity_forms,
						confirmation_message: value ? value : '',
					};
					setOptions({
						...options,
						wps_blocks_gravity_forms: newSettings,
					});
				}}
			/>
			<TextControl
				label="Gravity form ids separated by comma"
				help={<p>{__('123,124')}</p>}
				value={gf?.form_ids}
				onChange={(value) => {
					const newSettings = {
						...options.wps_blocks_gravity_forms,
						form_ids: value ? value : '',
					};
					setOptions({
						...options,
						wps_blocks_gravity_forms: newSettings,
					});
				}}
			/>
		</>
	);
};

export default GFSettings;
