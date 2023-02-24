<?php
/**
 * Polylang helper functions
 *
 * @package WPS_Blocks
 */

declare( strict_types=1 );

namespace WPS\Blocks\Helpers\Polylang;

/**
 * Get the current language
 *
 * @param array $args Arguments :-).
 * @return string
 */
function get_current_language( array $args = [] ): string {

	if ( ! function_exists( 'pll_current_language' ) ) {
		return 'en';
	}

	$current_language = pll_current_language( 'slug' );

	if ( ! empty( $args ) && isset( $args['id'] ) && 0 !== $args['id'] ) {
		$current_language = pll_get_post_language( $args['id'] );
	}

	if ( 'string' !== gettype( $current_language ) ) {
		return 'en';
	}

	return $current_language;
}


/**
 * Get registered languages
 *
 * @param array $args Arguments.
 *
 * @return array
 */
function get_languages_list( array $args = [] ): array {
	if ( ! function_exists( 'pll_languages_list' ) ) {
		return [ 'en' ];
	}

	$default   = pll_default_language( 'slug' );
	$languages = pll_languages_list( [ 'fields' => 'slug' ] );

	if ( isset( $args['hideDefault'] ) && true === $args['hideDefault'] ) {
		return array_filter($languages, function( $language ) use ( $default ) { // phpcs:ignore
			return $language !== $default;
		});
	}

	return $languages;
}
