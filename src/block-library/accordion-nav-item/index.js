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
import metadata from './block.json';

const { name } = metadata;

bootstrapServerSideBlockDefinitions({ [name]: metadata });

registerBlockType(name, {
	icon: {
		src: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
				<path d="M0 256C0 167.6 71.6 96 160 96h80c8.8 0 16 7.2 16 16s-7.2 16-16 16H160C89.3 128 32 185.3 32 256s57.3 128 128 128h80c8.8 0 16 7.2 16 16s-7.2 16-16 16H160C71.6 416 0 344.4 0 256zm576 0c0 88.4-71.6 160-160 160H336c-8.8 0-16-7.2-16-16s7.2-16 16-16h80c70.7 0 128-57.3 128-128s-57.3-128-128-128H336c-8.8 0-16-7.2-16-16s7.2-16 16-16h80c88.4 0 160 71.6 160 160zM152 240H424c8.8 0 16 7.2 16 16s-7.2 16-16 16H152c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
			</svg>
		),
	},
	edit,
	save,
});
