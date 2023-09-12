<?php
/**
 * Block template
 *
 * @package WpsWhatsappButton
 **/

declare( strict_types=1 );

namespace WPS\ContactInfo\Template;

use function WPS\Blocks\Helpers\ClassNames\get_names;
use function WPS\Blocks\Helpers\Icons\get_icon;

/**
 * Render callback template
 *
 * @param array $attributes Block attributes.
 */
function template( array $attributes ): string {
	$classes = get_names( [
		'wps-contact-info',
		isset( $attributes['className'] ) ? esc_attr( $attributes['className'] ) : '',
		! empty( $attributes['enableIcon'] ) ? 'has-icon' : '',
		! empty( $attributes['enableUrl'] ) ? 'has-link' : '',
		! empty( $attributes['textAlign'] ) ? 'has-text-align-' . esc_attr( $attributes['textAlign'] ) : '',
	]);

	$contact_options = [];

	if ( isset( $attributes['showPhoneOne'] ) && $attributes['showPhoneOne'] ) {
		$contact_options['wps_phone_nr'] = [ 'type' => 'number' ];
	}
	if ( isset( $attributes['showPhoneTwo'] ) && $attributes['showPhoneTwo'] ) {
		$contact_options['wps_phone_nr_second'] = [ 'type' => 'number' ];
	}
	if ( isset( $attributes['showPhonePlatform'] ) && $attributes['showPhonePlatform'] ) {
		$contact_options['wps_phone_nr_platform'] = [
			'type' => 'number',
			'alt'  => 'whatsapp',
		];
	}
	if ( isset( $attributes['showEmailOne'] ) && $attributes['showEmailOne'] ) {
		$contact_options['wps_email_address'] = [ 'type' => 'email' ];
	}
	if ( isset( $attributes['showEmailTwo'] ) && $attributes['showEmailTwo'] ) {
		$contact_options['wps_email_address_second'] = [ 'type' => 'email' ];
	}

	$options = apply_filters( 'wps_contact_info_block_items', $contact_options );

	/**
	 * Old settings used to be stored in theme settings.
	 * New settings live in plugin settings
	 *
	 * If we have settings we will use them instead of legacy settings.
	 * Settings are stored in one array in a single option field wps_blocks_contact_info
	 * we need to map old settings to new settings
	 */
	$plugin_settings = get_option( 'wps_blocks_contact_info', [] );
	$settings        = [];
	if ( ! empty( $plugin_settings ) ) {
		// Map old settings to new settings.
		$settings = [
			'wps_phone_nr'             => isset( $plugin_settings['phone_nr'] ) ? $plugin_settings['phone_nr'] : '',
			'wps_phone_nr_second'      => isset( $plugin_settings['phone_nr_second'] ) ? $plugin_settings['phone_nr_second'] : '',
			'wps_phone_nr_platform'    => isset( $plugin_settings['phone_nr_platform'] ) ? $plugin_settings['phone_nr_platform'] : '',
			'wps_email_address'        => isset( $plugin_settings['email_address'] ) ? $plugin_settings['email_address'] : '',
			'wps_email_address_second' => isset( $plugin_settings['email_address_second'] ) ? $plugin_settings['email_address_second'] : '',
		];
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
		<ul class="wps-contact-info__list">
		<?php foreach ( $options as $key => $item ) : ?>
			<?php
			// Check settings first and then default back to legacy options.
			$option = ! empty( $settings[ $key ] ) ? $settings[ $key ] : get_option( $key );

			if ( ! $option ) {
				if ( is_user_logged_in() ) {
					echo 'The option: ' . esc_attr( $key ) . ' is not set';
				}
			} else {

				if ( isset( $item['type'] ) && 'number' === $item['type'] ) {
					$option_sanitized = preg_replace( '/[^0-9+]/', '', $option );
					$href             = 'tel:' . $option_sanitized;
				} elseif ( isset( $item['type'] ) && 'email' === $item['type'] ) {
					$href = 'mailto:' . $option;
				} else {
					$href = $option;
				}

				if ( isset( $item['alt'] ) && 'whatsapp' === $item['alt'] ) {
					$href = 'https://wa.me/' . $option . '?text=Hello';
				}

				$type     = isset( $item['type'] ) ? $item['type'] : '';
				$alt      = isset( $item['alt'] ) ? $item['alt'] : '';
				$has_icon = isset( $attributes['enableIcon'] ) && $attributes['enableIcon'];
				$has_link = isset( $attributes['enableUrl'] ) && $attributes['enableUrl'];

				$icon = '';

				if ( $type && ! $alt ) {
					$icon = get_icon( $type );
				} elseif ( $alt ) {
					$icon = get_icon( $alt );
				}

				printf('<li class="%1$s">%5$s%3$s%2$s%4$s</li>',
					esc_attr(get_names( [
						'wps-contact-info__list-item',
						$type,
						$alt,
						$has_icon ? 'has-icon' : '',
					])),
					esc_attr( $option ),
					$has_link ? '<a href="' . esc_html( $href ) . '">' : '',//phpcs:ignore
					$has_link ? '</a>' : '',//phpcs:ignore
					$has_icon && $icon ? $icon : '',//phpcs:ignore
				);
			}
			?>
		<?php endforeach; ?>
		</ul>
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
add_filter( 'render_callback_contact-info', __NAMESPACE__ . '\\block_frontend_template' );
