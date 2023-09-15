/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
	BaseControl,
	RangeControl,
	PanelBody,
	TextControl,
	Disabled,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components';

import ServerSideRender from '@wordpress/server-side-render';

/**
 * External dependencies
 */
import classnames from 'classnames';

function Edit({ attributes, setAttributes }) {
	const { address = '', zoom = 1, height = 100, className = '' } = attributes;

	const classes = classnames(className, ['wps-gmaps']);

	return (
		<>
			<InspectorControls>
				<PanelBody>
					<BaseControl
						id="wps-gmaps-address"
						label={__('Address')}
						__nextHasNoMarginBottom={true}
					>
						<TextControl
							label={address}
							value={address}
							onChange={(value) =>
								setAttributes({ address: value })
							}
						/>
					</BaseControl>
					<BaseControl
						id="wps-gmaps-zoom"
						label={__('Zoom Level')}
						__nextHasNoMarginBottom={true}
					>
						<RangeControl
							beforeIcon="arrow-left-alt2"
							afterIcon="arrow-right-alt2"
							label={zoom}
							value={zoom}
							onChange={(value) => setAttributes({ zoom: value })}
							min={1}
							max={21}
						/>
					</BaseControl>
					<BaseControl
						id="wps-gmaps-height"
						label={__('Map Height')}
						__nextHasNoMarginBottom={true}
					>
						<NumberControl
							isShiftStepEnabled={true}
							onChange={(value) =>
								setAttributes({ height: value })
							}
							shiftStep={10}
							value={height}
						/>
					</BaseControl>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps({ classes })}>
				{!address && (
					<div className="wps-gmap-info">
						{__(
							'Click to edit the map, all settings are located in block settings (right sidebar).',
						)}
					</div>
				)}
				{address && (
					<Disabled>
						<ServerSideRender
							block="wps/gmap"
							attributes={{ ...attributes }}
						/>
					</Disabled>
				)}
			</div>
		</>
	);
}
export default Edit;
