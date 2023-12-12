/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	useInnerBlocksProps,
	useBlockProps,
} from '@wordpress/block-editor';

import {
	SelectControl,
	BaseControl,
	DateTimePicker,
	PanelBody,
} from '@wordpress/components';
/**
 * External dependencies
 */
import classnames from 'classnames';

function Edit({ attributes, setAttributes }) {
	const { className = '', date, timezone } = attributes;

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

	const countries = Intl.supportedValuesOf('timeZone').map((tz) => {
		return { label: tz, value: tz };
	});

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Settings', 'wps-blocks')}
					initialOpen={true}
				>
					<BaseControl
						help={__(
							'Use css id: #countdown on top wrapper element to enable closing',
						)}
					>
						<BaseControl.VisualLabel>
							{__('Parameters:', 'wps-blocks')}
						</BaseControl.VisualLabel>
						<p>
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
						</p>
					</BaseControl>
					<BaseControl
						help={__('Set the local timezone for the counter')}
					>
						<SelectControl
							headerTitle="Timezone"
							label="Select timezone"
							value={timezone}
							options={countries}
							onChange={(value) =>
								setAttributes({ timezone: value })
							}
						/>
					</BaseControl>
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
