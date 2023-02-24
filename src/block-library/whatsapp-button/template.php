<?php
/**
 * Block template
 *
 * @package WpsWhatsappButton
 **/

declare( strict_types=1 );

namespace WPS\WhatsappButton\Template;

use function WPS\Blocks\Helpers\ClassNames\get_names as get_names;
use function WPS\Blocks\Helpers\Icons\get_icon as get_icon;

/**
 * Render callback template
 *
 * @param array $attributes Block attributes.
 */
function template( array $attributes ): string {

	$classes = get_names( [
		'wps-whatsapp',
		'wp-block-button',
		isset( $attributes['justification'] ) ? 'is-aligned-' . $attributes['justification'] : false,
		! empty( $attributes['showOnLarge'] ) ? 'show-on-desktop' : false,
		! empty( $attributes['marginTop'] ) ? 'has-margin-top-' . esc_attr( $attributes['marginTop'] ) : '',
		! empty( $attributes['marginBottom'] ) ? 'has-margin-bottom-' . esc_attr( $attributes['marginBottom'] ) : '',
	]);

	/**
	 * Old settings used to be stored in theme settings.
	 * New settings live in plugin settings
	 *
	 * If we have settings we will use them instead of legacy settings.
	 * Settings are stored in one array in a single option field wps_blocks_contact_info
	 */
	$plugin_settings = get_option( 'wps_blocks_contact_info', [] );

	$phone                = isset( $plugin_settings['phone_nr_platform'] ) ? $plugin_settings['phone_nr_platform'] : get_option( 'wps_phone_nr_platform', false );
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

	$svg = get_icon( 'whatsapp' );

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
	<?php if ( ! $number && is_user_logged_in() ) : ?>
		<?php esc_html_e( 'Please set whatsapp phone number' ); ?>
	<?php else : ?>
		<a class="wps-whatsapp__link wp-block-button__link" href="<?php echo esc_url( $url ); ?>" target="_blank">
			<div class="wps-whatsapp__inner">
			<div class="wps-whatsapp__symbol"><?php echo $svg; //phpcs:ignore ?></div>
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
