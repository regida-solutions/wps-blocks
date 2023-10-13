<?php
/**
 * Block template
 *
 * @package WPS_Blocks
 **/

declare( strict_types=1 );

namespace WPS\Counter\Template;

use function WPS\Blocks\Helpers\ClassNames\get_names;

/**
 * Render callback template
 *
 * @param array  $attributes Block attributes.
 * @param string $blocks inner blocks.
 */
function template( array $attributes, string $blocks ): string {
	$classes = get_names( [
		'wps-counter',
	]);

	$wrapper_attrs = [
		'class' => $classes,
	];

	if ( isset( $attributes['anchor'] ) && ! empty( $attributes['anchor'] ) ) {
		$wrapper_attrs['id'] = esc_attr( $attributes['anchor'] );
	}

	if ( isset( $attributes['date'] ) && ! empty( $attributes['date'] ) ) {
		$wrapper_attrs['data-date'] = esc_attr( $attributes['date'] );
	}

	$wrapper_attributes = get_block_wrapper_attributes( $wrapper_attrs );

	// Find placeholders.
	$filtered_content = replace_placeholders( $blocks );

	return sprintf( '<div %s>%s</div>', $wrapper_attributes, $filtered_content );
}

/**
 * Replace placeholders with spans
 * {DAY} {HOUR} {MINUTE} {SECOND}
 *
 * @param string $blocks Content blocks.
 *
 * @return string
 */
function replace_placeholders( string $blocks ): string {
	$output = $blocks;

	$variables = [
		'months'          => "<span class='wps-counter-item wps-counter-months'></span>",
		'days'            => "<span class='wps-counter-item wps-counter-days'></span>",
		'days-difference' => "<span class='wps-counter-item wps-counter-days-difference'></span>",
		'hours'           => "<span class='wps-counter-item wps-counter-hours'></span>",
		'minutes'         => "<span class='wps-counter-item wps-counter-minutes'></span>",
		'seconds'         => "<span class='wps-counter-item wps-counter-seconds'></span>",
	];

	foreach ( $variables as $key => $value ) {
		$output = str_replace( '{' . strtoupper( $key ) . '}', $value, $output );
	}

	return $output;
}

/**
 * Callback function name
 *
 * @return string The template function name.
 **/
function block_frontend_template(): string {
	return __NAMESPACE__ . '\\template';
}

add_filter( 'render_callback_counter', __NAMESPACE__ . '\\block_frontend_template' );
