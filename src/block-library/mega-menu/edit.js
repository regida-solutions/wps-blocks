/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';
import { ToggleControl, PanelBody } from '@wordpress/components';

/**
 * External dependencies
 */
import classnames from 'classnames';

function Edit({ attributes, setAttributes, className }) {
	const classes = classnames('wps-mega-menu', className);

	const { isTrigger = false } = attributes;
	const contentClass = isTrigger
		? 'wps-mega-menu-trigger'
		: 'wps-mega-menu__content';

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Settings')} initialOpen={true}>
					<ToggleControl
						label={__('This is a mega menu trigger button')}
						checked={isTrigger}
						onChange={() => {
							setAttributes({ isTrigger: !isTrigger });
						}}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps({ className: classes })}>
				<div className={contentClass}>
					<InnerBlocks templateLock={false} />
				</div>
			</div>
		</>
	);
}

export default Edit;
