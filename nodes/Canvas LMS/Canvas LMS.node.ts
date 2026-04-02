/**
 * Copyright (c) 2026 Velocity BPA
 * 
 * Licensed under the Business Source License 1.1 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     https://github.com/VelocityBPA/n8n-nodes-canvaslms/blob/main/LICENSE
 * 
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeOperationError,
  NodeApiError,
} from 'n8n-workflow';

export class CanvasLMS implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Canvas LMS',
    name: 'canvaslms',
    icon: 'file:canvaslms.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with the Canvas LMS API',
    defaults: {
      name: 'Canvas LMS',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'canvaslmsApi',
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
          {
            name: 'Course',
            value: 'course',
          },
          {
            name: 'Assignment',
            value: 'assignment',
          },
          {
            name: 'Enrollment',
            value: 'enrollment',
          },
          {
            name: 'Grade',
            value: 'grade',
          },
          {
            name: 'Submission',
            value: 'submission',
          },
          {
            name: 'User',
            value: 'user',
          },
          {
            name: 'Analytics',
            value: 'analytics',
          }
        ],
        default: 'course',
      },
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
			name: 'List Courses',
			value: 'listCourses',
			description: 'Get all courses for the current user',
			action: 'List courses',
		},
		{
			name: 'Get Course',
			value: 'getCourse',
			description: 'Get details of a specific course',
			action: 'Get a course',
		},
		{
			name: 'Create Course',
			value: 'createCourse',
			description: 'Create a new course',
			action: 'Create a course',
		},
		{
			name: 'Update Course',
			value: 'updateCourse',
			description: 'Update course details',
			action: 'Update a course',
		},
		{
			name: 'Delete Course',
			value: 'deleteCourse',
			description: 'Delete or conclude a course',
			action: 'Delete a course',
		},
	],
	default: 'listCourses',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['assignment'] } },
  options: [
    { name: 'List Assignments', value: 'listAssignments', description: 'Get assignments for a course', action: 'List assignments' },
    { name: 'Get Assignment', value: 'getAssignment', description: 'Get specific assignment details', action: 'Get assignment' },
    { name: 'Create Assignment', value: 'createAssignment', description: 'Create new assignment', action: 'Create assignment' },
    { name: 'Update Assignment', value: 'updateAssignment', description: 'Update assignment details', action: 'Update assignment' },
    { name: 'Delete Assignment', value: 'deleteAssignment', description: 'Delete an assignment', action: 'Delete assignment' }
  ],
  default: 'listAssignments',
},
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
			name: 'List Enrollments',
			value: 'listEnrollments',
			description: 'Get enrollments for a course',
			action: 'List enrollments',
		},
		{
			name: 'Get User Enrollments',
			value: 'getUserEnrollments',
			description: 'Get enrollments for a user',
			action: 'Get user enrollments',
		},
		{
			name: 'Create Enrollment',
			value: 'createEnrollment',
			description: 'Enroll user in course',
			action: 'Create enrollment',
		},
		{
			name: 'Update Enrollment',
			value: 'updateEnrollment',
			description: 'Update enrollment details',
			action: 'Update enrollment',
		},
		{
			name: 'Delete Enrollment',
			value: 'deleteEnrollment',
			description: 'Remove enrollment',
			action: 'Delete enrollment',
		},
	],
	default: 'listEnrollments',
},
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
			name: 'Get Gradebook History',
			value: 'getGradebookHistory',
			description: 'Get gradebook change history for a course',
			action: 'Get gradebook history',
		},
		{
			name: 'Get Grades',
			value: 'getGrades',
			description: 'Get grades for an assignment group',
			action: 'Get grades for assignment group',
		},
		{
			name: 'Update Grade',
			value: 'updateGrade',
			description: 'Update grade for a submission',
			action: 'Update grade for submission',
		},
		{
			name: 'Create Grade',
			value: 'createGrade',
			description: 'Grade a submission',
			action: 'Grade a submission',
		},
	],
	default: 'getGradebookHistory',
},
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
			name: 'List Submissions',
			value: 'listSubmissions',
			description: 'Get submissions for assignment',
			action: 'List submissions',
		},
		{
			name: 'Get Submission',
			value: 'getSubmission',
			description: 'Get specific submission',
			action: 'Get submission',
		},
		{
			name: 'Create Submission',
			value: 'createSubmission',
			description: 'Submit assignment',
			action: 'Create submission',
		},
		{
			name: 'Update Submission',
			value: 'updateSubmission',
			description: 'Update submission',
			action: 'Update submission',
		},
	],
	default: 'listSubmissions',
},
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
			name: 'List Users',
			value: 'listUsers',
			description: 'Get users in account',
			action: 'List users',
		},
		{
			name: 'Get User',
			value: 'getUser',
			description: 'Get user details',
			action: 'Get user',
		},
		{
			name: 'Create User',
			value: 'createUser',
			description: 'Create new user',
			action: 'Create user',
		},
		{
			name: 'Update User',
			value: 'updateUser',
			description: 'Update user information',
			action: 'Update user',
		},
		{
			name: 'Delete User',
			value: 'deleteUser',
			description: 'Delete user account',
			action: 'Delete user',
		},
	],
	default: 'listUsers',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['analytics'] } },
  options: [
    {
      name: 'Get Course Activity',
      value: 'getCourseActivity',
      description: 'Get course activity analytics',
      action: 'Get course activity analytics'
    },
    {
      name: 'Get Assignment Analytics',
      value: 'getAssignmentAnalytics',
      description: 'Get assignment analytics',
      action: 'Get assignment analytics'
    },
    {
      name: 'Get Student Summaries',
      value: 'getStudentSummaries',
      description: 'Get student performance summaries',
      action: 'Get student performance summaries'
    },
    {
      name: 'Get User Course Activity',
      value: 'getUserCourseActivity',
      description: 'Get user activity in course',
      action: 'Get user activity in course'
    },
    {
      name: 'Get User Assignment Data',
      value: 'getUserAssignmentData',
      description: 'Get user assignment analytics',
      action: 'Get user assignment analytics'
    }
  ],
  default: 'getCourseActivity'
},
{
	displayName: 'Course ID',
	name: 'courseId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['course'],
			operation: ['getCourse', 'updateCourse', 'deleteCourse'],
		},
	},
	default: '',
	description: 'The ID of the course',
},
{
	displayName: 'Account ID',
	name: 'accountId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['course'],
			operation: ['createCourse'],
		},
	},
	default: '',
	description: 'The ID of the account to create the course in',
},
{
	displayName: 'Course Name',
	name: 'courseName',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['course'],
			operation: ['createCourse'],
		},
	},
	default: '',
	description: 'Name of the course',
},
{
	displayName: 'Course Code',
	name: 'courseCode',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['course'],
			operation: ['createCourse'],
		},
	},
	default: '',
	description: 'Short name or code for the course',
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
			operation: ['listCourses', 'getCourse', 'createCourse', 'updateCourse'],
		},
	},
	options: [
		{
			displayName: 'Enrollment Type',
			name: 'enrollmentType',
			type: 'options',
			options: [
				{ name: 'Teacher', value: 'teacher' },
				{ name: 'Student', value: 'student' },
				{ name: 'TA', value: 'ta' },
				{ name: 'Observer', value: 'observer' },
				{ name: 'Designer', value: 'designer' },
			],
			default: '',
			description: 'Filter courses by enrollment type',
			displayOptions: {
				show: {
					'/operation': ['listCourses'],
				},
			},
		},
		{
			displayName: 'Include',
			name: 'include',
			type: 'multiOptions',
			options: [
				{ name: 'Needs Grading Count', value: 'needs_grading_count' },
				{ name: 'Syllabus Body', value: 'syllabus_body' },
				{ name: 'Public Description', value: 'public_description' },
				{ name: 'Total Scores', value: 'total_scores' },
				{ name: 'Current Grading Period Scores', value: 'current_grading_period_scores' },
				{ name: 'Term', value: 'term' },
				{ name: 'Course Progress', value: 'course_progress' },
				{ name: 'Sections', value: 'sections' },
				{ name: 'Storage Quota', value: 'storage_quota' },
				{ name: 'Total Students', value: 'total_students' },
				{ name: 'Teachers', value: 'teachers' },
			],
			default: [],
			description: 'Additional information to include in the response',
		},
		{
			displayName: 'Description',
			name: 'description',
			type: 'string',
			default: '',
			description: 'Course description',
			displayOptions: {
				show: {
					'/operation': ['createCourse', 'updateCourse'],
				},
			},
		},
		{
			displayName: 'Start Date',
			name: 'startAt',
			type: 'dateTime',
			default: '',
			description: 'Course start date',
			displayOptions: {
				show: {
					'/operation': ['createCourse', 'updateCourse'],
				},
			},
		},
		{
			displayName: 'End Date',
			name: 'endAt',
			type: 'dateTime',
			default: '',
			description: 'Course end date',
			displayOptions: {
				show: {
					'/operation': ['createCourse', 'updateCourse'],
				},
			},
		},
		{
			displayName: 'License',
			name: 'license',
			type: 'options',
			options: [
				{ name: 'Private (Copyrighted)', value: 'private' },
				{ name: 'CC Attribution Non-Commercial No Derivatives', value: 'cc_by_nc_nd' },
				{ name: 'CC Attribution Non-Commercial Share Alike', value: 'cc_by_nc_sa' },
				{ name: 'CC Attribution Non-Commercial', value: 'cc_by_nc' },
				{ name: 'CC Attribution No Derivatives', value: 'cc_by_nd' },
				{ name: 'CC Attribution Share Alike', value: 'cc_by_sa' },
				{ name: 'CC Attribution', value: 'cc_by' },
				{ name: 'Public Domain', value: 'public_domain' },
			],
			default: 'private',
			description: 'Course content license',
			displayOptions: {
				show: {
					'/operation': ['createCourse', 'updateCourse'],
				},
			},
		},
		{
			displayName: 'Is Public',
			name: 'isPublic',
			type: 'boolean',
			default: false,
			description: 'Whether the course is public',
			displayOptions: {
				show: {
					'/operation': ['createCourse', 'updateCourse'],
				},
			},
		},
		{
			displayName: 'Is Public to Auth Users',
			name: 'isPublicToAuthUsers',
			type: 'boolean',
			default: false,
			description: 'Whether the course is public to authenticated users',
			displayOptions: {
				show: {
					'/operation': ['createCourse', 'updateCourse'],
				},
			},
		},
		{
			displayName: 'Public Syllabus',
			name: 'publicSyllabus',
			type: 'boolean',
			default: false,
			description: 'Whether the syllabus is public',
			displayOptions: {
				show: {
					'/operation': ['createCourse', 'updateCourse'],
				},
			},
		},
		{
			displayName: 'Public Syllabus to Auth',
			name: 'publicSyllabusToAuth',
			type: 'boolean',
			default: false,
			description: 'Whether the syllabus is public to authenticated users',
			displayOptions: {
				show: {
					'/operation': ['createCourse', 'updateCourse'],
				},
			},
		},
		{
			displayName: 'Public Description',
			name: 'publicDescription',
			type: 'string',
			default: '',
			description: 'Public description of the course',
			displayOptions: {
				show: {
					'/operation': ['createCourse', 'updateCourse'],
				},
			},
		},
		{
			displayName: 'Allow Student Wiki Edits',
			name: 'allowStudentWikiEdits',
			type: 'boolean',
			default: false,
			description: 'Whether students can edit the course wiki',
			displayOptions: {
				show: {
					'/operation': ['createCourse', 'updateCourse'],
				},
			},
		},
		{
			displayName: 'Allow Wiki Comments',
			name: 'allowWikiComments',
			type: 'boolean',
			default: false,
			description: 'Whether wiki comments are allowed',
			displayOptions: {
				show: {
					'/operation': ['createCourse', 'updateCourse'],
				},
			},
		},
		{
			displayName: 'Allow Student Forum Attachments',
			name: 'allowStudentForumAttachments',
			type: 'boolean',
			default: false,
			description: 'Whether students can attach files to forum posts',
			displayOptions: {
				show: {
					'/operation': ['createCourse', 'updateCourse'],
				},
			},
		},
		{
			displayName: 'Open Enrollment',
			name: 'openEnrollment',
			type: 'boolean',
			default: false,
			description: 'Whether the course is open enrollment',
			displayOptions: {
				show: {
					'/operation': ['createCourse', 'updateCourse'],
				},
			},
		},
		{
			displayName: 'Self Enrollment',
			name: 'selfEnrollment',
			type: 'boolean',
			default: false,
			description: 'Whether students can self-enroll',
			displayOptions: {
				show: {
					'/operation': ['createCourse', 'updateCourse'],
				},
			},
		},
		{
			displayName: 'Restrict Enrollments to Course Dates',
			name: 'restrictEnrollmentsToCourseDates',
			type: 'boolean',
			default: false,
			description: 'Whether enrollments are restricted to course dates',
			displayOptions: {
				show: {
					'/operation': ['createCourse', 'updateCourse'],
				},
			},
		},
		{
			displayName: 'Term ID',
			name: 'termId',
			type: 'string',
			default: '',
			description: 'The term ID for the course',
			displayOptions: {
				show: {
					'/operation': ['createCourse', 'updateCourse'],
				},
			},
		},
		{
			displayName: 'SIS Course ID',
			name: 'sisCourseId',
			type: 'string',
			default: '',
			description: 'SIS identifier for the course',
			displayOptions: {
				show: {
					'/operation': ['createCourse', 'updateCourse'],
				},
			},
		},
		{
			displayName: 'Integration ID',
			name: 'integrationId',
			type: 'string',
			default: '',
			description: 'Integration ID for the course',
			displayOptions: {
				show: {
					'/operation': ['createCourse', 'updateCourse'],
				},
			},
		},
		{
			displayName: 'Hide Final Grades',
			name: 'hideFinalGrades',
			type: 'boolean',
			default: false,
			description: 'Whether final grades are hidden from students',
			displayOptions: {
				show: {
					'/operation': ['createCourse', 'updateCourse'],
				},
			},
		},
		{
			displayName: 'Apply Assignment Group Weights',
			name: 'applyAssignmentGroupWeights',
			type: 'boolean',
			default: false,
			description: 'Whether assignment group weights are applied',
			displayOptions: {
				show: {
					'/operation': ['createCourse', 'updateCourse'],
				},
			},
		},
	],
},
{
	displayName: 'Event',
	name: 'event',
	type: 'options',
	options: [
		{ name: 'Delete', value: 'delete' },
		{ name: 'Conclude', value: 'conclude' },
	],
	default: 'conclude',
	description: 'The action to perform on the course',
	displayOptions: {
		show: {
			resource: ['course'],
			operation: ['deleteCourse'],
		},
	},
},
{
  displayName: 'Course ID',
  name: 'courseId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['assignment'],
      operation: ['listAssignments', 'getAssignment', 'createAssignment', 'updateAssignment', 'deleteAssignment']
    }
  },
  default: '',
  description: 'The ID of the course'
},
{
  displayName: 'Assignment ID',
  name: 'assignmentId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['assignment'],
      operation: ['getAssignment', 'updateAssignment', 'deleteAssignment']
    }
  },
  default: '',
  description: 'The ID of the assignment'
},
{
  displayName: 'Include',
  name: 'include',
  type: 'multiOptions',
  displayOptions: {
    show: {
      resource: ['assignment'],
      operation: ['listAssignments', 'getAssignment']
    }
  },
  options: [
    { name: 'Submission', value: 'submission' },
    { name: 'Assignment Visibility', value: 'assignment_visibility' },
    { name: 'All Dates', value: 'all_dates' },
    { name: 'Overrides', value: 'overrides' },
    { name: 'Observed Users', value: 'observed_users' },
    { name: 'Can Edit', value: 'can_edit' }
  ],
  default: [],
  description: 'Array of additional information to include with each assignment'
},
{
  displayName: 'Search Term',
  name: 'searchTerm',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['assignment'],
      operation: ['listAssignments']
    }
  },
  default: '',
  description: 'Search term to filter assignments by name'
},
{
  displayName: 'Assignment Name',
  name: 'assignmentName',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['assignment'],
      operation: ['createAssignment', 'updateAssignment']
    }
  },
  default: '',
  description: 'The name of the assignment'
},
{
  displayName: 'Assignment Description',
  name: 'assignmentDescription',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['assignment'],
      operation: ['createAssignment', 'updateAssignment']
    }
  },
  default: '',
  description: 'The description of the assignment'
},
{
  displayName: 'Due Date',
  name: 'dueDate',
  type: 'dateTime',
  displayOptions: {
    show: {
      resource: ['assignment'],
      operation: ['createAssignment', 'updateAssignment']
    }
  },
  default: '',
  description: 'The due date for the assignment'
},
{
  displayName: 'Points Possible',
  name: 'pointsPossible',
  type: 'number',
  displayOptions: {
    show: {
      resource: ['assignment'],
      operation: ['createAssignment', 'updateAssignment']
    }
  },
  default: 0,
  description: 'The maximum points possible for the assignment'
},
{
  displayName: 'Submission Types',
  name: 'submissionTypes',
  type: 'multiOptions',
  displayOptions: {
    show: {
      resource: ['assignment'],
      operation: ['createAssignment', 'updateAssignment']
    }
  },
  options: [
    { name: 'Online Text Entry', value: 'online_text_entry' },
    { name: 'Online URL', value: 'online_url' },
    { name: 'Online Upload', value: 'online_upload' },
    { name: 'Media Recording', value: 'media_recording' },
    { name: 'None', value: 'none' }
  ],
  default: ['none'],
  description: 'List of allowed submission types for the assignment'
},
{
  displayName: 'Assignment Group ID',
  name: 'assignmentGroupId',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['assignment'],
      operation: ['createAssignment', 'updateAssignment']
    }
  },
  default: '',
  description: 'The assignment group this assignment belongs to'
},
{
  displayName: 'Published',
  name: 'published',
  type: 'boolean',
  displayOptions: {
    show: {
      resource: ['assignment'],
      operation: ['createAssignment', 'updateAssignment']
    }
  },
  default: false,
  description: 'Whether this assignment is published (visible to students)'
},
{
	displayName: 'Course ID',
	name: 'courseId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['enrollment'],
			operation: ['listEnrollments', 'createEnrollment', 'updateEnrollment', 'deleteEnrollment'],
		},
	},
	default: '',
	description: 'The ID of the course',
},
{
	displayName: 'User ID',
	name: 'userId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['enrollment'],
			operation: ['getUserEnrollments'],
		},
	},
	default: '',
	description: 'The ID of the user',
},
{
	displayName: 'Enrollment ID',
	name: 'enrollmentId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['enrollment'],
			operation: ['updateEnrollment', 'deleteEnrollment'],
		},
	},
	default: '',
	description: 'The ID of the enrollment',
},
{
	displayName: 'Type',
	name: 'type',
	type: 'options',
	displayOptions: {
		show: {
			resource: ['enrollment'],
			operation: ['listEnrollments', 'getUserEnrollments'],
		},
	},
	options: [
		{
			name: 'All',
			value: '',
		},
		{
			name: 'Student Enrollment',
			value: 'StudentEnrollment',
		},
		{
			name: 'Teacher Enrollment',
			value: 'TeacherEnrollment',
		},
		{
			name: 'TA Enrollment',
			value: 'TaEnrollment',
		},
		{
			name: 'Observer Enrollment',
			value: 'ObserverEnrollment',
		},
		{
			name: 'Designer Enrollment',
			value: 'DesignerEnrollment',
		},
	],
	default: '',
	description: 'Filter by enrollment type',
},
{
	displayName: 'Role',
	name: 'role',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['enrollment'],
			operation: ['listEnrollments', 'getUserEnrollments'],
		},
	},
	default: '',
	description: 'Filter by role name',
},
{
	displayName: 'State',
	name: 'state',
	type: 'options',
	displayOptions: {
		show: {
			resource: ['enrollment'],
			operation: ['listEnrollments', 'getUserEnrollments'],
		},
	},
	options: [
		{
			name: 'All',
			value: '',
		},
		{
			name: 'Active',
			value: 'active',
		},
		{
			name: 'Invited',
			value: 'invited',
		},
		{
			name: 'Completed',
			value: 'completed',
		},
		{
			name: 'Deleted',
			value: 'deleted',
		},
		{
			name: 'Rejected',
			value: 'rejected',
		},
		{
			name: 'Inactive',
			value: 'inactive',
		},
	],
	default: '',
	description: 'Filter by enrollment state',
},
{
	displayName: 'Filter User ID',
	name: 'filterUserId',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['enrollment'],
			operation: ['listEnrollments'],
		},
	},
	default: '',
	description: 'Filter by specific user ID',
},
{
	displayName: 'Enrollment',
	name: 'enrollment',
	type: 'json',
	required: true,
	displayOptions: {
		show: {
			resource: ['enrollment'],
			operation: ['createEnrollment', 'updateEnrollment'],
		},
	},
	default: '{}',
	description: 'Enrollment data as JSON object',
},
{
	displayName: 'Task',
	name: 'task',
	type: 'options',
	displayOptions: {
		show: {
			resource: ['enrollment'],
			operation: ['deleteEnrollment'],
		},
	},
	options: [
		{
			name: 'Conclude',
			value: 'conclude',
		},
		{
			name: 'Delete',
			value: 'delete',
		},
		{
			name: 'Inactivate',
			value: 'inactivate',
		},
		{
			name: 'Deactivate',
			value: 'deactivate',
		},
	],
	default: 'conclude',
	description: 'The action to take on the enrollment',
},
{
	displayName: 'Course ID',
	name: 'courseId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['grade'],
			operation: ['getGradebookHistory', 'getGrades', 'updateGrade', 'createGrade'],
		},
	},
	default: '',
	description: 'The ID of the course',
},
{
	displayName: 'Assignment ID',
	name: 'assignmentId',
	type: 'string',
	required: false,
	displayOptions: {
		show: {
			resource: ['grade'],
			operation: ['getGradebookHistory'],
		},
	},
	default: '',
	description: 'Filter by assignment ID',
},
{
	displayName: 'User ID',
	name: 'userId',
	type: 'string',
	required: false,
	displayOptions: {
		show: {
			resource: ['grade'],
			operation: ['getGradebookHistory'],
		},
	},
	default: '',
	description: 'Filter by user ID',
},
{
	displayName: 'Assignment Group ID',
	name: 'assignmentGroupId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['grade'],
			operation: ['getGrades'],
		},
	},
	default: '',
	description: 'The ID of the assignment group',
},
{
	displayName: 'Student IDs',
	name: 'studentIds',
	type: 'string',
	required: false,
	displayOptions: {
		show: {
			resource: ['grade'],
			operation: ['getGrades'],
		},
	},
	default: '',
	description: 'Comma-separated list of student IDs to filter by',
},
{
	displayName: 'Assignment ID',
	name: 'assignmentId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['grade'],
			operation: ['updateGrade', 'createGrade'],
		},
	},
	default: '',
	description: 'The ID of the assignment',
},
{
	displayName: 'User ID',
	name: 'userId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['grade'],
			operation: ['updateGrade', 'createGrade'],
		},
	},
	default: '',
	description: 'The ID of the user/student',
},
{
	displayName: 'Grade',
	name: 'grade',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['grade'],
			operation: ['createGrade'],
		},
	},
	default: '',
	description: 'The grade to assign',
},
{
	displayName: 'Submission Data',
	name: 'submissionData',
	type: 'json',
	required: true,
	displayOptions: {
		show: {
			resource: ['grade'],
			operation: ['updateGrade'],
		},
	},
	default: '{}',
	description: 'Submission data to update',
},
{
	displayName: 'Course ID',
	name: 'courseId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['submission'],
			operation: ['listSubmissions', 'getSubmission', 'createSubmission', 'updateSubmission'],
		},
	},
	default: '',
	description: 'The Canvas course ID',
},
{
	displayName: 'Assignment ID',
	name: 'assignmentId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['submission'],
			operation: ['listSubmissions', 'getSubmission', 'createSubmission', 'updateSubmission'],
		},
	},
	default: '',
	description: 'The Canvas assignment ID',
},
{
	displayName: 'User ID',
	name: 'userId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['submission'],
			operation: ['getSubmission', 'updateSubmission'],
		},
	},
	default: '',
	description: 'The Canvas user ID',
},
{
	displayName: 'Include',
	name: 'include',
	type: 'multiOptions',
	displayOptions: {
		show: {
			resource: ['submission'],
			operation: ['listSubmissions', 'getSubmission'],
		},
	},
	options: [
		{
			name: 'Submission History',
			value: 'submission_history',
		},
		{
			name: 'Submission Comments',
			value: 'submission_comments',
		},
		{
			name: 'Rubric Assessment',
			value: 'rubric_assessment',
		},
		{
			name: 'Assignment',
			value: 'assignment',
		},
		{
			name: 'User',
			value: 'user',
		},
	],
	default: [],
	description: 'Additional information to include with submissions',
},
{
	displayName: 'Grouped',
	name: 'grouped',
	type: 'boolean',
	displayOptions: {
		show: {
			resource: ['submission'],
			operation: ['listSubmissions'],
		},
	},
	default: false,
	description: 'Whether to group submissions by student',
},
{
	displayName: 'Submission Type',
	name: 'submissionType',
	type: 'options',
	displayOptions: {
		show: {
			resource: ['submission'],
			operation: ['createSubmission', 'updateSubmission'],
		},
	},
	options: [
		{
			name: 'Online Text Entry',
			value: 'online_text_entry',
		},
		{
			name: 'Online URL',
			value: 'online_url',
		},
		{
			name: 'Online Upload',
			value: 'online_upload',
		},
	],
	default: 'online_text_entry',
	description: 'Type of submission',
},
{
	displayName: 'Body',
	name: 'body',
	type: 'string',
	typeOptions: {
		rows: 5,
	},
	displayOptions: {
		show: {
			resource: ['submission'],
			operation: ['createSubmission', 'updateSubmission'],
			submissionType: ['online_text_entry'],
		},
	},
	default: '',
	description: 'Text content of submission',
},
{
	displayName: 'URL',
	name: 'url',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['submission'],
			operation: ['createSubmission', 'updateSubmission'],
			submissionType: ['online_url'],
		},
	},
	default: '',
	description: 'URL for submission',
},
{
	displayName: 'File IDs',
	name: 'fileIds',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['submission'],
			operation: ['createSubmission', 'updateSubmission'],
			submissionType: ['online_upload'],
		},
	},
	default: '',
	placeholder: '123,456,789',
	description: 'Comma-separated list of file IDs to submit',
},
{
	displayName: 'Comment',
	name: 'comment',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['submission'],
			operation: ['createSubmission', 'updateSubmission'],
		},
	},
	default: '',
	description: 'Comment to include with submission',
},
{
	displayName: 'Account ID',
	name: 'accountId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['user'],
			operation: ['listUsers', 'createUser', 'deleteUser'],
		},
	},
	default: '',
	description: 'The Canvas account ID',
},
{
	displayName: 'User ID',
	name: 'userId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['user'],
			operation: ['getUser', 'updateUser', 'deleteUser'],
		},
	},
	default: '',
	description: 'The Canvas user ID',
},
{
	displayName: 'Search Term',
	name: 'searchTerm',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['user'],
			operation: ['listUsers'],
		},
	},
	default: '',
	description: 'The partial name or email address to search for users',
},
{
	displayName: 'Enrollment Type',
	name: 'enrollmentType',
	type: 'options',
	displayOptions: {
		show: {
			resource: ['user'],
			operation: ['listUsers'],
		},
	},
	options: [
		{
			name: 'Teacher',
			value: 'teacher',
		},
		{
			name: 'Student',
			value: 'student',
		},
		{
			name: 'TA',
			value: 'ta',
		},
		{
			name: 'Observer',
			value: 'observer',
		},
		{
			name: 'Designer',
			value: 'designer',
		},
	],
	default: '',
	description: 'Filter users by enrollment type',
},
{
	displayName: 'Include',
	name: 'include',
	type: 'multiOptions',
	displayOptions: {
		show: {
			resource: ['user'],
			operation: ['listUsers', 'getUser'],
		},
	},
	options: [
		{
			name: 'Email',
			value: 'email',
		},
		{
			name: 'Enrollments',
			value: 'enrollments',
		},
		{
			name: 'Avatar URL',
			value: 'avatar_url',
		},
		{
			name: 'Permissions',
			value: 'permissions',
		},
		{
			name: 'Locale',
			value: 'locale',
		},
	],
	default: [],
	description: 'Additional information to include in the response',
},
{
	displayName: 'User Name',
	name: 'userName',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['user'],
			operation: ['createUser', 'updateUser'],
		},
	},
	default: '',
	description: 'The full name of the user',
},
{
	displayName: 'User Email',
	name: 'userEmail',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['user'],
			operation: ['createUser', 'updateUser'],
		},
	},
	default: '',
	description: 'The email address of the user',
},
{
	displayName: 'Short Name',
	name: 'shortName',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['user'],
			operation: ['createUser', 'updateUser'],
		},
	},
	default: '',
	description: 'The short name of the user',
},
{
	displayName: 'Sortable Name',
	name: 'sortableName',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['user'],
			operation: ['createUser', 'updateUser'],
		},
	},
	default: '',
	description: 'The sortable name of the user (Last, First)',
},
{
	displayName: 'Login Unique ID',
	name: 'loginUniqueId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['user'],
			operation: ['createUser'],
		},
	},
	default: '',
	description: 'The unique login ID for the user (username)',
},
{
	displayName: 'Password',
	name: 'password',
	type: 'string',
	typeOptions: {
		password: true,
	},
	displayOptions: {
		show: {
			resource: ['user'],
			operation: ['createUser'],
		},
	},
	default: '',
	description: 'Password for the user account',
},
{
	displayName: 'SIS User ID',
	name: 'sisUserId',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['user'],
			operation: ['createUser'],
		},
	},
	default: '',
	description: 'SIS ID for the user',
},
{
	displayName: 'Send Confirmation',
	name: 'sendConfirmation',
	type: 'boolean',
	displayOptions: {
		show: {
			resource: ['user'],
			operation: ['createUser'],
		},
	},
	default: false,
	description: 'Whether to send a confirmation email to the user',
},
{
  displayName: 'Course ID',
  name: 'courseId',
  type: 'number',
  required: true,
  displayOptions: {
    show: {
      resource: ['analytics'],
      operation: ['getCourseActivity', 'getAssignmentAnalytics', 'getStudentSummaries', 'getUserCourseActivity', 'getUserAssignmentData']
    }
  },
  default: '',
  description: 'The Canvas course ID'
},
{
  displayName: 'User ID',
  name: 'userId',
  type: 'number',
  required: true,
  displayOptions: {
    show: {
      resource: ['analytics'],
      operation: ['getUserCourseActivity', 'getUserAssignmentData']
    }
  },
  default: '',
  description: 'The Canvas user ID'
},
{
  displayName: 'Sort Column',
  name: 'sortColumn',
  type: 'options',
  displayOptions: {
    show: {
      resource: ['analytics'],
      operation: ['getStudentSummaries']
    }
  },
  options: [
    { name: 'Name', value: 'name' },
    { name: 'Score', value: 'score' },
    { name: 'Tardiness', value: 'tardiness' },
    { name: 'Participation', value: 'participation' }
  ],
  default: 'name',
  description: 'The column to sort student summaries by'
},
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const resource = this.getNodeParameter('resource', 0) as string;

    switch (resource) {
      case 'course':
        return [await executeCourseOperations.call(this, items)];
      case 'assignment':
        return [await executeAssignmentOperations.call(this, items)];
      case 'enrollment':
        return [await executeEnrollmentOperations.call(this, items)];
      case 'grade':
        return [await executeGradeOperations.call(this, items)];
      case 'submission':
        return [await executeSubmissionOperations.call(this, items)];
      case 'user':
        return [await executeUserOperations.call(this, items)];
      case 'analytics':
        return [await executeAnalyticsOperations.call(this, items)];
      default:
        throw new NodeOperationError(this.getNode(), `The resource "${resource}" is not supported`);
    }
  }
}

// ============================================================
// Resource Handler Functions
// ============================================================

async function executeCourseOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('canvaslmsApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'listCourses': {
					const additionalFields = this.getNodeParameter('additionalFields', i) as any;
					const queryParams: any = {};

					if (additionalFields.enrollmentType) {
						queryParams.enrollment_type = additionalFields.enrollmentType;
					}
					if (additionalFields.include && additionalFields.include.length > 0) {
						queryParams.include = additionalFields.include;
					}

					const qs = new URLSearchParams();
					Object.keys(queryParams).forEach(key => {
						if (Array.isArray(queryParams[key])) {
							queryParams[key].forEach((value: string) => qs.append(`${key}[]`, value));
						} else {
							qs.append(key, queryParams[key]);
						}
					});

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/courses${qs.toString() ? '?' + qs.toString() : ''}`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getCourse': {
					const courseId = this.getNodeParameter('courseId', i) as string;
					const additionalFields = this.getNodeParameter('additionalFields', i) as any;
					const queryParams: any = {};

					if (additionalFields.include && additionalFields.include.length > 0) {
						queryParams.include = additionalFields.include;
					}

					const qs = new URLSearchParams();
					Object.keys(queryParams).forEach(key => {
						if (Array.isArray(queryParams[key])) {
							queryParams[key].forEach((value: string) => qs.append(`${key}[]`, value));
						} else {
							qs.append(key, queryParams[key]);
						}
					});

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/courses/${courseId}${qs.toString() ? '?' + qs.toString() : ''}`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'createCourse': {
					const accountId = this.getNodeParameter('accountId', i) as string;
					const courseName = this.getNodeParameter('courseName', i) as string;
					const courseCode = this.getNodeParameter('courseCode', i) as string;
					const additionalFields = this.getNodeParameter('additionalFields', i) as any;

					const course: any = {
						name: courseName,
						course_code: courseCode,
					};

					if (additionalFields.description) course.description = additionalFields.description;
					if (additionalFields.startAt) course.start_at = additionalFields.startAt;
					if (additionalFields.endAt) course.end_at = additionalFields.endAt;
					if (additionalFields.license) course.license = additionalFields.license;
					if (additionalFields.isPublic !== undefined) course.is_public = additionalFields.isPublic;
					if (additionalFields.isPublicToAuthUsers !== undefined) course.is_public_to_auth_users = additionalFields.isPublicToAuthUsers;
					if (additionalFields.publicSyllabus !== undefined) course.public_syllabus = additionalFields.publicSyllabus;
					if (additionalFields.publicSyllabusToAuth !== undefined) course.public_syllabus_to_auth = additionalFields.publicSyllabusToAuth;
					if (additionalFields.publicDescription) course.public_description = additionalFields.publicDescription;
					if (additionalFields.allowStudentWikiEdits !== undefined) course.allow_student_wiki_edits = additionalFields.allowStudentWikiEdits;
					if (additionalFields.allowWikiComments !== undefined) course.allow_wiki_comments = additionalFields.allowWikiComments;
					if (additionalFields.allowStudentForumAttachments !== undefined) course.allow_student_forum_attachments = additionalFields.allowStudentForumAttachments;
					if (additionalFields.openEnrollment !== undefined) course.open_enrollment = additionalFields.openEnrollment;
					if (additionalFields.selfEnrollment !== undefined) course.self_enrollment = additionalFields.selfEnrollment;
					if (additionalFields.restrictEnrollmentsToCourseDates !== undefined) course.restrict_enrollments_to_course_dates = additionalFields.restrictEnrollmentsToCourseDates;
					if (additionalFields.termId) course.term_id = additionalFields.termId;
					if (additionalFields.sisCourseId) course.sis_course_id = additionalFields.sisCourseId;
					if (additionalFields.integrationId) course.integration_id = additionalFields.integrationId;
					if (additionalFields.hideFinalGrades !== undefined) course.hide_final_grades = additionalFields.hideFinalGrades;
					if (additionalFields.applyAssignmentGroupWeights !== undefined) course.apply_assignment_group_weights = additionalFields.applyAssignmentGroupWeights;

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/accounts/${accountId}/courses`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						body: { course },
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'updateCourse': {
					const courseId = this.getNodeParameter('courseId', i) as string;
					const additionalFields = this.getNodeParameter('additionalFields', i) as any;

					const course: any = {};

					if (additionalFields.description) course.description = additionalFields.description;
					if (additionalFields.startAt) course.start_at = additionalFields.startAt;
					if (additionalFields.endAt) course.end_at = additionalFields.endAt;
					if (additionalFields.license) course.license = additionalFields.license;
					if (additionalFields.isPublic !== undefined) course.is_public = additionalFields.isPublic;
					if (additionalFields.isPublicToAuthUsers !== undefined) course.is_public_to_auth_users = additionalFields.isPublicToAuthUsers;
					if (additionalFields.publicSyllabus !== undefined) course.public_syllabus = additionalFields.publicSyllabus;
					if (additionalFields.publicSyllabusToAuth !== undefined) course.public_syllabus_to_auth = additionalFields.publicSyllabusToAuth;
					if (additionalFields.publicDescription) course.public_description = additionalFields.publicDescription;
					if (additionalFields.allowStudentWikiEdits !== undefined) course.allow_student_wiki_edits = additionalFields.allowStudentWikiEdits;
					if (additionalFields.allowWikiComments !== undefined) course.allow_wiki_comments = additionalFields.allowWikiComments;
					if (additionalFields.allowStudentForumAttachments !== undefined) course.allow_student_forum_attachments = additionalFields.allowStudentForumAttachments;
					if (additionalFields.openEnrollment !== undefined) course.open_enrollment = additionalFields.openEnrollment;
					if (additionalFields.selfEnrollment !== undefined) course.self_enrollment = additionalFields.selfEnrollment;
					if (additionalFields.restrictEnrollmentsToCourseDates !== undefined) course.restrict_enrollments_to_course_dates = additionalFields.restrictEnrollmentsToCourseDates;
					if (additionalFields.termId) course.term_id = additionalFields.termId;
					if (additionalFields.sisCourseId) course.sis_course_id = additionalFields.sisCourseId;
					if (additionalFields.integrationId) course.integration_id = additionalFields.integrationId;
					if (additionalFields.hideFinalGrades !== undefined) course.hide_final_grades = additionalFields.hideFinalGrades;
					if (additionalFields.applyAssignmentGroupWeights !== undefined) course.apply_assignment_group_weights = additionalFields.applyAssignmentGroupWeights;

					const options: any = {
						method: 'PUT',
						url: `${credentials.baseUrl}/courses/${courseId}`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						body: { course },
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'deleteCourse': {
					const courseId = this.getNodeParameter('courseId', i) as string;
					const event = this.getNodeParameter('event', i) as string;

					const options: any = {
						method: 'DELETE',
						url: `${credentials.baseUrl}/courses/${courseId}`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						body: { event },
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});

		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeAssignmentOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('canvaslmsApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;

      switch (operation) {
        case 'listAssignments': {
          const courseId = this.getNodeParameter('courseId', i) as string;
          const include = this.getNodeParameter('include', i) as string[];
          const searchTerm = this.getNodeParameter('searchTerm', i) as string;

          const qs: any = {};
          if (include.length > 0) {
            qs.include = include;
          }
          if (searchTerm) {
            qs.search_term = searchTerm;
          }

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/courses/${courseId}/assignments`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
            },
            qs,
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getAssignment': {
          const courseId = this.getNodeParameter('courseId', i) as string;
          const assignmentId = this.getNodeParameter('assignmentId', i) as string;
          const include = this.getNodeParameter('include', i) as string[];

          const qs: any = {};
          if (include.length > 0) {
            qs.include = include;
          }

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/courses/${courseId}/assignments/${assignmentId}`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
            },
            qs,
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'createAssignment': {
          const courseId = this.getNodeParameter('courseId', i) as string;
          const assignmentName = this.getNodeParameter('assignmentName', i) as string;
          const assignmentDescription = this.getNodeParameter('assignmentDescription', i) as string;
          const dueDate = this.getNodeParameter('dueDate', i) as string;
          const pointsPossible = this.getNodeParameter('pointsPossible', i) as number;
          const submissionTypes = this.getNodeParameter('submissionTypes', i) as string[];
          const assignmentGroupId = this.getNodeParameter('assignmentGroupId', i) as string;
          const published = this.getNodeParameter('published', i) as boolean;

          const assignmentData: any = {
            name: assignmentName,
            submission_types: submissionTypes,
            published,
          };

          if (assignmentDescription) {
            assignmentData.description = assignmentDescription;
          }
          if (dueDate) {
            assignmentData.due_at = dueDate;
          }
          if (pointsPossible > 0) {
            assignmentData.points_possible = pointsPossible;
          }
          if (assignmentGroupId) {
            assignmentData.assignment_group_id = assignmentGroupId;
          }

          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/courses/${courseId}/assignments`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'Content-Type': 'application/json',
            },
            body: {
              assignment: assignmentData,
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'updateAssignment': {
          const courseId = this.getNodeParameter('courseId', i) as string;
          const assignmentId = this.getNodeParameter('assignmentId', i) as string;
          const assignmentName = this.getNodeParameter('assignmentName', i) as string;
          const assignmentDescription = this.getNodeParameter('assignmentDescription', i) as string;
          const dueDate = this.getNodeParameter('dueDate', i) as string;
          const pointsPossible = this.getNodeParameter('pointsPossible', i) as number;
          const submissionTypes = this.getNodeParameter('submissionTypes', i) as string[];
          const assignmentGroupId = this.getNodeParameter('assignmentGroupId', i) as string;
          const published = this.getNodeParameter('published', i) as boolean;

          const assignmentData: any = {
            name: assignmentName,
            submission_types: submissionTypes,
            published,
          };

          if (assignmentDescription) {
            assignmentData.description = assignmentDescription;
          }
          if (dueDate) {
            assignmentData.due_at = dueDate;
          }
          if (pointsPossible > 0) {
            assignmentData.points_possible = pointsPossible;
          }
          if (assignmentGroupId) {
            assignmentData.assignment_group_id = assignmentGroupId;
          }

          const options: any = {
            method: 'PUT',
            url: `${credentials.baseUrl}/courses/${courseId}/assignments/${assignmentId}`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'Content-Type': 'application/json',
            },
            body: {
              assignment: assignmentData,
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'deleteAssignment': {
          const courseId = this.getNodeParameter('courseId', i) as string;
          const assignmentId = this.getNodeParameter('assignmentId', i) as string;

          const options: any = {
            method: 'DELETE',
            url: `${credentials.baseUrl}/courses/${courseId}/assignments/${assignmentId}`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({ json: result, pairedItem: { item: i } });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}

async function executeEnrollmentOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('canvaslmsApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'listEnrollments': {
					const courseId = this.getNodeParameter('courseId', i) as string;
					const type = this.getNodeParameter('type', i) as string;
					const role = this.getNodeParameter('role', i) as string;
					const state = this.getNodeParameter('state', i) as string;
					const filterUserId = this.getNodeParameter('filterUserId', i) as string;

					const qs: any = {};
					if (type) qs.type = type;
					if (role) qs.role = role;
					if (state) qs.state = state;
					if (filterUserId) qs.user_id = filterUserId;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/courses/${courseId}/enrollments`,
						headers: {
							Authorization: `Bearer ${credentials.accessToken}`,
						},
						qs,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getUserEnrollments': {
					const userId = this.getNodeParameter('userId', i) as string;
					const type = this.getNodeParameter('type', i) as string;
					const role = this.getNodeParameter('role', i) as string;
					const state = this.getNodeParameter('state', i) as string;

					const qs: any = {};
					if (type) qs.type = type;
					if (role) qs.role = role;
					if (state) qs.state = state;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/users/${userId}/enrollments`,
						headers: {
							Authorization: `Bearer ${credentials.accessToken}`,
						},
						qs,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'createEnrollment': {
					const courseId = this.getNodeParameter('courseId', i) as string;
					const enrollmentData = this.getNodeParameter('enrollment', i) as string;

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/courses/${courseId}/enrollments`,
						headers: {
							Authorization: `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						body: {
							enrollment: JSON.parse(enrollmentData),
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'updateEnrollment': {
					const courseId = this.getNodeParameter('courseId', i) as string;
					const enrollmentId = this.getNodeParameter('enrollmentId', i) as string;
					const enrollmentData = this.getNodeParameter('enrollment', i) as string;

					const options: any = {
						method: 'PUT',
						url: `${credentials.baseUrl}/courses/${courseId}/enrollments/${enrollmentId}`,
						headers: {
							Authorization: `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						body: {
							enrollment: JSON.parse(enrollmentData),
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'deleteEnrollment': {
					const courseId = this.getNodeParameter('courseId', i) as string;
					const enrollmentId = this.getNodeParameter('enrollmentId', i) as string;
					const task = this.getNodeParameter('task', i) as string;

					const options: any = {
						method: 'DELETE',
						url: `${credentials.baseUrl}/courses/${courseId}/enrollments/${enrollmentId}`,
						headers: {
							Authorization: `Bearer ${credentials.accessToken}`,
						},
						qs: {
							task,
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(
						this.getNode(),
						`Unknown operation: ${operation}`,
						{ itemIndex: i },
					);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});
		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeGradeOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('canvaslmsApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'getGradebookHistory': {
					const courseId = this.getNodeParameter('courseId', i) as string;
					const assignmentId = this.getNodeParameter('assignmentId', i) as string;
					const userId = this.getNodeParameter('userId', i) as string;

					let url = `${credentials.baseUrl}/courses/${courseId}/gradebook_history/feed`;
					const queryParams: string[] = [];

					if (assignmentId) {
						queryParams.push(`assignment_id=${encodeURIComponent(assignmentId)}`);
					}
					if (userId) {
						queryParams.push(`user_id=${encodeURIComponent(userId)}`);
					}

					if (queryParams.length > 0) {
						url += `?${queryParams.join('&')}`;
					}

					const options: any = {
						method: 'GET',
						url,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getGrades': {
					const courseId = this.getNodeParameter('courseId', i) as string;
					const assignmentGroupId = this.getNodeParameter('assignmentGroupId', i) as string;
					const studentIds = this.getNodeParameter('studentIds', i) as string;

					let url = `${credentials.baseUrl}/courses/${courseId}/assignment_groups/${assignmentGroupId}/grades`;
					
					if (studentIds) {
						url += `?student_ids=${encodeURIComponent(studentIds)}`;
					}

					const options: any = {
						method: 'GET',
						url,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'updateGrade': {
					const courseId = this.getNodeParameter('courseId', i) as string;
					const assignmentId = this.getNodeParameter('assignmentId', i) as string;
					const userId = this.getNodeParameter('userId', i) as string;
					const submissionData = this.getNodeParameter('submissionData', i) as any;

					const options: any = {
						method: 'PUT',
						url: `${credentials.baseUrl}/courses/${courseId}/assignments/${assignmentId}/submissions/${userId}`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						body: submissionData,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'createGrade': {
					const courseId = this.getNodeParameter('courseId', i) as string;
					const assignmentId = this.getNodeParameter('assignmentId', i) as string;
					const userId = this.getNodeParameter('userId', i) as string;
					const grade = this.getNodeParameter('grade', i) as string;

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/courses/${courseId}/assignments/${assignmentId}/submissions/${userId}/grade`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						body: {
							grade: grade,
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});

		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeSubmissionOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('canvaslmsApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'listSubmissions': {
					const courseId = this.getNodeParameter('courseId', i) as string;
					const assignmentId = this.getNodeParameter('assignmentId', i) as string;
					const include = this.getNodeParameter('include', i) as string[];
					const grouped = this.getNodeParameter('grouped', i) as boolean;

					const qs: any = {};
					if (include.length > 0) {
						qs.include = include;
					}
					if (grouped) {
						qs.grouped = true;
					}

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/courses/${courseId}/assignments/${assignmentId}/submissions`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						qs,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getSubmission': {
					const courseId = this.getNodeParameter('courseId', i) as string;
					const assignmentId = this.getNodeParameter('assignmentId', i) as string;
					const userId = this.getNodeParameter('userId', i) as string;
					const include = this.getNodeParameter('include', i) as string[];

					const qs: any = {};
					if (include.length > 0) {
						qs.include = include;
					}

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/courses/${courseId}/assignments/${assignmentId}/submissions/${userId}`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						qs,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'createSubmission': {
					const courseId = this.getNodeParameter('courseId', i) as string;
					const assignmentId = this.getNodeParameter('assignmentId', i) as string;
					const submissionType = this.getNodeParameter('submissionType', i) as string;
					const comment = this.getNodeParameter('comment', i) as string;

					const submission: any = {
						submission_type: submissionType,
					};

					if (submissionType === 'online_text_entry') {
						const body = this.getNodeParameter('body', i) as string;
						submission.body = body;
					} else if (submissionType === 'online_url') {
						const url = this.getNodeParameter('url', i) as string;
						submission.url = url;
					} else if (submissionType === 'online_upload') {
						const fileIds = this.getNodeParameter('fileIds', i) as string;
						submission.file_ids = fileIds.split(',').map(id => parseInt(id.trim()));
					}

					const body: any = { submission };
					if (comment) {
						body.comment = { text_comment: comment };
					}

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/courses/${courseId}/assignments/${assignmentId}/submissions`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						body,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'updateSubmission': {
					const courseId = this.getNodeParameter('courseId', i) as string;
					const assignmentId = this.getNodeParameter('assignmentId', i) as string;
					const userId = this.getNodeParameter('userId', i) as string;
					const submissionType = this.getNodeParameter('submissionType', i) as string;
					const comment = this.getNodeParameter('comment', i) as string;

					const submission: any = {
						submission_type: submissionType,
					};

					if (submissionType === 'online_text_entry') {
						const body = this.getNodeParameter('body', i) as string;
						submission.body = body;
					} else if (submissionType === 'online_url') {
						const url = this.getNodeParameter('url', i) as string;
						submission.url = url;
					} else if (submissionType === 'online_upload') {
						const fileIds = this.getNodeParameter('fileIds', i) as string;
						submission.file_ids = fileIds.split(',').map(id => parseInt(id.trim()));
					}

					const body: any = { submission };
					if (comment) {
						body.comment = { text_comment: comment };
					}

					const options: any = {
						method: 'PUT',
						url: `${credentials.baseUrl}/courses/${courseId}/assignments/${assignmentId}/submissions/${userId}`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						body,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});

		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeUserOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('canvaslmsApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'listUsers': {
					const accountId = this.getNodeParameter('accountId', i) as string;
					const searchTerm = this.getNodeParameter('searchTerm', i) as string;
					const enrollmentType = this.getNodeParameter('enrollmentType', i) as string;
					const include = this.getNodeParameter('include', i) as string[];

					const queryParams: any = {};
					if (searchTerm) queryParams.search_term = searchTerm;
					if (enrollmentType) queryParams.enrollment_type = enrollmentType;
					if (include.length > 0) queryParams.include = include;

					const queryString = Object.keys(queryParams).length > 0 
						? '?' + new URLSearchParams(queryParams).toString()
						: '';

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/api/v1/accounts/${accountId}/users${queryString}`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getUser': {
					const userId = this.getNodeParameter('userId', i) as string;
					const include = this.getNodeParameter('include', i) as string[];

					const queryParams: any = {};
					if (include.length > 0) queryParams.include = include;

					const queryString = Object.keys(queryParams).length > 0 
						? '?' + new URLSearchParams(queryParams).toString()
						: '';

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/api/v1/users/${userId}${queryString}`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'createUser': {
					const accountId = this.getNodeParameter('accountId', i) as string;
					const userName = this.getNodeParameter('userName', i) as string;
					const userEmail = this.getNodeParameter('userEmail', i) as string;
					const shortName = this.getNodeParameter('shortName', i) as string;
					const sortableName = this.getNodeParameter('sortableName', i) as string;
					const loginUniqueId = this.getNodeParameter('loginUniqueId', i) as string;
					const password = this.getNodeParameter('password', i) as string;
					const sisUserId = this.getNodeParameter('sisUserId', i) as string;
					const sendConfirmation = this.getNodeParameter('sendConfirmation', i) as boolean;

					const body: any = {
						user: {
							name: userName,
						},
						pseudonym: {
							unique_id: loginUniqueId,
							send_confirmation: sendConfirmation,
						},
					};

					if (userEmail) body.user.email = userEmail;
					if (shortName) body.user.short_name = shortName;
					if (sortableName) body.user.sortable_name = sortableName;
					if (password) body.pseudonym.password = password;
					if (sisUserId) body.pseudonym.sis_user_id = sisUserId;

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/api/v1/accounts/${accountId}/users`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						json: true,
						body,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'updateUser': {
					const userId = this.getNodeParameter('userId', i) as string;
					const userName = this.getNodeParameter('userName', i) as string;
					const userEmail = this.getNodeParameter('userEmail', i) as string;
					const shortName = this.getNodeParameter('shortName', i) as string;
					const sortableName = this.getNodeParameter('sortableName', i) as string;

					const body: any = {
						user: {
							name: userName,
						},
					};

					if (userEmail) body.user.email = userEmail;
					if (shortName) body.user.short_name = shortName;
					if (sortableName) body.user.sortable_name = sortableName;

					const options: any = {
						method: 'PUT',
						url: `${credentials.baseUrl}/api/v1/users/${userId}`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						json: true,
						body,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'deleteUser': {
					const accountId = this.getNodeParameter('accountId', i) as string;
					const userId = this.getNodeParameter('userId', i) as string;

					const options: any = {
						method: 'DELETE',
						url: `${credentials.baseUrl}/api/v1/accounts/${accountId}/users/${userId}`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({ json: result, pairedItem: { item: i } });

		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeAnalyticsOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('canvaslmsApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;

      switch (operation) {
        case 'getCourseActivity': {
          const courseId = this.getNodeParameter('courseId', i) as number;
          
          const options: any = {
            method: 'GET',
            url: `${credentials.domain}/api/v1/courses/${courseId}/analytics/activity`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'getAssignmentAnalytics': {
          const courseId = this.getNodeParameter('courseId', i) as number;
          
          const options: any = {
            method: 'GET',
            url: `${credentials.domain}/api/v1/courses/${courseId}/analytics/assignments`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'getStudentSummaries': {
          const courseId = this.getNodeParameter('courseId', i) as number;
          const sortColumn = this.getNodeParameter('sortColumn', i, 'name') as string;
          
          const options: any = {
            method: 'GET',
            url: `${credentials.domain}/api/v1/courses/${courseId}/analytics/student_summaries`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'Content-Type': 'application/json',
            },
            qs: {
              sort_column: sortColumn,
            },
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'getUserCourseActivity': {
          const courseId = this.getNodeParameter('courseId', i) as number;
          const userId = this.getNodeParameter('userId', i) as number;
          
          const options: any = {
            method: 'GET',
            url: `${credentials.domain}/api/v1/users/${userId}/courses/${courseId}/analytics/activity`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'getUserAssignmentData': {
          const courseId = this.getNodeParameter('courseId', i) as number;
          const userId = this.getNodeParameter('userId', i) as number;
          
          const options: any = {
            method: 'GET',
            url: `${credentials.domain}/api/v1/users/${userId}/courses/${courseId}/analytics/assignments`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({
        json: result,
        pairedItem: { item: i },
      });

    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({
          json: { error: error.message },
          pairedItem: { item: i },
        });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}
