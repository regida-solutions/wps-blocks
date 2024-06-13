/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';

addFilter('blocks.registerBlockType', 'wps/blocks', function (settings, name) {
	if (name !== 'core/navigation') {
		return settings;
	}

	const newSettings = {
		...settings,
		allowedBlocks: [
			...settings.allowedBlocks,
			'core/paragraph',
			'core/columns',
		],
	};

	return newSettings;
});
