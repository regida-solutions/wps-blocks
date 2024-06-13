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
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
				<path d="M64 48C37.5 48 16 69.5 16 96v80H496V96c0-26.5-21.5-48-48-48H64zM16 192V416c0 26.5 21.5 48 48 48H448c26.5 0 48-21.5 48-48V192H16zM0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM120 272H392c4.4 0 8 3.6 8 8s-3.6 8-8 8H120c-4.4 0-8-3.6-8-8s3.6-8 8-8zm0 96H392c4.4 0 8 3.6 8 8s-3.6 8-8 8H120c-4.4 0-8-3.6-8-8s3.6-8 8-8zM349 89.8l35 28 35-28c3.4-2.8 8.5-2.2 11.2 1.2s2.2 8.5-1.2 11.2l-40 32c-2.9 2.3-7.1 2.3-10 0l-40-32c-3.4-2.8-4-7.8-1.2-11.2s7.8-4 11.2-1.2z" />
			</svg>
		),
	},
	edit,
	save,
});
