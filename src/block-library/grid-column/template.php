<?php
/**
 * Block template
 *
 * @package WPS_Blocks
 **/

declare( strict_types=1 );

namespace WPS\GridColumn\Template;

use function WPS\Blocks\Helpers\ClassNames\get_names as get_names;

/**
 * Render callback template
 *
 * @param array  $attributes Block attributes.
 * @param string $blocks inner blocks.
 */
function template( array $attributes, string $blocks ): string {

	$classes = get_names( [
		'wps-grid-column',
		! empty( $attributes['align'] ) ? 'align' . $attributes['align'] : '',
		! empty( $attributes['className'] ) ? $attributes['className'] : '',
		! empty( $attributes['paddingVertical'] ) ? 'u-padding-vertical-' . $attributes['paddingVertical'] : '',
		! empty( $attributes['width'] ) ? 'has-width-' . $attributes['width'] : '',
		! empty( $attributes['backgroundColor'] ) ? 'has-' . esc_attr( $attributes['backgroundColor'] ) . '-background-color' : '',
		! empty( $attributes['textColor'] ) ? 'has-' . esc_attr( $attributes['textColor'] ) . '-color' : '',
		! empty( $attributes['media']['url'] ) ? 'has-background' : '',
		! empty( $attributes['verticalAlign'] ) ? 'vertical-align-' . $attributes['verticalAlign'] : '',
	]);

	$overlay_classes     = get_names( [
		'wps-section__overlay',
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

	$wrapper_attrs = [
		'class' => $classes,
	];

	if ( isset( $attributes['anchor'] ) && ! empty( $attributes['anchor'] ) ) {
		$wrapper_attrs['id'] = esc_attr( $attributes['anchor'] );
	}

	if ( ! empty( $attributes['width'] ) ) {
		$wrapper_attrs['style'] = '--column-width:' . (int) $attributes['width'] . '%;';
	}

	$wrapper_attributes = get_block_wrapper_attributes( $wrapper_attrs );

	ob_start();
	?>
	<div <?php echo $wrapper_attributes; //phpcs:ignore ?>>
		<?php if ( '' !== $style_overlay_items ) : ?>
			<div class="<?php echo esc_attr( $overlay_classes ); ?>" style="<?php echo esc_attr( $style_overlay_items ); ?>"></div>
		<?php endif; ?>
		<div class="wps-grid-column__inner">
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
add_filter( 'render_callback_grid-column', __NAMESPACE__ . '\\block_frontend_template' );
