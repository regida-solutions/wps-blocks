<?php
/**
 * Setup plugin
 *
 * @package WpsBlocks
 */

declare( strict_types=1 );

namespace WPS\Blocks\Inc\SetupEditor;

add_filter( 'block_categories_all', __NAMESPACE__ . '\\filter_block_categories_when_post_provided', 10, 2 );

/**
 * Add custom block category to editor.
 *
 * @param array  $block_categories Current category array list.
 * @param object $editor_context Editor context.
 *
 * @return array
 */
function filter_block_categories_when_post_provided( array $block_categories, $editor_context ):array { //phpcs:ignore
	if ( ! empty( $editor_context->post ) ) {
		$block_categories[] = [
			'slug'  => 'wps-blocks',
			'title' => __( 'WPS Blocks', 'wps-blocks' ),
			'icon'  => null,
		];
	}
	return $block_categories;
}
