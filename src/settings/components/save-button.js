/**
 * WordPress dependencies
 */
import { Button, Spinner } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { usePluginSettingsContext } from '../context';

const SaveButton = () => {
	const { isAPISaving, updateOptionsAPI } = usePluginSettingsContext();

	//Save settings
	const updateOptions = () => {
		updateOptionsAPI();
	};

	return (
		<div className="save-button-wrapper">
			<Button
				disabled={isAPISaving}
				isSecondary
				label="Save"
				onClick={updateOptions}
			>
				{isAPISaving && (
					<>
						Save <Spinner />
					</>
				)}
				{!isAPISaving && <>Save</>}
			</Button>
		</div>
	);
};

export default SaveButton;
