<?php
/**
 * Block template
 *
 * @package WPS_Blocks
 */

declare( strict_types=1 );

namespace WPS\ImageSlider\Template;

use function WPS\Blocks\Helpers\ClassNames\get_names;

/**
 * Render callback template
 *
 * @param array $attributes Block attributes.
 */
function template( array $attributes ): string {

	$classes = get_names( [
		'wps-image-slider',
		'swiper',
		! empty( $attributes['className'] ) ? $attributes['className'] : '',
		! empty( $attributes['align'] ) ? 'align' . $attributes['align'] : '',
	]);

	$anchor = isset( $attributes['anchor'] ) ? ' id="' . esc_attr( $attributes['anchor'] ) . '"' : '';

	$slider_config  = isset( $attributes['loopSlides'] ) ? ' data-loop="' . esc_attr( $attributes['loopSlides'] ) . '"' : '';
	$slider_config .= isset( $attributes['speed'] ) ? ' data-speed="' . esc_attr( (int) $attributes['speed'] ) . '"' : '';
	$slider_config .= isset( $attributes['autoplay'] ) ? ' data-autoplay="' . esc_attr( $attributes['autoplay'] ) . '"' : '';
	$slider_config .= isset( $attributes['delay'] ) ? ' data-delay="' . esc_attr( $attributes['delay'] ) . '"' : '';
	$slider_config .= isset( $attributes['animationType'] ) ? ' data-animation-type="' . esc_attr( $attributes['animationType'] ) . '"' : '';
	$slider_config .= isset( $attributes['pagination'] ) ? ' data-pagination="' . esc_attr( $attributes['pagination'] ) . '"' : '';

	$images = $attributes['galleryImageIds'] ?? [];

	if ( empty( $images ) ) {
		return '';
	}

	ob_start();
	?>
	<div class="<?php echo esc_attr( $classes ); ?>"<?php echo $anchor.$slider_config; //phpcs:ignore ?>>
		<div class="swiper-wrapper">
			<?php foreach ( $images as $image ) : ?>
				<div class="swiper-slide">
					<?php echo wp_get_attachment_image( $image, 'full' ); ?>
				</div>
			<?php endforeach; ?>
		</div>
		<?php if ( isset( $attributes['pagination'] ) ) : ?>
		<div class="wps-slider-pagination swiper-pagination"></div>
		<?php endif; ?>
		<div class="wps-slider-button-next swiper-button-next"></div>
		<div class="wps-slider-button-prev swiper-button-prev"></div>
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
add_filter( 'render_callback_image-slider', __NAMESPACE__ . '\\block_frontend_template' );
