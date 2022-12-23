<?php
/**
 * Block template
 *
 * @package WpsWhatsappButton
 **/

declare( strict_types=1 );

namespace WPS\WhatsappButton\Template;

use function WPS\Blocks\Helpers\ClassNames\get_names as get_names;

/**
 * Render callback template
 *
 * @param array  $attributes Block attributes.
 * @param string $blocks inner blocks.
 */
function template( array $attributes, string $blocks ): string {

	$classes = get_names( [
		'wps-whatsapp',
		isset( $attributes['justification'] ) ? 'is-aligned-' . $attributes['justification'] : false,
		! empty( $attributes['showOnLarge'] ) ? 'show-on-desktop' : false,
		! empty( $attributes['marginTop'] ) ? 'has-margin-top-' . esc_attr( $attributes['marginTop'] ) : '',
		! empty( $attributes['marginBottom'] ) ? 'has-margin-bottom-' . esc_attr( $attributes['marginBottom'] ) : '',
	]);

	$phone                = get_option( 'wps_phone_nr_platform', false );
	$default_phone_number = $phone ? $phone : false;
	$custom_phone_number  = isset( $attributes['customNumber'] ) ? $attributes['customNumber'] : false;
	$phone_number         = false;

	if ( $default_phone_number && ! $custom_phone_number ) {
		$phone_number = $default_phone_number;
	} elseif ( $custom_phone_number ) {
		$phone_number = $custom_phone_number;
	}

	$message = isset( $attributes['message'] ) ? $attributes['message'] : __( 'Hello', 'wps-blocks' );
	$number  = $phone_number ? preg_replace( '/[^0-9_+-]/', '', $phone_number ) : '';
	$url     = 'https://wa.me/' . $number . '?text=' . rawurlencode( $message );

	$anchor = isset( $attributes['anchor'] ) ? ' id="' . $attributes['anchor'] . '"' : '';

	ob_start();
	?>
	<div<?php echo $anchor; //phpcs:ignore ?> class="<?php echo esc_attr( $classes ); ?>">
	<?php if ( ! $number && is_user_logged_in() ) : ?>
		<?php esc_html_e( 'Please set whatsapp phone number' ); ?>
	<?php else : ?>
		<a class="wps-whatsapp__link" href="<?php echo esc_url( $url ); ?>" target="_blank">
			<div class="wps-whatsapp__inner">
			<?php if ( ! empty( $blocks ) ) : ?>
			<div class="wps-whatsapp__symbol">
			<?php echo $blocks; //phpcs:ignore ?>
			</div>
			<?php endif; ?>
			<?php if ( isset( $attributes['label'] ) ) : ?>
			<div class="wps-whatsapp__text"><?php echo esc_attr( $attributes['label'] ); ?></div>
			<?php endif; ?>
			</div>
		</a>
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
add_filter( 'render_callback_whatsapp-button', __NAMESPACE__ . '\\block_frontend_template' );
