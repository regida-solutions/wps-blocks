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
				<path d="M152 0c-4.4 0-8 3.6-8 8s3.6 8 8 8h64V96.2C104.8 100.4 16 191.8 16 304c0 114.9 93.1 208 208 208s208-93.1 208-208c0-50.5-18-96.8-47.9-132.8l37.6-37.6c3.1-3.1 3.1-8.2 0-11.3s-8.2-3.1-11.3 0l-36.9 36.9c-36.1-37.2-86-61-141.4-63.1V16h64c4.4 0 8-3.6 8-8s-3.6-8-8-8H152zM32 304a192 192 0 1 1 384 0A192 192 0 1 1 32 304zm208-64V368c0 26.5 21.5 48 48 48s48-21.5 48-48V240c0-26.5-21.5-48-48-48s-48 21.5-48 48zm48-32c17.7 0 32 14.3 32 32V368c0 17.7-14.3 32-32 32s-32-14.3-32-32V240c0-17.7 14.3-32 32-32zM128.1 232.6c3.6-14.4 16.6-24.6 31.5-24.6c17.9 0 32.4 14.5 32.4 32.4v13c0 10-3.7 19.5-10.4 26.9L139 327.2c-17.4 19.1-27 44.1-27 70V408c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8s-3.6-8-8-8H128v-2.9c0-21.9 8.2-43 22.9-59.2l42.6-46.8c9.4-10.3 14.6-23.7 14.6-37.7v-13c0-26.7-21.7-48.4-48.4-48.4c-22.2 0-41.6 15.1-47 36.7l-.3 1.4c-1.1 4.3 1.5 8.6 5.8 9.7s8.6-1.5 9.7-5.8l.3-1.4z" />
			</svg>
		),
	},
	edit,
	save,
});
