<?php
/**
 * Gravity Forms
 *
 * @package WPS_Blocks
 */

declare( strict_types=1 );

namespace WPS\Blocks\Inc\GravityForms;

add_filter( 'gform_confirmation', __NAMESPACE__ . '\\custom_confirmation', 10, 4 );

/**
 * Custom confirmation message
 *
 * @param string|array $confirmation Confirmation message.
 * @param array        $form         Form data.
 * @param array        $entry        Entry data.
 * @param bool         $ajax         Ajax.
 *
 * @return string|array
 */
function custom_confirmation( $confirmation, $form, $entry, $ajax ) { // phpcs:ignore

	// If is array means is a redirect and we only want custom message if is not a redirect.
	if ( is_array( $confirmation ) ) {
		return $confirmation;
	}

	$plugin_settings = get_option( 'wps_blocks_gravity_forms', [] );

	$test_flag = '<span class="plwrt-form-submit-success" style="display:none">Success</span>';

	if ( ! isset( $plugin_settings['form_ids'] ) || ! isset( $plugin_settings['confirmation_message'] ) ) {
		return $confirmation . $test_flag;
	}

	$apply = false;

	$content = ! empty( $plugin_settings['confirmation_message'] ) ? $plugin_settings['confirmation_message'] : '';

	if ( ! empty( $plugin_settings['form_ids'] ) && ! empty( $plugin_settings['confirmation_message'] ) ) {

		$form_ids = array_map( 'intval', explode( ',', $plugin_settings['form_ids'] ) );

		if ( in_array( $form['id'], $form_ids, true ) ) {
			$apply = true;
		}
	}

	if ( $apply ) {
		$confirmation = apply_filters( 'the_content', $content );
	}

	return $confirmation . $test_flag;
}
