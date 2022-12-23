<?php
/**
 * Block template
 *
 * @package WpsBlocks
 **/

declare( strict_types=1 );

namespace WPS\SliderSlide\Template;

use function WPS\Blocks\Helpers\ClassNames\get_names as get_names;

/**
 * Render callback template
 *
 * @param array  $attributes Block attributes.
 * @param string $blocks inner blocks.
 */
function template( array $attributes, string $blocks ): string {

	$classes = get_names( [
		'wps-slider-slide',
		'swiper-slide',
		! empty( $attributes['className'] ) ? $attributes['className'] : '',
	]);

	$classes_inner = get_names( [
		'wps-slider-slide__content',
	]);

	ob_start();
	?>
	<div class="<?php echo esc_attr( $classes ); ?>">
		<div class="<?php echo esc_attr( $classes_inner ); ?>">
		<?php if ( ! empty( $blocks ) ) : ?>
			<?php echo $blocks; //phpcs:ignore ?>
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
add_filter( 'render_callback_slider-slide', __NAMESPACE__ . '\\block_frontend_template' );
