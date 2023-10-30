/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	useInnerBlocksProps,
	useBlockProps,
} from '@wordpress/block-editor';

import { DateTimePicker, PanelBody } from '@wordpress/components';
/**
 * External dependencies
 */
import classnames from 'classnames';

function Edit({ attributes, setAttributes }) {
	const { className = '', date } = attributes;

	const ALLOWED_BLOCKS = [
		'core/paragraph',
		'core/heading',
		'core/column',
		'core/columns',
		'core/button',
		'core/buttons',
		'core/group',
	];

	const TEMPLATE = [
		[
			'core/paragraph',
			{
				content:
					'Time till event: days {DAYS-DIFFERENCE}, hours {HOURS}, minute {MINUTES}, seconds {SECONDS}',
			},
		],
	];

	const classes = classnames(className, ['wps-countdown']);

	const blocksProps = useBlockProps({ className: classes });
	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			template: TEMPLATE,
			allowedBlocks: ALLOWED_BLOCKS,
		},
	);

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Settings', 'wps-blocks')}
					initialOpen={true}
				>
					<p>
						<strong>Parameters:</strong>
						<br />
						<code>{'{MONTHS}'}</code> - month
						<br />
						<code>{'{DAYS}'}</code> - day
						<br />
						<code>{'{HOURS}'}</code> - hour
						<br />
						<code>{'{MINUTES}'}</code> - minute
						<br />
						<code>{'{SECONDS}'}</code> - second
						<br />
						<code>{'{DAYS-DIFFERENCE}'}</code> - day
						<br />
					</p>
					<hr />
					<div className={'wps-counter__date-picker'}>
						<DateTimePicker
							currentDate={date}
							onChange={(newDate) =>
								setAttributes({ date: newDate })
							}
							is12Hour={true}
						/>
					</div>
				</PanelBody>
			</InspectorControls>
			<div {...blocksProps}>
				<div className="wps-gform__inner">
					<div {...innerBlocksProps} />
				</div>
			</div>
		</>
	);
}
export default Edit;
