<?php
/**
 * Register Image shortcode
 *
 * @package WPS_Blocks
 */

declare( strict_types=1 );

namespace WPS\Blocks\Shortcode;

use function WPS\Blocks\Helpers\Image\render_image as render_image;

/**
 * Shortcode for outputting SSR images using gutenberg blocks
 *
 * @param  array $attributes Image id, size, classes and style.
 * @return string the image element.
 */
function ssr_image( array $attributes = [] ) : string {
	return render_image( $attributes );
}

add_shortcode( 'ssr_image', __NAMESPACE__ . '\\ssr_image' );
