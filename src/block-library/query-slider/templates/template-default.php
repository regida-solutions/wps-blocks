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

	// Create a WordPress loop using $slider query.
	foreach ( $posts as $post ) {

		$image_attributes = [
			'id'   => get_post_thumbnail_id( $post->ID ),
			'size' => 'large',
		];

		$link_wrapper_start = '';
		$link_wrapper_end   = '';

		if ( isset( $attributes['enableLink'] ) && ! empty( $attributes['enableLink'] ) ) {
			$link_wrapper_start = '<a href="' . get_the_permalink( $post->ID ) . '">';
			$link_wrapper_end   = '</a>';
		}

		$slide_content = '';

		if ( isset( $attributes['multirow'] ) && ! empty( $attributes['multirow'] ) ) {
			$items_per_column = isset( $attributes['multirowPerColumn'] ) ? (int) $attributes['multirowPerColumn'] : 3;

			// If the number of items per column is 3, then we need to subtract 1 from the total number of items per column.
			--$items_per_column;

			if ( 0 === $count ) {
				$slide_content .= '<div class="query-slider-wrapper"><div class="query-slider-container">';
			}

			$slide_content .= sprintf(
				'<div class="query-slider-media">%s</div>' .
				'<div class="query-slider-content">' .
				'<h4 class="query-slider__title">%s</h4>' .
				'<div class="query-slider__excerpt">%s</div>' .
				'</div>',
				$link_wrapper_start . render_image( $image_attributes ) . $link_wrapper_end,
				$link_wrapper_start . get_the_title( $post->ID ) . $link_wrapper_end,
				get_the_excerpt( $post->ID )
			);

			if ( $count === $items_per_column ) {
				$slide_content .= '</div></div>';
				$count          = 0;
			} else {
				++$count;
			}
		} else {
			$slide_content .= sprintf(
				'<div class="query-slider-wrapper">' .
				'<div class="query-slider-container">' .
				'<div class="query-slider-media">%s</div>' .
				'<div class="query-slider-content">' .
				'<h4 class="query-slider__title">%s</h4>' .
				'<div class="query-slider__excerpt">%s</div>' .
				'</div>' .
				'</div>' .
				'</div>',
				$link_wrapper_start . render_image( $image_attributes ) . $link_wrapper_end,
				$link_wrapper_start . get_the_title( $post->ID ) . $link_wrapper_end,
				get_the_excerpt( $post->ID )
			);
		}

		$content .= sprintf(
			'<div class="swiper-slide">%s</div>',
			apply_filters( 'query_slider_slide_template', $slide_content, $attributes )
		);
	}

	return $content;
}

add_filter( 'query_slider_template', __NAMESPACE__ . '\\item_template', 10, 3 );
