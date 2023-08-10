<?php
/**
 * Plugin Name: WPS Blocks
 * Plugin URI: https://wpshapers.com
 * Description: A set of blocks built to be used with wps-prime framework
 * Author: WPShapers
 * Author URI: https://wpshapers.com
 * Text Domain: wps-blocks
 * Version: 1.9.3
 *
 * @package WPS_Blocks
 */

declare( strict_types=1 );

namespace WPS\Blocks;

use function WPS\Blocks\Helpers\HasBlock\has_block_including_reusables as hbir;

define( 'WPS_BLOCKS_VERSION', '1.9.2' );
define( 'WPS_BLOCKS_DIR_PATH', plugin_dir_path( __FILE__ ) );
define( 'WPS_BLOCKS_DIR_URL', esc_url( plugin_dir_url( __FILE__ ) ) );
define( 'WPS_BLOCKS_UPDATE_URL', 'https://zsoltrevay.com/packages' );
define( 'WPS_BLOCKS_UPDATE_FOLDER', 'wps-blocks' );
define( 'WPS_BLOCKS_PLUGIN_SLUG', 'wps-blocks' );

add_action( 'init', __NAMESPACE__ . '\\register_blocks' );
add_filter( 'wps_allowed_block_types', __NAMESPACE__ . '\\allowed_block_types' );

require_once WPS_BLOCKS_DIR_PATH . '/inc/setup-updater.php';
require_once WPS_BLOCKS_DIR_PATH . '/inc/setup-assets.php';
require_once WPS_BLOCKS_DIR_PATH . '/inc/setup-editor.php';

/**
 * Remove hero block for now
 * 'hero',
 */

define( 'WPS_BLOCKS_LIST', [
	'shortcode',
	'section',
	'slider',
	'slider-slide',
	'media-slider',
	'media-slider-slide',
	'whatsapp-button',
	'contact-info',
	'grid',
	'grid-column',
	'card',
	'image-slider',
	'accordion',
	'accordion-item',
	'media-banner',
	'media-banner-content',
	'query-slider',
	'navigation',
]);

/* Load helpers */
require_once WPS_BLOCKS_DIR_PATH . '/helpers/helpers.php';

/* Load Patterns */
require_once WPS_BLOCKS_DIR_PATH . '/patterns/patterns.php';

/* Load image shortcode */
require_once WPS_BLOCKS_DIR_PATH . '/shortcodes/image.php';

/* Load menus */
require_once __DIR__ . '/inc/menus/menus.php';

/* Load Settings */
require_once __DIR__ . '/inc/settings/settings.php';

/**
 * Load all templates
 */
$blocks = WPS_BLOCKS_LIST;
foreach ( $blocks as $block ) {
	if ( file_exists( WPS_BLOCKS_DIR_PATH . 'src/block-library/' . $block . '/template.php' ) ) {
		include_once WPS_BLOCKS_DIR_PATH . 'src/block-library/' . $block . '/template.php';
	}
}

/**
 * Setup allowed_block_types
 *
 * @param array $block_type_list The allowed blocks list definition.
 * @return array
 */
function allowed_block_types( array $block_type_list ): array {
	$blocks         = WPS_BLOCKS_LIST;
	$allowed_blocks = [];

	foreach ( $blocks as $block ) {
		$allowed_blocks[] = 'wps/' . $block;
	}
	return array_merge( $block_type_list, $allowed_blocks );
}


/**
 * Register blocks
 */
function register_blocks() {
	$blocks = WPS_BLOCKS_LIST;

	foreach ( $blocks as $block ) {

		$args = [];

		if ( file_exists( WPS_BLOCKS_DIR_PATH . 'src/block-library/' . $block . '/template.php' ) ) {
			$args['render_callback'] = apply_filters( 'render_callback_' . $block, 'return__false' );
		}

		$registered_block = register_block_type_from_metadata(
			WPS_BLOCKS_DIR_PATH . 'src/block-library/' . $block,
			$args
		);
	}
}

/**
 * Slider front end
 */
function front_end_assets() {
	if ( file_exists( WPS_BLOCKS_DIR_PATH . 'build/frontend.css' ) ) {
		wp_enqueue_style( 'wps-blocks-frontend', WPS_BLOCKS_DIR_URL . 'build/frontend.css', [], WPS_BLOCKS_VERSION );
	}

	if ( file_exists( WPS_BLOCKS_DIR_PATH . '/build/frontend.js' ) ) {
		wp_enqueue_script( 'wps-blocks-frontend', WPS_BLOCKS_DIR_URL . 'build/frontend.js', [ 'wps-slider-core' ], WPS_BLOCKS_VERSION, true );
	}

	if ( hbir( 'wps/slider' ) || hbir( 'wps/media-slider' ) || hbir( 'wps/image-slider' ) || hbir( 'wps/query-slider' ) ) {
		wp_enqueue_style( 'wps-slider-core' );
		wp_enqueue_script( 'wps-blocks-frontend' );
	}
}
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\front_end_assets' );


/**
 * Enqueue editor style for the WordPress editor.
 */
function editor_assets() {
	if ( file_exists( WPS_BLOCKS_DIR_PATH . 'build/editor.css' ) ) {
		wp_enqueue_style( 'wps-blocks-editor-css', esc_url( plugin_dir_url( __FILE__ ) ) . 'build/editor.css', [], WPS_BLOCKS_VERSION );
	}

	if ( file_exists( WPS_BLOCKS_DIR_PATH . 'build/editor.js' ) ) {
		wp_enqueue_script( 'wps-blocks-editor-js', esc_url( plugin_dir_url( __FILE__ ) ) . 'build/editor.js', [], WPS_BLOCKS_VERSION, true );
	}
}

add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\editor_assets' );
