<?php
/**
 * Setup plugin
 *
 * @package WPS_Blocks
 */

declare( strict_types=1 );

namespace WPS\Blocks\Inc\Updater;

add_filter( 'plugins_api', __NAMESPACE__ . '\\plugin_info', 20, 3 );
add_filter( 'site_transient_update_plugins', __NAMESPACE__ . '\\plugin_push_update' );
add_action( 'upgrader_process_complete', __NAMESPACE__ . '\\plugin_after_update', 10, 2 );

/**
 * Fetch and validate the remote plugin info.
 *
 * Returns the decoded info object, or null when the update host is
 * unreachable or returns an unusable response (non-200, empty body,
 * invalid JSON, missing version). Failures are cached for one hour so a
 * dead update host neither breaks nor slows down every admin request.
 *
 * @param string $action Remote endpoint action (info|update).
 * @return object|null
 */
function get_remote_info( string $action ): ?object {
	$cache_key = 'wps_blocks_upgrade_' . WPS_BLOCKS_PLUGIN_SLUG;
	$remote    = get_transient( $cache_key );

	if ( 'error' === $remote ) {
		return null;
	}

	if ( false === $remote ) {
		$remote = wp_remote_get(
			WPS_BLOCKS_UPDATE_URL . '/get-info.php?slug=' . WPS_BLOCKS_PLUGIN_SLUG . '&action=' . $action,
			[
				'timeout' => 5,
				'headers' => [
					'Accept' => 'application/json',
				],
			]
		);

		if ( is_wp_error( $remote ) || 200 !== (int) wp_remote_retrieve_response_code( $remote ) || '' === wp_remote_retrieve_body( $remote ) ) {
			set_transient( $cache_key, 'error', HOUR_IN_SECONDS );
			return null;
		}

		set_transient( $cache_key, $remote, 21600 ); // 6 hours cache.
	}

	$data = json_decode( wp_remote_retrieve_body( $remote ) );

	if ( ! is_object( $data ) || isset( $data->error ) || empty( $data->version ) ) {
		// Cached or fresh payload is unusable; back off for an hour.
		set_transient( $cache_key, 'error', HOUR_IN_SECONDS );
		return null;
	}

	return $data;
}

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
		return $res;
	}

	// Do nothing if it is not our plugin.
	if ( empty( $args->slug ) || WPS_BLOCKS_PLUGIN_SLUG !== $args->slug ) {
		return $res;
	}

	$remote = get_remote_info( 'info' );

	if ( null === $remote ) {
		return $res;
	}

	$res                 = new \stdClass();
	$res->name           = $remote->name ?? WPS_BLOCKS_PLUGIN_SLUG;
	$res->slug           = $remote->slug ?? WPS_BLOCKS_PLUGIN_SLUG;
	$res->version        = (string) $remote->version;
	$res->tested         = $remote->tested ?? '';
	$res->requires       = $remote->requires ?? '';
	$res->author         = $remote->author ?? '';
	$res->author_profile = $remote->author_homepage ?? '';
	$res->download_link  = (string) ( $remote->download_link ?? '' );
	$res->trunk          = $res->download_link;
	$res->last_updated   = $remote->last_updated ?? '';
	$res->sections       = [
		'description'  => $remote->sections->description ?? '', // description tab.
		'installation' => $remote->sections->installation ?? '', // installation tab.
	];
	$res->banners        = [
		'low'  => $remote->banners->low ?? '',
		'high' => $remote->banners->high ?? '',
	];

	return $res;
}

/**
 * Define Plugin update site_transient_update_plugins callback
 *
 * @param object $transient Plugin transient.
 */
function plugin_push_update( $transient ) { //phpcs:ignore

	if ( ! is_object( $transient ) || empty( $transient->checked ) ) {
		return $transient;
	}

	$remote = get_remote_info( 'update' );

	if ( null === $remote || empty( $remote->download_link ) ) {
		return $transient;
	}

	if ( version_compare( WPS_BLOCKS_VERSION, (string) $remote->version, '<' ) && version_compare( (string) ( $remote->requires ?? '0' ), get_bloginfo( 'version' ), '<' ) ) {
		$res       = new \stdClass();
		$res->slug = WPS_BLOCKS_PLUGIN_SLUG;

		// it could be just mypluginslug1.php if your plugin doesn't have its own directory (my does).
		$res->plugin                         = WPS_BLOCKS_PLUGIN_SLUG . '/' . WPS_BLOCKS_PLUGIN_SLUG . '.php';
		$res->new_version                    = (string) $remote->version;
		$res->tested                         = $remote->tested ?? '';
		$res->package                        = (string) $remote->download_link;
		$transient->response[ $res->plugin ] = $res;
	}

	return $transient;
}

/**
 * Cache the results to make update process fast
 *
 * @param \WP_Upgrader $upgrader_object  WP_Upgrader instance.
 * @param array        $options Array of bulk item update data.
 */
function plugin_after_update( \WP_Upgrader $upgrader_object, array $options ): void {
	if ( isset( $options['action'], $options['type'] ) && 'update' === $options['action'] && 'plugin' === $options['type'] ) {
		// just clean the cache when new plugin version is installed.
		delete_transient( 'wps_blocks_upgrade_' . WPS_BLOCKS_PLUGIN_SLUG );
	}
}
