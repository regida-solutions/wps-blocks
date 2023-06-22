<?php
/**
 * Block template
 *
 * @package WPS_Blocks
 */

declare( strict_types=1 );

namespace WPS\Navigation\Template;

use function WPS\Blocks\Helpers\ClassNames\get_names as get_names;



/**
 * Render callback template
 *
 * @param array $attributes Block attributes.
 */
function template( array $attributes ): string {

	$wrapper_attrs     = [];
	$classes           = [ 'wps-navigation' ];
	$has_custom_toggle = isset( $attributes['customToggleButton'] ) && ! empty( $attributes['customToggleButton'] );

	// Add the custom toggle location.
	if ( isset( $attributes['toggleButtonLocation'] ) && ! empty( $attributes['toggleButtonLocation'] ) && $has_custom_toggle ) {
		$wrapper_attrs['data-toggle-location'] = esc_attr( $attributes['toggleButtonLocation'] );
	}

	// Add the display breakpoint.
	if ( isset( $attributes['displayBreakpoint'] ) && ! empty( $attributes['displayBreakpoint'] ) ) {
		$wrapper_attrs['data-display-breakpoint'] = esc_attr( $attributes['displayBreakpoint'] );
	}

	// Add class signaling we have a custom toggle location.
	if ( $has_custom_toggle ) {
		$classes[] = 'wps-navigation--custom-toggle';
	}

	// Add the class names.
	$wrapper_attrs['class'] = get_names( $classes );

	$wrapper_attributes = get_block_wrapper_attributes( $wrapper_attrs );

	ob_start();
	?>
	<nav <?php echo $wrapper_attributes; //phpcs:ignore ?>>
		<button class="wps-navigation-menu-toggle"
					aria-controls="primary-navigation"
					aria-expanded="false"
		>
				<span class="visually-hidden">Menu</span>
				<span class="hamburger" aria-hidden="true"></span>
		</button>
		<?php if ( has_nav_menu( 'wps-primary' ) ) : ?>
			<?php
			wp_nav_menu( [
				'theme_location' => 'wps-primary',
				'menu_class'     => 'wps-navigation-menu__list',
				'container'      => false,
				'items_wrap'     => '<ul class="wps-navigation-menu" data-state="closed">%3$s</ul>',
			] );
			?>
		<?php endif; ?>
	</nav>
	<?php
	return ob_get_clean();
}

/**
 * Callback function name
 *
 * @return string The template function name.
 **/
function block_frontend_template(): string {
	return __NAMESPACE__ . '\\template';
}
add_filter( 'render_callback_navigation', __NAMESPACE__ . '\\block_frontend_template' );
