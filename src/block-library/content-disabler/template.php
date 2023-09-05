<?php
/**
 * Block template
 *
 * @package WPS_Blocks
 **/

declare( strict_types=1 );

namespace WPS\ContentDisabler\Template;

/**
 * Render callback template
 */
function template(): string {
	return '';
}

/**
 * Callback function name
 *
 * @return string The template function name.
 **/
function block_frontend_template(): string {
	return __NAMESPACE__ . '\\template';
}

add_filter( 'render_callback_content-disabler', __NAMESPACE__ . '\\block_frontend_template' );
