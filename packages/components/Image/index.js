/**
 * WordPress dependencies
 */
/**
 * WordPress dependencies
 */
import {
	MediaUpload,
	MediaUploadCheck,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import { Button, FocalPointPicker, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ServerSideRender from '@wordpress/server-side-render';
import { dispatch } from '@wordpress/data';

function Image({
	attributes = {},
	setAttributes,
	isSelected = false,
	hasCaption = false,
	featured = false,
	focus = true,
	video = false,
	label = __('Add image', 'wps-prime'),
}) {
	if (video) {
		label = __('Add video', 'wps-prime');
	}
	const { media, focalPoint = { x: 0.5, y: 0.5 }, caption } = attributes;
	const setMedia = (newMedia) => {
		const simplifiedMediaData = {
			id: newMedia.id,
			url: newMedia.url,
			alt: newMedia.alt,
		};
		setAttributes({
			media: simplifiedMediaData,
			caption: newMedia.description,
		});
		if (featured) {
			dispatch('core/editor').editPost({
				featured_media: newMedia.id,
			});
		}
	};

	let shortcode = '';

	if (media) {
		shortcode += '[ssr_image ';
		if (typeof media.id !== 'undefined') {
			shortcode += `id="${media.id}" `;
		}
		if (typeof media.url !== 'undefined') {
			shortcode += `url="${media.url}" `;
		}
		if (focus) {
			shortcode += `style="object-position: ${focalPoint.x * 100}% ${
				focalPoint.y * 100
			}%"`;
		}
		shortcode += ']';
	}
	return (
		<>
			{setAttributes && (
				<>
					<InspectorControls>
						<PanelBody title={__('Image settings', 'wps-prime')}>
							{media && (
								<>
									{focus && (
										<FocalPointPicker
											label={__(
												'Focal Point Picker',
												'wps-prime',
											)}
											url={media.url}
											value={focalPoint}
											onChange={(value) =>
												setAttributes({
													focalPoint: value,
												})
											}
										/>
									)}

									<MediaUploadCheck>
										<MediaUpload
											title={__(
												'Replace Image',
												'wps-prime',
											)}
											onSelect={setMedia}
											allowedTypes={
												video ? 'video' : 'image'
											}
											render={({ open }) => (
												<p>
													<Button
														onClick={open}
														isDefault
														isPrimary
														className="custom-media-inserter"
													>
														{__(
															'Replace Image',
															'wps-prime',
														)}
													</Button>
													<Button
														onClick={() =>
															setAttributes({
																media: false,
															})
														}
														className="custom-media-inserter"
													>
														{__(
															'Remove Image',
															'wps-prime',
														)}
													</Button>
												</p>
											)}
										/>
									</MediaUploadCheck>
								</>
							)}
						</PanelBody>
					</InspectorControls>
					{!media && (
						<MediaUploadCheck>
							<MediaUpload
								title={
									video
										? __('Add video', 'wps-prime')
										: __('Add image', 'wps-prime')
								}
								onSelect={setMedia}
								allowedTypes={video ? 'video' : 'image'}
								render={({ open }) => (
									<p>
										<Button
											onClick={open}
											icon="plus"
											className="add-button custom-media-inserter"
											label={__('Add image', 'wps-prime')}
											style={{
												border: '1px solid #ddd',
											}}
										>
											{label}
										</Button>
									</p>
								)}
							/>
						</MediaUploadCheck>
					)}
				</>
			)}

			{media && (
				<figure className="image-wrapper">
					<div className="image">
						{setAttributes && (
							<ServerSideRender
								block="wps/shortcode"
								attributes={{ shortcode }}
							/>
						)}
						{!setAttributes && shortcode}
						{isSelected && setAttributes && (
							<Button
								icon="dismiss"
								label={__('Remove image', 'wps-prime')}
								style={{ border: '1px solid #ddd' }}
								onClick={() => setAttributes({ media: false })}
								className="custom-media-inserter"
							/>
						)}
					</div>
					{hasCaption && setAttributes && (
						<RichText
							tagName="figcaption"
							className="caption"
							placeholder={__('Add caption …', 'wps-prime')}
							value={caption}
							onChange={(newCaption) =>
								setAttributes({ caption: newCaption })
							}
						/>
					)}
					{hasCaption && caption && !setAttributes && (
						<RichText.Content
							tagName="figcaption"
							className="caption"
							value={caption}
						/>
					)}
				</figure>
			)}
		</>
	);
}

export default Image;
