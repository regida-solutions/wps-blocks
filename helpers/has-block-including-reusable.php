<?php
/**
 * Determines whether a $post or a string contains a specific block type
 *
 * @package WPS_Blocks
 **/

declare( strict_types=1 );

namespace WPS\Blocks\Helpers\HasBlock;

/**
 * Determines whether a $post or a string contains a specific block type,
 * including blocks that are included in reusable blocks.
 *
 * @param string                  $block_name Full Block type to look for.
 * @param int|string|WP_Post|null $post Optional. Post content, post ID, or post object. Defaults to global $post.
 *
 * @return bool Whether the post content contains the specified block.
 */
function has_block_including_reusables( string $block_name, $post = null ): bool { //phpcs:ignore

	if ( ! has_blocks( $post ) ) {
		return false;
	}

	$post = ( ! $post ) ? get_the_ID() : $post;

	if ( $post ) {

		// This is for regular blocks.
		if ( has_block( $block_name, $post ) ) {
			return true;
		}

		// This is for reusable blocks.
		if ( has_block( 'block', $post ) ) {

			$content = get_post_field( 'post_content', $post );
			$blocks  = parse_blocks( $content );

			if ( ! is_array( $blocks ) || empty( $blocks ) ) {
				return false;
			}

			if ( strpos( $block_name, '/' ) === false ) {
				$block_name = 'core/' . $block_name;
			}

			foreach ( $blocks as $block ) {
				if ( 'core/block' === $block['blockName'] && ! empty( $block['attrs']['ref'] ) ) {
					if ( has_block( $block_name, $block['attrs']['ref'] ) ) {
						return true;
					}
				}
			}
		}
	}
	return false;
}
