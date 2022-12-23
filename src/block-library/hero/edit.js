/**
 * WordPress dependencies
 */
import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { Image } from 'components';

function Edit({ attributes, setAttributes, isSelected }) {
	const { title, subTitle, className = '' } = attributes;

	const INNER_BLOCKS_TEMPLATE = [['core/buttons', {}]];
	const INNER_BLOCKS_ALLOWED_BLOCKS = ['core/buttons'];

	return (
		<div {...useBlockProps()}>
			<div className={`wps-hero ${className}`}>
				<div className="wps-hero__inner">
					<div className="wps-hero__content">
						<div className="wps-hero__container">
							<RichText
								tagName="h2"
								className="wps-hero__title"
								placeholder={__('Title', 'wps-blocks')}
								value={title}
								onChange={(value) =>
									setAttributes({ title: value })
								}
								allowedFormats={[
									'core/bold',
									'core/italic',
									'core/text-color',
								]}
							/>
							<RichText
								tagName="p"
								className="wps-hero__subtitle"
								placeholder={__('Subtitle', 'wps-blocks')}
								value={subTitle}
								onChange={(value) =>
									setAttributes({ subTitle: value })
								}
							/>
							<InnerBlocks
								template={INNER_BLOCKS_TEMPLATE}
								templateLock={false}
								allowedBlocks={INNER_BLOCKS_ALLOWED_BLOCKS}
							/>
						</div>
					</div>
					<div className="wps-hero__media">
						<Image
							className="wps-hero__image"
							attributes={attributes}
							setAttributes={setAttributes}
							isSelected={isSelected}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Edit;
