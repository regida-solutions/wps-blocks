/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

/**
 * External dependencies
 */
import classnames from 'classnames';

function Edit({ setAttributes, attributes }) {
	const { className = '', toggleButtonLocation = '' } = attributes;

	const classes = classnames([className]);

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Settings', 'wps-blocks')}
					initialOpen={true}
				>
					<TextControl
						label={__('Toggle target class', 'wps-blocks')}
						value={toggleButtonLocation}
						onChange={(value) =>
							setAttributes({ toggleButtonLocation: value })
						}
						help={__('ex: custom-mobile-toggle-position')}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps({ className: classes })}>Navigation</div>
		</>
	);
}
export default Edit;
