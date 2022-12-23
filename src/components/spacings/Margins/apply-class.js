/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * Internal dependencies
 */
import allowedBlocks from './allowed-blocks';
/**
 * External dependencies
 */
import { GetKeyByValue } from 'components/helpers';

/* Adjust the save.js part of block */
function applyExtraClass(extraProps, blockType, attributes) {
	const {
		marginTop = '',
		marginBottom = '',
		paddingGeneral = '',
	} = attributes;

	const currentBlock = GetKeyByValue(allowedBlocks, blockType.name, 'name');

	// Core
	if (typeof currentBlock !== 'undefined') {
		extraProps.className = classnames(
			extraProps.className,
			'' !== marginTop ? `has-margin-top-${marginTop}` : '',
			'' !== marginBottom ? `has-margin-bottom-${marginBottom}` : '',
			'' !== paddingGeneral
				? `has-padding-general-${paddingGeneral}`
				: '',
		);
	}
	return extraProps;
}

addFilter(
	'blocks.getSaveContent.extraProps',
	'wps/applyExtraSpacingSaveClass',
	applyExtraClass,
);

/* Adjust the edit.js part of block */
const withCustomAttributeClass = createHigherOrderComponent(
	(BlockListBlock) => (props) => {
		const currentBlock = GetKeyByValue(allowedBlocks, props.name, 'name');

		if (typeof currentBlock === 'undefined') {
			return <BlockListBlock {...props} />;
		}
		const { attributes = {} } = props;
		const {
			marginTop = '',
			marginBottom = '',
			paddingGeneral = '',
		} = attributes;

		const classNames = classnames(
			'' !== marginTop ? `has-margin-top-${marginTop}` : '',
			'' !== marginBottom ? `has-margin-bottom-${marginBottom}` : '',
			'' !== paddingGeneral
				? `has-padding-general-${paddingGeneral}`
				: '',
		);

		if (classNames) {
			return <BlockListBlock {...props} className={classNames} />;
		}
		return <BlockListBlock {...props} />;
	},
	'withCustomAttributeClass',
);

addFilter(
	'editor.BlockListBlock',
	'wps/applyExtraSpacingEditorClass',
	withCustomAttributeClass,
);
