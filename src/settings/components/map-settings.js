/**
 * WordPress dependencies
 */
import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { usePluginSettingsContext } from '../context';

const MapSettings = () => {
	const { options, setOptions } = usePluginSettingsContext();

	const {
		wps_blocks_map: gMap = {
			api_key: '',
		},
	} = options;

	return (
		<TextControl
			label="Google Maps Api Key"
			placeholder="ex: AIzaSyBVeXlhzUFXEqKoUKTRWSzsbbP5BInfbpo"
			help={
				<p>
					{__('Please create your own API key on the')}{' '}
					<a
						href="https://console.developers.google.com"
						target="_blank"
						rel="noreferrer"
					>
						{__('Google Console')}
					</a>{' '}
					{__('This is a requirement enforced by Google.')}
				</p>
			}
			value={gMap?.api_key}
			onChange={(value) => {
				const newSettings = {
					...options.wps_blocks_map,
					api_key: value ? value : '',
				};
				setOptions({
					...options,
					wps_blocks_map: newSettings,
				});
			}}
		/>
	);
};

export default MapSettings;
