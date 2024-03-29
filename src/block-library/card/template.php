<?php
/**
 * Block template
 *
 * @package WPS_Blocks
 **/

declare( strict_types=1 );

namespace WPS\Card\Template;

use function WPS\Blocks\Helpers\ClassNames\get_names;
use function WPS\Blocks\Shortcode\ssr_image;

/**
 * Render callback template
 *
 * @param array  $attributes Block attributes.
 * @param string $blocks inner blocks.
 */
function template( array $attributes, string $blocks ): string {
	$classes = get_names( [
		'wps-card',
		! empty( $attributes['className'] ) ? $attributes['className'] : '',
		! empty( $attributes['aspectRatio'] ) ? 'has-aspect-ratio' : '',
		! empty( $attributes['marginTop'] ) ? 'has-margin-top-' . esc_attr( $attributes['marginTop'] ) : '',
		! empty( $attributes['marginBottom'] ) ? 'has-margin-bottom-' . esc_attr( $attributes['marginBottom'] ) : '',
	] );

	$inner_classes = get_names( [
		'wps-card__content',
		! empty( $attributes['spacingGeneral'] ) ? 'has-content-spacing has-padding-general-' . $attributes['spacingGeneral'] : '',
	] );

	$shortcode = '';

	if ( isset( $attributes['media'] ) ) {

		$shortcode .= '[ssr_image';

		if ( isset( $attributes['media']['id'] ) ) {
			$shortcode .= ' id="' . $attributes['media']['id'] . '"';
		}

		if ( isset( $attributes['media']['url'] ) ) {
			$shortcode .= ' url="' . $attributes['media']['url'] . '"';
		}

		if ( isset( $attributes['focalPoint'] ) ) {
			$shortcode .= sprintf(
				' style="object-position:%s %s"',
				( $attributes['focalPoint']['x'] * 100 ) . '%',
				( $attributes['focalPoint']['x'] * 100 ) . '%'
			);
		}

		$shortcode .= ']';
	}

	$wrapper_attrs = [
		'class' => $classes,
	];

	if ( isset( $attributes['anchor'] ) && ! empty( $attributes['anchor'] ) ) {
		$wrapper_attrs['id'] = esc_attr( $attributes['anchor'] );
	}

	if ( isset( $attributes['aspectRatio'] ) && ! empty( $attributes['aspectRatio'] ) ) {
		$wrapper_attrs['style'] = sprintf( '--media-aspect-ratio:%s', $attributes['aspectRatio'] );
	}

	$wrapper_attributes = get_block_wrapper_attributes( $wrapper_attrs );

	ob_start();
	?>
	<div <?php echo $wrapper_attributes; //phpcs:ignore ?>>
		<?php if ( $shortcode ) : ?>
		<div class="wps-card__media">
			<?php echo do_shortcode( $shortcode ); ?>
		</div>
		<?php endif; ?>
		<div class="<?php echo esc_attr( $inner_classes ); ?>">
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
add_filter( 'render_callback_card', __NAMESPACE__ . '\\block_frontend_template' );
