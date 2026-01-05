/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const announcementOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['announcement'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new announcement',
				action: 'Create an announcement',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an announcement',
				action: 'Delete an announcement',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an announcement by ID',
				action: 'Get an announcement',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many announcements',
				action: 'Get many announcements',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an announcement',
				action: 'Update an announcement',
			},
		],
		default: 'get',
	},
];

export const announcementFields: INodeProperties[] = [
	// ----------------------------------
	//         announcement: shared fields
	// ----------------------------------
	{
		displayName: 'Course ID',
		name: 'courseId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the course',
		displayOptions: {
			show: {
				resource: ['announcement'],
			},
		},
	},

	// ----------------------------------
	//         announcement: get, update, delete
	// ----------------------------------
	{
		displayName: 'Announcement ID',
		name: 'announcementId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the announcement',
		displayOptions: {
			show: {
				resource: ['announcement'],
				operation: ['get', 'update', 'delete'],
			},
		},
	},

	// ----------------------------------
	//         announcement: create
	// ----------------------------------
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		required: true,
		default: '',
		description: 'The title of the announcement',
		displayOptions: {
			show: {
				resource: ['announcement'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		required: true,
		default: '',
		description: 'The message content (HTML allowed)',
		displayOptions: {
			show: {
				resource: ['announcement'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['announcement'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Allow Rating',
				name: 'allowRating',
				type: 'boolean',
				default: false,
				description: 'Whether users can like/rate the announcement',
			},
			{
				displayName: 'Delayed Post At',
				name: 'delayedPostAt',
				type: 'dateTime',
				default: '',
				description: 'Schedule when to post the announcement',
			},
			{
				displayName: 'Lock At',
				name: 'lockAt',
				type: 'dateTime',
				default: '',
				description: 'When to lock comments',
			},
			{
				displayName: 'Locked',
				name: 'locked',
				type: 'boolean',
				default: false,
				description: 'Whether comments are locked',
			},
			{
				displayName: 'Only Graders Can Rate',
				name: 'onlyGradersCanRate',
				type: 'boolean',
				default: false,
				description: 'Whether only graders can rate',
			},
			{
				displayName: 'Pinned',
				name: 'pinned',
				type: 'boolean',
				default: false,
				description: 'Whether to pin the announcement',
			},
			{
				displayName: 'Podcast Enabled',
				name: 'podcastEnabled',
				type: 'boolean',
				default: false,
				description: 'Whether to include in podcast feed',
			},
			{
				displayName: 'Podcast Has Student Posts',
				name: 'podcastHasStudentPosts',
				type: 'boolean',
				default: false,
				description: 'Whether to include student posts in podcast',
			},
			{
				displayName: 'Published',
				name: 'published',
				type: 'boolean',
				default: true,
				description: 'Whether the announcement is published',
			},
			{
				displayName: 'Require Initial Post',
				name: 'requireInitialPost',
				type: 'boolean',
				default: false,
				description: 'Whether students must post before viewing others',
			},
			{
				displayName: 'Specific Sections',
				name: 'specificSections',
				type: 'string',
				default: '',
				description: 'Comma-separated section IDs for targeted announcements',
			},
		],
	},

	// ----------------------------------
	//         announcement: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['announcement'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Allow Rating',
				name: 'allowRating',
				type: 'boolean',
				default: false,
				description: 'Whether users can like/rate the announcement',
			},
			{
				displayName: 'Delayed Post At',
				name: 'delayedPostAt',
				type: 'dateTime',
				default: '',
				description: 'Schedule when to post the announcement',
			},
			{
				displayName: 'Lock At',
				name: 'lockAt',
				type: 'dateTime',
				default: '',
				description: 'When to lock comments',
			},
			{
				displayName: 'Locked',
				name: 'locked',
				type: 'boolean',
				default: false,
				description: 'Whether comments are locked',
			},
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'The message content (HTML allowed)',
			},
			{
				displayName: 'Pinned',
				name: 'pinned',
				type: 'boolean',
				default: false,
				description: 'Whether to pin the announcement',
			},
			{
				displayName: 'Published',
				name: 'published',
				type: 'boolean',
				default: true,
				description: 'Whether the announcement is published',
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'The title of the announcement',
			},
		],
	},

	// ----------------------------------
	//         announcement: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['announcement'],
				operation: ['getAll'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['announcement'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
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
				resource: ['announcement'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Active Only',
				name: 'activeOnly',
				type: 'boolean',
				default: false,
				description: 'Whether to return only active announcements',
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
				description: 'Return announcements posted before this date',
			},
			{
				displayName: 'Include',
				name: 'include',
				type: 'multiOptions',
				options: [
					{ name: 'Sections', value: 'sections' },
					{ name: 'Sections User Count', value: 'sections_user_count' },
				],
				default: [],
				description: 'Additional data to include',
			},
			{
				displayName: 'Latest Only',
				name: 'latestOnly',
				type: 'boolean',
				default: false,
				description: 'Whether to return only the latest announcement for each course',
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
				description: 'Return announcements posted after this date',
			},
		],
	},

	// ----------------------------------
	//         announcement: get options
	// ----------------------------------
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['announcement'],
				operation: ['get'],
			},
		},
		options: [
			{
				displayName: 'Include',
				name: 'include',
				type: 'multiOptions',
				options: [
					{ name: 'Sections', value: 'sections' },
					{ name: 'Sections User Count', value: 'sections_user_count' },
				],
				default: [],
				description: 'Additional data to include',
			},
		],
	},
];
