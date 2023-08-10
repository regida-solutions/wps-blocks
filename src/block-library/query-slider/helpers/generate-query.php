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
 *
 * @return array
 */
function generate_query( array $attributes ): array {

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

	// If is randomized ignore the posts per page.
	if ( isset( $attributes['randomize'] ) ) {
		$query_args['posts_per_page'] = -1;
	}

	/* Taxonomy query */
	if ( ! empty( $attributes['query']['taxQuery'] ) ) {

		// make sure the term array is not empty.
		$filtered = array_filter( $attributes['query']['taxQuery'] );
		if ( ! empty( $filtered ) ) {

			$query_args['tax_query'] = [
				'relation' => 'AND',
			];
			foreach ( $attributes['query']['taxQuery'] as $taxonomy => $terms ) {
				$query_args['tax_query'][] = [
					'taxonomy' => $taxonomy,
					'field'    => 'term_id',
					'terms'    => $terms,
				];
			}
		}
	}

	$query = new \WP_Query( $query_args );
	$posts = $query->posts;

	// If randomize is set, randomize the posts.
	if ( isset( $attributes['randomize'] ) ) {
		shuffle( $posts );
		// If posts per page are set, slice the array.
		if ( ! empty( $attributes['query']['postsPerPage'] ) ) {
			$posts = array_slice( $posts, 0, $attributes['query']['postsPerPage'] );
		}
	}

	return $posts;
}
