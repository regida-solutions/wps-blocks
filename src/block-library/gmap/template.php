<?php
/**
 * Block template
 *
 * @package WPS_Blocks
 */

declare( strict_types=1 );

namespace WPS\Blocks\Gmap\Template;

use function WPS\Blocks\Helpers\ClassNames\get_names;

/**
 * Render callback template
 *
 * @param array $attributes Block attributes.
 * @return string
 */
function template( array $attributes ): string {

	$wrapper_attrs = [
		'class' => get_names( [
			'wps-gmap',
			! empty( $attributes['align'] ) ? 'align' . $attributes['align'] : '',
			! empty( $attributes['className'] ) ? $attributes['className'] : '',
		]),
		'style' => '',
	];

	$plugin_settings = get_option( 'wps_blocks_map', [] );
	$api_key = isset( $plugin_settings['api_key'] ) ? $plugin_settings['api_key'] : '';

	if ( isset( $attributes['anchor'] ) && ! empty( $attributes['anchor'] ) ) {
		$wrapper_attrs['id'] = esc_attr( $attributes['anchor'] );
	}

	$wrapper_attributes = get_block_wrapper_attributes( $wrapper_attrs );

	$api_url = sprintf( 'https://www.google.com/maps/embed/v1/place?q=%s&maptype=roadmap&zoom=%s&key=%s',
		! empty( $attributes['address'] ) ? rawurlencode( $attributes['address'] ) : '',
		! empty( $attributes['zoom'] ) ? intval( $attributes['zoom'] ) : 1,
		$api_key,
	);

	$map = sprintf(
		'<iframe width="%s" height="%s" src="%s" frameborder="0"></iframe>',
		'100%',
		! empty( $attributes['height'] ) ? $attributes['height'] . 'px' : '300px',
		$api_url
	);

	$content = sprintf( '<div class="wps-gmap__inner">%s</div>', $map );

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
add_filter( 'render_callback_gmap', __NAMESPACE__ . '\\block_frontend_template' );
