<?php
/**
 * Block template
 *
 * @package WpsBlocks
 **/

declare( strict_types=1 );

namespace WPS\AccordionItem\Template;

use function WPS\Blocks\Helpers\ClassNames\get_names as get_names;

/**
 * Render callback template
 *
 * @param array  $attributes Block attributes.
 * @param string $blocks inner blocks.
 */
function template( array $attributes, string $blocks ): string {

	$classes = get_names( [ 'wps-accordion-item', 'ac' ] );

	$html_tag = $attributes['htmlTag'] ?? 'h5';
	$title    = $attributes['title'] ?? '';

	ob_start();
	?>
	<div class="<?php echo esc_attr( $classes ); ?>">
		<<?php echo esc_attr( $html_tag ); ?> class="wps-accordion-item-title ac-header">
			<button type="button" class="ac-trigger"><?php echo esc_html( $title ); ?></button>
		</<?php echo esc_attr( $html_tag ); ?>>
		<div class="wps-accordion-item-panel ac-panel">
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
add_filter( 'render_callback_accordion-item', __NAMESPACE__ . '\\block_frontend_template' );
