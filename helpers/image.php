<?php
/**
 * Generate Image
 *
 * @package WPS_Blocks
 **/

declare( strict_types=1 );

namespace WPS\Blocks\Helpers\Image;

use function WPS\Blocks\Helpers\ClassNames\get_names as get_names;

/**
 * Image generation helper
 *
 * @param  array $attributes Image id, size, classes and style.
 * @return string the image element.
 */
function render_image( array $attributes = [] ): string {

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

	$object_position = 'object-position: ' . ( $x * 100 ) . '% ' . ( $y * 100 ) . '%;';

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
				'style' => $object_position,
				'class' => esc_attr( $classes ),
			] );
		} elseif ( ! empty( $attributes['url'] ) ) {
			$html = '<img src="' . $attributes['url'] . '" alt="" class="' . esc_attr( $classes ) . '" />';
		}
		if ( isset( $attributes['style'] ) ) {
			$html = substr_replace( $html, ' style="' . $object_position . $attributes['style'] . '" ', 4, 1 );
		}
	}
	return $html;
}
