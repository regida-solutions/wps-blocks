/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import {
	PanelBody,
	BaseControl,
	ToggleControl,
	Button,
	SelectControl,
	TextControl,
} from '@wordpress/components';

import {
	MediaUpload,
	MediaUploadCheck,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */

import PreviewGallery from './components/preview-gallery';

/**
 * External dependencies
 */
import classnames from 'classnames';

function Edit({ setAttributes, attributes }) {
	const {
		className,
		galleryImageIds = [],
		loopSlides,
		speed,
		delay,
		autoplay = true,
		animationType,
		pagination,
	} = attributes;

	const ALLOWED_MEDIA_TYPES = ['image'];

	const classes = classnames('wps-blocks-image-slider', className);

	const instructions = (
		<p>
			{__(
				'To edit the featured gallery, you need permission to upload media.',
				'wps-blocks',
			)}
		</p>
	);

	return (
		<>
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
				<BaseControl className="wps-blocks-gallery-utility-wrapper">
					<div className="editor-post-image-slider">
						<MediaUploadCheck fallback={instructions}>
							<div className="editor-post-wps-blocks-image-slider__container">
								{!!galleryImageIds && (
									<PreviewGallery images={galleryImageIds} />
								)}
							</div>
							<MediaUpload
								title={__('Images', 'wps-blocks')}
								multiple
								onSelect={(images) =>
									setAttributes({
										galleryImageIds: images.map(
											(item) => item.id,
										),
									})
								}
								allowedTypes={ALLOWED_MEDIA_TYPES}
								render={({ open }) => (
									<Button
										onClick={open}
										isSecondary
										className="wps-blocks-gallery-utility__button"
									>
										{__('Add images', 'wps-blocks')}
									</Button>
								)}
								value={galleryImageIds}
							/>
						</MediaUploadCheck>
					</div>
				</BaseControl>
			</div>
		</>
	);
}
export default Edit;
