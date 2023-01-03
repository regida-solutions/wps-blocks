# WPS BLOCKS
A set of gutenberg blocks for WordPress.
Contact info\
Grid\
Section\
Slider\
Image Slider (deprecated)\
Media Slider\
Query Slider \
Media Banner\
Whatsapp\
Card


### Requirements
NPM >= 18\
PHP >= 8\
Wordpress >= 6

### Installation
1. Clone this repo into your plugins directory
2. Run `npm install` to install all dependencies
3. Run `npm run build` to build the blocks

```npm install && npm run build```

### Note
In ``packages/components/compatibility/index.css``
are css definitions for spacing sizes & colors used in the blocks.\
The css properties contain fallback values and in order to match the current theme used by the website is possible to register in theme.json the values shown below, and then they will be used instead.\

### Example in theme.json
```json
"settings": {
	...,
	"color": {
		...,
		"palette": [
			{
				"color": "#ffffff",
				"name": "White",
				"slug": "base"
			},
			...,
		]
	},
	"spacing": {
		...,
		"spacingSizes": [
			{
				"name": "Reset",
				"slug": "reset",
				"size": "0"
			},
			{
				"name": "Tiny",
				"slug": "tiny",
				"size": "6px"
			},
			{
				"name": "Small",
				"slug": "small",
				"size": "12px"
			},
			{
				"name": "Normal",
				"slug": "normal",
				"size": "24px"
			},
			{
				"name": "Large",
				"slug": "large",
				"size": "60px"
			},
			{
				"name": "Huge",
				"slug": "huge",
				"size": "80px"
			}
		],
	}
}
```

## Available Filters
### Query Slider Filters

```php
/**
 * Item template
 *
 * @param string    $content Block content.
 * @param \WP_QUERY $slider_query Current Query.
 * @param array     $attributes Block attributes.
 *
 *  add_filter( 'query_slider_template', __NAMESPACE__ . '\\item_template', 10, 3 );
 */

/**
 * Slide template
 *
 * @param string $content Block content.
 * @param array  $attributes Block attributes.
 *
 * add_filter( 'query_slider_slide_template', __NAMESPACE__ . '\\item_template', 10, 2 );
 */


/**
* Change the slider slide template
*/
add_filter( 'query_slider_slide_template', 'slider_slide_template', 11, 2 );

/**
 * Slide template
 *
 * @param string $content Block content.
 * @param array  $attributes Block attributes.
 */
function slider_slide_template( $content, $attributes ){

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

	$image = '';

	$image_attributes = [
		'id'   => get_post_thumbnail_id( get_the_ID() ),
		'size' => 'large',
	];

	/* Possible to use built in image helper */
	if ( function_exists( '\WPS\Blocks\Helpers\Image\render_image' ) ) {
		$image = \WPS\Blocks\Helpers\Image\render_image( $image_attribute);
	}

	return sprintf(
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

}

/**
* Change the slider slide template using a Gutenberg Reusable block
* Create a gutenberg group block with the desired content and save it as a reusable block
* Use the Post blocks to automatically pick up the post id and render the correct content
* Then use the filter below to change the template
*/
function tradies_query_slider_slide_template( $content, $attributes ) {
		return sprintf('<div class="query-slider-wrapper"><div class="query-slider-container">%s</div></div>',
				apply_filters('the_content', '<!-- wp:block {"ref": 1308} -->')
		);
}
add_filter( 'query_slider_slide_template', 'tradies_query_slider_slide_template', 11, 2 );

```
#### Example



