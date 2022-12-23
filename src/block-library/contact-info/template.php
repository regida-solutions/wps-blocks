<?php
/**
 * Block template
 *
 * @package WpsWhatsappButton
 **/

declare( strict_types=1 );

namespace WPS\ContactInfo\Template;

use function WPS\Blocks\Helpers\ClassNames\get_names as get_names;

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

	$anchor = isset( $attributes['anchor'] ) ? ' id="' . $attributes['anchor'] . '"' : '';

	$options = apply_filters( 'wps_contact_info_block_items', $contact_options );

	ob_start();
	?>
	<div<?php echo $anchor; //phpcs:ignore ?> class="<?php echo esc_attr( $classes ); ?>">
		<ul class="wps-contact-info__list">
		<?php foreach ( $options as $key => $item ) : ?>
			<?php
			$option = get_option( $key );

			if ( ! $option ) {
				if ( is_user_logged_in() ) {
					echo 'The option: ' . esc_attr( $key ) . ' is not set';
				}
			} else {

				if ( isset( $item['type'] ) && 'number' === $item['type'] ) {
					$option = preg_replace( '/[^0-9_+-]/', '', $option );
					$href   = 'tel:' . $option;
				} elseif ( isset( $item['type'] ) && 'email' === $item['type'] ) {
					$href = 'mailto:' . $option;
				} else {
					$href = $option;
				}

				if ( isset( $item['alt'] ) && 'whatsapp' === $item['alt'] ) {
					$href = 'https://wa.me/' . $option . '?text=Hello';
				}

				echo sprintf('<li class="%1$s">%3$s%2$s%4$s</li>',
					esc_attr(get_names( [
						'wps-contact-info__list-item',
						isset( $item['type'] ) ? esc_attr( $item['type'] ) : '',
						isset( $item['alt'] ) ? esc_attr( $item['alt'] ) : '',
					])),
					esc_attr( $option ),
					isset( $attributes['enableUrl'] ) && $attributes['enableUrl'] ? '<a href="' . esc_html( $href ) . '">' : '',//phpcs:ignore
					isset( $attributes['enableUrl'] ) && $attributes['enableUrl'] ? '</a>' : '',//phpcs:ignore
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
