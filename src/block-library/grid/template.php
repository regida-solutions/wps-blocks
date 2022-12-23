<?php
/**
 * Block template
 *
 * @package WpsBlocks
 **/

declare( strict_types=1 );

namespace WPS\Grid\Template;

use function WPS\Blocks\Helpers\ClassNames\get_names as get_names;

/**
 * Render callback template
 *
 * @param array  $attributes Block attributes.
 * @param string $blocks inner blocks.
 */
function template( array $attributes, string $blocks ): string {

	/* Margins params are added via the theme editor.js HOC */
	$classes = get_names( [
		'wps-grid',
		! empty( $attributes['align'] ) ? 'align' . $attributes['align'] : '',
		! empty( $attributes['horizontalAlign'] ) ? 'horizontal-align-' . $attributes['horizontalAlign'] : '',
		! empty( $attributes['verticalAlign'] ) ? 'vertical-align-' . $attributes['verticalAlign'] : '',
		! empty( $attributes['className'] ) ? $attributes['className'] : '',
		! empty( $attributes['paddingVertical'] ) ? 'u-padding-vertical-' . $attributes['paddingVertical'] : '',
		! empty( $attributes['paddingHorizontal'] ) ? 'u-padding-horizontal-' . $attributes['paddingHorizontal'] : '',
		! empty( $attributes['fullHeight'] ) ? 'is-full-height' : '',
		! empty( $attributes['contentCenter'] ) ? 'is-content-center' : '',
		! empty( $attributes['backgroundColor'] ) ? 'has-' . esc_attr( $attributes['backgroundColor'] ) . '-background-color' : '',
		! empty( $attributes['textColor'] ) ? 'has-' . esc_attr( $attributes['textColor'] ) . '-color' : '',
		! empty( $attributes['media']['url'] ) ? 'has-background' : '',
		! empty( $attributes['columnGap'] ) ? 'column-gap-' . $attributes['columnGap'] : '',
		! empty( $attributes['columnPadding'] ) ? 'column-padding-' . $attributes['columnPadding'] : '',
		! empty( $attributes['columnAlign'] ) ? 'column-align' . $attributes['columnAlign'] : '',
		! empty( $attributes['columnEqualHeight'] ) ? 'column-equal-height' : '',
		! empty( $attributes['marginTop'] ) ? 'has-margin-top-' . esc_attr( $attributes['marginTop'] ) : '',
		! empty( $attributes['marginBottom'] ) ? 'has-margin-bottom-' . esc_attr( $attributes['marginBottom'] ) : '',
	]);

	$anchor = isset( $attributes['anchor'] ) ? ' id="' . esc_attr( $attributes['anchor'] ) . '"' : '';

	$overlay_classes     = get_names( [
		'wps-grid__overlay',
		! empty( $attributes['media']['url'] ) ? 'has-background' : '',
		! empty( $attributes['backgroundBehaviour'] ) ? 'background-is-' . esc_attr( $attributes['backgroundBehaviour'] ) : '',
	]);
	$style_overlay_items = '';
	if ( ! empty( $attributes['media']['url'] ) ) {
		$style_overlay_items .= 'background-image:url(' . $attributes['media']['url'] . ');';
	}

	if ( ! empty( $attributes['focalPoint']['x'] ) ) {
		$style_overlay_items .= 'background-position:' . ( $attributes['focalPoint']['x'] * 100 ) . '% ' . ( $attributes['focalPoint']['y'] * 100 ) . '%;';
	}

	if ( ! empty( $attributes['dimRatio'] ) ) {
		$style_overlay_items .= 'opacity:' . $attributes['dimRatio'] . '%;';
	}

	ob_start();
	?>
	<div<?php echo $anchor; //phpcs:ignore ?> class="<?php echo esc_attr( $classes ); ?>">
		<?php if ( '' !== $style_overlay_items ) : ?>
			<div class="<?php echo esc_attr( $overlay_classes ); ?>" style="<?php echo esc_attr( $style_overlay_items ); ?>"></div>
		<?php endif; ?>
		<div class="wps-grid__inner">
			<?php echo $blocks //phpcs:ignore ?>
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
add_filter( 'render_callback_grid', __NAMESPACE__ . '\\block_frontend_template' );
