<?php
/**
 * Setup plugin assets
 *
 * @package WpsBlocks
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

	$script_deps_path    = WPS_BLOCKS_DIR_PATH . 'build/swiper/swiper-core.asset.php';
	$script_dependencies = file_exists( $script_deps_path ) ?
		include $script_deps_path :
		[
			'dependencies' => [],
			'version'      => '8.4.5',
		];

	if ( wp_script_is( 'wps-slider-core', 'registered' ) ) {
		return;
	} else {
		// SWIPER Slider Core.
		if ( file_exists( WPS_BLOCKS_DIR_PATH . 'build/swiper/swiper-core.js' ) ) {

			wp_register_script( 'wps-slider-core', WPS_BLOCKS_DIR_URL . 'build/swiper/swiper-core.js', $script_dependencies['dependencies'],
			$script_dependencies['version'], false );
		}
	}

	if ( wp_style_is( 'wps-slider-core', 'registered' ) ) {
		return;
	} else {

		if ( file_exists( WPS_BLOCKS_DIR_PATH . 'build/swiper/swiper-core.css' ) ) {
			// SWIPER Slider Core.
			wp_register_style( 'wps-slider-core', WPS_BLOCKS_DIR_URL . 'build/swiper/swiper-core.css', [], $script_dependencies['version'] );
		}
	}

}
