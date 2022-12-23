/**
 * WordPress dependencies
 */
import { select } from '@wordpress/data';
import { FontSizePicker } from '@wordpress/block-editor';
const FontSizeSelect = (attributes) => {
	const { value = '', onChange = () => {} } = attributes;

	const fontSizeList = select('core/block-editor').getSettings().fontSizes;
	return (
		<>
			<FontSizePicker
				fontSizes={fontSizeList}
				value={value}
				onChange={onChange}
				withReset={true}
			/>
		</>
	);
};

export default FontSizeSelect;
