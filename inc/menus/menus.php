<?php
/**
 * Menus
 *
 * @package Tradies_Blocks
 */

declare( strict_types=1 );

namespace WPS\Blocks\Menus;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Silence is golden.' );
}

add_action( 'after_setup_theme', __NAMESPACE__ . '\\setup_menus' );

/**
 * Register theme menus
 */
function setup_menus(): void {

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus(
		[
			'wps-primary' => __( 'Primary Menu', 'wps-blocks' ),
		]
	);
}
