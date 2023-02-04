<?php
/**
 * Generate classnames
 *
 * @package WPS_Blocks
 **/

declare( strict_types=1 );

namespace WPS\Blocks\Helpers\ClassNames;

/**
 * Create a list of classes separated by space
 *
 * @param array $class_list String list array representing css classes.
 * @param bool  $start_space Add a space to the start of the string list.
 *
 * @return string
 */
function get_names( array $class_list, bool $start_space = false ): string {

	// Remove empty strings.
	$classes = array_filter( $class_list, fn( $value) => ! is_null( $value ) && '' !== $value );
	$start   = $start_space ? ' ' : '';

	if ( empty( $classes ) ) {
		return '';
	}

	// Remove duplicate classes and create list of classes separated by a space.
	$classes = array_unique( $classes );

	$classes = implode( ' ', $classes );
	return $start . $classes;
}

