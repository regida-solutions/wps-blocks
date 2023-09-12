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
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="1em"
				viewBox="0 0 448 512"
			>
				<path d="M384 48c26.5 0 48 21.5 48 48V416c0 26.5-21.5 48-48 48H64c-26.5 0-48-21.5-48-48V96c0-26.5 21.5-48 48-48H384zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm96 128c0 4.4 3.6 8 8 8H360c4.4 0 8-3.6 8-8s-3.6-8-8-8H168c-4.4 0-8 3.6-8 8zm0 96c0 4.4 3.6 8 8 8H360c4.4 0 8-3.6 8-8s-3.6-8-8-8H168c-4.4 0-8 3.6-8 8zm0 96c0 4.4 3.6 8 8 8H360c4.4 0 8-3.6 8-8s-3.6-8-8-8H168c-4.4 0-8 3.6-8 8zM96 144a16 16 0 1 0 0 32 16 16 0 1 0 0-32zm16 112a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zM96 336a16 16 0 1 0 0 32 16 16 0 1 0 0-32z" />
			</svg>
		),
	},
	edit,
	save,
});
