<?php
/**
 * Block patterns
 *
 * @package WpsBlocks
 */

declare( strict_types=1 );

namespace WPS\Blocks\Patterns;

add_action( 'init', __NAMESPACE__ . '\\block_patterns' );


/**
 * Register block patterns
 */
function block_patterns() {
	if ( ! function_exists( 'register_block_pattern_category' ) ) {
		return;
	}

	register_block_pattern_category(
		'hero',
		[ 'label' => __( 'Hero', 'wps-blocks' ) ]
	);

	register_block_pattern(
		'wps-blocks/hero-pattern',
		[
			'title'       => __( 'Hero Pattern One', 'wps-blocks' ),
			'description' => __( 'Main hero text with subtext and two horizontal buttons', 'wps-blocks' ),
			'categories'  => [ 'hero' ],
			'content'     => "<!-- wp:wps/section {\"backgroundColor\":\"one\",\"textColor\":\"seven\",\"focalPoint\":{},\"media\":{},\"backgroundBehaviour\":\"\"} -->\n<!-- wp:columns {\"align\":\"wide\"} -->\n<div class=\"wp-block-columns alignwide\"><!-- wp:column {\"width\":\"61em\"} -->\n<div class=\"wp-block-column\" style=\"flex-basis:61em\"><!-- wp:heading {\"textColor\":\"seven\",\"fontSize\":\"large\"} -->\n<h2 class=\"has-seven-color has-text-color has-large-font-size\">A throug Energistically transition next-generation platforms through emerging e-services. </h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph {\"textColor\":\"seven\",\"fontSize\":\"heading3\"} -->\n<p class=\"has-seven-color has-text-color has-heading-3-font-size\">Collaboratively syndicate quality process improvements rather than plug-and-play ROI</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:buttons -->\n<div class=\"wp-block-buttons\"><!-- wp:button {\"className\":\"is-style-default is-color-white\"} -->\n<div class=\"wp-block-button is-style-default is-color-white\"><a class=\"wp-block-button__link\">Contact Us</a></div>\n<!-- /wp:button -->\n\n<!-- wp:button {\"className\":\"is-style-default is-color-white\"} -->\n<div class=\"wp-block-button is-style-default is-color-white\"><a class=\"wp-block-button__link\">Contact us now</a></div>\n<!-- /wp:button --></div>\n<!-- /wp:buttons --></div>\n<!-- /wp:column --></div>\n<!-- /wp:columns -->\n<!-- /wp:wps/section -->",
		]
	);
}
