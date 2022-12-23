<?php
/**
 * Block template
 *
 * @package WpsBlocks
 **/

declare( strict_types=1 );

namespace WPS\Shortcode\Template;

/**
 * Render callback template
 *
 * @param array $attributes Block attributes.
 */
function template( array $attributes ): string {
	return do_shortcode( $attributes['shortcode'] );
}

/**
 * Callback function name
 *
 * @return string The template function name.
 **/
function block_frontend_template(): string {
	return __NAMESPACE__ . '\\template';
}
add_filter( 'render_callback_shortcode', __NAMESPACE__ . '\\block_frontend_template' );
