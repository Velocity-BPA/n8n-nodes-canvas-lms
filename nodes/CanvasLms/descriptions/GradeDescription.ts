/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const gradeOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['grade'],
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get grades for a course',
				action: 'Get many grades',
			},
			{
				name: 'Get Grading Periods',
				value: 'getGradingPeriods',
				description: 'List grading periods for a course',
				action: 'Get grading periods',
			},
			{
				name: 'Get Grading Standards',
				value: 'getGradingStandards',
				description: 'Get grading standards for a course',
				action: 'Get grading standards',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a grade',
				action: 'Update a grade',
			},
		],
		default: 'getAll',
	},
];

export const gradeFields: INodeProperties[] = [
	// ----------------------------------
	//         grade: shared fields
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
				resource: ['grade'],
			},
		},
	},

	// ----------------------------------
	//         grade: update
	// ----------------------------------
	{
		displayName: 'Assignment ID',
		name: 'assignmentId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the assignment',
		displayOptions: {
			show: {
				resource: ['grade'],
				operation: ['update'],
			},
		},
	},
	{
		displayName: 'Student ID',
		name: 'studentId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the student',
		displayOptions: {
			show: {
				resource: ['grade'],
				operation: ['update'],
			},
		},
	},
	{
		displayName: 'Grade',
		name: 'grade',
		type: 'string',
		required: true,
		default: '',
		description: 'The grade to assign (can be points, percentage, letter grade depending on assignment settings)',
		displayOptions: {
			show: {
				resource: ['grade'],
				operation: ['update'],
			},
		},
	},
	{
		displayName: 'Update Options',
		name: 'updateOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['grade'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Comment',
				name: 'comment',
				type: 'string',
				typeOptions: {
					rows: 3,
				},
				default: '',
				description: 'Comment to add with the grade',
			},
			{
				displayName: 'Excuse',
				name: 'excuse',
				type: 'boolean',
				default: false,
				description: 'Whether to excuse the student from the assignment',
			},
			{
				displayName: 'Late Policy Status',
				name: 'latePolicyStatus',
				type: 'options',
				options: [
					{ name: 'None', value: 'none' },
					{ name: 'Missing', value: 'missing' },
					{ name: 'Late', value: 'late' },
				],
				default: 'none',
				description: 'The late policy status for this submission',
			},
			{
				displayName: 'Posted Grade',
				name: 'postedGrade',
				type: 'string',
				default: '',
				description: 'The grade displayed to the student',
			},
			{
				displayName: 'Seconds Late Override',
				name: 'secondsLateOverride',
				type: 'number',
				default: 0,
				description: 'Override the number of seconds late',
			},
		],
	},

	// ----------------------------------
	//         grade: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['grade'],
				operation: ['getAll', 'getGradingPeriods', 'getGradingStandards'],
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
				resource: ['grade'],
				operation: ['getAll', 'getGradingPeriods', 'getGradingStandards'],
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
				resource: ['grade'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Assignment ID',
				name: 'assignmentId',
				type: 'string',
				default: '',
				description: 'Filter by specific assignment',
			},
			{
				displayName: 'Grading Period ID',
				name: 'gradingPeriodId',
				type: 'string',
				default: '',
				description: 'Filter by grading period',
			},
			{
				displayName: 'Include',
				name: 'include',
				type: 'multiOptions',
				options: [
					{ name: 'Assignment', value: 'assignment' },
					{ name: 'Course', value: 'course' },
					{ name: 'Current Grading Period Scores', value: 'current_grading_period_scores' },
					{ name: 'Enrollment', value: 'enrollments' },
					{ name: 'Total Scores', value: 'total_scores' },
				],
				default: [],
				description: 'Additional data to include',
			},
			{
				displayName: 'Scope',
				name: 'scope',
				type: 'options',
				options: [
					{ name: 'Students', value: 'students' },
					{ name: 'Concluded', value: 'concluded' },
					{ name: 'Deactivated', value: 'deactivated' },
				],
				default: 'students',
				description: 'Filter by enrollment state',
			},
			{
				displayName: 'Student ID',
				name: 'studentId',
				type: 'string',
				default: '',
				description: 'Filter by specific student',
			},
			{
				displayName: 'Workflow State',
				name: 'workflowState',
				type: 'multiOptions',
				options: [
					{ name: 'Active', value: 'active' },
					{ name: 'Concluded', value: 'concluded' },
					{ name: 'Deleted', value: 'deleted' },
					{ name: 'Inactive', value: 'inactive' },
					{ name: 'Invited', value: 'invited' },
				],
				default: ['active'],
				description: 'Filter by workflow state',
			},
		],
	},

	// ----------------------------------
	//         grade: getGradingPeriods options
	// ----------------------------------
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['grade'],
				operation: ['getGradingPeriods'],
			},
		},
		options: [
			{
				displayName: 'Account ID',
				name: 'accountId',
				type: 'string',
				default: '',
				description: 'Get grading periods at the account level instead of course',
			},
		],
	},

	// ----------------------------------
	//         grade: getGradingStandards options
	// ----------------------------------
	{
		displayName: 'Standards Options',
		name: 'standardsOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['grade'],
				operation: ['getGradingStandards'],
			},
		},
		options: [
			{
				displayName: 'Account ID',
				name: 'accountId',
				type: 'string',
				default: '',
				description: 'Get grading standards at the account level',
			},
		],
	},
];
