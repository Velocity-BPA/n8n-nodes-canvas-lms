/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import {
	canvasApiRequest,
	canvasApiRequestAllItems,
	canvasFileUpload,
	buildNestedObject,
	buildIncludeArray,
	formatDateForCanvas,
	emitLicenseNotice,
} from './GenericFunctions';

import { courseOperations, courseFields } from './descriptions/CourseDescription';
import { userOperations, userFields } from './descriptions/UserDescription';
import { enrollmentOperations, enrollmentFields } from './descriptions/EnrollmentDescription';
import { assignmentOperations, assignmentFields } from './descriptions/AssignmentDescription';
import { submissionOperations, submissionFields } from './descriptions/SubmissionDescription';
import { moduleOperations, moduleFields } from './descriptions/ModuleDescription';
import { quizOperations, quizFields } from './descriptions/QuizDescription';
import { discussionOperations, discussionFields } from './descriptions/DiscussionDescription';
import { gradeOperations, gradeFields } from './descriptions/GradeDescription';
import { fileOperations, fileFields } from './descriptions/FileDescription';
import { announcementOperations, announcementFields } from './descriptions/AnnouncementDescription';

export class CanvasLms implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Canvas LMS',
		name: 'canvasLms',
		icon: 'file:canvas.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Canvas LMS API',
		defaults: {
			name: 'Canvas LMS',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'canvasApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Announcement', value: 'announcement' },
					{ name: 'Assignment', value: 'assignment' },
					{ name: 'Course', value: 'course' },
					{ name: 'Discussion', value: 'discussion' },
					{ name: 'Enrollment', value: 'enrollment' },
					{ name: 'File', value: 'file' },
					{ name: 'Grade', value: 'grade' },
					{ name: 'Module', value: 'module' },
					{ name: 'Quiz', value: 'quiz' },
					{ name: 'Submission', value: 'submission' },
					{ name: 'User', value: 'user' },
				],
				default: 'course',
			},
			// Operations for each resource
			...courseOperations,
			...userOperations,
			...enrollmentOperations,
			...assignmentOperations,
			...submissionOperations,
			...moduleOperations,
			...quizOperations,
			...discussionOperations,
			...gradeOperations,
			...fileOperations,
			...announcementOperations,
			// Fields for each resource
			...courseFields,
			...userFields,
			...enrollmentFields,
			...assignmentFields,
			...submissionFields,
			...moduleFields,
			...quizFields,
			...discussionFields,
			...gradeFields,
			...fileFields,
			...announcementFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		emitLicenseNotice(this);

		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: IDataObject | IDataObject[] = {};

				// ----------------------------------------
				// Course Operations
				// ----------------------------------------
				if (resource === 'course') {
					if (operation === 'create') {
						const accountId = this.getNodeParameter('accountId', i) as string;
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							name,
							...additionalFields,
						};

						if (additionalFields.startAt) {
							body.start_at = formatDateForCanvas(additionalFields.startAt as string);
							delete body.startAt;
						}
						if (additionalFields.endAt) {
							body.end_at = formatDateForCanvas(additionalFields.endAt as string);
							delete body.endAt;
						}

						const nestedBody = buildNestedObject('course', body);
						responseData = await canvasApiRequest.call(this, 'POST', `/accounts/${accountId}/courses`, nestedBody);
					}

					if (operation === 'get') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const options = this.getNodeParameter('options', i) as IDataObject;
						const query: IDataObject = {};

						if (options.include) {
							Object.assign(query, buildIncludeArray(options.include as string[]));
						}

						responseData = await canvasApiRequest.call(this, 'GET', `/courses/${courseId}`, {}, query);
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query: IDataObject = {};

						if (filters.enrollmentType) query.enrollment_type = filters.enrollmentType;
						if (filters.enrollmentState) query.enrollment_state = filters.enrollmentState;
						if (filters.state) query.state = filters.state;
						if (filters.include) Object.assign(query, buildIncludeArray(filters.include as string[]));

						if (returnAll) {
							responseData = await canvasApiRequestAllItems.call(this, 'GET', '/courses', {}, query);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.per_page = limit;
							responseData = await canvasApiRequest.call(this, 'GET', '/courses', {}, query);
						}
					}

					if (operation === 'update') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						const body: IDataObject = { ...updateFields };

						if (updateFields.startAt) {
							body.start_at = formatDateForCanvas(updateFields.startAt as string);
							delete body.startAt;
						}
						if (updateFields.endAt) {
							body.end_at = formatDateForCanvas(updateFields.endAt as string);
							delete body.endAt;
						}

						const nestedBody = buildNestedObject('course', body);
						responseData = await canvasApiRequest.call(this, 'PUT', `/courses/${courseId}`, nestedBody);
					}

					if (operation === 'delete') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						responseData = await canvasApiRequest.call(this, 'DELETE', `/courses/${courseId}`, { event: 'delete' });
					}

					if (operation === 'conclude') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						responseData = await canvasApiRequest.call(this, 'DELETE', `/courses/${courseId}`, { event: 'conclude' });
					}

					if (operation === 'reset') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						responseData = await canvasApiRequest.call(this, 'POST', `/courses/${courseId}/reset_content`);
					}

					if (operation === 'copy') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const destinationCourseId = this.getNodeParameter('destinationCourseId', i) as string;
						const copyOptions = this.getNodeParameter('copyOptions', i) as IDataObject;

						const body: IDataObject = {
							source_course: courseId,
							...copyOptions,
						};

						responseData = await canvasApiRequest.call(this, 'POST', `/courses/${destinationCourseId}/content_migrations`, {
							migration_type: 'course_copy_importer',
							settings: body,
						});
					}

					if (operation === 'getUsers') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query: IDataObject = {};

						if (filters.enrollmentType) query.enrollment_type = filters.enrollmentType;
						if (filters.enrollmentState) query.enrollment_state = filters.enrollmentState;
						if (filters.searchTerm) query.search_term = filters.searchTerm;
						if (filters.include) Object.assign(query, buildIncludeArray(filters.include as string[]));

						if (returnAll) {
							responseData = await canvasApiRequestAllItems.call(this, 'GET', `/courses/${courseId}/users`, {}, query);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.per_page = limit;
							responseData = await canvasApiRequest.call(this, 'GET', `/courses/${courseId}/users`, {}, query);
						}
					}

					if (operation === 'getEnrollments') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query: IDataObject = {};

						if (filters.type) query.type = filters.type;
						if (filters.state) query.state = filters.state;
						if (filters.role) query.role = filters.role;

						if (returnAll) {
							responseData = await canvasApiRequestAllItems.call(this, 'GET', `/courses/${courseId}/enrollments`, {}, query);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.per_page = limit;
							responseData = await canvasApiRequest.call(this, 'GET', `/courses/${courseId}/enrollments`, {}, query);
						}
					}
				}

				// ----------------------------------------
				// User Operations
				// ----------------------------------------
				if (resource === 'user') {
					if (operation === 'create') {
						const accountId = this.getNodeParameter('accountId', i) as string;
						const name = this.getNodeParameter('name', i) as string;
						const email = this.getNodeParameter('email', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const userData: IDataObject = { name, ...additionalFields };
						const pseudonymData: IDataObject = { unique_id: email };

						if (additionalFields.password) {
							pseudonymData.password = additionalFields.password;
							delete userData.password;
						}
						if (additionalFields.sisUserId) {
							pseudonymData.sis_user_id = additionalFields.sisUserId;
							delete userData.sisUserId;
						}

						const body = {
							...buildNestedObject('user', userData),
							...buildNestedObject('pseudonym', pseudonymData),
						};

						responseData = await canvasApiRequest.call(this, 'POST', `/accounts/${accountId}/users`, body);
					}

					if (operation === 'get') {
						const userId = this.getNodeParameter('userId', i) as string;
						const options = this.getNodeParameter('options', i) as IDataObject;
						const query: IDataObject = {};

						if (options.include) {
							Object.assign(query, buildIncludeArray(options.include as string[]));
						}

						responseData = await canvasApiRequest.call(this, 'GET', `/users/${userId}`, {}, query);
					}

					if (operation === 'getAll') {
						const accountId = this.getNodeParameter('accountId', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query: IDataObject = {};

						if (filters.searchTerm) query.search_term = filters.searchTerm;
						if (filters.sort) query.sort = filters.sort;
						if (filters.order) query.order = filters.order;
						if (filters.include) Object.assign(query, buildIncludeArray(filters.include as string[]));

						if (returnAll) {
							responseData = await canvasApiRequestAllItems.call(this, 'GET', `/accounts/${accountId}/users`, {}, query);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.per_page = limit;
							responseData = await canvasApiRequest.call(this, 'GET', `/accounts/${accountId}/users`, {}, query);
						}
					}

					if (operation === 'update') {
						const userId = this.getNodeParameter('userId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						const nestedBody = buildNestedObject('user', updateFields);
						responseData = await canvasApiRequest.call(this, 'PUT', `/users/${userId}`, nestedBody);
					}

					if (operation === 'delete') {
						const accountId = this.getNodeParameter('accountId', i) as string;
						const userId = this.getNodeParameter('userId', i) as string;
						responseData = await canvasApiRequest.call(this, 'DELETE', `/accounts/${accountId}/users/${userId}`);
					}

					if (operation === 'getEnrollments') {
						const userId = this.getNodeParameter('userId', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query: IDataObject = {};

						if (filters.type) query.type = filters.type;
						if (filters.state) query.state = filters.state;

						if (returnAll) {
							responseData = await canvasApiRequestAllItems.call(this, 'GET', `/users/${userId}/enrollments`, {}, query);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.per_page = limit;
							responseData = await canvasApiRequest.call(this, 'GET', `/users/${userId}/enrollments`, {}, query);
						}
					}

					if (operation === 'getCourses') {
						const userId = this.getNodeParameter('userId', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query: IDataObject = {};

						if (filters.enrollmentState) query.enrollment_state = filters.enrollmentState;
						if (filters.include) Object.assign(query, buildIncludeArray(filters.include as string[]));

						if (returnAll) {
							responseData = await canvasApiRequestAllItems.call(this, 'GET', `/users/${userId}/courses`, {}, query);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.per_page = limit;
							responseData = await canvasApiRequest.call(this, 'GET', `/users/${userId}/courses`, {}, query);
						}
					}

					if (operation === 'getProfile') {
						const userId = this.getNodeParameter('userId', i) as string;
						responseData = await canvasApiRequest.call(this, 'GET', `/users/${userId}/profile`);
					}

					if (operation === 'updateAvatar') {
						const userId = this.getNodeParameter('userId', i) as string;
						const avatarToken = this.getNodeParameter('avatarToken', i) as string;
						responseData = await canvasApiRequest.call(this, 'PUT', `/users/${userId}`, {
							'user[avatar][token]': avatarToken,
						});
					}

					if (operation === 'getCustomData') {
						const userId = this.getNodeParameter('userId', i) as string;
						const scope = this.getNodeParameter('scope', i) as string;
						responseData = await canvasApiRequest.call(this, 'GET', `/users/${userId}/custom_data/${scope}`);
					}
				}

				// ----------------------------------------
				// Enrollment Operations
				// ----------------------------------------
				if (resource === 'enrollment') {
					if (operation === 'create') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const userId = this.getNodeParameter('userId', i) as string;
						const enrollmentType = this.getNodeParameter('enrollmentType', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const enrollmentData: IDataObject = {
							user_id: userId,
							type: enrollmentType,
							...additionalFields,
						};

						if (additionalFields.startAt) {
							enrollmentData.start_at = formatDateForCanvas(additionalFields.startAt as string);
							delete enrollmentData.startAt;
						}
						if (additionalFields.endAt) {
							enrollmentData.end_at = formatDateForCanvas(additionalFields.endAt as string);
							delete enrollmentData.endAt;
						}

						const nestedBody = buildNestedObject('enrollment', enrollmentData);
						responseData = await canvasApiRequest.call(this, 'POST', `/courses/${courseId}/enrollments`, nestedBody);
					}

					if (operation === 'get') {
						const accountId = this.getNodeParameter('accountId', i) as string;
						const enrollmentId = this.getNodeParameter('enrollmentId', i) as string;
						responseData = await canvasApiRequest.call(this, 'GET', `/accounts/${accountId}/enrollments/${enrollmentId}`);
					}

					if (operation === 'getAll') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query: IDataObject = {};

						if (filters.type) query.type = filters.type;
						if (filters.state) query.state = filters.state;
						if (filters.role) query.role = filters.role;
						if (filters.include) Object.assign(query, buildIncludeArray(filters.include as string[]));

						if (returnAll) {
							responseData = await canvasApiRequestAllItems.call(this, 'GET', `/courses/${courseId}/enrollments`, {}, query);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.per_page = limit;
							responseData = await canvasApiRequest.call(this, 'GET', `/courses/${courseId}/enrollments`, {}, query);
						}
					}

					if (operation === 'update') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const enrollmentId = this.getNodeParameter('enrollmentId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						const nestedBody = buildNestedObject('enrollment', updateFields);
						responseData = await canvasApiRequest.call(this, 'PUT', `/courses/${courseId}/enrollments/${enrollmentId}`, nestedBody);
					}

					if (operation === 'delete') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const enrollmentId = this.getNodeParameter('enrollmentId', i) as string;
						const task = this.getNodeParameter('task', i) as string;
						responseData = await canvasApiRequest.call(this, 'DELETE', `/courses/${courseId}/enrollments/${enrollmentId}`, { task });
					}

					if (operation === 'conclude') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const enrollmentId = this.getNodeParameter('enrollmentId', i) as string;
						responseData = await canvasApiRequest.call(this, 'DELETE', `/courses/${courseId}/enrollments/${enrollmentId}`, { task: 'conclude' });
					}

					if (operation === 'reactivate') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const enrollmentId = this.getNodeParameter('enrollmentId', i) as string;
						responseData = await canvasApiRequest.call(this, 'PUT', `/courses/${courseId}/enrollments/${enrollmentId}/reactivate`);
					}
				}

				// ----------------------------------------
				// Assignment Operations
				// ----------------------------------------
				if (resource === 'assignment') {
					if (operation === 'create') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = { name, ...additionalFields };

						if (additionalFields.dueAt) {
							body.due_at = formatDateForCanvas(additionalFields.dueAt as string);
							delete body.dueAt;
						}
						if (additionalFields.lockAt) {
							body.lock_at = formatDateForCanvas(additionalFields.lockAt as string);
							delete body.lockAt;
						}
						if (additionalFields.unlockAt) {
							body.unlock_at = formatDateForCanvas(additionalFields.unlockAt as string);
							delete body.unlockAt;
						}

						const nestedBody = buildNestedObject('assignment', body);
						responseData = await canvasApiRequest.call(this, 'POST', `/courses/${courseId}/assignments`, nestedBody);
					}

					if (operation === 'get') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const assignmentId = this.getNodeParameter('assignmentId', i) as string;
						const options = this.getNodeParameter('options', i) as IDataObject;
						const query: IDataObject = {};

						if (options.include) {
							Object.assign(query, buildIncludeArray(options.include as string[]));
						}

						responseData = await canvasApiRequest.call(this, 'GET', `/courses/${courseId}/assignments/${assignmentId}`, {}, query);
					}

					if (operation === 'getAll') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query: IDataObject = {};

						if (filters.bucket) query.bucket = filters.bucket;
						if (filters.searchTerm) query.search_term = filters.searchTerm;
						if (filters.orderBy) query.order_by = filters.orderBy;
						if (filters.include) Object.assign(query, buildIncludeArray(filters.include as string[]));

						if (returnAll) {
							responseData = await canvasApiRequestAllItems.call(this, 'GET', `/courses/${courseId}/assignments`, {}, query);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.per_page = limit;
							responseData = await canvasApiRequest.call(this, 'GET', `/courses/${courseId}/assignments`, {}, query);
						}
					}

					if (operation === 'update') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const assignmentId = this.getNodeParameter('assignmentId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						const body: IDataObject = { ...updateFields };

						if (updateFields.dueAt) {
							body.due_at = formatDateForCanvas(updateFields.dueAt as string);
							delete body.dueAt;
						}
						if (updateFields.lockAt) {
							body.lock_at = formatDateForCanvas(updateFields.lockAt as string);
							delete body.lockAt;
						}
						if (updateFields.unlockAt) {
							body.unlock_at = formatDateForCanvas(updateFields.unlockAt as string);
							delete body.unlockAt;
						}

						const nestedBody = buildNestedObject('assignment', body);
						responseData = await canvasApiRequest.call(this, 'PUT', `/courses/${courseId}/assignments/${assignmentId}`, nestedBody);
					}

					if (operation === 'delete') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const assignmentId = this.getNodeParameter('assignmentId', i) as string;
						responseData = await canvasApiRequest.call(this, 'DELETE', `/courses/${courseId}/assignments/${assignmentId}`);
					}

					if (operation === 'duplicate') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const assignmentId = this.getNodeParameter('assignmentId', i) as string;
						responseData = await canvasApiRequest.call(this, 'POST', `/courses/${courseId}/assignments/${assignmentId}/duplicate`);
					}

					if (operation === 'getSubmissions') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const assignmentId = this.getNodeParameter('assignmentId', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query: IDataObject = {};

						if (filters.include) Object.assign(query, buildIncludeArray(filters.include as string[]));

						if (returnAll) {
							responseData = await canvasApiRequestAllItems.call(this, 'GET', `/courses/${courseId}/assignments/${assignmentId}/submissions`, {}, query);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.per_page = limit;
							responseData = await canvasApiRequest.call(this, 'GET', `/courses/${courseId}/assignments/${assignmentId}/submissions`, {}, query);
						}
					}

					if (operation === 'getOverrides') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const assignmentId = this.getNodeParameter('assignmentId', i) as string;
						responseData = await canvasApiRequest.call(this, 'GET', `/courses/${courseId}/assignments/${assignmentId}/overrides`);
					}
				}

				// ----------------------------------------
				// Submission Operations
				// ----------------------------------------
				if (resource === 'submission') {
					if (operation === 'get') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const assignmentId = this.getNodeParameter('assignmentId', i) as string;
						const userId = this.getNodeParameter('userId', i) as string;
						const options = this.getNodeParameter('options', i) as IDataObject;
						const query: IDataObject = {};

						if (options.include) Object.assign(query, buildIncludeArray(options.include as string[]));

						responseData = await canvasApiRequest.call(this, 'GET', `/courses/${courseId}/assignments/${assignmentId}/submissions/${userId}`, {}, query);
					}

					if (operation === 'getAll') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const assignmentId = this.getNodeParameter('assignmentId', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query: IDataObject = {};

						if (filters.include) Object.assign(query, buildIncludeArray(filters.include as string[]));
						if (filters.groupedByStudent) query.grouped = filters.groupedByStudent;

						if (returnAll) {
							responseData = await canvasApiRequestAllItems.call(this, 'GET', `/courses/${courseId}/assignments/${assignmentId}/submissions`, {}, query);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.per_page = limit;
							responseData = await canvasApiRequest.call(this, 'GET', `/courses/${courseId}/assignments/${assignmentId}/submissions`, {}, query);
						}
					}

					if (operation === 'create') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const assignmentId = this.getNodeParameter('assignmentId', i) as string;
						const userId = this.getNodeParameter('userId', i) as string;
						const submissionType = this.getNodeParameter('submissionType', i) as string;
						const submissionOptions = this.getNodeParameter('submissionOptions', i) as IDataObject;

						const body: IDataObject = {
							submission_type: submissionType,
							...submissionOptions,
						};

						const nestedBody = buildNestedObject('submission', body);
						responseData = await canvasApiRequest.call(this, 'POST', `/courses/${courseId}/assignments/${assignmentId}/submissions?as_user_id=${userId}`, nestedBody);
					}

					if (operation === 'update' || operation === 'grade') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const assignmentId = this.getNodeParameter('assignmentId', i) as string;
						const userId = this.getNodeParameter('userId', i) as string;
						const gradeOptions = this.getNodeParameter('gradeOptions', i) as IDataObject;

						const body: IDataObject = {};
						if (gradeOptions.postedGrade !== undefined) body.posted_grade = gradeOptions.postedGrade;
						if (gradeOptions.excuse !== undefined) body.excuse = gradeOptions.excuse;
						if (gradeOptions.latePolicyStatus) body.late_policy_status = gradeOptions.latePolicyStatus;

						const nestedBody = buildNestedObject('submission', body);
						responseData = await canvasApiRequest.call(this, 'PUT', `/courses/${courseId}/assignments/${assignmentId}/submissions/${userId}`, nestedBody);
					}

					if (operation === 'addComment') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const assignmentId = this.getNodeParameter('assignmentId', i) as string;
						const userId = this.getNodeParameter('userId', i) as string;
						const comment = this.getNodeParameter('comment', i) as string;
						const commentOptions = this.getNodeParameter('commentOptions', i) as IDataObject;

						const body: IDataObject = {
							text_comment: comment,
							...commentOptions,
						};

						responseData = await canvasApiRequest.call(this, 'PUT', `/courses/${courseId}/assignments/${assignmentId}/submissions/${userId}`, {
							'comment[text_comment]': body.text_comment,
							'comment[group_comment]': body.groupComment || false,
						});
					}

					if (operation === 'uploadFile') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const assignmentId = this.getNodeParameter('assignmentId', i) as string;
						const userId = this.getNodeParameter('userId', i) as string;
						const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i) as string;

						const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
						const buffer = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);

						responseData = await canvasFileUpload.call(
							this,
							`/courses/${courseId}/assignments/${assignmentId}/submissions/${userId}/files`,
							binaryData.fileName || 'file',
							buffer,
							binaryData.mimeType,
						);
					}
				}

				// ----------------------------------------
				// Module Operations
				// ----------------------------------------
				if (resource === 'module') {
					if (operation === 'create') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = { name, ...additionalFields };

						if (additionalFields.unlockAt) {
							body.unlock_at = formatDateForCanvas(additionalFields.unlockAt as string);
							delete body.unlockAt;
						}

						const nestedBody = buildNestedObject('module', body);
						responseData = await canvasApiRequest.call(this, 'POST', `/courses/${courseId}/modules`, nestedBody);
					}

					if (operation === 'get') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const moduleId = this.getNodeParameter('moduleId', i) as string;
						const options = this.getNodeParameter('options', i) as IDataObject;
						const query: IDataObject = {};

						if (options.include) Object.assign(query, buildIncludeArray(options.include as string[]));

						responseData = await canvasApiRequest.call(this, 'GET', `/courses/${courseId}/modules/${moduleId}`, {}, query);
					}

					if (operation === 'getAll') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query: IDataObject = {};

						if (filters.searchTerm) query.search_term = filters.searchTerm;
						if (filters.include) Object.assign(query, buildIncludeArray(filters.include as string[]));

						if (returnAll) {
							responseData = await canvasApiRequestAllItems.call(this, 'GET', `/courses/${courseId}/modules`, {}, query);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.per_page = limit;
							responseData = await canvasApiRequest.call(this, 'GET', `/courses/${courseId}/modules`, {}, query);
						}
					}

					if (operation === 'update') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const moduleId = this.getNodeParameter('moduleId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						const body: IDataObject = { ...updateFields };

						if (updateFields.unlockAt) {
							body.unlock_at = formatDateForCanvas(updateFields.unlockAt as string);
							delete body.unlockAt;
						}

						const nestedBody = buildNestedObject('module', body);
						responseData = await canvasApiRequest.call(this, 'PUT', `/courses/${courseId}/modules/${moduleId}`, nestedBody);
					}

					if (operation === 'delete') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const moduleId = this.getNodeParameter('moduleId', i) as string;
						responseData = await canvasApiRequest.call(this, 'DELETE', `/courses/${courseId}/modules/${moduleId}`);
					}

					if (operation === 'getItems') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const moduleId = this.getNodeParameter('moduleId', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query: IDataObject = {};

						if (filters.include) Object.assign(query, buildIncludeArray(filters.include as string[]));

						if (returnAll) {
							responseData = await canvasApiRequestAllItems.call(this, 'GET', `/courses/${courseId}/modules/${moduleId}/items`, {}, query);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.per_page = limit;
							responseData = await canvasApiRequest.call(this, 'GET', `/courses/${courseId}/modules/${moduleId}/items`, {}, query);
						}
					}

					if (operation === 'createItem') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const moduleId = this.getNodeParameter('moduleId', i) as string;
						const itemType = this.getNodeParameter('itemType', i) as string;
						const itemOptions = this.getNodeParameter('itemOptions', i) as IDataObject;

						const body: IDataObject = {
							type: itemType,
							...itemOptions,
						};

						const nestedBody = buildNestedObject('module_item', body);
						responseData = await canvasApiRequest.call(this, 'POST', `/courses/${courseId}/modules/${moduleId}/items`, nestedBody);
					}

					if (operation === 'updateProgress') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const moduleId = this.getNodeParameter('moduleId', i) as string;
						const itemId = this.getNodeParameter('itemId', i) as string;
						responseData = await canvasApiRequest.call(this, 'POST', `/courses/${courseId}/modules/${moduleId}/items/${itemId}/mark_done`);
					}

					if (operation === 'unlock') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const moduleId = this.getNodeParameter('moduleId', i) as string;
						responseData = await canvasApiRequest.call(this, 'PUT', `/courses/${courseId}/modules/${moduleId}`, {
							'module[published]': true,
						});
					}
				}

				// ----------------------------------------
				// Quiz Operations
				// ----------------------------------------
				if (resource === 'quiz') {
					if (operation === 'create') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const title = this.getNodeParameter('title', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = { title, ...additionalFields };

						if (additionalFields.dueAt) {
							body.due_at = formatDateForCanvas(additionalFields.dueAt as string);
							delete body.dueAt;
						}
						if (additionalFields.lockAt) {
							body.lock_at = formatDateForCanvas(additionalFields.lockAt as string);
							delete body.lockAt;
						}
						if (additionalFields.unlockAt) {
							body.unlock_at = formatDateForCanvas(additionalFields.unlockAt as string);
							delete body.unlockAt;
						}

						const nestedBody = buildNestedObject('quiz', body);
						responseData = await canvasApiRequest.call(this, 'POST', `/courses/${courseId}/quizzes`, nestedBody);
					}

					if (operation === 'get') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const quizId = this.getNodeParameter('quizId', i) as string;
						responseData = await canvasApiRequest.call(this, 'GET', `/courses/${courseId}/quizzes/${quizId}`);
					}

					if (operation === 'getAll') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query: IDataObject = {};

						if (filters.searchTerm) query.search_term = filters.searchTerm;

						if (returnAll) {
							responseData = await canvasApiRequestAllItems.call(this, 'GET', `/courses/${courseId}/quizzes`, {}, query);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.per_page = limit;
							responseData = await canvasApiRequest.call(this, 'GET', `/courses/${courseId}/quizzes`, {}, query);
						}
					}

					if (operation === 'update') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const quizId = this.getNodeParameter('quizId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						const body: IDataObject = { ...updateFields };

						if (updateFields.dueAt) {
							body.due_at = formatDateForCanvas(updateFields.dueAt as string);
							delete body.dueAt;
						}
						if (updateFields.lockAt) {
							body.lock_at = formatDateForCanvas(updateFields.lockAt as string);
							delete body.lockAt;
						}
						if (updateFields.unlockAt) {
							body.unlock_at = formatDateForCanvas(updateFields.unlockAt as string);
							delete body.unlockAt;
						}

						const nestedBody = buildNestedObject('quiz', body);
						responseData = await canvasApiRequest.call(this, 'PUT', `/courses/${courseId}/quizzes/${quizId}`, nestedBody);
					}

					if (operation === 'delete') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const quizId = this.getNodeParameter('quizId', i) as string;
						responseData = await canvasApiRequest.call(this, 'DELETE', `/courses/${courseId}/quizzes/${quizId}`);
					}

					if (operation === 'getQuestions') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const quizId = this.getNodeParameter('quizId', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await canvasApiRequestAllItems.call(this, 'GET', `/courses/${courseId}/quizzes/${quizId}/questions`);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							responseData = await canvasApiRequest.call(this, 'GET', `/courses/${courseId}/quizzes/${quizId}/questions`, {}, { per_page: limit });
						}
					}

					if (operation === 'createQuestion') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const quizId = this.getNodeParameter('quizId', i) as string;
						const questionName = this.getNodeParameter('questionName', i) as string;
						const questionType = this.getNodeParameter('questionType', i) as string;
						const questionText = this.getNodeParameter('questionText', i) as string;
						const pointsPossible = this.getNodeParameter('pointsPossible', i) as number;
						const questionOptions = this.getNodeParameter('questionOptions', i) as IDataObject;

						const body: IDataObject = {
							question_name: questionName,
							question_type: questionType,
							question_text: questionText,
							points_possible: pointsPossible,
							...questionOptions,
						};

						if (questionOptions.answers && typeof questionOptions.answers === 'string') {
							body.answers = JSON.parse(questionOptions.answers as string);
						}

						const nestedBody = buildNestedObject('question', body);
						responseData = await canvasApiRequest.call(this, 'POST', `/courses/${courseId}/quizzes/${quizId}/questions`, nestedBody);
					}

					if (operation === 'getSubmissions') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const quizId = this.getNodeParameter('quizId', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('submissionFilters', i) as IDataObject;
						const query: IDataObject = {};

						if (filters.include) Object.assign(query, buildIncludeArray(filters.include as string[]));

						if (returnAll) {
							responseData = await canvasApiRequestAllItems.call(this, 'GET', `/courses/${courseId}/quizzes/${quizId}/submissions`, {}, query);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.per_page = limit;
							responseData = await canvasApiRequest.call(this, 'GET', `/courses/${courseId}/quizzes/${quizId}/submissions`, {}, query);
						}
					}
				}

				// ----------------------------------------
				// Discussion Operations
				// ----------------------------------------
				if (resource === 'discussion') {
					if (operation === 'create') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const title = this.getNodeParameter('title', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = { title, ...additionalFields };

						if (additionalFields.delayedPostAt) {
							body.delayed_post_at = formatDateForCanvas(additionalFields.delayedPostAt as string);
							delete body.delayedPostAt;
						}
						if (additionalFields.lockAt) {
							body.lock_at = formatDateForCanvas(additionalFields.lockAt as string);
							delete body.lockAt;
						}
						if (additionalFields.isAnnouncement) {
							body.is_announcement = additionalFields.isAnnouncement;
							delete body.isAnnouncement;
						}

						responseData = await canvasApiRequest.call(this, 'POST', `/courses/${courseId}/discussion_topics`, body);
					}

					if (operation === 'get') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const topicId = this.getNodeParameter('topicId', i) as string;
						const options = this.getNodeParameter('options', i) as IDataObject;
						const query: IDataObject = {};

						if (options.include) Object.assign(query, buildIncludeArray(options.include as string[]));

						responseData = await canvasApiRequest.call(this, 'GET', `/courses/${courseId}/discussion_topics/${topicId}`, {}, query);
					}

					if (operation === 'getAll') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query: IDataObject = {};

						if (filters.orderBy) query.order_by = filters.orderBy;
						if (filters.scope) query.scope = filters.scope;
						if (filters.onlyAnnouncements) query.only_announcements = filters.onlyAnnouncements;
						if (filters.searchTerm) query.search_term = filters.searchTerm;
						if (filters.include) Object.assign(query, buildIncludeArray(filters.include as string[]));

						if (returnAll) {
							responseData = await canvasApiRequestAllItems.call(this, 'GET', `/courses/${courseId}/discussion_topics`, {}, query);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.per_page = limit;
							responseData = await canvasApiRequest.call(this, 'GET', `/courses/${courseId}/discussion_topics`, {}, query);
						}
					}

					if (operation === 'update') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const topicId = this.getNodeParameter('topicId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						const body: IDataObject = { ...updateFields };

						if (updateFields.delayedPostAt) {
							body.delayed_post_at = formatDateForCanvas(updateFields.delayedPostAt as string);
							delete body.delayedPostAt;
						}
						if (updateFields.lockAt) {
							body.lock_at = formatDateForCanvas(updateFields.lockAt as string);
							delete body.lockAt;
						}

						responseData = await canvasApiRequest.call(this, 'PUT', `/courses/${courseId}/discussion_topics/${topicId}`, body);
					}

					if (operation === 'delete') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const topicId = this.getNodeParameter('topicId', i) as string;
						responseData = await canvasApiRequest.call(this, 'DELETE', `/courses/${courseId}/discussion_topics/${topicId}`);
					}

					if (operation === 'getEntries') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const topicId = this.getNodeParameter('topicId', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await canvasApiRequestAllItems.call(this, 'GET', `/courses/${courseId}/discussion_topics/${topicId}/entries`);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							responseData = await canvasApiRequest.call(this, 'GET', `/courses/${courseId}/discussion_topics/${topicId}/entries`, {}, { per_page: limit });
						}
					}

					if (operation === 'createEntry') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const topicId = this.getNodeParameter('topicId', i) as string;
						const message = this.getNodeParameter('message', i) as string;
						const entryOptions = this.getNodeParameter('entryOptions', i) as IDataObject;

						let endpoint = `/courses/${courseId}/discussion_topics/${topicId}/entries`;

						if (entryOptions.parentEntryId) {
							endpoint = `/courses/${courseId}/discussion_topics/${topicId}/entries/${entryOptions.parentEntryId}/replies`;
						}

						responseData = await canvasApiRequest.call(this, 'POST', endpoint, { message });
					}

					if (operation === 'markRead') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const topicId = this.getNodeParameter('topicId', i) as string;
						responseData = await canvasApiRequest.call(this, 'PUT', `/courses/${courseId}/discussion_topics/${topicId}/read_all`);
					}
				}

				// ----------------------------------------
				// Grade Operations
				// ----------------------------------------
				if (resource === 'grade') {
					if (operation === 'getAll') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query: IDataObject = {};

						if (filters.studentId) query.student_ids = [filters.studentId];
						if (filters.assignmentId) query.assignment_ids = [filters.assignmentId];
						if (filters.gradingPeriodId) query.grading_period_id = filters.gradingPeriodId;
						if (filters.scope) {
							query.enrollment_state = filters.scope === 'students' ? 'active' : filters.scope;
						}
						if (filters.include) Object.assign(query, buildIncludeArray(filters.include as string[]));

						if (returnAll) {
							responseData = await canvasApiRequestAllItems.call(this, 'GET', `/courses/${courseId}/enrollments`, {}, query);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.per_page = limit;
							responseData = await canvasApiRequest.call(this, 'GET', `/courses/${courseId}/enrollments`, {}, query);
						}
					}

					if (operation === 'update') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const assignmentId = this.getNodeParameter('assignmentId', i) as string;
						const studentId = this.getNodeParameter('studentId', i) as string;
						const grade = this.getNodeParameter('grade', i) as string;
						const updateOptions = this.getNodeParameter('updateOptions', i) as IDataObject;

						const body: IDataObject = {
							posted_grade: grade,
						};

						if (updateOptions.comment) {
							body['comment[text_comment]'] = updateOptions.comment;
						}
						if (updateOptions.excuse !== undefined) {
							body.excuse = updateOptions.excuse;
						}
						if (updateOptions.latePolicyStatus) {
							body.late_policy_status = updateOptions.latePolicyStatus;
						}

						const nestedBody = buildNestedObject('submission', body);
						responseData = await canvasApiRequest.call(this, 'PUT', `/courses/${courseId}/assignments/${assignmentId}/submissions/${studentId}`, nestedBody);
					}

					if (operation === 'getGradingPeriods') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const options = this.getNodeParameter('options', i) as IDataObject;

						let endpoint = `/courses/${courseId}/grading_periods`;
						if (options.accountId) {
							endpoint = `/accounts/${options.accountId}/grading_periods`;
						}

						if (returnAll) {
							responseData = await canvasApiRequestAllItems.call(this, 'GET', endpoint);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							responseData = await canvasApiRequest.call(this, 'GET', endpoint, {}, { per_page: limit });
						}
					}

					if (operation === 'getGradingStandards') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const options = this.getNodeParameter('standardsOptions', i) as IDataObject;

						let endpoint = `/courses/${courseId}/grading_standards`;
						if (options.accountId) {
							endpoint = `/accounts/${options.accountId}/grading_standards`;
						}

						if (returnAll) {
							responseData = await canvasApiRequestAllItems.call(this, 'GET', endpoint);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							responseData = await canvasApiRequest.call(this, 'GET', endpoint, {}, { per_page: limit });
						}
					}
				}

				// ----------------------------------------
				// File Operations
				// ----------------------------------------
				if (resource === 'file') {
					if (operation === 'get') {
						const fileId = this.getNodeParameter('fileId', i) as string;
						const options = this.getNodeParameter('options', i) as IDataObject;
						const query: IDataObject = {};

						if (options.include) Object.assign(query, buildIncludeArray(options.include as string[]));

						responseData = await canvasApiRequest.call(this, 'GET', `/files/${fileId}`, {}, query);
					}

					if (operation === 'getAll') {
						const contextType = this.getNodeParameter('contextType', i) as string;
						const contextId = this.getNodeParameter('contextId', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query: IDataObject = {};

						if (filters.searchTerm) query.search_term = filters.searchTerm;
						if (filters.contentTypes) query.content_types = (filters.contentTypes as string).split(',');
						if (filters.sort) query.sort = filters.sort;
						if (filters.order) query.order = filters.order;
						if (filters.include) Object.assign(query, buildIncludeArray(filters.include as string[]));

						let endpoint = '';
						if (contextType === 'folder') {
							endpoint = `/folders/${contextId}/files`;
						} else {
							endpoint = `/${contextType}s/${contextId}/files`;
						}

						if (returnAll) {
							responseData = await canvasApiRequestAllItems.call(this, 'GET', endpoint, {}, query);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.per_page = limit;
							responseData = await canvasApiRequest.call(this, 'GET', endpoint, {}, query);
						}
					}

					if (operation === 'update') {
						const fileId = this.getNodeParameter('fileId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						const body: IDataObject = { ...updateFields };

						if (updateFields.lockAt) {
							body.lock_at = formatDateForCanvas(updateFields.lockAt as string);
							delete body.lockAt;
						}
						if (updateFields.unlockAt) {
							body.unlock_at = formatDateForCanvas(updateFields.unlockAt as string);
							delete body.unlockAt;
						}

						responseData = await canvasApiRequest.call(this, 'PUT', `/files/${fileId}`, body);
					}

					if (operation === 'delete') {
						const fileId = this.getNodeParameter('fileId', i) as string;
						responseData = await canvasApiRequest.call(this, 'DELETE', `/files/${fileId}`);
					}

					if (operation === 'download') {
						const fileId = this.getNodeParameter('fileId', i) as string;
						const fileData = await canvasApiRequest.call(this, 'GET', `/files/${fileId}`) as IDataObject;
						responseData = { url: fileData.url, filename: fileData.filename };
					}

					if (operation === 'upload') {
						const contextType = this.getNodeParameter('contextType', i) as string;
						const contextId = this.getNodeParameter('contextId', i) as string;
						const fileName = this.getNodeParameter('fileName', i) as string;
						const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i) as string;
						const uploadOptions = this.getNodeParameter('uploadOptions', i) as IDataObject;

						const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
						const buffer = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);

						let endpoint = '';
						if (contextType === 'folder') {
							endpoint = `/folders/${contextId}/files`;
						} else {
							endpoint = `/${contextType}s/${contextId}/files`;
						}

						const additionalParams: IDataObject = {};
						if (uploadOptions.parentFolderId) additionalParams.parent_folder_id = uploadOptions.parentFolderId;
						if (uploadOptions.parentFolderPath) additionalParams.parent_folder_path = uploadOptions.parentFolderPath;
						if (uploadOptions.onDuplicate) additionalParams.on_duplicate = uploadOptions.onDuplicate;

						responseData = await canvasFileUpload.call(
							this,
							endpoint,
							fileName,
							buffer,
							uploadOptions.contentType as string || binaryData.mimeType,
							additionalParams,
						);
					}

					if (operation === 'getFolders') {
						const contextType = this.getNodeParameter('contextType', i) as string;
						const contextId = this.getNodeParameter('contextId', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						let endpoint = '';
						if (contextType === 'folder') {
							endpoint = `/folders/${contextId}/folders`;
						} else {
							endpoint = `/${contextType}s/${contextId}/folders`;
						}

						if (returnAll) {
							responseData = await canvasApiRequestAllItems.call(this, 'GET', endpoint);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							responseData = await canvasApiRequest.call(this, 'GET', endpoint, {}, { per_page: limit });
						}
					}

					if (operation === 'createFolder') {
						const contextType = this.getNodeParameter('contextType', i) as string;
						const contextId = this.getNodeParameter('contextId', i) as string;
						const folderName = this.getNodeParameter('folderName', i) as string;
						const folderOptions = this.getNodeParameter('folderOptions', i) as IDataObject;

						const body: IDataObject = { name: folderName, ...folderOptions };

						if (folderOptions.lockAt) {
							body.lock_at = formatDateForCanvas(folderOptions.lockAt as string);
							delete body.lockAt;
						}
						if (folderOptions.unlockAt) {
							body.unlock_at = formatDateForCanvas(folderOptions.unlockAt as string);
							delete body.unlockAt;
						}

						let endpoint = '';
						if (contextType === 'folder') {
							endpoint = `/folders/${contextId}/folders`;
						} else {
							endpoint = `/${contextType}s/${contextId}/folders`;
						}

						responseData = await canvasApiRequest.call(this, 'POST', endpoint, body);
					}
				}

				// ----------------------------------------
				// Announcement Operations
				// ----------------------------------------
				if (resource === 'announcement') {
					if (operation === 'create') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const title = this.getNodeParameter('title', i) as string;
						const message = this.getNodeParameter('message', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							title,
							message,
							is_announcement: true,
							...additionalFields,
						};

						if (additionalFields.delayedPostAt) {
							body.delayed_post_at = formatDateForCanvas(additionalFields.delayedPostAt as string);
							delete body.delayedPostAt;
						}
						if (additionalFields.lockAt) {
							body.lock_at = formatDateForCanvas(additionalFields.lockAt as string);
							delete body.lockAt;
						}

						responseData = await canvasApiRequest.call(this, 'POST', `/courses/${courseId}/discussion_topics`, body);
					}

					if (operation === 'get') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const announcementId = this.getNodeParameter('announcementId', i) as string;
						const options = this.getNodeParameter('options', i) as IDataObject;
						const query: IDataObject = {};

						if (options.include) Object.assign(query, buildIncludeArray(options.include as string[]));

						responseData = await canvasApiRequest.call(this, 'GET', `/courses/${courseId}/discussion_topics/${announcementId}`, {}, query);
					}

					if (operation === 'getAll') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query: IDataObject = {
							only_announcements: true,
						};

						if (filters.startDate) query.start_date = formatDateForCanvas(filters.startDate as string);
						if (filters.endDate) query.end_date = formatDateForCanvas(filters.endDate as string);
						if (filters.activeOnly) query.active_only = filters.activeOnly;
						if (filters.latestOnly) query.latest_only = filters.latestOnly;
						if (filters.include) Object.assign(query, buildIncludeArray(filters.include as string[]));

						// Use the announcements endpoint
						query['context_codes[]'] = `course_${courseId}`;

						if (returnAll) {
							responseData = await canvasApiRequestAllItems.call(this, 'GET', '/announcements', {}, query);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.per_page = limit;
							responseData = await canvasApiRequest.call(this, 'GET', '/announcements', {}, query);
						}
					}

					if (operation === 'update') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const announcementId = this.getNodeParameter('announcementId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						const body: IDataObject = { ...updateFields };

						if (updateFields.delayedPostAt) {
							body.delayed_post_at = formatDateForCanvas(updateFields.delayedPostAt as string);
							delete body.delayedPostAt;
						}
						if (updateFields.lockAt) {
							body.lock_at = formatDateForCanvas(updateFields.lockAt as string);
							delete body.lockAt;
						}

						responseData = await canvasApiRequest.call(this, 'PUT', `/courses/${courseId}/discussion_topics/${announcementId}`, body);
					}

					if (operation === 'delete') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const announcementId = this.getNodeParameter('announcementId', i) as string;
						responseData = await canvasApiRequest.call(this, 'DELETE', `/courses/${courseId}/discussion_topics/${announcementId}`);
					}
				}

				// Handle array or single response
				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					const executionData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: (error as Error).message }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionData);
					continue;
				}
				throw new NodeOperationError(this.getNode(), error as Error, { itemIndex: i });
			}
		}

		return [returnData];
	}
}
