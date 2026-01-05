/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const moduleOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['module'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a module',
				action: 'Create a module',
			},
			{
				name: 'Create Item',
				value: 'createItem',
				description: 'Add an item to a module',
				action: 'Create module item',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a module',
				action: 'Delete a module',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a module',
				action: 'Get a module',
			},
			{
				name: 'Get Items',
				value: 'getItems',
				description: 'Get module items',
				action: 'Get module items',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many modules',
				action: 'Get many modules',
			},
			{
				name: 'Unlock',
				value: 'unlock',
				description: 'Unlock a module for a student',
				action: 'Unlock a module',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a module',
				action: 'Update a module',
			},
			{
				name: 'Update Progress',
				value: 'updateProgress',
				description: 'Update student progress in a module',
				action: 'Update module progress',
			},
		],
		default: 'getAll',
	},
];

export const moduleFields: INodeProperties[] = [
	// ----------------------------------
	//         module: common
	// ----------------------------------
	{
		displayName: 'Course ID',
		name: 'courseId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['module'],
				operation: ['create', 'get', 'getAll', 'update', 'delete', 'getItems', 'createItem', 'updateProgress', 'unlock'],
			},
		},
		description: 'The ID of the course',
	},

	// ----------------------------------
	//         module: create
	// ----------------------------------
	{
		displayName: 'Module Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['module'],
				operation: ['create'],
			},
		},
		description: 'The name of the module',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['module'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Position',
				name: 'position',
				type: 'number',
				default: 1,
				description: 'Position in the module list',
			},
			{
				displayName: 'Prerequisite Module IDs',
				name: 'prerequisite_module_ids',
				type: 'string',
				default: '',
				description: 'Comma-separated IDs of prerequisite modules',
			},
			{
				displayName: 'Publish Final Grade',
				name: 'publish_final_grade',
				type: 'boolean',
				default: false,
				description: 'Whether to publish final grade upon completion',
			},
			{
				displayName: 'Require Sequential Progress',
				name: 'require_sequential_progress',
				type: 'boolean',
				default: false,
				description: 'Whether items must be completed in order',
			},
			{
				displayName: 'Unlock Date',
				name: 'unlock_at',
				type: 'dateTime',
				default: '',
				description: 'When the module becomes available',
			},
		],
	},

	// ----------------------------------
	//         module: get, update, delete, getItems
	// ----------------------------------
	{
		displayName: 'Module ID',
		name: 'moduleId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['module'],
				operation: ['get', 'update', 'delete', 'getItems', 'createItem', 'updateProgress', 'unlock'],
			},
		},
		description: 'The ID of the module',
	},
	{
		displayName: 'Include',
		name: 'include',
		type: 'multiOptions',
		default: [],
		displayOptions: {
			show: {
				resource: ['module'],
				operation: ['get'],
			},
		},
		options: [
			{ name: 'Content Details', value: 'content_details' },
			{ name: 'Items', value: 'items' },
		],
		description: 'Additional data to include',
	},

	// ----------------------------------
	//         module: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['module'],
				operation: ['getAll'],
			},
		},
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		displayOptions: {
			show: {
				resource: ['module'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['module'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Include',
				name: 'include',
				type: 'multiOptions',
				options: [
					{ name: 'Content Details', value: 'content_details' },
					{ name: 'Items', value: 'items' },
				],
				default: [],
				description: 'Additional data to include',
			},
			{
				displayName: 'Search Term',
				name: 'search_term',
				type: 'string',
				default: '',
				description: 'Search by module name',
			},
			{
				displayName: 'Student ID',
				name: 'student_id',
				type: 'string',
				default: '',
				description: 'Get progress for a specific student',
			},
		],
	},

	// ----------------------------------
	//         module: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['module'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Module name',
			},
			{
				displayName: 'Position',
				name: 'position',
				type: 'number',
				default: 1,
				description: 'Position in the module list',
			},
			{
				displayName: 'Prerequisite Module IDs',
				name: 'prerequisite_module_ids',
				type: 'string',
				default: '',
				description: 'Comma-separated IDs of prerequisite modules',
			},
			{
				displayName: 'Publish Final Grade',
				name: 'publish_final_grade',
				type: 'boolean',
				default: false,
				description: 'Whether to publish final grade upon completion',
			},
			{
				displayName: 'Published',
				name: 'published',
				type: 'boolean',
				default: false,
				description: 'Whether the module is published',
			},
			{
				displayName: 'Require Sequential Progress',
				name: 'require_sequential_progress',
				type: 'boolean',
				default: false,
				description: 'Whether items must be completed in order',
			},
			{
				displayName: 'Unlock Date',
				name: 'unlock_at',
				type: 'dateTime',
				default: '',
				description: 'When the module becomes available',
			},
		],
	},

	// ----------------------------------
	//         module: getItems
	// ----------------------------------
	{
		displayName: 'Return All Items',
		name: 'returnAllItems',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['module'],
				operation: ['getItems'],
			},
		},
		description: 'Whether to return all items',
	},
	{
		displayName: 'Item Limit',
		name: 'itemLimit',
		type: 'number',
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		displayOptions: {
			show: {
				resource: ['module'],
				operation: ['getItems'],
				returnAllItems: [false],
			},
		},
		description: 'Max number of items to return',
	},
	{
		displayName: 'Item Filters',
		name: 'itemFilters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['module'],
				operation: ['getItems'],
			},
		},
		options: [
			{
				displayName: 'Include',
				name: 'include',
				type: 'multiOptions',
				options: [
					{ name: 'Content Details', value: 'content_details' },
				],
				default: [],
				description: 'Additional data to include',
			},
			{
				displayName: 'Search Term',
				name: 'search_term',
				type: 'string',
				default: '',
				description: 'Search by item title',
			},
			{
				displayName: 'Student ID',
				name: 'student_id',
				type: 'string',
				default: '',
				description: 'Get completion info for a specific student',
			},
		],
	},

	// ----------------------------------
	//         module: createItem
	// ----------------------------------
	{
		displayName: 'Item Title',
		name: 'itemTitle',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['module'],
				operation: ['createItem'],
			},
		},
		description: 'Title for the module item',
	},
	{
		displayName: 'Item Type',
		name: 'itemType',
		type: 'options',
		required: true,
		default: 'Page',
		displayOptions: {
			show: {
				resource: ['module'],
				operation: ['createItem'],
			},
		},
		options: [
			{ name: 'Assignment', value: 'Assignment' },
			{ name: 'Discussion', value: 'Discussion' },
			{ name: 'External Tool', value: 'ExternalTool' },
			{ name: 'External URL', value: 'ExternalUrl' },
			{ name: 'File', value: 'File' },
			{ name: 'Page', value: 'Page' },
			{ name: 'Quiz', value: 'Quiz' },
			{ name: 'Sub Header', value: 'SubHeader' },
		],
		description: 'The type of module item',
	},
	{
		displayName: 'Content ID',
		name: 'contentId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['module'],
				operation: ['createItem'],
				itemType: ['Assignment', 'Discussion', 'File', 'Page', 'Quiz'],
			},
		},
		description: 'The ID of the content (assignment, discussion, file, page, or quiz)',
	},
	{
		displayName: 'External URL',
		name: 'externalUrl',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['module'],
				operation: ['createItem'],
				itemType: ['ExternalUrl', 'ExternalTool'],
			},
		},
		description: 'The external URL',
	},
	{
		displayName: 'Item Options',
		name: 'itemOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['module'],
				operation: ['createItem'],
			},
		},
		options: [
			{
				displayName: 'Completion Requirement Type',
				name: 'completion_requirement_type',
				type: 'options',
				options: [
					{ name: 'Contribute', value: 'must_contribute' },
					{ name: 'Mark Done', value: 'must_mark_done' },
					{ name: 'Min Score', value: 'min_score' },
					{ name: 'Submit', value: 'must_submit' },
					{ name: 'View', value: 'must_view' },
				],
				default: 'must_view',
				description: 'Completion requirement type',
			},
			{
				displayName: 'Indent',
				name: 'indent',
				type: 'number',
				default: 0,
				description: 'Indentation level (0-5)',
			},
			{
				displayName: 'Min Score',
				name: 'completion_requirement_min_score',
				type: 'number',
				default: 0,
				description: 'Minimum score for min_score completion type',
			},
			{
				displayName: 'New Tab',
				name: 'new_tab',
				type: 'boolean',
				default: false,
				description: 'Whether to open external items in a new tab',
			},
			{
				displayName: 'Position',
				name: 'position',
				type: 'number',
				default: 1,
				description: 'Position in the module',
			},
		],
	},

	// ----------------------------------
	//         module: updateProgress
	// ----------------------------------
	{
		displayName: 'Module Item ID',
		name: 'moduleItemId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['module'],
				operation: ['updateProgress'],
			},
		},
		description: 'The ID of the module item',
	},
	{
		displayName: 'Done',
		name: 'done',
		type: 'boolean',
		required: true,
		default: true,
		displayOptions: {
			show: {
				resource: ['module'],
				operation: ['updateProgress'],
			},
		},
		description: 'Whether to mark the item as done',
	},
];
