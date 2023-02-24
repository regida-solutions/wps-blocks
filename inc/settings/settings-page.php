<?php
/**
 * Settings page
 *
 * @package WPS_Blocks
 */

declare( strict_types=1 );

namespace WPS\Blocks\Settings\Page;

add_action( 'admin_menu', __NAMESPACE__ . '\\add_settings_page', 9 );

/**
 * Add settings page scripts
 */
function settings_assets(): void {

	if ( file_exists( WPS_BLOCKS_DIR_PATH . '/build/settings/settings.js' ) ) {
		$script_deps_path    = WPS_BLOCKS_DIR_PATH . '/build/settings/settings.asset.php';
		$script_dependencies = file_exists( $script_deps_path ) ?
			include $script_deps_path :
			[
				'dependencies' => [],
				'version'      => WPS_BLOCKS_VERSION,
			];

		wp_register_script(
			'wps-blocks-plugin-script',
			plugins_url( '../../build/settings/', __FILE__ ) . 'settings.js',
			$script_dependencies['dependencies'],
			$script_dependencies['version'],
			false
		);
		wp_enqueue_script( 'wps-blocks-plugin-script' );
	}

	if ( file_exists( WPS_BLOCKS_DIR_PATH . '/build/settings/settings.css' ) ) {
		wp_register_style(
			'wps-blocks-settings-plugin-style',
			plugins_url( '../../build/settings/', __FILE__ ) . 'settings.css',
			[ 'wp-components' ],
			WPS_BLOCKS_VERSION,
		);
		wp_enqueue_style( 'wps-blocks-settings-plugin-style' );
	}

	/**
	 * Make settings available to the settings page
	 */
	\wp_localize_script( 'wps-blocks-plugin-script', 'SiteSettings',
		[
			'currentLanguage' => \WPS\Blocks\Helpers\Polylang\get_current_language(),
			'languageList'    => \WPS\Blocks\Helpers\Polylang\get_languages_list( [ 'hideDefault' => true ] ),
		]
	);
}

/**
 * Register settings page
 */
function add_settings_page(): void {
	$page_hook_suffix = add_submenu_page(
		'options-general.php',
		'WPS Blocks Settings',
		'WPS Blocks Settings',
		'manage_options',
		'wps_blocks_settings',
		__NAMESPACE__ . '\\settings_page'
	);
	add_action( "admin_print_scripts-{$page_hook_suffix}", __NAMESPACE__ . '\\settings_assets' );
}

/**
 * Add React placeholder to settings page
 */
function settings_page(): void {
	echo '<div id="wps-blocks-settings"></div>';
}
