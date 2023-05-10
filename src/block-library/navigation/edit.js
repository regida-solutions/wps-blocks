/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl } from '@wordpress/components';

/**
 * External dependencies
 */
import classnames from 'classnames';

function Edit({ setAttributes, attributes }) {
	const {
		className = '',
		toggleButtonLocation = '',
		displayBreakpoint = 1024,
	} = attributes;

	const classes = classnames(['wps-navigation', className]);

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
					<SelectControl
						label={__(
							'Switch to mobile menu breakpoint',
							'wps-blocks',
						)}
						value={displayBreakpoint}
						help={__(
							'ex: When choosing mobile menu breakpoint you need to add the same breakpoint value to the container ex. u-hide-portable',
						)}
						onChange={(value) =>
							setAttributes({
								displayBreakpoint: parseInt(value),
							})
						}
						options={[
							{ value: 1024, label: 'Mobile' },
							{ value: 1200, label: 'Portable' },
							{ value: 1600, label: 'Desktop' },
							{ value: 1920, label: 'Wide' },
						]}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps({ className: classes })}>
				<div className="wps-navigation__inner">Navigation</div>
			</div>
		</>
	);
}
export default Edit;
