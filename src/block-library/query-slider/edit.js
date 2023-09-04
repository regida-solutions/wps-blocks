/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import { InspectorControls, useBlockProps } from '@wordpress/block-editor';

import ServerSideRender from '@wordpress/server-side-render';
import {
	PanelBody,
	ToggleControl,
	SelectControl,
	TextControl,
	Disabled,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToolsPanel as ToolsPanel,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToolsPanelItem as ToolsPanelItem,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalNumberControl as NumberControl,
	BaseControl,
} from '@wordpress/components';
import { useEffect, useState, useCallback } from '@wordpress/element';
import { debounce } from '@wordpress/compose';

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import OrderControl from './controls/order-control';
import AuthorControl from './controls/author-control';
import ParentControl from './controls/parent-control';
import { TaxonomyControls } from './controls/taxonomy-controls';
import {
	useAllowedControls,
	isControlAllowed,
	useTaxonomies,
	usePostTypes,
	useIsPostTypeHierarchical,
} from './utils';
function Edit({ setAttributes, attributes }) {
	const {
		className,
		loopSlides,
		speed,
		delay,
		autoplay = true,
		animationType,
		pagination,
		query,
		randomize,
		slidesPerView,
		enableLink,
		hideNavigation,
		multirow,
		multirowPerColumn,
	} = attributes;

	const {
		order,
		orderBy,
		author: authorIds,
		postType,
		taxQuery,
		parents,
		perPage,
	} = query;

	const taxonomies = useTaxonomies(postType);
	const isPostTypeHierarchical = useIsPostTypeHierarchical(postType);
	const { postTypesTaxonomiesMap, postTypesSelectOptions } = usePostTypes();
	const [querySearch, setQuerySearch] = useState(query.search);
	const allowedControls = useAllowedControls(attributes);

	const classes = classnames('wps-blocks-query-slider', className);

	const setQuery = (newQuery) => {
		setAttributes({ query: { ...query, ...newQuery } });
	};

	const showTaxControl =
		!!taxonomies?.length && isControlAllowed(allowedControls, 'taxQuery');
	const showAuthorControl = isControlAllowed(allowedControls, 'author');
	const showSearchControl = isControlAllowed(allowedControls, 'search');
	const showParentControl =
		isControlAllowed(allowedControls, 'parents') && isPostTypeHierarchical;

	const onPostTypeChange = (newValue) => {
		const updateQuery = { postType: newValue };
		// We need to dynamically update the `taxQuery` property,
		// by removing any not supported taxonomy from the query.
		const supportedTaxonomies = postTypesTaxonomiesMap[newValue];
		const updatedTaxQuery = Object.entries(taxQuery || {}).reduce(
			(accumulator, [taxonomySlug, terms]) => {
				if (supportedTaxonomies.includes(taxonomySlug)) {
					accumulator[taxonomySlug] = terms;
				}
				return accumulator;
			},
			{},
		);
		updateQuery.taxQuery = !!Object.keys(updatedTaxQuery).length
			? updatedTaxQuery
			: undefined;

		// We need to reset `parents` because they are tied to each post type.
		updateQuery.parents = [];
		setQuery(updateQuery);
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const onChangeDebounced = useCallback(
		debounce(() => {
			if (query.search !== querySearch) {
				setQuery({ search: querySearch });
			}
		}, 250),
		[querySearch, query.search],
	);

	useEffect(() => {
		onChangeDebounced();
		return onChangeDebounced.cancel;
	}, [querySearch, onChangeDebounced]);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Slider Settings')} initialOpen={false}>
					<ToggleControl
						label="Loop slides continuously"
						checked={loopSlides}
						onChange={() => {
							setAttributes({ loopSlides: !loopSlides });
						}}
					/>
					<ToggleControl
						label="Pagination"
						checked={pagination}
						onChange={() => {
							setAttributes({ pagination: !pagination });
						}}
					/>

					<ToggleControl
						label="Autoplay"
						checked={autoplay}
						onChange={() => {
							setAttributes({ autoplay: !autoplay });
						}}
					/>

					<ToggleControl
						label="Hide navigation arrows"
						help={
							"Don't display the slider navigation left and right arrows"
						}
						checked={hideNavigation}
						onChange={() => {
							setAttributes({ hideNavigation: !hideNavigation });
						}}
					/>

					<ToggleControl
						label="Enable Link"
						help={'Allow user to visit the single page'}
						checked={enableLink}
						onChange={() => {
							setAttributes({ enableLink: !enableLink });
						}}
					/>

					<ToggleControl
						label="Randomize"
						help={'Randomize slides order'}
						checked={randomize}
						onChange={() => {
							setAttributes({ randomize: !randomize });
						}}
					/>

					<ToggleControl
						label="Multirow"
						help={'Show multiple rows per slide'}
						checked={multirow}
						onChange={() => {
							const multi = !multirow;
							setAttributes({ multirow: multi });
							if (multi) {
								setAttributes({ animationType: '' });
							}
						}}
					/>

					<TextControl
						label={__('Autoplay delay between slides transition')}
						help={__(
							'In milliseconds (ms), default:3000. Works only if autoplay is enabled.',
						)}
						value={delay}
						onChange={(value) =>
							setAttributes({ delay: parseInt(value) })
						}
						type="number"
					/>

					<TextControl
						label={__('Slides transition animation speed')}
						help={__('In milliseconds (ms), default:500')}
						value={speed}
						onChange={(value) =>
							setAttributes({ speed: parseInt(value) })
						}
						type="number"
					/>
					<SelectControl
						disabled={multirow}
						help={multirow ? 'Not compatible with multirow' : ''}
						label={__('Animation type')}
						value={animationType}
						onChange={(value) =>
							setAttributes({ animationType: value })
						}
						options={[
							{
								value: null,
								label: 'Default',
							},
							{ value: 'fade', label: 'Fade' },
							{ value: 'coverFlow', label: 'Cover' },
							{ value: 'flip', label: 'Flip' },
							{ value: 'cube', label: 'Cube' },
							{ value: 'creative', label: 'Creative' },
						]}
					/>
					<BaseControl
						id="cfs-speakers-items-to-show"
						__nextHasNoMarginBottom={true}
					>
						<NumberControl
							label={__('Posts to show')}
							onChange={(number) => setQuery({ perPage: number })}
							step={1}
							value={perPage}
							max={99}
							min={-1}
							help={
								multirow
									? __(
											'Multirow will show 3 items per line, so make sure you have enough items enabled to fill the whole slider ',
									  )
									: ''
							}
						/>
					</BaseControl>
					<BaseControl
						id="cfs-speakers-items-to-show"
						__nextHasNoMarginBottom={true}
					>
						<NumberControl
							label={
								multirow
									? __('Columns to show (multirow setup)')
									: __('Posts to show at one time')
							}
							help={__(
								'When there are multiple items per slide the loop continuously and animation type will not be available.',
							)}
							onChange={(number) => {
								const settings = {
									slidesPerView: parseInt(number),
								};

								if (number > 1) {
									settings.animationType = '';
									settings.loopSlides = false;
								}

								setAttributes(settings);
							}}
							step={1}
							value={slidesPerView}
							max={99}
							min={-1}
						/>
					</BaseControl>
					{multirow && (
						<BaseControl
							id="cfs-speakers-multirow-per-column"
							__nextHasNoMarginBottom={true}
						>
							<NumberControl
								label={__('Items to show per column')}
								onChange={(number) => {
									setAttributes({
										multirowPerColumn: parseInt(number),
									});
								}}
								step={1}
								value={multirowPerColumn}
								max={12}
								min={2}
							/>
						</BaseControl>
					)}
				</PanelBody>
				<PanelBody title={__('Post settings')} initialOpen={false}>
					<SelectControl
						options={postTypesSelectOptions}
						value={postType}
						label={__('Post type')}
						onChange={onPostTypeChange}
						help={__(
							'WordPress contains different types of content and they are divided into collections called “Post types”. By default there are a few different ones such as blog posts and pages, but plugins could add more.',
						)}
					/>
					<OrderControl {...{ order, orderBy }} onChange={setQuery} />
				</PanelBody>
			</InspectorControls>
			<InspectorControls>
				<ToolsPanel
					className="block-library-query-toolspanel__filters"
					label={__('Filters')}
					resetAll={() => {
						setQuery({
							author: '',
							parents: [],
							search: '',
							taxQuery: null,
						});
						setQuerySearch('');
					}}
				>
					{showTaxControl && (
						<ToolsPanelItem
							label={__('Taxonomies')}
							hasValue={() =>
								Object.values(taxQuery || {}).some(
									(terms) => !!terms.length,
								)
							}
							onDeselect={() => setQuery({ taxQuery: null })}
						>
							<TaxonomyControls
								onChange={setQuery}
								query={query}
							/>
						</ToolsPanelItem>
					)}
					{showAuthorControl && (
						<ToolsPanelItem
							hasValue={() => !!authorIds}
							label={__('Authors')}
							onDeselect={() => setQuery({ author: '' })}
						>
							<AuthorControl
								value={authorIds}
								onChange={setQuery}
							/>
						</ToolsPanelItem>
					)}
					{showSearchControl && (
						<ToolsPanelItem
							hasValue={() => !!querySearch}
							label={__('Keyword')}
							onDeselect={() => setQuerySearch('')}
						>
							<TextControl
								label={__('Keyword')}
								value={querySearch}
								onChange={setQuerySearch}
							/>
						</ToolsPanelItem>
					)}
					{showParentControl && (
						<ToolsPanelItem
							hasValue={() => !!parents?.length}
							label={__('Parents')}
							onDeselect={() => setQuery({ parents: [] })}
						>
							<ParentControl
								parents={parents}
								postType={postType}
								onChange={setQuery}
							/>
						</ToolsPanelItem>
					)}
				</ToolsPanel>
			</InspectorControls>
			<div {...useBlockProps({ className: classes })}>
				<Disabled>
					<ServerSideRender
						block="wps/query-slider"
						attributes={{ ...attributes }}
					/>
				</Disabled>
			</div>
		</>
	);
}
export default Edit;
