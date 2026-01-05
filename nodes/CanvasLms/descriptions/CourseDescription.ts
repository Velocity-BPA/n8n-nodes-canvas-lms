/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const courseOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['course'],
			},
		},
		options: [
			{
				name: 'Conclude',
				value: 'conclude',
				description: 'Conclude a course',
				action: 'Conclude a course',
			},
			{
				name: 'Copy',
				value: 'copy',
				description: 'Copy course to new course',
				action: 'Copy a course',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new course',
				action: 'Create a course',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a course',
				action: 'Delete a course',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a course',
				action: 'Get a course',
			},
			{
				name: 'Get Enrollments',
				value: 'getEnrollments',
				description: 'Get all enrollments in a course',
				action: 'Get course enrollments',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many courses',
				action: 'Get many courses',
			},
			{
				name: 'Get Users',
				value: 'getUsers',
				description: 'Get all users in a course',
				action: 'Get course users',
			},
			{
				name: 'Reset',
				value: 'reset',
				description: 'Reset course content',
				action: 'Reset a course',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a course',
				action: 'Update a course',
			},
		],
		default: 'getAll',
	},
];

export const courseFields: INodeProperties[] = [
	// ----------------------------------
	//         course: create
	// ----------------------------------
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['course'],
				operation: ['create'],
			},
		},
		description: 'The account ID to create the course in',
	},
	{
		displayName: 'Course Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['course'],
				operation: ['create'],
			},
		},
		description: 'The name of the course',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['course'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Allow Student Wiki Edits',
				name: 'allow_student_wiki_edits',
				type: 'boolean',
				default: false,
				description: 'Whether students can edit wiki pages',
			},
			{
				displayName: 'Apply Assignment Group Weights',
				name: 'apply_assignment_group_weights',
				type: 'boolean',
				default: false,
				description: 'Whether to apply assignment group weights',
			},
			{
				displayName: 'Course Code',
				name: 'course_code',
				type: 'string',
				default: '',
				description: 'The short course code',
			},
			{
				displayName: 'Default View',
				name: 'default_view',
				type: 'options',
				options: [
					{ name: 'Assignments', value: 'assignments' },
					{ name: 'Feed', value: 'feed' },
					{ name: 'Modules', value: 'modules' },
					{ name: 'Syllabus', value: 'syllabus' },
					{ name: 'Wiki', value: 'wiki' },
				],
				default: 'modules',
				description: 'The default course homepage view',
			},
			{
				displayName: 'Enable SIS Reactivation',
				name: 'enable_sis_reactivation',
				type: 'boolean',
				default: false,
				description: 'Whether to reactivate deleted courses via SIS',
			},
			{
				displayName: 'End Date',
				name: 'end_at',
				type: 'dateTime',
				default: '',
				description: 'Course end date',
			},
			{
				displayName: 'Enrollment Term ID',
				name: 'enrollment_term_id',
				type: 'string',
				default: '',
				description: 'The enrollment term ID',
			},
			{
				displayName: 'Grading Standard ID',
				name: 'grading_standard_id',
				type: 'string',
				default: '',
				description: 'The grading standard ID',
			},
			{
				displayName: 'Hide Final Grades',
				name: 'hide_final_grades',
				type: 'boolean',
				default: false,
				description: 'Whether to hide final grades from students',
			},
			{
				displayName: 'Is Public',
				name: 'is_public',
				type: 'boolean',
				default: false,
				description: 'Whether the course is publicly visible',
			},
			{
				displayName: 'Is Public to Auth Users',
				name: 'is_public_to_auth_users',
				type: 'boolean',
				default: false,
				description: 'Whether the course is visible to authenticated users',
			},
			{
				displayName: 'License',
				name: 'license',
				type: 'options',
				options: [
					{ name: 'All Rights Reserved', value: 'private' },
					{ name: 'CC Attribution', value: 'cc_by' },
					{ name: 'CC Attribution Non-Commercial', value: 'cc_by_nc' },
					{ name: 'CC Attribution Non-Commercial No Derivatives', value: 'cc_by_nc_nd' },
					{ name: 'CC Attribution Non-Commercial Share Alike', value: 'cc_by_nc_sa' },
					{ name: 'CC Attribution No Derivatives', value: 'cc_by_nd' },
					{ name: 'CC Attribution Share Alike', value: 'cc_by_sa' },
					{ name: 'Public Domain', value: 'public_domain' },
				],
				default: 'private',
				description: 'The content license for the course',
			},
			{
				displayName: 'Open Enrollment',
				name: 'open_enrollment',
				type: 'boolean',
				default: false,
				description: 'Whether students can self-enroll',
			},
			{
				displayName: 'Public Description',
				name: 'public_description',
				type: 'string',
				default: '',
				description: 'Public course description',
			},
			{
				displayName: 'Public Syllabus',
				name: 'public_syllabus',
				type: 'boolean',
				default: false,
				description: 'Whether the syllabus is public',
			},
			{
				displayName: 'Restrict Enrollments to Course Dates',
				name: 'restrict_enrollments_to_course_dates',
				type: 'boolean',
				default: false,
				description: 'Whether to restrict enrollments to course dates',
			},
			{
				displayName: 'Self Enrollment',
				name: 'self_enrollment',
				type: 'boolean',
				default: false,
				description: 'Whether to allow self enrollment',
			},
			{
				displayName: 'SIS Course ID',
				name: 'sis_course_id',
				type: 'string',
				default: '',
				description: 'SIS integration ID for the course',
			},
			{
				displayName: 'Start Date',
				name: 'start_at',
				type: 'dateTime',
				default: '',
				description: 'Course start date',
			},
			{
				displayName: 'Syllabus Body',
				name: 'syllabus_body',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'The syllabus content (HTML)',
			},
			{
				displayName: 'Time Zone',
				name: 'time_zone',
				type: 'string',
				default: '',
				description: 'Course time zone (e.g., America/New_York)',
			},
		],
	},

	// ----------------------------------
	//         course: get
	// ----------------------------------
	{
		displayName: 'Course ID',
		name: 'courseId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['course'],
				operation: ['get', 'update', 'delete', 'conclude', 'reset', 'copy', 'getUsers', 'getEnrollments'],
			},
		},
		description: 'The ID of the course (can also use sis_course_id:SISID format)',
	},
	{
		displayName: 'Include',
		name: 'include',
		type: 'multiOptions',
		default: [],
		displayOptions: {
			show: {
				resource: ['course'],
				operation: ['get'],
			},
		},
		options: [
			{ name: 'Account', value: 'account' },
			{ name: 'All Courses', value: 'all_courses' },
			{ name: 'Concluded', value: 'concluded' },
			{ name: 'Course Image', value: 'course_image' },
			{ name: 'Current Grading Period Scores', value: 'current_grading_period_scores' },
			{ name: 'Favorites', value: 'favorites' },
			{ name: 'Grading Periods', value: 'grading_periods' },
			{ name: 'Needs Grading Count', value: 'needs_grading_count' },
			{ name: 'Observed Users', value: 'observed_users' },
			{ name: 'Permissions', value: 'permissions' },
			{ name: 'Public Description', value: 'public_description' },
			{ name: 'Sections', value: 'sections' },
			{ name: 'Syllabus Body', value: 'syllabus_body' },
			{ name: 'Teachers', value: 'teachers' },
			{ name: 'Term', value: 'term' },
			{ name: 'Total Scores', value: 'total_scores' },
			{ name: 'Total Students', value: 'total_students' },
		],
		description: 'Additional data to include in the response',
	},

	// ----------------------------------
	//         course: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['course'],
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
				resource: ['course'],
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
				resource: ['course'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Blueprint',
				name: 'blueprint',
				type: 'boolean',
				default: false,
				description: 'Whether to filter for blueprint courses',
			},
			{
				displayName: 'By Subaccounts',
				name: 'by_subaccounts',
				type: 'string',
				default: '',
				description: 'Filter by subaccount IDs (comma-separated)',
			},
			{
				displayName: 'By Teachers',
				name: 'by_teachers',
				type: 'string',
				default: '',
				description: 'Filter by teacher user IDs (comma-separated)',
			},
			{
				displayName: 'Completed',
				name: 'completed',
				type: 'boolean',
				default: false,
				description: 'Whether to include only completed courses',
			},
			{
				displayName: 'Enrollment Term ID',
				name: 'enrollment_term_id',
				type: 'string',
				default: '',
				description: 'Filter by enrollment term ID',
			},
			{
				displayName: 'Enrollment Type',
				name: 'enrollment_type',
				type: 'options',
				options: [
					{ name: 'Designer', value: 'designer' },
					{ name: 'Observer', value: 'observer' },
					{ name: 'Student', value: 'student' },
					{ name: 'TA', value: 'ta' },
					{ name: 'Teacher', value: 'teacher' },
				],
				default: '',
				description: 'Filter by enrollment type',
			},
			{
				displayName: 'Include',
				name: 'include',
				type: 'multiOptions',
				options: [
					{ name: 'Account', value: 'account' },
					{ name: 'Blueprint Courses', value: 'blueprint_courses' },
					{ name: 'Concluded', value: 'concluded' },
					{ name: 'Course Image', value: 'course_image' },
					{ name: 'Current Grading Period Scores', value: 'current_grading_period_scores' },
					{ name: 'Favorites', value: 'favorites' },
					{ name: 'Grading Periods', value: 'grading_periods' },
					{ name: 'Needs Grading Count', value: 'needs_grading_count' },
					{ name: 'Observed Users', value: 'observed_users' },
					{ name: 'Permissions', value: 'permissions' },
					{ name: 'Public Description', value: 'public_description' },
					{ name: 'Sections', value: 'sections' },
					{ name: 'Syllabus Body', value: 'syllabus_body' },
					{ name: 'Teachers', value: 'teachers' },
					{ name: 'Term', value: 'term' },
					{ name: 'Total Scores', value: 'total_scores' },
					{ name: 'Total Students', value: 'total_students' },
				],
				default: [],
				description: 'Additional data to include',
			},
			{
				displayName: 'Published',
				name: 'published',
				type: 'boolean',
				default: false,
				description: 'Whether to include only published courses',
			},
			{
				displayName: 'Search Term',
				name: 'search_term',
				type: 'string',
				default: '',
				description: 'Search by course name or code',
			},
			{
				displayName: 'Sort',
				name: 'sort',
				type: 'options',
				options: [
					{ name: 'Course Name', value: 'course_name' },
					{ name: 'Created At (Oldest First)', value: 'created_at' },
					{ name: 'SIS Course ID', value: 'sis_course_id' },
					{ name: 'Teacher', value: 'teacher' },
					{ name: 'Total Students', value: 'total_students' },
				],
				default: 'course_name',
				description: 'Field to sort by',
			},
			{
				displayName: 'State',
				name: 'state',
				type: 'multiOptions',
				options: [
					{ name: 'All', value: 'all' },
					{ name: 'Available', value: 'available' },
					{ name: 'Completed', value: 'completed' },
					{ name: 'Created', value: 'created' },
					{ name: 'Deleted', value: 'deleted' },
					{ name: 'Unpublished', value: 'unpublished' },
				],
				default: [],
				description: 'Filter by course state',
			},
		],
	},

	// ----------------------------------
	//         course: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['course'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Apply Assignment Group Weights',
				name: 'apply_assignment_group_weights',
				type: 'boolean',
				default: false,
				description: 'Whether to apply assignment group weights',
			},
			{
				displayName: 'Course Code',
				name: 'course_code',
				type: 'string',
				default: '',
				description: 'The short course code',
			},
			{
				displayName: 'Default View',
				name: 'default_view',
				type: 'options',
				options: [
					{ name: 'Assignments', value: 'assignments' },
					{ name: 'Feed', value: 'feed' },
					{ name: 'Modules', value: 'modules' },
					{ name: 'Syllabus', value: 'syllabus' },
					{ name: 'Wiki', value: 'wiki' },
				],
				default: 'modules',
				description: 'The default course homepage view',
			},
			{
				displayName: 'End Date',
				name: 'end_at',
				type: 'dateTime',
				default: '',
				description: 'Course end date',
			},
			{
				displayName: 'Grading Standard ID',
				name: 'grading_standard_id',
				type: 'string',
				default: '',
				description: 'The grading standard ID',
			},
			{
				displayName: 'Hide Final Grades',
				name: 'hide_final_grades',
				type: 'boolean',
				default: false,
				description: 'Whether to hide final grades from students',
			},
			{
				displayName: 'Is Public',
				name: 'is_public',
				type: 'boolean',
				default: false,
				description: 'Whether the course is publicly visible',
			},
			{
				displayName: 'License',
				name: 'license',
				type: 'options',
				options: [
					{ name: 'All Rights Reserved', value: 'private' },
					{ name: 'CC Attribution', value: 'cc_by' },
					{ name: 'CC Attribution Non-Commercial', value: 'cc_by_nc' },
					{ name: 'CC Attribution Non-Commercial No Derivatives', value: 'cc_by_nc_nd' },
					{ name: 'CC Attribution Non-Commercial Share Alike', value: 'cc_by_nc_sa' },
					{ name: 'CC Attribution No Derivatives', value: 'cc_by_nd' },
					{ name: 'CC Attribution Share Alike', value: 'cc_by_sa' },
					{ name: 'Public Domain', value: 'public_domain' },
				],
				default: 'private',
				description: 'The content license for the course',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The course name',
			},
			{
				displayName: 'Public Syllabus',
				name: 'public_syllabus',
				type: 'boolean',
				default: false,
				description: 'Whether the syllabus is public',
			},
			{
				displayName: 'Start Date',
				name: 'start_at',
				type: 'dateTime',
				default: '',
				description: 'Course start date',
			},
			{
				displayName: 'Syllabus Body',
				name: 'syllabus_body',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'The syllabus content (HTML)',
			},
			{
				displayName: 'Time Zone',
				name: 'time_zone',
				type: 'string',
				default: '',
				description: 'Course time zone',
			},
		],
	},

	// ----------------------------------
	//         course: copy
	// ----------------------------------
	{
		displayName: 'Destination Account ID',
		name: 'destinationAccountId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['course'],
				operation: ['copy'],
			},
		},
		description: 'The account to copy the course to',
	},
	{
		displayName: 'Copy Options',
		name: 'copyOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['course'],
				operation: ['copy'],
			},
		},
		options: [
			{
				displayName: 'New Course Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Name for the new course',
			},
			{
				displayName: 'New Course Code',
				name: 'course_code',
				type: 'string',
				default: '',
				description: 'Course code for the new course',
			},
			{
				displayName: 'Start Date',
				name: 'start_at',
				type: 'dateTime',
				default: '',
				description: 'Start date for the new course',
			},
			{
				displayName: 'End Date',
				name: 'end_at',
				type: 'dateTime',
				default: '',
				description: 'End date for the new course',
			},
		],
	},

	// ----------------------------------
	//         course: getUsers
	// ----------------------------------
	{
		displayName: 'Return All Users',
		name: 'returnAllUsers',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['course'],
				operation: ['getUsers'],
			},
		},
		description: 'Whether to return all users or only up to a given limit',
	},
	{
		displayName: 'User Limit',
		name: 'userLimit',
		type: 'number',
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		displayOptions: {
			show: {
				resource: ['course'],
				operation: ['getUsers'],
				returnAllUsers: [false],
			},
		},
		description: 'Max number of users to return',
	},
	{
		displayName: 'User Filters',
		name: 'userFilters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['course'],
				operation: ['getUsers'],
			},
		},
		options: [
			{
				displayName: 'Enrollment State',
				name: 'enrollment_state',
				type: 'multiOptions',
				options: [
					{ name: 'Active', value: 'active' },
					{ name: 'Completed', value: 'completed' },
					{ name: 'Inactive', value: 'inactive' },
					{ name: 'Invited', value: 'invited' },
					{ name: 'Rejected', value: 'rejected' },
				],
				default: [],
				description: 'Filter by enrollment state',
			},
			{
				displayName: 'Enrollment Type',
				name: 'enrollment_type',
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
			{
				displayName: 'Include',
				name: 'include',
				type: 'multiOptions',
				options: [
					{ name: 'Avatar URL', value: 'avatar_url' },
					{ name: 'Email', value: 'email' },
					{ name: 'Enrollments', value: 'enrollments' },
					{ name: 'Group IDs', value: 'group_ids' },
					{ name: 'Observed Users', value: 'observed_users' },
				],
				default: [],
				description: 'Additional data to include',
			},
			{
				displayName: 'Search Term',
				name: 'search_term',
				type: 'string',
				default: '',
				description: 'Search by user name or email',
			},
			{
				displayName: 'Sort',
				name: 'sort',
				type: 'options',
				options: [
					{ name: 'Email', value: 'email' },
					{ name: 'Last Login', value: 'last_login' },
					{ name: 'Username', value: 'username' },
				],
				default: 'username',
				description: 'Field to sort by',
			},
		],
	},

	// ----------------------------------
	//         course: getEnrollments
	// ----------------------------------
	{
		displayName: 'Return All Enrollments',
		name: 'returnAllEnrollments',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['course'],
				operation: ['getEnrollments'],
			},
		},
		description: 'Whether to return all enrollments or only up to a given limit',
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
				resource: ['course'],
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
				resource: ['course'],
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
];
