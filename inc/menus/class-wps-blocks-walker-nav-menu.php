<?php
/**
 * Menu Walker
 *
 * @package Tradies_Blocks
 */

declare( strict_types=1 );

namespace WPS\Blocks\Menus\Walker;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Silence is golden.' );
}

/**
 * Custom walker class.
 */
class WPS_Blocks_Walker_Nav_Menu extends \Walker_Nav_Menu {

	/**
	 * Starts the list before the elements are added.
	 *
	 * @param string   $output Used to append additional content (passed by reference).
	 * @param int      $depth Depth of menu item. Used for padding.
	 * @param stdClass $args An object of wp_nav_menu() arguments.
	 *
	 * @see Walker::start_lvl()
	 */
	public function start_lvl( &$output, $depth = 0, $args = [] ) { //phpcs:ignore

		$indent = ( $depth > 0 ? str_repeat( "\t", $depth ) : '' ); // code indent
		// Build HTML for output.
		$output .= "\n" . $indent . '<ul>' . "\n";
	}
}
