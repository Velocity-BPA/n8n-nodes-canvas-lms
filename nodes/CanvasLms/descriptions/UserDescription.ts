/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const userOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['user'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new user',
				action: 'Create a user',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a user',
				action: 'Delete a user',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a user',
				action: 'Get a user',
			},
			{
				name: 'Get Courses',
				value: 'getCourses',
				description: 'Get user courses',
				action: 'Get user courses',
			},
			{
				name: 'Get Custom Data',
				value: 'getCustomData',
				description: 'Get user custom data',
				action: 'Get user custom data',
			},
			{
				name: 'Get Enrollments',
				value: 'getEnrollments',
				description: 'Get user enrollments',
				action: 'Get user enrollments',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many users',
				action: 'Get many users',
			},
			{
				name: 'Get Profile',
				value: 'getProfile',
				description: 'Get user profile',
				action: 'Get user profile',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a user',
				action: 'Update a user',
			},
			{
				name: 'Update Avatar',
				value: 'updateAvatar',
				description: 'Update user avatar',
				action: 'Update user avatar',
			},
		],
		default: 'getAll',
	},
];

export const userFields: INodeProperties[] = [
	// ----------------------------------
	//         user: create
	// ----------------------------------
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['create', 'getAll'],
			},
		},
		description: 'The account ID to create the user in',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['create'],
			},
		},
		description: 'The full name of the user',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Authentication Provider ID',
				name: 'authentication_provider_id',
				type: 'string',
				default: '',
				description: 'The authentication provider ID',
			},
			{
				displayName: 'Bio',
				name: 'bio',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'User biography',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				description: 'The email address of the user',
			},
			{
				displayName: 'Force Validations',
				name: 'force_validations',
				type: 'boolean',
				default: false,
				description: 'Whether to force validations',
			},
			{
				displayName: 'Locale',
				name: 'locale',
				type: 'string',
				default: '',
				description: 'User locale (e.g., en, es, fr)',
			},
			{
				displayName: 'Login ID',
				name: 'login_id',
				type: 'string',
				default: '',
				description: 'The login ID / username',
			},
			{
				displayName: 'Password',
				name: 'password',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				description: 'Initial password for the user',
			},
			{
				displayName: 'Send Confirmation',
				name: 'send_confirmation',
				type: 'boolean',
				default: true,
				description: 'Whether to send a confirmation email',
			},
			{
				displayName: 'Short Name',
				name: 'short_name',
				type: 'string',
				default: '',
				description: 'Short display name',
			},
			{
				displayName: 'SIS User ID',
				name: 'sis_user_id',
				type: 'string',
				default: '',
				description: 'SIS integration ID for the user',
			},
			{
				displayName: 'Skip Registration',
				name: 'skip_registration',
				type: 'boolean',
				default: false,
				description: 'Whether to skip the registration process',
			},
			{
				displayName: 'Sortable Name',
				name: 'sortable_name',
				type: 'string',
				default: '',
				description: 'Sortable name (Last, First format)',
			},
			{
				displayName: 'Terms of Use',
				name: 'terms_of_use',
				type: 'boolean',
				default: false,
				description: 'Whether user has accepted terms of use',
			},
			{
				displayName: 'Time Zone',
				name: 'time_zone',
				type: 'string',
				default: '',
				description: 'User time zone (e.g., America/New_York)',
			},
		],
	},

	// ----------------------------------
	//         user: get, update, delete
	// ----------------------------------
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['get', 'update', 'delete', 'getEnrollments', 'getCourses', 'getProfile', 'updateAvatar', 'getCustomData'],
			},
		},
		description: 'The ID of the user (use "self" for current user, or sis_user_id:SISID format)',
	},
	{
		displayName: 'Include',
		name: 'include',
		type: 'multiOptions',
		default: [],
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['get'],
			},
		},
		options: [
			{ name: 'Avatar URL', value: 'avatar_url' },
			{ name: 'Bio', value: 'bio' },
			{ name: 'Email', value: 'email' },
			{ name: 'Enrollments', value: 'enrollments' },
			{ name: 'Last Login', value: 'last_login' },
			{ name: 'Locale', value: 'locale' },
			{ name: 'Permissions', value: 'permissions' },
			{ name: 'Terms of Use', value: 'terms_of_use' },
			{ name: 'Time Zone', value: 'time_zone' },
			{ name: 'UUID', value: 'uuid' },
		],
		description: 'Additional data to include',
	},

	// ----------------------------------
	//         user: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['user'],
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
				resource: ['user'],
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
				resource: ['user'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Include',
				name: 'include',
				type: 'multiOptions',
				options: [
					{ name: 'Avatar URL', value: 'avatar_url' },
					{ name: 'Email', value: 'email' },
					{ name: 'Enrollments', value: 'enrollments' },
					{ name: 'Last Login', value: 'last_login' },
					{ name: 'Test Student', value: 'test_student' },
					{ name: 'Time Zone', value: 'time_zone' },
				],
				default: [],
				description: 'Additional data to include',
			},
			{
				displayName: 'Search Term',
				name: 'search_term',
				type: 'string',
				default: '',
				description: 'Search by user name, email, or login ID',
			},
			{
				displayName: 'Sort',
				name: 'sort',
				type: 'options',
				options: [
					{ name: 'Created At (Ascending)', value: 'created_at' },
					{ name: 'Email', value: 'email' },
					{ name: 'Last Login', value: 'last_login' },
					{ name: 'SIS ID', value: 'sis_id' },
					{ name: 'Username', value: 'username' },
				],
				default: 'username',
				description: 'Field to sort by',
			},
			{
				displayName: 'Order',
				name: 'order',
				type: 'options',
				options: [
					{ name: 'Ascending', value: 'asc' },
					{ name: 'Descending', value: 'desc' },
				],
				default: 'asc',
				description: 'Sort order',
			},
		],
	},

	// ----------------------------------
	//         user: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Avatar Token',
				name: 'avatar_token',
				type: 'string',
				default: '',
				description: 'Token for updating avatar',
			},
			{
				displayName: 'Avatar URL',
				name: 'avatar_url',
				type: 'string',
				default: '',
				description: 'URL of the avatar image',
			},
			{
				displayName: 'Bio',
				name: 'bio',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'User biography',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				description: 'The email address',
			},
			{
				displayName: 'Locale',
				name: 'locale',
				type: 'string',
				default: '',
				description: 'User locale',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Full name',
			},
			{
				displayName: 'Short Name',
				name: 'short_name',
				type: 'string',
				default: '',
				description: 'Short display name',
			},
			{
				displayName: 'Sortable Name',
				name: 'sortable_name',
				type: 'string',
				default: '',
				description: 'Sortable name (Last, First format)',
			},
			{
				displayName: 'Time Zone',
				name: 'time_zone',
				type: 'string',
				default: '',
				description: 'User time zone',
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'User title',
			},
		],
	},

	// ----------------------------------
	//         user: getEnrollments
	// ----------------------------------
	{
		displayName: 'Return All Enrollments',
		name: 'returnAllEnrollments',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['getEnrollments'],
			},
		},
		description: 'Whether to return all enrollments',
	},
	{
		displayName: 'Enrollment Limit',
		name: 'enrollmentLimit',
		type: 'number',
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['getEnrollments'],
				returnAllEnrollments: [false],
			},
		},
		description: 'Max number of enrollments to return',
	},
	{
		displayName: 'Enrollment Filters',
		name: 'enrollmentFilters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['getEnrollments'],
			},
		},
		options: [
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
				displayName: 'Type',
				name: 'type',
				type: 'multiOptions',
				options: [
					{ name: 'Designer', value: 'DesignerEnrollment' },
					{ name: 'Observer', value: 'ObserverEnrollment' },
					{ name: 'Student', value: 'StudentEnrollment' },
					{ name: 'TA', value: 'TaEnrollment' },
					{ name: 'Teacher', value: 'TeacherEnrollment' },
				],
				default: [],
				description: 'Filter by enrollment type',
			},
		],
	},

	// ----------------------------------
	//         user: getCourses
	// ----------------------------------
	{
		displayName: 'Return All Courses',
		name: 'returnAllCourses',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['getCourses'],
			},
		},
		description: 'Whether to return all courses',
	},
	{
		displayName: 'Course Limit',
		name: 'courseLimit',
		type: 'number',
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['getCourses'],
				returnAllCourses: [false],
			},
		},
		description: 'Max number of courses to return',
	},
	{
		displayName: 'Course Filters',
		name: 'courseFilters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['getCourses'],
			},
		},
		options: [
			{
				displayName: 'Enrollment State',
				name: 'enrollment_state',
				type: 'options',
				options: [
					{ name: 'Active', value: 'active' },
					{ name: 'Completed', value: 'completed' },
					{ name: 'Invited or Pending', value: 'invited_or_pending' },
				],
				default: 'active',
				description: 'Filter by enrollment state',
			},
			{
				displayName: 'Include',
				name: 'include',
				type: 'multiOptions',
				options: [
					{ name: 'Banner Image', value: 'banner_image' },
					{ name: 'Concluded', value: 'concluded' },
					{ name: 'Course Image', value: 'course_image' },
					{ name: 'Current Grading Period Scores', value: 'current_grading_period_scores' },
					{ name: 'Favorites', value: 'favorites' },
					{ name: 'Needs Grading Count', value: 'needs_grading_count' },
					{ name: 'Observed Users', value: 'observed_users' },
					{ name: 'Public Description', value: 'public_description' },
					{ name: 'Sections', value: 'sections' },
					{ name: 'Syllabus Body', value: 'syllabus_body' },
					{ name: 'Term', value: 'term' },
					{ name: 'Total Scores', value: 'total_scores' },
				],
				default: [],
				description: 'Additional data to include',
			},
			{
				displayName: 'State',
				name: 'state',
				type: 'multiOptions',
				options: [
					{ name: 'Available', value: 'available' },
					{ name: 'Completed', value: 'completed' },
					{ name: 'Unpublished', value: 'unpublished' },
				],
				default: [],
				description: 'Filter by course state',
			},
		],
	},

	// ----------------------------------
	//         user: updateAvatar
	// ----------------------------------
	{
		displayName: 'Avatar URL',
		name: 'avatarUrl',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['updateAvatar'],
			},
		},
		description: 'The URL of the avatar image',
	},

	// ----------------------------------
	//         user: getCustomData
	// ----------------------------------
	{
		displayName: 'Scope',
		name: 'scope',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['getCustomData'],
			},
		},
		description: 'The scope for the custom data',
	},
];
