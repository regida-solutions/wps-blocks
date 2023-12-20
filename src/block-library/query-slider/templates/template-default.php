<?php
/**
 * Query Slider Item template
 *
 * @package WPS_Blocks
 **/

declare( strict_types=1 );

namespace WPS\QuerySlider\Templates\TemplateDefault;

use function WPS\Blocks\Helpers\Image\render_image;

/**
 * Render callback template
 *
 * @param int   $post_id Post ID.
 * @param array $attributes Block attributes.
 */
function inner_content( int $post_id, array $attributes ): string {

	$image_attributes = [
		'id'   => get_post_thumbnail_id( $post_id ),
		'size' => 'large',
	];

	$link_wrapper_start = '';
	$link_wrapper_end   = '';

	if ( isset( $attributes['enableLink'] ) && ! empty( $attributes['enableLink'] ) ) {
		$link_wrapper_start = '<a href="' . get_the_permalink( $post_id ) . '">';
		$link_wrapper_end   = '</a>';
	}

	return sprintf(
		'<div class="query-slider-wrapper"><div class="query-slider-container"><div class="query-slider-media">%s</div>' .
		'<div class="query-slider-content">' .
		'<h4 class="query-slider__title">%s</h4>' .
		'<div class="query-slider__excerpt">%s</div>' .
		'</div></div></div>',
		$link_wrapper_start . render_image( $image_attributes ) . $link_wrapper_end,
		$link_wrapper_start . get_the_title( $post_id ) . $link_wrapper_end,
		get_the_excerpt( $post_id )
	);
}


/**
 * Item template
 *
 * @param array  $posts Current Query.
 * @param array  $attributes Block attributes.
 * @param string $content Block content.
 */
function item_template( array $posts, array $attributes = [], string $content = '' ): string {

	if ( empty( $posts ) ) {
		return '';
	}

	$count = 0;

	if ( isset( $attributes['multirow'] ) && ! empty( $attributes['multirow'] ) ) {

		$slide_content    = '';
		$items_per_column = isset( $attributes['multirowPerColumn'] ) ? (int) $attributes['multirowPerColumn'] : 3;

		foreach ( $posts as $post ) {

			if ( 0 === $count ) {
				$slide_content .= '<div class="swiper-slide">';
			}

			$slide_content .= inner_content( $post->ID, $attributes );

			if ( $count === $items_per_column - 1 ) {
				$slide_content .= '</div>';
				$count          = 0;
			} else {
				++$count;
			}
		}

		$content .= apply_filters( 'query_slider_slide_template', $slide_content, $attributes );

	} else {
		foreach ( $posts as $post ) {
			$content .= sprintf(
				'<div class="swiper-slide">%s</div>',
				apply_filters( 'query_slider_slide_template', inner_content( $post->ID, $attributes ), $attributes )
			);
		}
	}

	return $content;
}

add_filter( 'query_slider_template', __NAMESPACE__ . '\\item_template', 10, 3 );
