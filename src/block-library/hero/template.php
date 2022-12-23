<?php
/**
 * Block template
 *
 * @package WpsBlocks
 **/

declare( strict_types=1 );

namespace WPS\Hero\Template;

use function WPS\Blocks\Helpers\ClassNames\get_names as get_names;

/**
 * Render callback template
 *
 * @param array  $attributes Block attributes.
 * @param string $blocks inner blocks.
 */
function template( array $attributes, string $blocks ): string {

	$x     = $attributes['focalPoint']['x'] ?? 0.5;
	$y     = $attributes['focalPoint']['y'] ?? 0.5;
	$align = isset( $attributes['align'] ) ? 'align' . $attributes['align'] : 'alignfull';

	$classes = get_names( [
		'wps-hero',
		$align,
		! empty( $attributes['className'] ) ? $attributes['className'] : '',
	]);

	$anchor = isset( $attributes['anchor'] ) ? ' id="' . $attributes['anchor'] . '"' : '';

	ob_start();
	?>
	<div<?php echo $anchor; //phpcs:ignore ?> class="<?php echo esc_attr( $classes ); ?>">
		<div class="wps-hero__inner">
			<div class="wps-hero__content">
				<div class="wps-hero__container">
				<?php if ( isset( $attributes['title'] ) ) : ?>
					<h2 class="wps-hero__title"><?php echo wp_kses_post( $attributes['title'] ); ?></h2>
				<?php endif; ?>
				<?php if ( isset( $attributes['subTitle'] ) ) : ?>
					<p><?php echo esc_html( $attributes['subTitle'] ); ?></p>
				<?php endif; ?>
					<?php echo wp_kses_post( $blocks ); ?>
				</div>
			</div>
			<div class="wps-hero__media">
			<?php if ( isset( $attributes['media'] ) ) : ?>
				<?php echo do_shortcode( '[ssr_image x="' . $x . '" y="' . $y . '" id="' . $attributes['media']['id'] . '"]' ); ?>
			<?php endif; ?>
			</div>
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
add_filter( 'render_callback_hero', __NAMESPACE__ . '\\block_frontend_template' );
