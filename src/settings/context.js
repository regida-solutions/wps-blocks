/**
 * WordPress dependencies
 */
import api from '@wordpress/api';
import {
	useEffect,
	useState,
	createContext,
	useContext,
} from '@wordpress/element';

const PluginSettingsContext = createContext();

const PluginSettingsProvider = ({ children }) => {
	const [options, setOptions] = useState({});
	const [isAPISaving, setIsAPISaving] = useState(false);
	const [isAPILoaded, setIsAPILoaded] = useState(false);

	useEffect(() => {
		if (!api) {
			return;
		}
		/* Get wp options */
		api.loadPromise.then(async () => {
			const settings = new api.models.Settings();
			settings
				.fetch()
				.then((response) => {
					setOptions(response);
					setIsAPILoaded(true);
				})
				.catch((error) => {
					setIsAPILoaded(false);
					console.log(error); // eslint-disable-line no-console
				});
		});
	}, []);

	const updateOptionsAPI = () => {
		setIsAPISaving(true);

		const params = {
			wps_blocks_contact_info: options.wps_blocks_contact_info,
			wps_blocks_map: options.wps_blocks_map,
			wps_blocks_gravity_forms: options.wps_blocks_gravity_forms,
		};

		const settings = new api.models.Settings(params);

		settings.save().then((response) => {
			setOptions(response);
			setIsAPISaving(false);
		});
	};

	return (
		<PluginSettingsContext.Provider
			value={{
				options,
				setOptions,
				isAPISaving,
				isAPILoaded,
				setIsAPISaving,
				updateOptionsAPI,
			}}
		>
			{children}
		</PluginSettingsContext.Provider>
	);
};

const usePluginSettingsContext = () => {
	const context = useContext(PluginSettingsContext);
	if (!context) {
		throw new Error(
			'usePluginSettings must be used within a PluginSettingsProvider',
		);
	}
	return context;
};
export { usePluginSettingsContext, PluginSettingsProvider };
