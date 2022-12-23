<?php
/**
 * Block template
 *
 * @package WpsBlocks
 **/

declare( strict_types=1 );

namespace WPS\MediaSlider\Slide\Template;

use function WPS\Blocks\Helpers\ClassNames\get_names as get_names;

/**
 * Render callback template
 *
 * @param array $attributes Block attributes.
 */
function template( array $attributes ): string {

	$classes = get_names( [
		'wps-media-slider-slide',
		'swiper-slide',
		! empty( $attributes['className'] ) ? $attributes['className'] : '',
	]);

	$classes_inner = get_names( [
		'wps-media-slider-slide__media',
	]);

	$x = $attributes['focalPoint']['x'] ?? 0.5;
	$y = $attributes['focalPoint']['y'] ?? 0.5;

	$image_size = isset( $attributes['imageSize'] ) ? $attributes['imageSize'] : 'full';

	ob_start();
	?>
	<div class="<?php echo esc_attr( $classes ); ?>">
		<div class="<?php echo esc_attr( $classes_inner ); ?>">
			<?php if ( isset( $attributes['media'] ) ) : ?>
				<?php echo do_shortcode( '[ssr_image x="' . $x . '" y="' . $y . '" id="' . $attributes['media']['id'] . '" size="' . $image_size . '"]' ); ?>
			<?php endif; ?>
		</div>
	</div>
	<?php
	return ob_get_clean();
}

/**
 * Callback function name
 *
 * @return string The template function name.
 **/
function block_frontend_template(): string {
	return __NAMESPACE__ . '\\template';
}
add_filter( 'render_callback_media-slider-slide', __NAMESPACE__ . '\\block_frontend_template' );
