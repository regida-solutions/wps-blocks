/**
 * WordPress dependencies
 */
import ServerSideRender from '@wordpress/server-side-render';

function PreviewGallery({ images }) {
	if (images.length === 0) {
		return null;
	}

	const imageList = [];

	images.forEach((image, index) => {
		const shortcode = `[ssr_image id="${image}" class="wps-blocks-gallery-item__image" size="medium"]`;
		imageList.push(
			<div key={index} className="wps-blocks-gallery-item">
				<ServerSideRender
					block="wps/shortcode"
					attributes={{ shortcode }}
				/>
			</div>,
		);
	});

	return <div className="wps-blocks-gallery">{imageList}</div>;
}
export default PreviewGallery;
