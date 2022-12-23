/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText, URLPopover, URLInput } from '@wordpress/block-editor';
import { Button, ToggleControl } from '@wordpress/components';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useState } from '@wordpress/element';
// eslint-disable-next-line import/no-extraneous-dependencies
import { keyboardReturn, customLink } from '@wordpress/icons';

const Linkable = (attributes) => {
	const {
		text = false,
		onTextChange = () => {},
		isSelected = true,
		onURLChange = () => {},
		onSetTarget = () => {},
		buttonLink = '',
		className = false,
		innerClassName = '',
		target = false,
		placeholder = __('Add your text here!'),
	} = attributes;

	/* Popover state */
	const [openUtility, setOpenUtility] = useState(false);

	return (
		<div
			className={`wp-block-button-editor-wrapper ${
				buttonLink ? 'has-value-set' : ''
			}`}
		>
			<div className={`wp-block-button ${className}`}>
				{!attributes.children ? (
					<RichText
						className={`wp-block-button__link ${innerClassName}`}
						value={text}
						placeholder={placeholder}
						onChange={onTextChange}
						allowedFormats={[]}
						withoutInteractiveFormatting
					/>
				) : (
					<Button
						className="wp-block-button__is-opener"
						variant="link"
						isSmall
						onClick={() => setOpenUtility(!openUtility)}
					>
						{attributes.children}
					</Button>
				)}
			</div>
			{isSelected && (
				<>
					{!attributes.children && (
						<Button
							className="wp-block-button__is-opener"
							variant="link"
							icon={customLink}
							isSmall
							onClick={() => setOpenUtility(!openUtility)}
						>
							URL
						</Button>
					)}
					{openUtility && (
						<URLPopover
							onClose={() => setOpenUtility(!openUtility)}
						>
							<div className="block-editor-link-control">
								<div className="block-editor-link-control__search-input-wrapper">
									<form
										onSubmit={() =>
											setOpenUtility(!openUtility)
										}
									>
										<div className="block-editor-link-control__search-input">
											<URLInput
												className="block-editor-url-input__input"
												value={buttonLink}
												onChange={onURLChange}
												placeholder={__(
													'Enter address',
												)}
											/>
										</div>
										<div className="block-editor-link-control__search-actions">
											<Button
												icon={keyboardReturn}
												label={__('Apply')}
												type="submit"
											/>
										</div>
									</form>
									<div className="block-editor-link-control__settings">
										<ToggleControl
											label={__('Open in new tab')}
											checked={target}
											onChange={onSetTarget}
										/>
									</div>
								</div>
							</div>
						</URLPopover>
					)}
				</>
			)}
		</div>
	);
};
export default Linkable;
