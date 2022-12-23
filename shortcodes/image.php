<?php
/**
 * Register Image shortcode
 *
 * @package WpsBlocks
 */

declare( strict_types=1 );

namespace WPS\Blocks\Shortcode;

use function WPS\Blocks\Helpers\ClassNames\get_names as get_names;

/**
 * Shortcode for outputting SSR images using gutenberg blocks
 *
 * @param  array $attributes Image id, size, classes and style.
 * @return string the image element.
 */
function ssr_image( array $attributes ) : string {

	$type = isset( $attributes['id'] ) ? wp_check_filetype( get_attached_file( $attributes['id'] ) )['type'] : '';

	if ( ! isset( $attributes['id'] ) && ! isset( $attributes['url'] ) ) {
		return '';
	}
	if ( empty( $type ) ) {
		$type             = '';
		$attributes['id'] = '';
	}

	if ( ! isset( $attributes['x'] ) ) {
		$x = 0.5;
		$y = 0.5;
	} else {
		$x = $attributes['x'];
		$y = $attributes['y'];
	}
	$html = '';

	$classes = get_names( [
		'wps-blocks-media',
		isset( $attributes['class'] ) ? esc_attr( $attributes['class'] ) : '',
	]);

	if ( strpos( $type, 'video' ) !== false ) {
		$html = '<video src="' . wp_get_attachment_url( $attributes['id'] ) . '" autoplay="autoplay" loop muted playsinline><source src="' . wp_get_attachment_url( $attributes['id'] ) . '" type="' . $type . '" /></video>';
	} else {
		if ( ! empty( $attributes['id'] ) ) {
			$html = wp_get_attachment_image( $attributes['id'], $attributes['size'] ?? 'huge', false, [
				'style' => 'object-position: ' . ( $x * 100 ) . '% ' . ( $y * 100 ) . '%',
				'class' => esc_attr( $classes ),
			] );
		} elseif ( ! empty( $attributes['url'] ) ) {
			$html = '<img src="' . $attributes['url'] . '" alt="" class="' . esc_attr( $classes ) . '" />';
		}
		if ( isset( $attributes['style'] ) ) {
			$html = substr_replace( $html, ' style="' . $attributes['style'] . '" ', 4, 1 );
		}
	}
	return $html;
}

add_shortcode( 'ssr_image', __NAMESPACE__ . '\\ssr_image' );
