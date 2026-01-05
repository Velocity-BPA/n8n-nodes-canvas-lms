/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const submissionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['submission'],
			},
		},
		options: [
			{
				name: 'Add Comment',
				value: 'addComment',
				description: 'Add a comment to a submission',
				action: 'Add comment to submission',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Submit on behalf of a student',
				action: 'Create a submission',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a submission',
				action: 'Get a submission',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many submissions',
				action: 'Get many submissions',
			},
			{
				name: 'Grade',
				value: 'grade',
				description: 'Grade a submission',
				action: 'Grade a submission',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a submission',
				action: 'Update a submission',
			},
			{
				name: 'Upload File',
				value: 'uploadFile',
				description: 'Upload a file for submission',
				action: 'Upload file for submission',
			},
		],
		default: 'getAll',
	},
];

export const submissionFields: INodeProperties[] = [
	// ----------------------------------
	//         submission: common fields
	// ----------------------------------
	{
		displayName: 'Course ID',
		name: 'courseId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['submission'],
				operation: ['get', 'getAll', 'create', 'update', 'grade', 'addComment', 'uploadFile'],
			},
		},
		description: 'The ID of the course',
	},
	{
		displayName: 'Assignment ID',
		name: 'assignmentId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['submission'],
				operation: ['get', 'getAll', 'create', 'update', 'grade', 'addComment', 'uploadFile'],
			},
		},
		description: 'The ID of the assignment',
	},

	// ----------------------------------
	//         submission: get, update, grade, addComment
	// ----------------------------------
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['submission'],
				operation: ['get', 'update', 'grade', 'addComment', 'uploadFile'],
			},
		},
		description: 'The ID of the user',
	},
	{
		displayName: 'Include',
		name: 'include',
		type: 'multiOptions',
		default: [],
		displayOptions: {
			show: {
				resource: ['submission'],
				operation: ['get'],
			},
		},
		options: [
			{ name: 'Assignment', value: 'assignment' },
			{ name: 'Course', value: 'course' },
			{ name: 'Full Rubric Assessment', value: 'full_rubric_assessment' },
			{ name: 'Read Status', value: 'read_status' },
			{ name: 'Rubric Assessment', value: 'rubric_assessment' },
			{ name: 'Submission Comments', value: 'submission_comments' },
			{ name: 'Submission History', value: 'submission_history' },
			{ name: 'User', value: 'user' },
			{ name: 'Visibility', value: 'visibility' },
		],
		description: 'Additional data to include',
	},

	// ----------------------------------
	//         submission: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['submission'],
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
				resource: ['submission'],
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
				resource: ['submission'],
				operation: ['getAll'],
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
				displayName: 'Grouped',
				name: 'grouped',
				type: 'boolean',
				default: false,
				description: 'Whether to return grouped submissions',
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
				displayName: 'Submitted Since',
				name: 'submitted_since',
				type: 'dateTime',
				default: '',
				description: 'Filter submissions submitted after this date',
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

	// ----------------------------------
	//         submission: create
	// ----------------------------------
	{
		displayName: 'Student User ID',
		name: 'studentUserId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['submission'],
				operation: ['create'],
			},
		},
		description: 'The ID of the student to submit on behalf of',
	},
	{
		displayName: 'Submission Type',
		name: 'submissionType',
		type: 'options',
		required: true,
		default: 'online_text_entry',
		displayOptions: {
			show: {
				resource: ['submission'],
				operation: ['create'],
			},
		},
		options: [
			{ name: 'Basic LTI Launch', value: 'basic_lti_launch' },
			{ name: 'Media Recording', value: 'media_recording' },
			{ name: 'Online Text Entry', value: 'online_text_entry' },
			{ name: 'Online Upload', value: 'online_upload' },
			{ name: 'Online URL', value: 'online_url' },
		],
		description: 'The type of submission',
	},
	{
		displayName: 'Submission Content',
		name: 'submissionContent',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		default: '',
		displayOptions: {
			show: {
				resource: ['submission'],
				operation: ['create'],
				submissionType: ['online_text_entry'],
			},
		},
		description: 'The text content of the submission (HTML)',
	},
	{
		displayName: 'Submission URL',
		name: 'submissionUrl',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['submission'],
				operation: ['create'],
				submissionType: ['online_url'],
			},
		},
		description: 'The URL for the submission',
	},

	// ----------------------------------
	//         submission: grade
	// ----------------------------------
	{
		displayName: 'Grade',
		name: 'grade',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['submission'],
				operation: ['grade'],
			},
		},
		description: 'The grade (points, percentage, letter grade based on assignment type)',
	},
	{
		displayName: 'Grade Options',
		name: 'gradeOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['submission'],
				operation: ['grade'],
			},
		},
		options: [
			{
				displayName: 'Comment',
				name: 'comment',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'Feedback comment',
			},
			{
				displayName: 'Excuse',
				name: 'excuse',
				type: 'boolean',
				default: false,
				description: 'Whether to excuse the submission',
			},
			{
				displayName: 'Late Policy Status',
				name: 'late_policy_status',
				type: 'options',
				options: [
					{ name: 'Extended', value: 'extended' },
					{ name: 'Late', value: 'late' },
					{ name: 'Missing', value: 'missing' },
					{ name: 'None', value: 'none' },
				],
				default: 'none',
				description: 'Late policy status',
			},
			{
				displayName: 'Posted Grade',
				name: 'posted_grade',
				type: 'string',
				default: '',
				description: 'The posted grade',
			},
			{
				displayName: 'Seconds Late Override',
				name: 'seconds_late_override',
				type: 'number',
				default: 0,
				description: 'Override for seconds late',
			},
		],
	},

	// ----------------------------------
	//         submission: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['submission'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Excuse',
				name: 'excuse',
				type: 'boolean',
				default: false,
				description: 'Whether to excuse the submission',
			},
			{
				displayName: 'Grade',
				name: 'posted_grade',
				type: 'string',
				default: '',
				description: 'The grade to assign',
			},
			{
				displayName: 'Late Policy Status',
				name: 'late_policy_status',
				type: 'options',
				options: [
					{ name: 'Extended', value: 'extended' },
					{ name: 'Late', value: 'late' },
					{ name: 'Missing', value: 'missing' },
					{ name: 'None', value: 'none' },
				],
				default: 'none',
				description: 'Late policy status',
			},
			{
				displayName: 'Seconds Late Override',
				name: 'seconds_late_override',
				type: 'number',
				default: 0,
				description: 'Override for seconds late',
			},
		],
	},

	// ----------------------------------
	//         submission: addComment
	// ----------------------------------
	{
		displayName: 'Comment',
		name: 'comment',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['submission'],
				operation: ['addComment'],
			},
		},
		description: 'The comment text',
	},
	{
		displayName: 'Comment Options',
		name: 'commentOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['submission'],
				operation: ['addComment'],
			},
		},
		options: [
			{
				displayName: 'Attempt',
				name: 'attempt',
				type: 'number',
				default: 0,
				description: 'The submission attempt to comment on',
			},
			{
				displayName: 'Group Comment',
				name: 'group_comment',
				type: 'boolean',
				default: false,
				description: 'Whether this is a group comment',
			},
		],
	},

	// ----------------------------------
	//         submission: uploadFile
	// ----------------------------------
	{
		displayName: 'Binary Property',
		name: 'binaryProperty',
		type: 'string',
		default: 'data',
		required: true,
		displayOptions: {
			show: {
				resource: ['submission'],
				operation: ['uploadFile'],
			},
		},
		description: 'Name of the binary property containing the file data',
	},
	{
		displayName: 'File Name',
		name: 'fileName',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['submission'],
				operation: ['uploadFile'],
			},
		},
		description: 'Name for the uploaded file (if empty, uses binary property filename)',
	},
];
