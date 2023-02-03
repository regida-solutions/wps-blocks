<?php
/**
 * Block template
 *
 * @package WPS_Block
 */

declare( strict_types=1 );

namespace WPS\MediaBannerContent\Template;

use function WPS\Blocks\Helpers\ClassNames\get_names as get_names;

/**
 * Render callback template
 *
 * @param array  $attributes Block attributes.
 * @param string $blocks inner blocks.
 */
function template( array $attributes, string $blocks ): string {

	$classes = get_names( [
		'media-banner-content',
		isset( $attributes['contentWidth'] ) ? 'has-width-' . esc_attr( $attributes['contentWidth'] ) : '',
		isset( $attributes['limitContentWidth'] ) ? 'media-banner-content--limit-width' : '',
	] );

	$inner_classes = get_names( [
		'media-banner-content__inner',
		isset( $attributes['paddingVertical'] ) || isset( $attributes['paddingHorizontal'] ) ? 'has-content-spacing' : '',
		isset( $attributes['paddingVertical'] ) ? 'has-padding-vertical-' . esc_attr( $attributes['paddingVertical'] ) : '',
		isset( $attributes['paddingHorizontal'] ) ? 'has-padding-horizontal-' . esc_attr( $attributes['paddingHorizontal'] ) : '',
	]);

	$style = '';

	if ( $attributes['contentWidth'] ) {
		$style .= '--media-banner-content-width:' . esc_attr( $attributes['contentWidth'] ) . '%;';
		$style .= $attributes['contentOffset'] ? '--media-banner-content-offset:' . $attributes['contentOffset'] . '%;' : '';
	}

	$wrapper_attrs = [
		'class' => $classes,
		'style' => $style,
	];

	$wrapper_attributes = get_block_wrapper_attributes( $wrapper_attrs );

	/* Inner blocks */
	$content = $blocks;

	return sprintf(
		'<div %s><div class="%s">%s</div></div>',
		$wrapper_attributes,
		$inner_classes,
		$content
	);
}

/**
 * Callback function name
 *
 * @return string The template function name.
 */
function block_frontend_template(): string {
	return __NAMESPACE__ . '\\template';
}

add_filter( 'render_callback_media-banner-content', __NAMESPACE__ . '\\block_frontend_template' );
