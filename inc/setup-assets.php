<?php
/**
 * Setup plugin assets
 *
 * @package WPS_Blocks
 */

declare( strict_types=1 );

namespace WPS\Blocks\Inc\Assets;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Silence is golden.' );
}

add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\front_end_assets' );

/**
 * Enqueue scripts and styles for the client.
 */
function front_end_assets() {

	$script_dependencies = [
		'dependencies' => [],
		'version'      => '11.2.8',
	];

	if ( wp_script_is( 'wps-slider-core', 'registered' ) ) {
		return;
	}

	// SWIPER Slider Core.
	if ( file_exists( WPS_BLOCKS_DIR_PATH . 'inc/assets/swiper/swiper.min.js' ) ) {
		wp_register_script( 'wps-slider-core', WPS_BLOCKS_DIR_URL . 'inc/assets/swiper/swiper.min.js', $script_dependencies['dependencies'],
		$script_dependencies['version'], false );
	}

	if ( wp_style_is( 'wps-slider-core', 'registered' ) ) {
		return;
	} elseif ( file_exists( WPS_BLOCKS_DIR_PATH . 'inc/assets/swiper/swiper.min.css' ) ) {

			// SWIPER Slider Core.
			wp_register_style( 'wps-slider-core', WPS_BLOCKS_DIR_URL . 'inc/assets/swiper/swiper.min.css', [], $script_dependencies['version'] );
	}
}
