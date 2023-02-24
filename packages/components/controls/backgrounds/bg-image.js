/**
 * Internal dependencies
 */
import { ImageUploaderUI } from './components/image-uploader-ui';

const BackgroundImage = (attributes) => {
	return (
		<div style={{ marginBottom: '16px' }}>
			{<ImageUploaderUI {...attributes} />}
		</div>
	);
};

export default BackgroundImage;
