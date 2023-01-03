<?php
/**
 * Query Slider Item template
 *
 * @package WPS_Blocks
 **/

declare( strict_types=1 );

namespace WPS\QuerySlider\Templates\TemplateDefault;

use function WPS\Blocks\Helpers\Image\render_image as render_image;

/**
 * Item template
 *
 * @param string    $content Block content.
 * @param \WP_QUERY $slider_query Current Query.
 * @param array     $attributes Block attributes.
 */
function item_template( string $content = '', \WP_QUERY $slider_query, array $attributes = [] ): string {

	// Create a WordPress loop using $slider query.
	while ( $slider_query->have_posts() ) {
		$slider_query->the_post();

		$image_attributes = [
			'id'   => get_post_thumbnail_id( get_the_ID() ),
			'size' => 'large',
		];

		$link_wrapper_start = '';
		$link_wrapper_end   = '';

		if ( isset( $attributes['enableLink'] ) && ! empty( $attributes['enableLink'] ) ) {
			$link_wrapper_start = '<a href="' . get_the_permalink() . '">';
			$link_wrapper_end   = '</a>';
		}

		$slide_content = sprintf(
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
			$link_wrapper_start . get_the_title() . $link_wrapper_end,
			get_the_excerpt()
		);

		$content .= sprintf(
			'<div class="swiper-slide">%s</div>',
			apply_filters( 'query_slider_slide_template', $slide_content, $attributes )
		);
	}

	return $content;
}

add_filter( 'query_slider_template', __NAMESPACE__ . '\\item_template', 10, 3 );

