<?php
/**
 * Block template
 *
 * @package CFS_Accommodation
 */

declare( strict_types=1 );

namespace WPS\Blocks\Gform\Template;

use function WPS\Blocks\Helpers\ClassNames\get_names;

/**
 * Render callback template
 *
 * @param array  $attributes Block attributes.
 * @param string $blocks inner blocks.
 * @return string
 */
function template( array $attributes, string $blocks ): string {

	$wrapper_attrs = [
		'class' => get_names( [
			'wps-gform',
			! empty( $attributes['align'] ) ? 'align' . $attributes['align'] : '',
			! empty( $attributes['className'] ) ? $attributes['className'] : '',
		]),
		'style' => '',
	];

	if ( isset( $attributes['anchor'] ) && ! empty( $attributes['anchor'] ) ) {
		$wrapper_attrs['id'] = esc_attr( $attributes['anchor'] );
	}

	if ( isset( $attributes['buttonBackgroundColor'] ) ) {
		$wrapper_attrs['style'] .= '--gf-button-background:' . esc_attr( $attributes['buttonBackgroundColor'] ) . ';';
	}

	if ( isset( $attributes['buttonHoverColor'] ) ) {
		$wrapper_attrs['style'] .= '--gf-button-background-h:' . esc_attr( $attributes['buttonHoverColor'] ) . ';';
	}

	if ( isset( $attributes['buttonTextColor'] ) ) {
		$wrapper_attrs['style'] .= '--gf-button-text:' . esc_attr( $attributes['buttonTextColor'] ) . ';';
	}

	if ( isset( $attributes['errorColor'] ) ) {
		$wrapper_attrs['style'] .= '--gf-error-color:' . esc_attr( $attributes['errorColor'] ) . ';';
	}

	if ( isset( $attributes['requiredColor'] ) ) {
		$wrapper_attrs['style'] .= '--gf-required-color:' . esc_attr( $attributes['requiredColor'] ) . ';';
	}

	$wrapper_attributes = get_block_wrapper_attributes( $wrapper_attrs );

	$content = sprintf( '<div class="wps-gform__inner">%s</div>', $blocks );

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
add_filter( 'render_callback_gform', __NAMESPACE__ . '\\block_frontend_template' );
