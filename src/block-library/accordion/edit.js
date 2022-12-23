/**
 * WordPress dependencies
 */
/**
 * WordPress dependencies
 */
import {
	InnerBlocks,
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';

import { PanelBody, ToggleControl, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
/**
 * External dependencies
 */
import classnames from 'classnames';

function Edit({ attributes, setAttributes }) {
	const INNER_BLOCKS_TEMPLATE = [
		['wps/accordion-item', { title: 'Accordion title' }],
		['wps/accordion-item', { title: 'Accordion title' }],
	];
	const INNER_BLOCKS_ALLOWED_BLOCKS = ['wps/accordion-item'];

	const { showMultiple, openFirst, marginTop, marginBottom, htmlTag } =
		attributes;

	const classes = classnames([
		marginTop ? `has-margin-top-${marginTop}` : '',
		marginBottom ? `has-margin-bottom-${marginBottom}` : '',
	]);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Settings')} initialOpen={true}>
					<ToggleControl
						label={__('Show multiple')}
						checked={showMultiple}
						onChange={() => {
							setAttributes({ showMultiple: !showMultiple });
						}}
					/>
					<ToggleControl
						label={__('Open first')}
						checked={openFirst}
						onChange={() => {
							setAttributes({ openFirst: !openFirst });
						}}
					/>
					<SelectControl
						label={__('Html Tag')}
						value={htmlTag}
						onChange={(value) => setAttributes({ htmlTag: value })}
						options={[
							{
								value: null,
								label: 'Default',
							},
							{ value: 'h2', label: 'H2' },
							{ value: 'h3', label: 'H3' },
							{ value: 'h4', label: 'H4' },
							{ value: 'h5', label: 'H5' },
						]}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps({ className: classes })}>
				<InnerBlocks
					template={INNER_BLOCKS_TEMPLATE}
					templateLock={false}
					allowedBlocks={INNER_BLOCKS_ALLOWED_BLOCKS}
				/>
			</div>
		</>
	);
}
export default Edit;
