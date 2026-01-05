/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const assignmentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['assignment'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create an assignment',
				action: 'Create an assignment',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an assignment',
				action: 'Delete an assignment',
			},
			{
				name: 'Duplicate',
				value: 'duplicate',
				description: 'Duplicate an assignment',
				action: 'Duplicate an assignment',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an assignment',
				action: 'Get an assignment',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many assignments',
				action: 'Get many assignments',
			},
			{
				name: 'Get Overrides',
				value: 'getOverrides',
				description: 'Get assignment overrides',
				action: 'Get assignment overrides',
			},
			{
				name: 'Get Submissions',
				value: 'getSubmissions',
				description: 'Get assignment submissions',
				action: 'Get assignment submissions',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an assignment',
				action: 'Update an assignment',
			},
		],
		default: 'getAll',
	},
];

export const assignmentFields: INodeProperties[] = [
	// ----------------------------------
	//         assignment: create
	// ----------------------------------
	{
		displayName: 'Course ID',
		name: 'courseId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['assignment'],
				operation: ['create', 'get', 'getAll', 'update', 'delete', 'duplicate', 'getSubmissions', 'getOverrides'],
			},
		},
		description: 'The ID of the course',
	},
	{
		displayName: 'Assignment Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['assignment'],
				operation: ['create'],
			},
		},
		description: 'The name of the assignment',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['assignment'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Allowed Attempts',
				name: 'allowed_attempts',
				type: 'number',
				default: -1,
				description: 'Number of allowed attempts (-1 for unlimited)',
			},
			{
				displayName: 'Allowed Extensions',
				name: 'allowed_extensions',
				type: 'string',
				default: '',
				description: 'Allowed file extensions (comma-separated, e.g., pdf,docx)',
			},
			{
				displayName: 'Anonymous Grading',
				name: 'anonymous_grading',
				type: 'boolean',
				default: false,
				description: 'Whether to enable anonymous grading',
			},
			{
				displayName: 'Assignment Group ID',
				name: 'assignment_group_id',
				type: 'string',
				default: '',
				description: 'The assignment group ID',
			},
			{
				displayName: 'Automatic Peer Reviews',
				name: 'automatic_peer_reviews',
				type: 'boolean',
				default: false,
				description: 'Whether to enable automatic peer reviews',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'Assignment instructions (HTML)',
			},
			{
				displayName: 'Due Date',
				name: 'due_at',
				type: 'dateTime',
				default: '',
				description: 'The due date',
			},
			{
				displayName: 'Grading Type',
				name: 'grading_type',
				type: 'options',
				options: [
					{ name: 'GPA Scale', value: 'gpa_scale' },
					{ name: 'Letter Grade', value: 'letter_grade' },
					{ name: 'Not Graded', value: 'not_graded' },
					{ name: 'Pass/Fail', value: 'pass_fail' },
					{ name: 'Percentage', value: 'percent' },
					{ name: 'Points', value: 'points' },
				],
				default: 'points',
				description: 'The grading type',
			},
			{
				displayName: 'Lock Date',
				name: 'lock_at',
				type: 'dateTime',
				default: '',
				description: 'Date when assignment locks',
			},
			{
				displayName: 'Moderated Grading',
				name: 'moderated_grading',
				type: 'boolean',
				default: false,
				description: 'Whether to enable moderated grading',
			},
			{
				displayName: 'Notify of Update',
				name: 'notify_of_update',
				type: 'boolean',
				default: false,
				description: 'Whether to notify students of the assignment',
			},
			{
				displayName: 'Omit from Final Grade',
				name: 'omit_from_final_grade',
				type: 'boolean',
				default: false,
				description: 'Whether to omit from final grade calculation',
			},
			{
				displayName: 'Only Visible to Overrides',
				name: 'only_visible_to_overrides',
				type: 'boolean',
				default: false,
				description: 'Whether only visible to students with overrides',
			},
			{
				displayName: 'Peer Reviews',
				name: 'peer_reviews',
				type: 'boolean',
				default: false,
				description: 'Whether to enable peer reviews',
			},
			{
				displayName: 'Points Possible',
				name: 'points_possible',
				type: 'number',
				default: 100,
				description: 'Maximum points for the assignment',
			},
			{
				displayName: 'Position',
				name: 'position',
				type: 'number',
				default: 1,
				description: 'Position in the assignment list',
			},
			{
				displayName: 'Post to SIS',
				name: 'post_to_sis',
				type: 'boolean',
				default: false,
				description: 'Whether to post grades to SIS',
			},
			{
				displayName: 'Published',
				name: 'published',
				type: 'boolean',
				default: false,
				description: 'Whether the assignment is published',
			},
			{
				displayName: 'Submission Types',
				name: 'submission_types',
				type: 'multiOptions',
				options: [
					{ name: 'Discussion Topic', value: 'discussion_topic' },
					{ name: 'External Tool', value: 'external_tool' },
					{ name: 'Media Recording', value: 'media_recording' },
					{ name: 'None', value: 'none' },
					{ name: 'Not Graded', value: 'not_graded' },
					{ name: 'On Paper', value: 'on_paper' },
					{ name: 'Online Quiz', value: 'online_quiz' },
					{ name: 'Online Text Entry', value: 'online_text_entry' },
					{ name: 'Online Upload', value: 'online_upload' },
					{ name: 'Online URL', value: 'online_url' },
				],
				default: ['online_text_entry'],
				description: 'Allowed submission types',
			},
			{
				displayName: 'Unlock Date',
				name: 'unlock_at',
				type: 'dateTime',
				default: '',
				description: 'Date when assignment becomes available',
			},
		],
	},

	// ----------------------------------
	//         assignment: get, update, delete, duplicate
	// ----------------------------------
	{
		displayName: 'Assignment ID',
		name: 'assignmentId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['assignment'],
				operation: ['get', 'update', 'delete', 'duplicate', 'getSubmissions', 'getOverrides'],
			},
		},
		description: 'The ID of the assignment',
	},
	{
		displayName: 'Include',
		name: 'include',
		type: 'multiOptions',
		default: [],
		displayOptions: {
			show: {
				resource: ['assignment'],
				operation: ['get'],
			},
		},
		options: [
			{ name: 'All Dates', value: 'all_dates' },
			{ name: 'Can Edit', value: 'can_edit' },
			{ name: 'Overrides', value: 'overrides' },
			{ name: 'Rubric Assessment', value: 'rubric_assessment' },
			{ name: 'Score Statistics', value: 'score_statistics' },
			{ name: 'Submission', value: 'submission' },
		],
		description: 'Additional data to include',
	},

	// ----------------------------------
	//         assignment: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['assignment'],
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
				resource: ['assignment'],
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
				resource: ['assignment'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Assignment Group ID',
				name: 'assignment_group_id',
				type: 'string',
				default: '',
				description: 'Filter by assignment group',
			},
			{
				displayName: 'Bucket',
				name: 'bucket',
				type: 'options',
				options: [
					{ name: 'Future', value: 'future' },
					{ name: 'Overdue', value: 'overdue' },
					{ name: 'Past', value: 'past' },
					{ name: 'Undated', value: 'undated' },
					{ name: 'Ungraded', value: 'ungraded' },
					{ name: 'Unsubmitted', value: 'unsubmitted' },
					{ name: 'Upcoming', value: 'upcoming' },
				],
				default: '',
				description: 'Filter by time bucket',
			},
			{
				displayName: 'Include',
				name: 'include',
				type: 'multiOptions',
				options: [
					{ name: 'All Dates', value: 'all_dates' },
					{ name: 'Can Edit', value: 'can_edit' },
					{ name: 'Observed Users', value: 'observed_users' },
					{ name: 'Overrides', value: 'overrides' },
					{ name: 'Rubric Assessment', value: 'rubric_assessment' },
					{ name: 'Score Statistics', value: 'score_statistics' },
					{ name: 'Submission', value: 'submission' },
				],
				default: [],
				description: 'Additional data to include',
			},
			{
				displayName: 'Needs Grading Count by Section',
				name: 'needs_grading_count_by_section',
				type: 'boolean',
				default: false,
				description: 'Whether to include needs grading count by section',
			},
			{
				displayName: 'Order By',
				name: 'order_by',
				type: 'options',
				options: [
					{ name: 'Due At', value: 'due_at' },
					{ name: 'Name', value: 'name' },
					{ name: 'Position', value: 'position' },
				],
				default: 'position',
				description: 'Field to order by',
			},
			{
				displayName: 'Search Term',
				name: 'search_term',
				type: 'string',
				default: '',
				description: 'Search by assignment name',
			},
		],
	},

	// ----------------------------------
	//         assignment: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['assignment'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Allowed Attempts',
				name: 'allowed_attempts',
				type: 'number',
				default: -1,
				description: 'Number of allowed attempts',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'Assignment instructions (HTML)',
			},
			{
				displayName: 'Due Date',
				name: 'due_at',
				type: 'dateTime',
				default: '',
				description: 'The due date',
			},
			{
				displayName: 'Grading Type',
				name: 'grading_type',
				type: 'options',
				options: [
					{ name: 'GPA Scale', value: 'gpa_scale' },
					{ name: 'Letter Grade', value: 'letter_grade' },
					{ name: 'Not Graded', value: 'not_graded' },
					{ name: 'Pass/Fail', value: 'pass_fail' },
					{ name: 'Percentage', value: 'percent' },
					{ name: 'Points', value: 'points' },
				],
				default: 'points',
				description: 'The grading type',
			},
			{
				displayName: 'Lock Date',
				name: 'lock_at',
				type: 'dateTime',
				default: '',
				description: 'Date when assignment locks',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The assignment name',
			},
			{
				displayName: 'Points Possible',
				name: 'points_possible',
				type: 'number',
				default: 100,
				description: 'Maximum points for the assignment',
			},
			{
				displayName: 'Published',
				name: 'published',
				type: 'boolean',
				default: false,
				description: 'Whether the assignment is published',
			},
			{
				displayName: 'Unlock Date',
				name: 'unlock_at',
				type: 'dateTime',
				default: '',
				description: 'Date when assignment becomes available',
			},
		],
	},

	// ----------------------------------
	//         assignment: getSubmissions
	// ----------------------------------
	{
		displayName: 'Return All Submissions',
		name: 'returnAllSubmissions',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['assignment'],
				operation: ['getSubmissions'],
			},
		},
		description: 'Whether to return all submissions',
	},
	{
		displayName: 'Submission Limit',
		name: 'submissionLimit',
		type: 'number',
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		displayOptions: {
			show: {
				resource: ['assignment'],
				operation: ['getSubmissions'],
				returnAllSubmissions: [false],
			},
		},
		description: 'Max number of submissions to return',
	},
	{
		displayName: 'Submission Filters',
		name: 'submissionFilters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['assignment'],
				operation: ['getSubmissions'],
			},
		},
		options: [
			{
				displayName: 'Graded Since',
				name: 'graded_since',
				type: 'dateTime',
				default: '',
				description: 'Filter submissions graded after this date',
			},
			{
				displayName: 'Include',
				name: 'include',
				type: 'multiOptions',
				options: [
					{ name: 'Assignment', value: 'assignment' },
					{ name: 'Course', value: 'course' },
					{ name: 'Group', value: 'group' },
					{ name: 'Read Status', value: 'read_status' },
					{ name: 'Rubric Assessment', value: 'rubric_assessment' },
					{ name: 'Submission Comments', value: 'submission_comments' },
					{ name: 'Submission History', value: 'submission_history' },
					{ name: 'Total Scores', value: 'total_scores' },
					{ name: 'User', value: 'user' },
					{ name: 'Visibility', value: 'visibility' },
				],
				default: [],
				description: 'Additional data to include',
			},
			{
				displayName: 'Workflow State',
				name: 'workflow_state',
				type: 'options',
				options: [
					{ name: 'Graded', value: 'graded' },
					{ name: 'Pending Review', value: 'pending_review' },
					{ name: 'Submitted', value: 'submitted' },
					{ name: 'Unsubmitted', value: 'unsubmitted' },
				],
				default: '',
				description: 'Filter by submission state',
			},
		],
	},
];
