/**
 * WordPress dependencies
 */
import {
	registerBlockType,
	unstable__bootstrapServerSideBlockDefinitions as bootstrapServerSideBlockDefinitions, // eslint-disable-line camelcase
} from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import transforms from './transforms';
import metadata from './block.json';

const { name } = metadata;

bootstrapServerSideBlockDefinitions({ [name]: metadata });
registerBlockType(name, {
	edit,
	save,
	transforms,
});
