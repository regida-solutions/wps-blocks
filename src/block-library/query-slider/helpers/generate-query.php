<?php
/**
 * Block template
 *
 * @package WPS_Blocks
 **/

declare( strict_types=1 );

namespace WPS\QuerySlider\Helper\GenerateQuery;

/**
 * Get query
 *
 * @param array $attributes Block attributes.
 */
function generate_query( array $attributes ):\WP_Query {

	$query_args = [
		'post_status'    => 'publish',
		'order'          => 'desc',
		'post_type'      => 'post',
		'posts_per_page' => 6,
		'orderby'        => 'date',
	];

	if ( ! empty( $attributes['query']['postType'] ) ) {
		$query_args['post_type'] = $attributes['query']['postType'];
	}

	if ( ! empty( $attributes['query']['postsPerPage'] ) ) {
		$query_args['posts_per_page'] = $attributes['query']['postsPerPage'];
	}

	if ( ! empty( $attributes['query']['orderBy'] ) ) {
		$query_args['orderby'] = $attributes['query']['orderBy'];
	}

	if ( ! empty( $attributes['query']['author'] ) ) {
		$query_args['author'] = $attributes['query']['author'];
	}

	if ( ! empty( $attributes['query']['perPage'] ) ) {
		$query_args['posts_per_page'] = $attributes['query']['perPage'];
	}

	/* Taxonomy query */
	if ( ! empty( $attributes['query']['taxQuery'] ) ) {
		$query_args['tax_query'] = [
			'relation' => 'AND'
		];
		foreach ($attributes['query']['taxQuery'] as $taxonomy => $terms) {
			$query_args['tax_query'][] = [
				'taxonomy' => $taxonomy,
				'field'    => 'term_id',
				'terms'    => $terms,
			];
		}

	}

	return new \WP_Query( $query_args );
}
