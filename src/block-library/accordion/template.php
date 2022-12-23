<?php
/**
 * Block template
 *
 * @package WpsBlocks
 **/

declare( strict_types=1 );

namespace WPS\Accordion\Template;

use function WPS\Blocks\Helpers\ClassNames\get_names as get_names;

/**
 * Render callback template
 *
 * @param array  $attributes Block attributes.
 * @param string $blocks inner blocks.
 */
function template( array $attributes, string $blocks ): string {

	$classes = get_names( [
		'wps-accordion',
		'accordion-container',
		! empty( $attributes['align'] ) ? 'align' . $attributes['align'] : '',
		! empty( $attributes['marginTop'] ) ? 'has-margin-top-' . esc_attr( $attributes['marginTop'] ) : '',
		! empty( $attributes['marginBottom'] ) ? 'has-margin-bottom-' . esc_attr( $attributes['marginBottom'] ) : '',
		! empty( $attributes['className'] ) ? $attributes['className'] : '',
	]);

	$anchor = isset( $attributes['anchor'] ) ? ' id="' . esc_attr( $attributes['anchor'] ) . '"' : '';

	$config  = isset( $attributes['openFirst'] ) ? ' data-open-first="' . esc_attr( $attributes['openFirst'] ) . '"' : '';
	$config .= isset( $attributes['showMultiple'] ) ? ' data-show-multiple="' . esc_attr( (bool) $attributes['showMultiple'] ) . '"' : '';

	ob_start();
	?>
	<div<?php echo $anchor; //phpcs:ignore?><?php echo $config; //phpcs:ignore ?> class="<?php echo esc_attr( $classes ); ?>">
		<?php if ( ! empty( $blocks ) ) : ?>
			<?php echo $blocks; //phpcs:ignore ?>
		<?php endif; ?>
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
add_filter( 'render_callback_accordion', __NAMESPACE__ . '\\block_frontend_template' );
