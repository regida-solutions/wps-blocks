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

	$classes = get_names( [
		'wps-navigation',
		! empty( $attributes['className'] ) ? $attributes['className'] : '',
	] );

	$anchor                 = isset( $attributes['anchor'] ) ? ' id="' . esc_attr( $attributes['anchor'] ) . '"' : '';
	$custom_toggle_location = isset( $attributes['toggleButtonLocation'] ) ? ' data-toggle-location="' . esc_attr( $attributes['toggleButtonLocation'] ) . '"' : '';

	ob_start();
	?>
	<nav<?php echo $anchor; //phpcs:ignore ?> class="<?php echo esc_attr( $classes ); ?>"<?php echo $custom_toggle_location; //phpcs:ignore ?>>
		<button class="wps-navigation-menu-toggle"
					aria-controls="primary-navigation"
					aria-expanded="false">
				<span class="visually-hidden">Menu</span>
				<div class="hamburger" aria-hidden="true"></div>
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
