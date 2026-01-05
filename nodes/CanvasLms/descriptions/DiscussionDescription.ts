/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const discussionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['discussion'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new discussion topic',
				action: 'Create a discussion',
			},
			{
				name: 'Create Entry',
				value: 'createEntry',
				description: 'Add a reply to a discussion',
				action: 'Create a discussion entry',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a discussion topic',
				action: 'Delete a discussion',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a discussion topic by ID',
				action: 'Get a discussion',
			},
			{
				name: 'Get Entries',
				value: 'getEntries',
				description: 'List replies for a discussion',
				action: 'Get discussion entries',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many discussion topics',
				action: 'Get many discussions',
			},
			{
				name: 'Mark as Read',
				value: 'markRead',
				description: 'Mark a discussion as read',
				action: 'Mark discussion as read',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a discussion topic',
				action: 'Update a discussion',
			},
		],
		default: 'get',
	},
];

export const discussionFields: INodeProperties[] = [
	// ----------------------------------
	//         discussion: shared fields
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
				resource: ['discussion'],
			},
		},
	},

	// ----------------------------------
	//         discussion: get, update, delete, etc.
	// ----------------------------------
	{
		displayName: 'Discussion Topic ID',
		name: 'topicId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the discussion topic',
		displayOptions: {
			show: {
				resource: ['discussion'],
				operation: ['get', 'update', 'delete', 'getEntries', 'createEntry', 'markRead'],
			},
		},
	},

	// ----------------------------------
	//         discussion: create
	// ----------------------------------
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		required: true,
		default: '',
		description: 'The title of the discussion topic',
		displayOptions: {
			show: {
				resource: ['discussion'],
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
				resource: ['discussion'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Allow Rating',
				name: 'allowRating',
				type: 'boolean',
				default: false,
				description: 'Whether users can rate entries',
			},
			{
				displayName: 'Assignment ID',
				name: 'assignmentId',
				type: 'string',
				default: '',
				description: 'Link discussion to an assignment for grading',
			},
			{
				displayName: 'Delayed Post At',
				name: 'delayedPostAt',
				type: 'dateTime',
				default: '',
				description: 'Schedule when to post the discussion',
			},
			{
				displayName: 'Discussion Type',
				name: 'discussionType',
				type: 'options',
				options: [
					{ name: 'Side Comment', value: 'side_comment' },
					{ name: 'Threaded', value: 'threaded' },
				],
				default: 'side_comment',
				description: 'The type of discussion',
			},
			{
				displayName: 'Group Category ID',
				name: 'groupCategoryId',
				type: 'string',
				default: '',
				description: 'Create group discussions',
			},
			{
				displayName: 'Is Announcement',
				name: 'isAnnouncement',
				type: 'boolean',
				default: false,
				description: 'Whether this is an announcement',
			},
			{
				displayName: 'Lock At',
				name: 'lockAt',
				type: 'dateTime',
				default: '',
				description: 'When to lock the discussion',
			},
			{
				displayName: 'Locked',
				name: 'locked',
				type: 'boolean',
				default: false,
				description: 'Whether the discussion is locked',
			},
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'The initial message content (HTML allowed)',
			},
			{
				displayName: 'Only Graders Can Rate',
				name: 'onlyGradersCanRate',
				type: 'boolean',
				default: false,
				description: 'Whether only graders can rate entries',
			},
			{
				displayName: 'Pinned',
				name: 'pinned',
				type: 'boolean',
				default: false,
				description: 'Whether to pin the discussion',
			},
			{
				displayName: 'Podcast Enabled',
				name: 'podcastEnabled',
				type: 'boolean',
				default: false,
				description: 'Whether to enable podcast feed',
			},
			{
				displayName: 'Podcast Has Student Posts',
				name: 'podcastHasStudentPosts',
				type: 'boolean',
				default: false,
				description: 'Whether to include student posts in podcast',
			},
			{
				displayName: 'Position After',
				name: 'positionAfter',
				type: 'string',
				default: '',
				description: 'ID of discussion topic to position after',
			},
			{
				displayName: 'Published',
				name: 'published',
				type: 'boolean',
				default: true,
				description: 'Whether the discussion is published',
			},
			{
				displayName: 'Require Initial Post',
				name: 'requireInitialPost',
				type: 'boolean',
				default: false,
				description: 'Whether students must post before seeing others',
			},
			{
				displayName: 'Sort by Rating',
				name: 'sortByRating',
				type: 'boolean',
				default: false,
				description: 'Whether to sort entries by rating',
			},
			{
				displayName: 'Specific Sections',
				name: 'specificSections',
				type: 'string',
				default: '',
				description: 'Comma-separated section IDs for targeted discussions',
			},
			{
				displayName: 'Todo Date',
				name: 'todoDate',
				type: 'dateTime',
				default: '',
				description: 'Add to student to-do list on this date',
			},
		],
	},

	// ----------------------------------
	//         discussion: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['discussion'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Allow Rating',
				name: 'allowRating',
				type: 'boolean',
				default: false,
				description: 'Whether users can rate entries',
			},
			{
				displayName: 'Delayed Post At',
				name: 'delayedPostAt',
				type: 'dateTime',
				default: '',
				description: 'Schedule when to post the discussion',
			},
			{
				displayName: 'Discussion Type',
				name: 'discussionType',
				type: 'options',
				options: [
					{ name: 'Side Comment', value: 'side_comment' },
					{ name: 'Threaded', value: 'threaded' },
				],
				default: 'side_comment',
				description: 'The type of discussion',
			},
			{
				displayName: 'Lock At',
				name: 'lockAt',
				type: 'dateTime',
				default: '',
				description: 'When to lock the discussion',
			},
			{
				displayName: 'Locked',
				name: 'locked',
				type: 'boolean',
				default: false,
				description: 'Whether the discussion is locked',
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
				description: 'Whether to pin the discussion',
			},
			{
				displayName: 'Published',
				name: 'published',
				type: 'boolean',
				default: true,
				description: 'Whether the discussion is published',
			},
			{
				displayName: 'Require Initial Post',
				name: 'requireInitialPost',
				type: 'boolean',
				default: false,
				description: 'Whether students must post before seeing others',
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'The title of the discussion topic',
			},
		],
	},

	// ----------------------------------
	//         discussion: getAll, getEntries
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['discussion'],
				operation: ['getAll', 'getEntries'],
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
				resource: ['discussion'],
				operation: ['getAll', 'getEntries'],
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
				resource: ['discussion'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Include',
				name: 'include',
				type: 'multiOptions',
				options: [
					{ name: 'All Dates', value: 'all_dates' },
					{ name: 'Overrides', value: 'overrides' },
					{ name: 'Sections', value: 'sections' },
					{ name: 'Sections User Count', value: 'sections_user_count' },
				],
				default: [],
				description: 'Additional data to include',
			},
			{
				displayName: 'Only Announcements',
				name: 'onlyAnnouncements',
				type: 'boolean',
				default: false,
				description: 'Whether to return only announcements',
			},
			{
				displayName: 'Order By',
				name: 'orderBy',
				type: 'options',
				options: [
					{ name: 'Position', value: 'position' },
					{ name: 'Recent Activity', value: 'recent_activity' },
					{ name: 'Title', value: 'title' },
				],
				default: 'position',
				description: 'How to order results',
			},
			{
				displayName: 'Scope',
				name: 'scope',
				type: 'options',
				options: [
					{ name: 'Locked', value: 'locked' },
					{ name: 'Unlocked', value: 'unlocked' },
					{ name: 'Pinned', value: 'pinned' },
					{ name: 'Unpinned', value: 'unpinned' },
				],
				default: 'unlocked',
				description: 'Filter by scope',
			},
			{
				displayName: 'Search Term',
				name: 'searchTerm',
				type: 'string',
				default: '',
				description: 'Search discussions by title',
			},
		],
	},

	// ----------------------------------
	//         discussion: createEntry
	// ----------------------------------
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
				resource: ['discussion'],
				operation: ['createEntry'],
			},
		},
	},
	{
		displayName: 'Entry Options',
		name: 'entryOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['discussion'],
				operation: ['createEntry'],
			},
		},
		options: [
			{
				displayName: 'Attachment',
				name: 'attachment',
				type: 'string',
				default: '',
				description: 'File ID to attach to the entry',
			},
			{
				displayName: 'Parent Entry ID',
				name: 'parentEntryId',
				type: 'string',
				default: '',
				description: 'ID of entry to reply to (for threaded discussions)',
			},
		],
	},

	// ----------------------------------
	//         discussion: get options
	// ----------------------------------
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['discussion'],
				operation: ['get'],
			},
		},
		options: [
			{
				displayName: 'Include',
				name: 'include',
				type: 'multiOptions',
				options: [
					{ name: 'All Dates', value: 'all_dates' },
					{ name: 'Overrides', value: 'overrides' },
					{ name: 'Sections', value: 'sections' },
					{ name: 'Sections User Count', value: 'sections_user_count' },
				],
				default: [],
				description: 'Additional data to include',
			},
		],
	},
];
