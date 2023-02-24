/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Spinner, Placeholder } from '@wordpress/components';

const Loader = ({ children, isLoaded = false }) => {
	return (
		<>
			{!isLoaded ? (
				<Placeholder label={__('Loading', 'confstack-agenda')}>
					<Spinner />
				</Placeholder>
			) : (
				children
			)}
		</>
	);
};

export default Loader;
