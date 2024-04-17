/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';

const transforms = {
	to: [
		{
			type: 'block',
			blocks: ['wps/section'],
			transform(attributes, innerBlocks) {
				const { style = {}, spacingVertical = null } = attributes;
				const newAttributes = { ...attributes };

				if (spacingVertical) {
					let presetValue = null;

					if ('normal' === spacingVertical) {
						presetValue = 'medium';
					}

					const preset = {
						top: `var:preset|spacing|${presetValue}`,
						bottom: `var:preset|spacing|${presetValue}`,
					};

					newAttributes.style = {
						...style,
						spacing: { padding: preset },
					};
				}

				return createBlock('core/group', newAttributes, innerBlocks);
			},
		},
	],
};
export default transforms;
