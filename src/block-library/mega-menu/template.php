<?php
/**
 * Block template
 *
 * @package WPS_Blocks
 **/

declare( strict_types=1 );

namespace WPS\MegaMenu\Template;

use function WPS\Blocks\Helpers\ClassNames\get_names;

/**
 * Render callback template
 *
 * @param array  $attributes Block attributes.
 * @param string $blocks Inner blocks.
 */
function template( array $attributes, string $blocks ): string {

	$classes = [
		'wps-mega-menu',
		! empty( $attributes['align'] ) ? 'align' . $attributes['align'] : '',
		! empty( $attributes['className'] ) ? $attributes['className'] : '',
	];

	if ( isset( $attributes['anchor'] ) && ! empty( $attributes['anchor'] ) ) {
		$wrapper_attrs['id'] = esc_attr( $attributes['anchor'] );
	}

	if ( isset( $attributes['isTrigger'] ) && true === $attributes['isTrigger'] ) {
		$classes[] = 'wps-mega-menu-trigger';
		$wrapper_attrs['data-trigger'] = esc_attr( 'true' );
	} else {
		$classes[] = 'wps-mega-menu-content';
	}

	$content = sprintf( '<div class="wps-mega-menu__inner">%s</div>', $blocks );

	$wrapper_attrs['class'] = get_names( $classes );

	$wrapper_attributes = get_block_wrapper_attributes( $wrapper_attrs );

	return sprintf(
		'<div %s>%s</div>',
		$wrapper_attributes,
		$content
	);
}


/**
 * Callback function name
 *
 * @return string The template function name.
 **/
function block_frontend_template(): string {
	return __NAMESPACE__ . '\\template';
}
add_filter( 'render_callback_mega-menu', __NAMESPACE__ . '\\block_frontend_template' );
