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
				viewBox="0 0 640 512"
			>
				<path d="M25.9 3.4C19-2 8.9-.8 3.4 6.1S-.8 23.1 6.1 28.6l608 480c6.9 5.5 17 4.3 22.5-2.6s4.3-17-2.6-22.5L25.9 3.4zM459.9 448H96c-17.7 0-32-14.3-32-32V135.4L32 110.2V416c0 35.3 28.7 64 64 64H500.4l-40.5-32zM544 32H139.6l40.5 32H544c17.7 0 32 14.3 32 32V376.6l32 25.3V96c0-35.3-28.7-64-64-64zM423.3 256l40.5 32H496c8.8 0 16-7.2 16-16s-7.2-16-16-16H423.3zM144 256c-8.8 0-16 7.2-16 16s7.2 16 16 16H257.2l-40.5-32H144zm160 96c-8.8 0-16 7.2-16 16s7.2 16 16 16h74.8l-40.5-32H304zm-160 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h96c8.8 0 16-7.2 16-16s-7.2-16-16-16H144z" />
			</svg>
		),
	},
	edit,
	save,
});
