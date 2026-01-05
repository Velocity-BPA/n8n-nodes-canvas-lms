/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const quizOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['quiz'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new quiz',
				action: 'Create a quiz',
			},
			{
				name: 'Create Question',
				value: 'createQuestion',
				description: 'Add a question to a quiz',
				action: 'Create a quiz question',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a quiz',
				action: 'Delete a quiz',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a quiz by ID',
				action: 'Get a quiz',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many quizzes',
				action: 'Get many quizzes',
			},
			{
				name: 'Get Questions',
				value: 'getQuestions',
				description: 'List questions for a quiz',
				action: 'Get quiz questions',
			},
			{
				name: 'Get Submissions',
				value: 'getSubmissions',
				description: 'List quiz submissions',
				action: 'Get quiz submissions',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a quiz',
				action: 'Update a quiz',
			},
		],
		default: 'get',
	},
];

export const quizFields: INodeProperties[] = [
	// ----------------------------------
	//         quiz: shared fields
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
				resource: ['quiz'],
			},
		},
	},

	// ----------------------------------
	//         quiz: get, update, delete
	// ----------------------------------
	{
		displayName: 'Quiz ID',
		name: 'quizId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the quiz',
		displayOptions: {
			show: {
				resource: ['quiz'],
				operation: ['get', 'update', 'delete', 'getQuestions', 'createQuestion', 'getSubmissions'],
			},
		},
	},

	// ----------------------------------
	//         quiz: create
	// ----------------------------------
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		required: true,
		default: '',
		description: 'The title of the quiz',
		displayOptions: {
			show: {
				resource: ['quiz'],
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
				resource: ['quiz'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Access Code',
				name: 'accessCode',
				type: 'string',
				default: '',
				description: 'Access code required to take the quiz',
			},
			{
				displayName: 'Allowed Attempts',
				name: 'allowedAttempts',
				type: 'number',
				default: 1,
				description: 'Number of attempts allowed (-1 for unlimited)',
			},
			{
				displayName: 'Assignment Group ID',
				name: 'assignmentGroupId',
				type: 'string',
				default: '',
				description: 'The assignment group to place the quiz in',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'Quiz description (HTML allowed)',
			},
			{
				displayName: 'Due At',
				name: 'dueAt',
				type: 'dateTime',
				default: '',
				description: 'When the quiz is due',
			},
			{
				displayName: 'Hide Correct Answers At',
				name: 'hideCorrectAnswersAt',
				type: 'dateTime',
				default: '',
				description: 'When to hide correct answers from students',
			},
			{
				displayName: 'Hide Results',
				name: 'hideResults',
				type: 'options',
				options: [
					{ name: 'Never', value: '' },
					{ name: 'Always', value: 'always' },
					{ name: 'Until After Last Attempt', value: 'until_after_last_attempt' },
				],
				default: '',
				description: 'When to hide quiz results',
			},
			{
				displayName: 'IP Filter',
				name: 'ipFilter',
				type: 'string',
				default: '',
				description: 'IP address or range to filter quiz takers',
			},
			{
				displayName: 'Lock At',
				name: 'lockAt',
				type: 'dateTime',
				default: '',
				description: 'When to lock the quiz',
			},
			{
				displayName: 'One Question at a Time',
				name: 'oneQuestionAtATime',
				type: 'boolean',
				default: false,
				description: 'Whether to show only one question at a time',
			},
			{
				displayName: 'One Time Results',
				name: 'oneTimeResults',
				type: 'boolean',
				default: false,
				description: 'Whether students can only see results once',
			},
			{
				displayName: 'Points Possible',
				name: 'pointsPossible',
				type: 'number',
				default: 0,
				description: 'Total points possible for the quiz',
			},
			{
				displayName: 'Published',
				name: 'published',
				type: 'boolean',
				default: false,
				description: 'Whether the quiz is published',
			},
			{
				displayName: 'Quiz Type',
				name: 'quizType',
				type: 'options',
				options: [
					{ name: 'Practice Quiz', value: 'practice_quiz' },
					{ name: 'Graded Quiz', value: 'assignment' },
					{ name: 'Graded Survey', value: 'graded_survey' },
					{ name: 'Ungraded Survey', value: 'survey' },
				],
				default: 'assignment',
				description: 'The type of quiz',
			},
			{
				displayName: 'Scoring Policy',
				name: 'scoringPolicy',
				type: 'options',
				options: [
					{ name: 'Keep Highest', value: 'keep_highest' },
					{ name: 'Keep Latest', value: 'keep_latest' },
					{ name: 'Keep Average', value: 'keep_average' },
				],
				default: 'keep_highest',
				description: 'How to calculate the score from multiple attempts',
			},
			{
				displayName: 'Show Correct Answers',
				name: 'showCorrectAnswers',
				type: 'boolean',
				default: true,
				description: 'Whether to show correct answers after submission',
			},
			{
				displayName: 'Show Correct Answers At',
				name: 'showCorrectAnswersAt',
				type: 'dateTime',
				default: '',
				description: 'When to show correct answers to students',
			},
			{
				displayName: 'Show Correct Answers Last Attempt',
				name: 'showCorrectAnswersLastAttempt',
				type: 'boolean',
				default: false,
				description: 'Whether to only show correct answers on last attempt',
			},
			{
				displayName: 'Shuffle Answers',
				name: 'shuffleAnswers',
				type: 'boolean',
				default: false,
				description: 'Whether to shuffle answer choices',
			},
			{
				displayName: 'Time Limit',
				name: 'timeLimit',
				type: 'number',
				default: 0,
				description: 'Time limit in minutes (0 for no limit)',
			},
			{
				displayName: 'Unlock At',
				name: 'unlockAt',
				type: 'dateTime',
				default: '',
				description: 'When to unlock the quiz',
			},
		],
	},

	// ----------------------------------
	//         quiz: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['quiz'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Access Code',
				name: 'accessCode',
				type: 'string',
				default: '',
				description: 'Access code required to take the quiz',
			},
			{
				displayName: 'Allowed Attempts',
				name: 'allowedAttempts',
				type: 'number',
				default: 1,
				description: 'Number of attempts allowed (-1 for unlimited)',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'Quiz description (HTML allowed)',
			},
			{
				displayName: 'Due At',
				name: 'dueAt',
				type: 'dateTime',
				default: '',
				description: 'When the quiz is due',
			},
			{
				displayName: 'Lock At',
				name: 'lockAt',
				type: 'dateTime',
				default: '',
				description: 'When to lock the quiz',
			},
			{
				displayName: 'Notify of Update',
				name: 'notifyOfUpdate',
				type: 'boolean',
				default: false,
				description: 'Whether to notify users of quiz update',
			},
			{
				displayName: 'One Question at a Time',
				name: 'oneQuestionAtATime',
				type: 'boolean',
				default: false,
				description: 'Whether to show only one question at a time',
			},
			{
				displayName: 'Published',
				name: 'published',
				type: 'boolean',
				default: false,
				description: 'Whether the quiz is published',
			},
			{
				displayName: 'Quiz Type',
				name: 'quizType',
				type: 'options',
				options: [
					{ name: 'Practice Quiz', value: 'practice_quiz' },
					{ name: 'Graded Quiz', value: 'assignment' },
					{ name: 'Graded Survey', value: 'graded_survey' },
					{ name: 'Ungraded Survey', value: 'survey' },
				],
				default: 'assignment',
				description: 'The type of quiz',
			},
			{
				displayName: 'Scoring Policy',
				name: 'scoringPolicy',
				type: 'options',
				options: [
					{ name: 'Keep Highest', value: 'keep_highest' },
					{ name: 'Keep Latest', value: 'keep_latest' },
					{ name: 'Keep Average', value: 'keep_average' },
				],
				default: 'keep_highest',
				description: 'How to calculate the score from multiple attempts',
			},
			{
				displayName: 'Shuffle Answers',
				name: 'shuffleAnswers',
				type: 'boolean',
				default: false,
				description: 'Whether to shuffle answer choices',
			},
			{
				displayName: 'Time Limit',
				name: 'timeLimit',
				type: 'number',
				default: 0,
				description: 'Time limit in minutes (0 for no limit)',
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'The title of the quiz',
			},
			{
				displayName: 'Unlock At',
				name: 'unlockAt',
				type: 'dateTime',
				default: '',
				description: 'When to unlock the quiz',
			},
		],
	},

	// ----------------------------------
	//         quiz: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['quiz'],
				operation: ['getAll', 'getQuestions', 'getSubmissions'],
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
				resource: ['quiz'],
				operation: ['getAll', 'getQuestions', 'getSubmissions'],
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
				resource: ['quiz'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Search Term',
				name: 'searchTerm',
				type: 'string',
				default: '',
				description: 'Filter quizzes by title',
			},
		],
	},

	// ----------------------------------
	//         quiz: createQuestion
	// ----------------------------------
	{
		displayName: 'Question Name',
		name: 'questionName',
		type: 'string',
		required: true,
		default: '',
		description: 'Name/title of the question',
		displayOptions: {
			show: {
				resource: ['quiz'],
				operation: ['createQuestion'],
			},
		},
	},
	{
		displayName: 'Question Type',
		name: 'questionType',
		type: 'options',
		required: true,
		options: [
			{ name: 'Calculated', value: 'calculated_question' },
			{ name: 'Essay', value: 'essay_question' },
			{ name: 'File Upload', value: 'file_upload_question' },
			{ name: 'Fill in Multiple Blanks', value: 'fill_in_multiple_blanks_question' },
			{ name: 'Matching', value: 'matching_question' },
			{ name: 'Multiple Answers', value: 'multiple_answers_question' },
			{ name: 'Multiple Choice', value: 'multiple_choice_question' },
			{ name: 'Multiple Dropdowns', value: 'multiple_dropdowns_question' },
			{ name: 'Numerical', value: 'numerical_question' },
			{ name: 'Short Answer', value: 'short_answer_question' },
			{ name: 'Text Only (No Question)', value: 'text_only_question' },
			{ name: 'True/False', value: 'true_false_question' },
		],
		default: 'multiple_choice_question',
		description: 'The type of question',
		displayOptions: {
			show: {
				resource: ['quiz'],
				operation: ['createQuestion'],
			},
		},
	},
	{
		displayName: 'Question Text',
		name: 'questionText',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		required: true,
		default: '',
		description: 'The text of the question (HTML allowed)',
		displayOptions: {
			show: {
				resource: ['quiz'],
				operation: ['createQuestion'],
			},
		},
	},
	{
		displayName: 'Points Possible',
		name: 'pointsPossible',
		type: 'number',
		required: true,
		default: 1,
		description: 'Points awarded for correct answer',
		displayOptions: {
			show: {
				resource: ['quiz'],
				operation: ['createQuestion'],
			},
		},
	},
	{
		displayName: 'Question Options',
		name: 'questionOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['quiz'],
				operation: ['createQuestion'],
			},
		},
		options: [
			{
				displayName: 'Answers',
				name: 'answers',
				type: 'json',
				default: '[]',
				description: 'JSON array of answer objects. Format depends on question type.',
			},
			{
				displayName: 'Correct Comments',
				name: 'correctComments',
				type: 'string',
				default: '',
				description: 'Comments to display when answer is correct',
			},
			{
				displayName: 'Incorrect Comments',
				name: 'incorrectComments',
				type: 'string',
				default: '',
				description: 'Comments to display when answer is incorrect',
			},
			{
				displayName: 'Neutral Comments',
				name: 'neutralComments',
				type: 'string',
				default: '',
				description: 'Comments to display regardless of answer',
			},
			{
				displayName: 'Position',
				name: 'position',
				type: 'number',
				default: 1,
				description: 'Position of the question in the quiz',
			},
			{
				displayName: 'Quiz Group ID',
				name: 'quizGroupId',
				type: 'string',
				default: '',
				description: 'ID of the question group',
			},
		],
	},

	// ----------------------------------
	//         quiz: getSubmissions
	// ----------------------------------
	{
		displayName: 'Submission Filters',
		name: 'submissionFilters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['quiz'],
				operation: ['getSubmissions'],
			},
		},
		options: [
			{
				displayName: 'Include',
				name: 'include',
				type: 'multiOptions',
				options: [
					{ name: 'Submission', value: 'submission' },
					{ name: 'Quiz', value: 'quiz' },
					{ name: 'User', value: 'user' },
				],
				default: [],
				description: 'Additional data to include',
			},
		],
	},
];
