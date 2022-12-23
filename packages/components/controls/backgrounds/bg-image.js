/**
 * Internal dependencies
 */
import { ImageUploaderUI } from './components/image-uploader-ui';

const BackgroundImage = (attributes) => {
	return (
		<div className="u-margin-bottom">
			{<ImageUploaderUI {...attributes} />}
		</div>
	);
};

export default BackgroundImage;
