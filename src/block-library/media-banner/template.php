<?php
/**
 * Block template
 *
 * @package WPS_Block
 */

declare( strict_types=1 );

namespace WPS\MediaBanner\Template;

use function WPS\Blocks\Helpers\ClassNames\get_names as get_names;
use function WPS\Blocks\Helpers\Image\render_image as render_image;

/**
 * Render callback template
 *
 * @param array  $attributes Block attributes.
 * @param string $blocks inner blocks.
 */
function template( array $attributes, string $blocks ): string {

	$classes = get_names( [
		'media-banner',
		isset( $attributes['limitContentWidth'] ) ? 'media-banner--limit-width' : '',
		isset( $attributes['swapLayout'] ) && ! empty( $attributes['swapLayout'] ) ? 'media-banner--swap-layout' : '',
	] );

	$content_class = get_names( [
		'media-banner__content',
		isset( $attributes['paddingVertical'] ) || isset( $attributes['paddingHorizontal'] ) ? 'has-content-spacing' : '',
		isset( $attributes['paddingVertical'] ) ? 'has-padding-vertical-' . esc_attr( $attributes['paddingVertical'] ) : '',
		isset( $attributes['paddingHorizontal'] ) ? 'has-padding-horizontal-' . esc_attr( $attributes['paddingHorizontal'] ) : '',
	] );

	$wrapper_attrs = [
		'class' => $classes,
	];

	if ( isset( $attributes['anchor'] ) && ! empty( $attributes['anchor'] ) ) {
		$wrapper_attrs['id'] = esc_attr( $attributes['anchor'] );
	}

	if ( isset( $attributes['contentWidth'] ) && ! empty( $attributes['contentWidth'] ) ) {
		$wrapper_attrs['style'] = '--media-banner-content-width:' . esc_attr( $attributes['contentWidth'] ) . '%';
	}

	$wrapper_attributes = get_block_wrapper_attributes( $wrapper_attrs );
	get_block_wrapper_attributes( $wrapper_attrs );

	/* Background image */
	$background_image = '';
	if ( isset( $attributes['media'] ) && ! empty( $attributes['media'] ) ) {

		$media = $attributes['media'];

		if ( isset( $attributes['focalPoint']['x'] ) ) {
			$media['x'] = $attributes['focalPoint']['x'];
		}
		if ( isset( $attributes['focalPoint']['x'] ) ) {
			$media['y'] = $attributes['focalPoint']['y'];
		}
		if ( isset( $attributes['dimRatio'] ) ) {
			$media['style'] = 'opacity: ' . ( $attributes['dimRatio'] / 100 ) . ';';
		}

		$background_image = sprintf(
			'<div class="media-banner__background">%s</div>',
			render_image( $media )
		);
	}

	/* Background overlay */
	$background_overlay = '';
	if ( isset( $attributes['colorValue'] ) || isset( $attributes['gradientValue'] ) ) {
		! empty( $attributes['colorValue'] ) ? $background_color = $attributes['colorValue'] : $background_color = '';
		! empty( $attributes['gradientValue'] ) ? $gradient      = $attributes['gradientValue'] : $gradient = '';

		$background_overlay = sprintf(
			'<div class="media-banner__overlay" style="%s%s"></div>',
			$background_color ? 'background-color:' . $background_color . ';' : '',
			$gradient ? 'background-image:' . $gradient . ';' : ''
		);
	}

	/* Inner blocks */
	$content = $blocks;

	return sprintf(
		'<div %s>%s%s<div class="%s">%s</div></div>',
		$wrapper_attributes,
		$background_image,
		$background_overlay,
		$content_class,
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

add_filter( 'render_callback_media-banner', __NAMESPACE__ . '\\block_frontend_template' );

