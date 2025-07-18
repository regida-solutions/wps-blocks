<?php
/**
 * Settings page
 *
 * @package WPS_Blocks
 */

declare( strict_types=1 );

namespace WPS\Blocks\Settings\Fields;

add_action( 'init', __NAMESPACE__ . '\\register_plugin_settings', 10 );

/**
 * Register plugin settings in api
 *
 * @return void
 */
function register_plugin_settings(): void {

	register_setting(
		'wps_blocks_settings',
		'wps_blocks_contact_info',
		[
			'single'       => true,
			'default'      => new \stdClass(),
			'type'         => 'object',
			'show_in_rest' => [
				'schema' => [
					'type'       => 'object',
					'properties' => [
						'phone_nr'             => [ 'type' => 'string' ],
						'phone_nr_second'      => [ 'type' => 'string' ],
						'phone_nr_platform'    => [ 'type' => 'string' ],
						'message_platform'     => [ 'type' => 'string' ],
						'email_address'        => [ 'type' => 'string' ],
						'email_address_second' => [ 'type' => 'string' ],
					],
				],
			],
		]
	);

	register_setting(
		'wps_blocks_settings',
		'wps_blocks_map',
		[
			'single'       => true,
			'default'      => new \stdClass(),
			'type'         => 'object',
			'show_in_rest' => [
				'schema' => [
					'type'       => 'object',
					'properties' => [
						'api_key' => [ 'type' => 'string' ],
					],
				],
			],
		]
	);

	register_setting(
		'wps_blocks_settings',
		'wps_blocks_gravity_forms',
		[
			'single'       => true,
			'default'      => new \stdClass(),
			'type'         => 'object',
			'show_in_rest' => [
				'schema' => [
					'type'       => 'object',
					'properties' => [
						'form_ids'             => [ 'type' => 'string' ],
						'confirmation_message' => [ 'type' => 'string' ],
					],
				],
			],
		]
	);
}
