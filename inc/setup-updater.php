<?php
/**
 * Setup plugin
 *
 * @package WpsBlocks
 */

declare( strict_types=1 );

namespace WPS\Blocks\Inc\Updater;

add_filter( 'plugins_api', __NAMESPACE__ . '\\plugin_info', 20, 3 );
add_filter( 'site_transient_update_plugins', __NAMESPACE__ . '\\plugin_push_update' );
add_action( 'upgrader_process_complete', __NAMESPACE__ . '\\plugin_after_update', 10, 2 );

/**
 * Plugin pop-up when new release is out
 *
 * @param false|object|array $res The result object or array.
 * @param string             $action The type of information being requested from the Plugin Installation API.
 * @param object             $args Plugin API arguments.
 */
function plugin_info( $res, string $action, object $args ) { //phpcs:ignore

	// Do nothing if this is not about getting plugin information.
	if ( 'plugin_information' !== $action ) {
		return false;
	}

	// Do nothing if it is not our plugin.
	if ( WPS_BLOCKS_PLUGIN_SLUG !== $args->slug ) {
		return $res;
	}

	$remote = get_transient( 'wps_blocks_upgrade_' . WPS_BLOCKS_PLUGIN_SLUG );

	if ( false === $remote ) {

		$remote = wp_remote_get(
			WPS_BLOCKS_UPDATE_URL . '/get-info.php?slug=' . WPS_BLOCKS_PLUGIN_SLUG . '&action=info',
			[
				'timeout' => 5,
				'headers' => [
					'Accept' => 'application/json',
				],
			]
		);

		if ( ! is_wp_error( $remote ) && isset( $remote['response']['code'] ) && 200 === $remote['response']['code'] && ! empty( $remote['body'] ) ) {
			set_transient( 'wps_blocks_upgrade_' . WPS_BLOCKS_PLUGIN_SLUG, $remote, 21600 ); // 6 hours cache.
		}
	}

	if ( ! is_wp_error( $remote ) ) {

		$remote = json_decode( $remote['body'] );

		$res                 = new \stdClass();
		$res->name           = $remote->name;
		$res->slug           = $remote->slug;
		$res->version        = $remote->version;
		$res->tested         = $remote->tested;
		$res->requires       = $remote->requires;
		$res->author         = $remote->author;
		$res->author_profile = $remote->author_homepage;
		$res->download_link  = $remote->download_link;
		$res->trunk          = $remote->download_link;
		$res->last_updated   = $remote->last_updated;
		$res->sections       = [
			'description'  => $remote->sections->description, // description tab.
			'installation' => $remote->sections->installation, // installation tab.
		];
		$res->banners        = [
			'low'  => $remote->banners->low,
			'high' => $remote->banners->high,
		];

		return $res;
	}

	return false;

}

/**
 * Define Plugin update site_transient_update_plugins callback
 *
 * @param object $transient Plugin transient.
 */
function plugin_push_update( $transient ) { //phpcs:ignore

	if ( ! $transient ) {
		return $transient;
	}

	if ( empty( $transient->checked ) ) {
		return $transient;
	}

	$remote = get_transient( 'wps_blocks_upgrade_' . WPS_BLOCKS_PLUGIN_SLUG );

	if ( false === $remote ) {
		// info.json is the file with the actual plugin information on your server.
		$remote = wp_remote_get( WPS_BLOCKS_UPDATE_URL . '/get-info.php?slug=' . WPS_BLOCKS_PLUGIN_SLUG . '&action=update',
			[
				'timeout' => 10,
				'headers' => [
					'Accept' => 'application/json',
				],
			]
		);

		if ( ! is_wp_error( $remote ) && isset( $remote['response']['code'] ) && 200 === $remote['response']['code'] && ! empty( $remote['body'] ) ) {
			set_transient( 'wps_blocks_upgrade_' . WPS_BLOCKS_PLUGIN_SLUG, $remote, 21600 ); // 6 hours cache.
		}
	}

	if ( $remote ) {

		$remote = json_decode( $remote['body'] );

		// your installed plugin version should be on the line below! You can obtain it dynamically of course.
		if ( $remote && version_compare( WPS_BLOCKS_VERSION, $remote->version, '<' ) && version_compare( $remote->requires, get_bloginfo( 'version' ), '<' ) ) {
			$res       = new \stdClass();
			$res->slug = WPS_BLOCKS_PLUGIN_SLUG;

			// it could be just mypluginslug1.php if your plugin doesn't have its own directory (my does).
			$res->plugin                         = WPS_BLOCKS_PLUGIN_SLUG . '/' . WPS_BLOCKS_PLUGIN_SLUG . '.php';
			$res->new_version                    = $remote->version;
			$res->tested                         = $remote->tested;
			$res->package                        = $remote->download_link;
			$transient->response[ $res->plugin ] = $res;
		}
	}
	return $transient;
}

/**
 * Cache the results to make update process fast
 *
 * @param \WP_Upgrader $upgrader_object  WP_Upgrader instance.
 * @param array        $options Array of bulk item update data.
 */
function plugin_after_update( \WP_Upgrader $upgrader_object, array $options ):void {
	if ( 'update' === $options['action'] && 'plugin' === $options['type'] ) {
		// just clean the cache when new plugin version is installed.
		delete_transient( 'wps_blocks_upgrade_' . WPS_BLOCKS_PLUGIN_SLUG );
	}
}

