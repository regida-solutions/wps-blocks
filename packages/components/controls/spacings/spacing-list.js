/**
 * WordPress dependencies
 */
import { SelectControl } from '@wordpress/components';
/**
 * Internal dependencies
 */
import optionsList from './attributes.json';

const SpacingList = (attributes) => {
	const { value = '', onChange = () => {}, label = false } = attributes;

	return (
		<>
			<SelectControl
				label={label}
				labelPosition="top"
				value={value}
				options={optionsList.map((option) => {
					return { label: option.name, value: option.value };
				})}
				onChange={onChange}
			/>
		</>
	);
};

export default SpacingList;
