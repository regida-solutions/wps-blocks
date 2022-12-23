/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { PanelBody } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

/**
 * External dependencies
 */
import { SpacingList } from 'components/controls';
import { GetKeyByValue } from 'components/helpers';
/**
 * Internal dependencies
 */
import allowedBlocks from './allowed-blocks';

/**
 * Add mobile visibility controls on Advanced Block Panel.
 *
 * @param {Function} BlockEdit Block edit component.
 * @return {Function} BlockEdit Modified block edit component.
 */
const withAdvancedControls = createHigherOrderComponent(
	(BlockEdit) => (props) => {
		const { attributes, setAttributes, isSelected } = props;

		const {
			marginTop = '',
			marginBottom = '',
			paddingGeneral = '',
		} = attributes;

		const currentBlock = GetKeyByValue(allowedBlocks, props.name, 'name');
		const settings =
			currentBlock && currentBlock.settings
				? {
						margin:
							typeof currentBlock.settings.margin !== 'undefined'
								? currentBlock.settings.margin
								: true,
						padding:
							typeof currentBlock.settings.padding !== 'undefined'
								? currentBlock.settings.padding
								: false,
				  }
				: { margin: true, padding: false };
		return (
			<>
				<BlockEdit {...props} />
				<InspectorControls>
					{isSelected && currentBlock && settings.margin && (
						<PanelBody title="Margins" initialOpen={false}>
							<SpacingList
								label={'Margin top'}
								value={marginTop}
								onChange={(value) =>
									setAttributes({ marginTop: value })
								}
							/>
							<SpacingList
								label={'Margin bottom'}
								value={marginBottom}
								onChange={(value) =>
									setAttributes({ marginBottom: value })
								}
							/>
						</PanelBody>
					)}
					{isSelected && currentBlock && settings.padding && (
						<PanelBody title="Paddings" initialOpen={false}>
							<SpacingList
								label={'Padding general'}
								value={paddingGeneral}
								onChange={(value) =>
									setAttributes({ paddingGeneral: value })
								}
							/>
						</PanelBody>
					)}
				</InspectorControls>
			</>
		);
	},
	'withAdvancedControls',
);

addFilter(
	'editor.BlockEdit',
	'wps/applyExtraSpacingCustomControl',
	withAdvancedControls,
);
