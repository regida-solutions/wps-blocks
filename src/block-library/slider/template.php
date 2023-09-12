<?php
/**
 * Block template
 *
 * @package WPS_Blocks
 **/

declare( strict_types=1 );

namespace WPS\Slider\Template;

use function WPS\Blocks\Helpers\ClassNames\get_names;

/**
 * Render callback template
 *
 * @param array  $attributes Block attributes.
 * @param string $blocks inner blocks.
 */
function template( array $attributes, string $blocks ): string {

	$classes = get_names( [
		'wps-slider',
		'swiper',
		! empty( $attributes['align'] ) ? 'align' . $attributes['align'] : '',
		! empty( $attributes['verticalAlign'] ) ? 'has-vertical-align-' . $attributes['verticalAlign'] : '',
		! empty( $attributes['textAlign'] ) ? 'has-text-align-' . $attributes['textAlign'] : '',
		! empty( $attributes['marginTop'] ) ? 'has-margin-top-' . esc_attr( $attributes['marginTop'] ) : '',
		! empty( $attributes['marginBottom'] ) ? 'has-margin-bottom-' . esc_attr( $attributes['marginBottom'] ) : '',
		! empty( $attributes['className'] ) ? $attributes['className'] : '',
	]);

	$anchor = isset( $attributes['anchor'] ) ? ' id="' . esc_attr( $attributes['anchor'] ) . '"' : '';

	$slider_config  = isset( $attributes['loopSlides'] ) ? ' data-loop="' . esc_attr( $attributes['loopSlides'] ) . '"' : '';
	$slider_config .= isset( $attributes['speed'] ) ? ' data-speed="' . esc_attr( (int) $attributes['speed'] ) . '"' : '';
	$slider_config .= isset( $attributes['autoplay'] ) ? ' data-autoplay="' . esc_attr( $attributes['autoplay'] ) . '"' : '';
	$slider_config .= isset( $attributes['delay'] ) ? ' data-delay="' . esc_attr( $attributes['delay'] ) . '"' : '';
	$slider_config .= isset( $attributes['animationType'] ) ? ' data-animation-type="' . esc_attr( $attributes['animationType'] ) . '"' : '';
	$slider_config .= isset( $attributes['pagination'] ) ? ' data-pagination="' . esc_attr( $attributes['pagination'] ) . '"' : '';

	ob_start();
	?>
	<div<?php echo $anchor;//phpcs:ignore ?><?php echo $slider_config; //phpcs:ignore ?>class="<?php echo esc_attr( $classes ); ?>">
		<div class="swiper-wrapper">
			<?php if ( ! empty( $blocks ) ) : ?>
				<?php echo $blocks; //phpcs:ignore ?>
			<?php endif; ?>
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
add_filter( 'render_callback_slider', __NAMESPACE__ . '\\block_frontend_template' );
