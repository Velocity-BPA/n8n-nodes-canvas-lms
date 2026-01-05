/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const enrollmentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['enrollment'],
			},
		},
		options: [
			{
				name: 'Conclude',
				value: 'conclude',
				description: 'Conclude an enrollment',
				action: 'Conclude an enrollment',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Enroll a user in a course',
				action: 'Create an enrollment',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an enrollment',
				action: 'Delete an enrollment',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an enrollment',
				action: 'Get an enrollment',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many enrollments',
				action: 'Get many enrollments',
			},
			{
				name: 'Reactivate',
				value: 'reactivate',
				description: 'Reactivate an enrollment',
				action: 'Reactivate an enrollment',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an enrollment',
				action: 'Update an enrollment',
			},
		],
		default: 'getAll',
	},
];

export const enrollmentFields: INodeProperties[] = [
	// ----------------------------------
	//         enrollment: create
	// ----------------------------------
	{
		displayName: 'Course ID',
		name: 'courseId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['enrollment'],
				operation: ['create', 'getAll'],
			},
		},
		description: 'The ID of the course',
	},
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['enrollment'],
				operation: ['create'],
			},
		},
		description: 'The ID of the user to enroll',
	},
	{
		displayName: 'Enrollment Type',
		name: 'enrollmentType',
		type: 'options',
		required: true,
		default: 'StudentEnrollment',
		displayOptions: {
			show: {
				resource: ['enrollment'],
				operation: ['create'],
			},
		},
		options: [
			{ name: 'Designer', value: 'DesignerEnrollment' },
			{ name: 'Observer', value: 'ObserverEnrollment' },
			{ name: 'Student', value: 'StudentEnrollment' },
			{ name: 'Teaching Assistant', value: 'TaEnrollment' },
			{ name: 'Teacher', value: 'TeacherEnrollment' },
		],
		description: 'The type of enrollment',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['enrollment'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Associated User ID',
				name: 'associated_user_id',
				type: 'string',
				default: '',
				description: 'For observer enrollments, the ID of the student being observed',
			},
			{
				displayName: 'Course Section ID',
				name: 'course_section_id',
				type: 'string',
				default: '',
				description: 'The course section ID to enroll in',
			},
			{
				displayName: 'End Date',
				name: 'end_at',
				type: 'dateTime',
				default: '',
				description: 'End date for the enrollment',
			},
			{
				displayName: 'Enrollment State',
				name: 'enrollment_state',
				type: 'options',
				options: [
					{ name: 'Active', value: 'active' },
					{ name: 'Inactive', value: 'inactive' },
					{ name: 'Invited', value: 'invited' },
				],
				default: 'active',
				description: 'The state of the enrollment',
			},
			{
				displayName: 'Limit Privileges to Section',
				name: 'limit_privileges_to_course_section',
				type: 'boolean',
				default: false,
				description: 'Whether to limit enrollment to specific section',
			},
			{
				displayName: 'Notify',
				name: 'notify',
				type: 'boolean',
				default: true,
				description: 'Whether to notify the user of the enrollment',
			},
			{
				displayName: 'Role ID',
				name: 'role_id',
				type: 'string',
				default: '',
				description: 'Custom role ID for the enrollment',
			},
			{
				displayName: 'Self Enrolled',
				name: 'self_enrolled',
				type: 'boolean',
				default: false,
				description: 'Whether this is a self-enrollment',
			},
			{
				displayName: 'Self Enrollment Code',
				name: 'self_enrollment_code',
				type: 'string',
				default: '',
				description: 'Self-enrollment code if applicable',
			},
			{
				displayName: 'SIS Section ID',
				name: 'sis_section_id',
				type: 'string',
				default: '',
				description: 'SIS ID for the section',
			},
			{
				displayName: 'Start Date',
				name: 'start_at',
				type: 'dateTime',
				default: '',
				description: 'Start date for the enrollment',
			},
		],
	},

	// ----------------------------------
	//         enrollment: get, update, delete, conclude, reactivate
	// ----------------------------------
	{
		displayName: 'Enrollment ID',
		name: 'enrollmentId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['enrollment'],
				operation: ['get', 'update', 'delete', 'conclude', 'reactivate'],
			},
		},
		description: 'The ID of the enrollment',
	},
	{
		displayName: 'Course ID for Enrollment',
		name: 'courseIdForEnrollment',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['enrollment'],
				operation: ['get', 'update', 'delete', 'conclude', 'reactivate'],
			},
		},
		description: 'The ID of the course containing the enrollment',
	},

	// ----------------------------------
	//         enrollment: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['enrollment'],
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
				resource: ['enrollment'],
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
				resource: ['enrollment'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Grading Period ID',
				name: 'grading_period_id',
				type: 'string',
				default: '',
				description: 'Filter by grading period ID',
			},
			{
				displayName: 'Include',
				name: 'include',
				type: 'multiOptions',
				options: [
					{ name: 'Avatar URL', value: 'avatar_url' },
					{ name: 'Current Points', value: 'current_points' },
					{ name: 'Group IDs', value: 'group_ids' },
					{ name: 'Locked', value: 'locked' },
					{ name: 'Observed Users', value: 'observed_users' },
					{ name: 'Total Scores', value: 'total_scores' },
					{ name: 'UUID', value: 'uuid' },
				],
				default: [],
				description: 'Additional data to include',
			},
			{
				displayName: 'Role',
				name: 'role',
				type: 'multiOptions',
				options: [
					{ name: 'Designer', value: 'DesignerEnrollment' },
					{ name: 'Observer', value: 'ObserverEnrollment' },
					{ name: 'Student', value: 'StudentEnrollment' },
					{ name: 'TA', value: 'TaEnrollment' },
					{ name: 'Teacher', value: 'TeacherEnrollment' },
				],
				default: [],
				description: 'Filter by enrollment role',
			},
			{
				displayName: 'SIS Account ID',
				name: 'sis_account_id',
				type: 'string',
				default: '',
				description: 'Filter by SIS account ID',
			},
			{
				displayName: 'SIS Course ID',
				name: 'sis_course_id',
				type: 'string',
				default: '',
				description: 'Filter by SIS course ID',
			},
			{
				displayName: 'SIS Section ID',
				name: 'sis_section_id',
				type: 'string',
				default: '',
				description: 'Filter by SIS section ID',
			},
			{
				displayName: 'SIS User ID',
				name: 'sis_user_id',
				type: 'string',
				default: '',
				description: 'Filter by SIS user ID',
			},
			{
				displayName: 'State',
				name: 'state',
				type: 'multiOptions',
				options: [
					{ name: 'Active', value: 'active' },
					{ name: 'Completed', value: 'completed' },
					{ name: 'Creation Pending', value: 'creation_pending' },
					{ name: 'Deleted', value: 'deleted' },
					{ name: 'Inactive', value: 'inactive' },
					{ name: 'Invited', value: 'invited' },
					{ name: 'Rejected', value: 'rejected' },
				],
				default: [],
				description: 'Filter by enrollment state',
			},
			{
				displayName: 'User ID',
				name: 'user_id',
				type: 'string',
				default: '',
				description: 'Filter by specific user ID',
			},
		],
	},

	// ----------------------------------
	//         enrollment: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['enrollment'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Course Section ID',
				name: 'course_section_id',
				type: 'string',
				default: '',
				description: 'Move to a different section',
			},
			{
				displayName: 'End Date',
				name: 'end_at',
				type: 'dateTime',
				default: '',
				description: 'Update end date',
			},
			{
				displayName: 'Limit Privileges to Section',
				name: 'limit_privileges_to_course_section',
				type: 'boolean',
				default: false,
				description: 'Whether to limit enrollment to specific section',
			},
			{
				displayName: 'Start Date',
				name: 'start_at',
				type: 'dateTime',
				default: '',
				description: 'Update start date',
			},
		],
	},

	// ----------------------------------
	//         enrollment: delete
	// ----------------------------------
	{
		displayName: 'Task',
		name: 'task',
		type: 'options',
		default: 'conclude',
		displayOptions: {
			show: {
				resource: ['enrollment'],
				operation: ['delete'],
			},
		},
		options: [
			{ name: 'Conclude', value: 'conclude' },
			{ name: 'Deactivate', value: 'deactivate' },
			{ name: 'Delete', value: 'delete' },
			{ name: 'Inactivate', value: 'inactivate' },
		],
		description: 'The task to perform on the enrollment',
	},
];
