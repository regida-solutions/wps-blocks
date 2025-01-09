/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { render } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { usePluginSettingsContext, PluginSettingsProvider } from './context';
import ContactInfoSettings from './components/contact-info-settings';
import MapSettings from './components/map-settings';
import GFSettings from './components/gravity-forms-settings';
import SaveButton from './components/save-button';

const Settings = () => {
	const { isAPISaving } = usePluginSettingsContext();

	return (
		<>
			<div className="status">
				Status: {isAPISaving ? 'Saving' : 'Loaded'}
			</div>
			<PanelBody initialOpen={true} title={__('Info settings')}>
				<div className="settings-panel-wrapper">
					<ContactInfoSettings />
					<MapSettings />
					<GFSettings />
				</div>
			</PanelBody>
			<SaveButton />
		</>
	);
};

const App = () => {
	return (
		<PluginSettingsProvider>
			<Settings />
		</PluginSettingsProvider>
	);
};

export default App;

document.addEventListener('DOMContentLoaded', () => {
	const htmlOutput = document.getElementById('wps-blocks-settings');

	if (htmlOutput) {
		render(<App />, htmlOutput);
	}
});
