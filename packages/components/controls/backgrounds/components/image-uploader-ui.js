/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import {
	Button,
	FocalPointPicker,
	SelectControl,
	RangeControl,
} from '@wordpress/components';

export const ImageUploaderUI = (attributes) => {
	const defaultBehaviour = [
		{
			label: 'Cover (Default)',
			value: '',
		},
		{
			label: "Don't repeat",
			value: 'no-repeat',
		},
		{
			label: 'Repeat',
			value: 'repeat',
		},
		{
			label: 'Contain',
			value: 'contain',
		},
	];

	const {
		onUpdate = () => {},
		onRemove = () => {},
		onFocalChange = () => {},
		onBehaveChange = () => {},
		onRangeChange = () => {},
		media = {},
		video = false,
		focalPoint = {},
		behaviourSettings = false,
		rangeSettings = false,
		behaviourOptions = defaultBehaviour,
		behaviour = '',
		range = 100,
	} = attributes;

	const ALLOWED_MEDIA_TYPES = video ? ['video', 'image'] : ['image'];

	return (
		<>
			{media.hasOwnProperty('id') && (
				<>
					<FocalPointPicker
						label={__('Focal Point Picker', 'wps-prime')}
						url={media.url}
						value={
							!focalPoint.hasOwnProperty('x') ||
							!focalPoint.hasOwnProperty('y')
								? { x: 0.5, y: 0.5 }
								: focalPoint
						}
						onChange={onFocalChange}
					/>
					<MediaUploadCheck>
						<MediaUpload
							title={__('Replace Image', 'wps-prime')}
							onSelect={onUpdate}
							allowedTypes={ALLOWED_MEDIA_TYPES}
							render={({ open }) => (
								<p>
									<Button onClick={open} variant="secondary">
										{__('Replace Media', 'wps-prime')}
									</Button>
									<Button
										onClick={onRemove}
										isLink
										isDestructive
										style={{ marginLeft: '40px' }}
									>
										{__('Remove Media', 'wps-prime')}
									</Button>
								</p>
							)}
						/>
						{rangeSettings && (
							<RangeControl
								label={__('Opacity')}
								value={range}
								onChange={onRangeChange}
								min={0}
								max={100}
								step={10}
								required
							/>
						)}
						{behaviourSettings && (
							<SelectControl
								label="Background media behaviour"
								labelPosition="top"
								value={behaviour}
								options={behaviourOptions}
								onChange={onBehaveChange}
							/>
						)}
					</MediaUploadCheck>
				</>
			)}
			{!media.hasOwnProperty('id') && (
				<MediaUploadCheck>
					<MediaUpload
						title={__('Background media', 'image-selector-example')}
						onSelect={onUpdate}
						allowedTypes={ALLOWED_MEDIA_TYPES}
						render={({ open }) => (
							<>
								<Button
									className="editor-post-featured-image__button"
									onClick={open}
									isSecondary
								>
									{__('Add media', 'wps-gutenberg-blocks')}
								</Button>
							</>
						)}
					/>
				</MediaUploadCheck>
			)}
		</>
	);
};
