/**
 * WordPress dependencies
 */
import {
	InnerBlocks,
	useBlockProps,
	BlockControls,
	AlignmentControl,
	BlockVerticalAlignmentControl,
	InspectorControls,
} from '@wordpress/block-editor';

import {
	PanelBody,
	TextControl,
	ToggleControl,
	SelectControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import classnames from 'classnames';

function Edit({ attributes, setAttributes }) {
	const INNER_BLOCKS_TEMPLATE = [['wps/slider-slide', {}]];
	const INNER_BLOCKS_ALLOWED_BLOCKS = ['wps/slider-slide'];

	const {
		className = '',
		textAlign,
		verticalAlign,
		loopSlides,
		speed,
		delay,
		autoplay = true,
		animationType,
		pagination,
	} = attributes;

	const classes = classnames('wps-slider', className, {
		[`has-text-align-${textAlign}`]: textAlign,
		[`has-vertical-align-${verticalAlign}`]: verticalAlign,
	});

	return (
		<>
			<BlockControls group="block">
				<AlignmentControl
					value={textAlign}
					onChange={(value) => setAttributes({ textAlign: value })}
				/>
				<BlockVerticalAlignmentControl
					value={verticalAlign}
					onChange={(value) =>
						setAttributes({ verticalAlign: value })
					}
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody
					title={__('Settings', 'wps-blocks')}
					initialOpen={true}
				>
					<ToggleControl
						label="Loop slides continuously"
						checked={loopSlides}
						onChange={() => {
							setAttributes({ loopSlides: !loopSlides });
						}}
					/>
					<ToggleControl
						label="Pagination"
						checked={pagination}
						onChange={() => {
							setAttributes({ pagination: !pagination });
						}}
					/>
					<ToggleControl
						label="Autoplay"
						checked={autoplay}
						onChange={() => {
							setAttributes({ autoplay: !autoplay });
						}}
					/>
					<TextControl
						label={__(
							'Autoplay delay between slides transition',
							'wps-blocks',
						)}
						help={__(
							'In milliseconds (ms), default:3000. Works only if autoplay is enabled.',
							'wps-blocks',
						)}
						value={delay}
						onChange={(value) =>
							setAttributes({ delay: parseInt(value) })
						}
						type="number"
					/>
					<TextControl
						label={__(
							'Slides transition animation speed',
							'wps-blocks',
						)}
						help={__(
							'In milliseconds (ms), default:500',
							'wps-blocks',
						)}
						value={speed}
						onChange={(value) =>
							setAttributes({ speed: parseInt(value) })
						}
						type="number"
					/>
					<SelectControl
						label={__('Animation type')}
						value={animationType}
						onChange={(value) =>
							setAttributes({ animationType: value })
						}
						options={[
							{
								value: null,
								label: 'Default',
							},
							{ value: 'fade', label: 'Fade' },
							{ value: 'coverFlow', label: 'Cover' },
							{ value: 'flip', label: 'Flip' },
							{ value: 'cube', label: 'Cube' },
							{ value: 'creative', label: 'Creative' },
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
