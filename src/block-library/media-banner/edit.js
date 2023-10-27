/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	withColors,
} from '@wordpress/block-editor';

import { PanelBody, ToggleControl } from '@wordpress/components';
import { compose } from '@wordpress/compose';

/**
 * External dependencies
 */
import { BackgroundImage } from 'components/controls';
import classnames from 'classnames';

function Edit({ attributes, setAttributes }) {
	const INNER_BLOCKS_ALLOWED_BLOCKS = ['wps/media-banner-content'];

	const INNER_BLOCKS_TEMPLATE = [['wps/media-banner-content', {}]];

	const {
		className = '',
		media,
		focalPoint,
		backgroundBehaviour,
		dimRatio,
		swapLayout,
	} = attributes;

	const classes = classnames([
		className,
		'media-banner',
		swapLayout ? 'media-banner--swap-layout' : '',
	]);

	const classesBackground = classnames([
		'media-banner__background',
		media && media.hasOwnProperty('url') ? 'has-media-background' : '',
		backgroundBehaviour ? `background-is-${backgroundBehaviour}` : '',
	]);

	const mediaFocal =
		focalPoint?.x && focalPoint?.y ? focalPoint : { x: 0.5, y: 0.5 };

	const blocksProps = useBlockProps({ className: classes });
	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			templateLock: 'all',
			lock: { move: true, remove: true },
			template: INNER_BLOCKS_TEMPLATE,
			allowedBlocks: INNER_BLOCKS_ALLOWED_BLOCKS,
		},
	);

	const isVideo = (string) => {
		return string.includes('.mp4');
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Image')} initialOpen={true}>
					<BackgroundImage
						media={media}
						onUpdate={(image) =>
							setAttributes({
								media: {
									id: image?.id,
									sizeSlug: 'full',
									url: image?.url,
								},
							})
						}
						onRemove={() =>
							setAttributes({ media: {}, focalPoint: {} })
						}
						focalPoint={focalPoint}
						onFocalChange={(focalData) =>
							setAttributes({ focalPoint: focalData })
						}
						behaviour={backgroundBehaviour}
						behaviourSettings
						onBehaveChange={(value) =>
							setAttributes({ backgroundBehaviour: value })
						}
						rangeSettings
						range={dimRatio}
						onRangeChange={(newDimRation) => {
							setAttributes({ dimRatio: newDimRation });
						}}
						video={true}
					/>
					<ToggleControl
						label="Swap layout"
						checked={swapLayout}
						onChange={() => {
							setAttributes({
								swapLayout: !swapLayout,
							});
						}}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blocksProps}>
				{media ? (
					<div className={classesBackground}>
						{isVideo(media?.url) && (
							<div
								className="video_wrapper"
								style={{
									'--position-x': `${mediaFocal.x * 100}%`,
									'--position-y': `${mediaFocal.y * 100}%`,
									opacity:
										dimRatio !== 100 ? `${dimRatio}%` : '',
								}}
							>
								<video
									autoPlay
									muted
									loop
									playsInline
									src={media?.url}
								></video>
							</div>
						)}
						{!isVideo(media?.url) && (
							<img
								alt={media?.alt}
								src={media?.url}
								style={{
									objectPosition: `${mediaFocal.x * 100}% ${
										mediaFocal.y * 100
									}%`,
									opacity:
										dimRatio !== 100 ? `${dimRatio}%` : '',
								}}
							/>
						)}
					</div>
				) : (
					''
				)}
				<div {...innerBlocksProps} />
			</div>
		</>
	);
}
export default compose([
	withColors({
		textColor: 'color',
		backgroundColor: 'background-color',
	}),
])(Edit);
