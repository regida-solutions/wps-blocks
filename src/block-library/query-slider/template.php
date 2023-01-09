<?php
/**
 * Block template
 *
 * @package WPS_Blocks
 **/

declare( strict_types=1 );

namespace WPS\QuerySlider\Template;

use function WPS\Blocks\Helpers\ClassNames\get_names as get_names;

require_once __DIR__ . '/helpers/generate-query.php';
use function WPS\QuerySlider\Helper\GenerateQuery\generate_query as generate_query;

require_once __DIR__ . '/templates/template-default.php';

/**
 * Render callback template
 *
 * @param array $attributes Block attributes.
 */
function template( array $attributes ): string {

	$wrapper_attrs = [];

	$classes = apply_filters( 'wps_query_slider_template_class', [
		'wps-query-slider',
		'swiper',
		'has-template-default',
		! empty( $attributes['query']['postType'] ) ? 'post-type-' . $attributes['query']['postType'] : 'post-type-post',
		! empty( $attributes['className'] ) ? $attributes['className'] : '',
	]);

	if ( isset( $attributes['anchor'] ) && ! empty( $attributes['anchor'] ) ) {
		$wrapper_attrs['id'] = esc_attr( $attributes['anchor'] );
	}

	if ( isset( $attributes['loopSlides'] ) && ! empty( $attributes['loopSlides'] ) ) {
		$wrapper_attrs['data-loop'] = esc_attr( $attributes['loopSlides'] );
	}

	if ( isset( $attributes['speed'] ) && ! empty( $attributes['speed'] ) ) {
		$wrapper_attrs['data-speed'] = esc_attr( $attributes['speed'] );
	}

	if ( isset( $attributes['speed'] ) && ! empty( $attributes['speed'] ) ) {
		$wrapper_attrs['data-speed'] = esc_attr( (int) $attributes['speed'] );
	}

	if ( isset( $attributes['autoplay'] ) && ! empty( $attributes['autoplay'] ) ) {
		$wrapper_attrs['data-autoplay'] = esc_attr( $attributes['autoplay'] );
	}

	if ( isset( $attributes['delay'] ) && ! empty( $attributes['delay'] ) ) {
		$wrapper_attrs['data-delay'] = esc_attr( $attributes['delay'] );
	}

	if ( isset( $attributes['animationType'] ) && ! empty( $attributes['animationType'] ) ) {
		$wrapper_attrs['data-animation-type'] = esc_attr( $attributes['animationType'] );
	}

	if ( isset( $attributes['pagination'] ) && ! empty( $attributes['pagination'] ) ) {
		$wrapper_attrs['data-pagination'] = esc_attr( $attributes['pagination'] );
	}

	if ( isset( $attributes['hideNavigation'] ) && ! empty( $attributes['hideNavigation'] ) ) {
		$wrapper_attrs['data-hide-nav-arrows'] = esc_attr( $attributes['hideNavigation'] );
	}

	if ( isset( $attributes['slidesPerView'] ) && ! empty( $attributes['slidesPerView'] ) ) {
		$wrapper_attrs['data-slides-per-view'] = esc_attr( (int) $attributes['slidesPerView'] );

		$classes[] = (int) $attributes['slidesPerView'] > 1 ? 'has-multiple-per-view' : '';
		$classes[] = (int) $attributes['slidesPerView'] > 1 ? 'has-per-view-' . $attributes['slidesPerView'] : '';
	}

	if ( isset( $attributes['enableLink'] ) && ! empty( $attributes['enableLink'] ) ) {
		$classes[] = 'has-link-enabled';
	}

	$wrapper_attrs['class'] = get_names( $classes );
	$slider_query           = generate_query( $attributes );
	$slides                 = apply_filters( 'query_slider_template', $slider_query, $attributes, '' );

	return sprintf(
		'<div %s>' .
			'<div class="swiper-wrapper">' .
				'%s' .
			'</div>' .
			'%s' .
			'<div class="wps-slider-button-next swiper-button-next"></div><div class="wps-slider-button-prev swiper-button-prev"></div>' .
		'</div>',
		get_block_wrapper_attributes( $wrapper_attrs ),
		$slides,
		isset( $attributes['pagination'] ) && ! empty( $attributes['pagination'] ) ? '<div class="swiper-pagination"></div>' : ''
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
add_filter( 'render_callback_query-slider', __NAMESPACE__ . '\\block_frontend_template' );
