/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import allowedBlocks from './allowed-blocks';

/**
 * External dependencies
 */
import { GetKeyByValue } from 'components/helpers';

function addAttributes(settings, name) {
	const currentBlock = GetKeyByValue(allowedBlocks, name, 'name');
	if (typeof currentBlock === 'undefined') {
		return settings;
	}

	settings.attributes = Object.assign(settings.attributes, {
		marginTop: {
			type: 'string',
		},
		marginBottom: {
			type: 'string',
		},
		paddingGeneral: {
			type: 'string',
		},
	});
	return settings;
}

addFilter(
	'blocks.registerBlockType',
	'wps/applyExtraSpacingAttributes',
	addAttributes,
);
