/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import {
	PanelBody,
	SelectControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';

import {
	InnerBlocks,
	InspectorControls,
	store as blockEditorStore,
	useBlockProps,
} from '@wordpress/block-editor';

import { dispatch, useSelect } from '@wordpress/data';

/**
 * External dependencies
 */
import classnames from 'classnames';
import { isEmpty } from 'lodash';

const innerBlockName = 'wps/media-slider-slide';

const ALLOWED_BLOCKS = [innerBlockName];
const BLOCKS_TEMPLATE = [
	[innerBlockName, {}],
	[innerBlockName, {}],
	[innerBlockName, {}],
];

function Edit({ setAttributes, attributes, clientId }) {
	const {
		className,
		loopSlides,
		speed,
		delay,
		autoplay = true,
		animationType,
		pagination,
		aspectRatio,
		imageSize,
	} = attributes;

	const classes = classnames('wps-blocks-media-slider', className);

	const styles = {};

	if (!isEmpty(aspectRatio)) {
		styles['--aspect-ratio'] = aspectRatio;
	}

	const { imageSizeList, childBlocks } = useSelect((select) => {
		const { getSettings } = select(blockEditorStore);
		const children =
			select('core/block-editor').getBlocksByClientId(clientId)[0]
				.innerBlocks;

		const settings = getSettings();
		const { imageDimensions, imageSizes } = settings;

		const sizes = imageSizes.map(({ name, slug }) => {
			const height = imageDimensions[slug]?.height || '';
			const width = imageDimensions[slug]?.width || '';
			const dimension = height && width ? `(${width}x${height})` : '';

			return {
				value: slug,
				label:
					name === 'Full Size'
						? __('Full Size')
						: `${name} (${dimension})`,
			};
		});

		return { imageSizeList: sizes, childBlocks: children };
	}, []);

	const updateImageSize = (value) => {
		setAttributes({ imageSize: value });

		childBlocks.forEach(function (child) {
			dispatch('core/block-editor').updateBlockAttributes(
				child.clientId,
				{
					imageSize: value,
				},
			);
		});
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Settings', 'wps-blocks')}
					initialOpen={true}
				>
					<SelectControl
						label={__('Aspect ratio')}
						value={aspectRatio}
						onChange={(value) =>
							setAttributes({ aspectRatio: value })
						}
						options={[
							{ value: '16/9', label: '16:9' },
							{ value: '21/9', label: '21:9' },
							{ value: '4/3', label: '4:3' },
							{ value: '4/5', label: '4:5' },
							{ value: '2/3', label: '2:3' },
							{ value: '9/16', label: '9:16' },
						]}
					/>

					<SelectControl
						label={__('Image size')}
						value={imageSize}
						onChange={(value) => updateImageSize(value)}
						options={imageSizeList}
					/>

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

			<div {...useBlockProps({ className: classes, style: styles })}>
				<InnerBlocks
					template={BLOCKS_TEMPLATE}
					templateLock={false}
					allowedBlocks={ALLOWED_BLOCKS}
				/>
			</div>
		</>
	);
}
export default Edit;
