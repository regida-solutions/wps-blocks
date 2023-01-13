<?php
/**
 * Block template
 *
 * @package WPS_Blocks
 **/

declare( strict_types=1 );

namespace WPS\Section\Template;

use function WPS\Blocks\Helpers\ClassNames\get_names as get_names;

/**
 * Render callback template
 *
 * @param array  $attributes Block attributes.
 * @param string $blocks inner blocks.
 */
function template( array $attributes, string $blocks ): string {

	$classes = get_names( [
		'wps-section',
		! empty( $attributes['className'] ) ? $attributes['className'] : '',
		! empty( $attributes['align'] ) ? 'align' . $attributes['align'] : '',
		! empty( $attributes['spacingVertical'] ) ? 'u-padding-vertical-' . $attributes['spacingVertical'] : '',
		! empty( $attributes['spacingVertical'] ) ? 'has-vertical-spacing' : '',
		! empty( $attributes['marginTop'] ) ? 'has-margin-top-' . esc_attr( $attributes['marginTop'] ) : '',
		! empty( $attributes['marginBottom'] ) ? 'has-margin-bottom-' . esc_attr( $attributes['marginBottom'] ) : '',
		! empty( $attributes['media']['url'] ) ? 'has-background' : ''
	] );

	$overlay_classes     = get_names( [
		'wps-section__overlay',
		! empty( $attributes['media']['url'] ) ? 'has-background' : '',
		! empty( $attributes['backgroundBehaviour'] ) ? 'background-is-' . esc_attr( $attributes['backgroundBehaviour'] ) : '',
		! empty( $attributes['backgroundColor'] ) && empty( $attributes['media']['url'] ) ? 'has-' . esc_attr( $attributes['backgroundColor'] ) . '-background-color' : '',
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

	$style_inner_class = 'wps-section__inner';
	if ( ! empty( $attributes['innerContentWidth'] ) ) {
		$style_inner_class .= ' align' . $attributes['innerContentWidth'];
	}

	$wrapper_attrs = [
		'class' => $classes,
	];

	if ( isset( $attributes['anchor'] ) && ! empty( $attributes['anchor'] ) ) {
		$wrapper_attrs['id'] = esc_attr( $attributes['anchor'] );
	}

	$wrapper_attributes = get_block_wrapper_attributes( $wrapper_attrs );

	ob_start();
	?>
	<div <?php echo $wrapper_attributes; //phpcs:ignore ?>>
		<?php if ( '' !== $style_overlay_items ) : ?>
		<div class="<?php echo esc_attr( $overlay_classes ); ?>" style="<?php echo esc_attr( $style_overlay_items ); ?>"></div>
		<?php endif; ?>
		<div class="<?php echo esc_attr( $style_inner_class ); ?>">
			<?php echo $blocks; //phpcs:ignore ?>
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
add_filter( 'render_callback_section', __NAMESPACE__ . '\\block_frontend_template' );
