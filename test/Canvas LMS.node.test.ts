/**
 * Copyright (c) 2026 Velocity BPA
 * Licensed under the Business Source License 1.1
 */

import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { CanvasLMS } from '../nodes/Canvas LMS/Canvas LMS.node';

// Mock n8n-workflow
jest.mock('n8n-workflow', () => ({
  ...jest.requireActual('n8n-workflow'),
  NodeApiError: class NodeApiError extends Error {
    constructor(node: any, error: any) { super(error.message || 'API Error'); }
  },
  NodeOperationError: class NodeOperationError extends Error {
    constructor(node: any, message: string) { super(message); }
  },
}));

describe('CanvasLMS Node', () => {
  let node: CanvasLMS;

  beforeAll(() => {
    node = new CanvasLMS();
  });

  describe('Node Definition', () => {
    it('should have correct basic properties', () => {
      expect(node.description.displayName).toBe('Canvas LMS');
      expect(node.description.name).toBe('canvaslms');
      expect(node.description.version).toBe(1);
      expect(node.description.inputs).toContain('main');
      expect(node.description.outputs).toContain('main');
    });

    it('should define 7 resources', () => {
      const resourceProp = node.description.properties.find(
        (p: any) => p.name === 'resource'
      );
      expect(resourceProp).toBeDefined();
      expect(resourceProp!.type).toBe('options');
      expect(resourceProp!.options).toHaveLength(7);
    });

    it('should have operation dropdowns for each resource', () => {
      const operations = node.description.properties.filter(
        (p: any) => p.name === 'operation'
      );
      expect(operations.length).toBe(7);
    });

    it('should require credentials', () => {
      expect(node.description.credentials).toBeDefined();
      expect(node.description.credentials!.length).toBeGreaterThan(0);
      expect(node.description.credentials![0].required).toBe(true);
    });

    it('should have parameters with proper displayOptions', () => {
      const params = node.description.properties.filter(
        (p: any) => p.displayOptions?.show?.resource
      );
      for (const param of params) {
        expect(param.displayOptions.show.resource).toBeDefined();
        expect(Array.isArray(param.displayOptions.show.resource)).toBe(true);
      }
    });
  });

  // Resource-specific tests
describe('Course Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				accessToken: 'test-token',
				baseUrl: 'https://canvas.instructure.com/api/v1',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
			},
		};
	});

	describe('listCourses operation', () => {
		it('should list courses successfully', async () => {
			const mockCourses = [
				{ id: 1, name: 'Course 1', course_code: 'COURSE1' },
				{ id: 2, name: 'Course 2', course_code: 'COURSE2' },
			];

			mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
				if (param === 'operation') return 'listCourses';
				if (param === 'additionalFields') return {};
				return undefined;
			});

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockCourses);

			const result = await executeCourseOperations.call(
				mockExecuteFunctions,
				[{ json: {} }]
			);

			expect(result).toHaveLength(1);
			expect(result[0].json).toEqual(mockCourses);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: 'https://canvas.instructure.com/api/v1/courses',
				headers: {
					'Authorization': 'Bearer test-token',
					'Content-Type': 'application/json',
				},
				json: true,
			});
		});

		it('should handle listCourses error', async () => {
			mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
				if (param === 'operation') return 'listCourses';
				if (param === 'additionalFields') return {};
				return undefined;
			});

			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executeCourseOperations.call(
				mockExecuteFunctions,
				[{ json: {} }]
			);

			expect(result).toHaveLength(1);
			expect(result[0].json.error).toBe('API Error');
		});
	});

	describe('getCourse operation', () => {
		it('should get course successfully', async () => {
			const mockCourse = { id: 1, name: 'Course 1', course_code: 'COURSE1' };

			mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
				if (param === 'operation') return 'getCourse';
				if (param === 'courseId') return '1';
				if (param === 'additionalFields') return {};
				return undefined;
			});

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockCourse);

			const result = await executeCourseOperations.call(
				mockExecuteFunctions,
				[{ json: {} }]
			);

			expect(result).toHaveLength(1);
			expect(result[0].json).toEqual(mockCourse);
		});

		it('should handle getCourse error', async () => {
			mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
				if (param === 'operation') return 'getCourse';
				if (param === 'courseId') return '1';
				if (param === 'additionalFields') return {};
				return undefined;
			});

			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Course not found'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executeCourseOperations.call(
				mockExecuteFunctions,
				[{ json: {} }]
			);

			expect(result).toHaveLength(1);
			expect(result[0].json.error).toBe('Course not found');
		});
	});

	describe('createCourse operation', () => {
		it('should create course successfully', async () => {
			const mockCourse = { id: 1, name: 'New Course', course_code: 'NEW001' };

			mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
				if (param === 'operation') return 'createCourse';
				if (param === 'accountId') return '1';
				if (param === 'courseName') return 'New Course';
				if (param === 'courseCode') return 'NEW001';
				if (param === 'additionalFields') return {};
				return undefined;
			});

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockCourse);

			const result = await executeCourseOperations.call(
				mockExecuteFunctions,
				[{ json: {} }]
			);

			expect(result).toHaveLength(1);
			expect(result[0].json).toEqual(mockCourse);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'POST',
				url: 'https://canvas.instructure.com/api/v1/accounts/1/courses',
				headers: {
					'Authorization': 'Bearer test-token',
					'Content-Type': 'application/json',
				},
				body: {
					course: {
						name: 'New Course',
						course_code: 'NEW001',
					},
				},
				json: true,
			});
		});
	});

	describe('updateCourse operation', () => {
		it('should update course successfully', async () => {
			const mockCourse = { id: 1, name: 'Updated Course', course_code: 'UPD001' };

			mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
				if (param === 'operation') return 'updateCourse';
				if (param === 'courseId') return '1';
				if (param === 'additionalFields') return { description: 'Updated description' };
				return undefined;
			});

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockCourse);

			const result = await executeCourseOperations.call(
				mockExecuteFunctions,
				[{ json: {} }]
			);

			expect(result).toHaveLength(1);
			expect(result[0].json).toEqual(mockCourse);
		});
	});

	describe('deleteCourse operation', () => {
		it('should delete course successfully', async () => {
			const mockResponse = { delete: true };

			mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
				if (param === 'operation') return 'deleteCourse';
				if (param === 'courseId') return '1';
				if (param === 'event') return 'conclude';
				return undefined;
			});

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeCourseOperations.call(
				mockExecuteFunctions,
				[{ json: {} }]
			);

			expect(result).toHaveLength(1);
			expect(result[0].json).toEqual(mockResponse);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'DELETE',
				url:

describe('Assignment Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        accessToken: 'test-token',
        baseUrl: 'https://canvas.test.com/api/v1'
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn()
      },
    };
  });

  describe('listAssignments operation', () => {
    it('should list assignments successfully', async () => {
      const mockAssignments = [{ id: 1, name: 'Test Assignment' }];
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('listAssignments')
        .mockReturnValueOnce('123')
        .mockReturnValueOnce(['submission'])
        .mockReturnValueOnce('test');
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockAssignments);

      const result = await executeAssignmentOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{ json: mockAssignments, pairedItem: { item: 0 } }]);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'https://canvas.test.com/api/v1/courses/123/assignments',
        headers: { 'Authorization': 'Bearer test-token' },
        qs: { include: ['submission'], search_term: 'test' },
        json: true
      });
    });

    it('should handle list assignments error', async () => {
      mockExecuteFunctions.getNodeParameter.mockReturnValue('listAssignments');
      mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
      mockExecuteFunctions.continueOnFail.mockReturnValue(true);

      const result = await executeAssignmentOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{ json: { error: 'API Error' }, pairedItem: { item: 0 } }]);
    });
  });

  describe('getAssignment operation', () => {
    it('should get assignment successfully', async () => {
      const mockAssignment = { id: 1, name: 'Test Assignment' };
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getAssignment')
        .mockReturnValueOnce('123')
        .mockReturnValueOnce('456')
        .mockReturnValueOnce(['submission']);
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockAssignment);

      const result = await executeAssignmentOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{ json: mockAssignment, pairedItem: { item: 0 } }]);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'https://canvas.test.com/api/v1/courses/123/assignments/456',
        headers: { 'Authorization': 'Bearer test-token' },
        qs: { include: ['submission'] },
        json: true
      });
    });
  });

  describe('createAssignment operation', () => {
    it('should create assignment successfully', async () => {
      const mockAssignment = { id: 1, name: 'New Assignment' };
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('createAssignment')
        .mockReturnValueOnce('123')
        .mockReturnValueOnce('New Assignment')
        .mockReturnValueOnce('Description')
        .mockReturnValueOnce('2024-01-01T00:00:00Z')
        .mockReturnValueOnce(100)
        .mockReturnValueOnce(['online_text_entry'])
        .mockReturnValueOnce('1')
        .mockReturnValueOnce(true);
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockAssignment);

      const result = await executeAssignmentOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{ json: mockAssignment, pairedItem: { item: 0 } }]);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'POST',
        url: 'https://canvas.test.com/api/v1/courses/123/assignments',
        headers: {
          'Authorization': 'Bearer test-token',
          'Content-Type': 'application/json'
        },
        body: {
          assignment: {
            name: 'New Assignment',
            description: 'Description',
            due_at: '2024-01-01T00:00:00Z',
            points_possible: 100,
            submission_types: ['online_text_entry'],
            assignment_group_id: '1',
            published: true
          }
        },
        json: true
      });
    });
  });

  describe('updateAssignment operation', () => {
    it('should update assignment successfully', async () => {
      const mockAssignment = { id: 1, name: 'Updated Assignment' };
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('updateAssignment')
        .mockReturnValueOnce('123')
        .mockReturnValueOnce('456')
        .mockReturnValueOnce('Updated Assignment')
        .mockReturnValueOnce('New Description')
        .mockReturnValueOnce('2024-02-01T00:00:00Z')
        .mockReturnValueOnce(150)
        .mockReturnValueOnce(['online_upload'])
        .mockReturnValueOnce('2')
        .mockReturnValueOnce(false);
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockAssignment);

      const result = await executeAssignmentOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{ json: mockAssignment, pairedItem: { item: 0 } }]);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'PUT',
        url: 'https://canvas.test.com/api/v1/courses/123/assignments/456',
        headers: {
          'Authorization': 'Bearer test-token',
          'Content-Type': 'application/json'
        },
        body: {
          assignment: {
            name: 'Updated Assignment',
            description: 'New Description',
            due_at: '2024-02-01T00:00:00Z',
            points_possible: 150,
            submission_types: ['online_upload'],
            assignment_group_id: '2',
            published: false
          }
        },
        json: true
      });
    });
  });

  describe('deleteAssignment operation', () => {
    it('should delete assignment successfully', async () => {
      const mockResponse = { id: 456 };
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('deleteAssignment')
        .mockReturnValueOnce('123')
        .mockReturnValueOnce('456');
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeAssignmentOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'DELETE',
        url: 'https://canvas.test.com/api/v1/courses/123/assignments/456',
        headers: { 'Authorization': 'Bearer test-token' },
        json: true
      });
    });
  });
});

describe('Enrollment Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				accessToken: 'test-token',
				baseUrl: 'https://canvas.instructure.com/api/v1',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
				requestWithAuthentication: jest.fn(),
			},
		};
	});

	describe('listEnrollments', () => {
		it('should list enrollments for a course', async () => {
			const mockResponse = [{ id: 1, user_id: 123, course_id: 456, type: 'StudentEnrollment' }];
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('listEnrollments')
				.mockReturnValueOnce('456')
				.mockReturnValueOnce('StudentEnrollment')
				.mockReturnValueOnce('')
				.mockReturnValueOnce('active')
				.mockReturnValueOnce('');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeEnrollmentOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: 'https://canvas.instructure.com/api/v1/courses/456/enrollments',
				headers: { Authorization: 'Bearer test-token' },
				qs: { type: 'StudentEnrollment', state: 'active' },
				json: true,
			});
		});

		it('should handle errors when listing enrollments', async () => {
			mockExecuteFunctions.getNodeParameter.mockReturnValue('listEnrollments');
			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

			await expect(executeEnrollmentOperations.call(mockExecuteFunctions, [{ json: {} }])).rejects.toThrow('API Error');
		});
	});

	describe('getUserEnrollments', () => {
		it('should get enrollments for a user', async () => {
			const mockResponse = [{ id: 1, user_id: 123, course_id: 456, type: 'StudentEnrollment' }];
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getUserEnrollments')
				.mockReturnValueOnce('123')
				.mockReturnValueOnce('StudentEnrollment')
				.mockReturnValueOnce('')
				.mockReturnValueOnce('active');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeEnrollmentOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: 'https://canvas.instructure.com/api/v1/users/123/enrollments',
				headers: { Authorization: 'Bearer test-token' },
				qs: { type: 'StudentEnrollment', state: 'active' },
				json: true,
			});
		});
	});

	describe('createEnrollment', () => {
		it('should create an enrollment', async () => {
			const mockResponse = { id: 1, user_id: 123, course_id: 456, type: 'StudentEnrollment' };
			const enrollmentData = '{"user_id": 123, "type": "StudentEnrollment"}';
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('createEnrollment')
				.mockReturnValueOnce('456')
				.mockReturnValueOnce(enrollmentData);
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeEnrollmentOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'POST',
				url: 'https://canvas.instructure.com/api/v1/courses/456/enrollments',
				headers: { Authorization: 'Bearer test-token', 'Content-Type': 'application/json' },
				body: { enrollment: { user_id: 123, type: 'StudentEnrollment' } },
				json: true,
			});
		});
	});

	describe('updateEnrollment', () => {
		it('should update an enrollment', async () => {
			const mockResponse = { id: 1, user_id: 123, course_id: 456, type: 'StudentEnrollment' };
			const enrollmentData = '{"enrollment_state": "active"}';
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('updateEnrollment')
				.mockReturnValueOnce('456')
				.mockReturnValueOnce('1')
				.mockReturnValueOnce(enrollmentData);
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeEnrollmentOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'PUT',
				url: 'https://canvas.instructure.com/api/v1/courses/456/enrollments/1',
				headers: { Authorization: 'Bearer test-token', 'Content-Type': 'application/json' },
				body: { enrollment: { enrollment_state: 'active' } },
				json: true,
			});
		});
	});

	describe('deleteEnrollment', () => {
		it('should delete an enrollment', async () => {
			const mockResponse = { id: 1, enrollment_state: 'deleted' };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('deleteEnrollment')
				.mockReturnValueOnce('456')
				.mockReturnValueOnce('1')
				.mockReturnValueOnce('conclude');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeEnrollmentOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'DELETE',
				url: 'https://canvas.instructure.com/api/v1/courses/456/enrollments/1',
				headers: { Authorization: 'Bearer test-token' },
				qs: { task: 'conclude' },
				json: true,
			});
		});
	});
});

describe('Grade Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				accessToken: 'test-token',
				baseUrl: 'https://canvas.instructure.com/api/v1',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
				requestWithAuthentication: jest.fn(),
			},
		};
	});

	describe('getGradebookHistory operation', () => {
		it('should get gradebook history successfully', async () => {
			const mockResponse = { data: 'gradebook history' };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getGradebookHistory')
				.mockReturnValueOnce('123')
				.mockReturnValueOnce('456')
				.mockReturnValueOnce('789');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeGradeOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: 'https://canvas.instructure.com/api/v1/courses/123/gradebook_history/feed?assignment_id=456&user_id=789',
				headers: { Authorization: 'Bearer test-token' },
				json: true,
			});
		});

		it('should handle errors in getGradebookHistory', async () => {
			mockExecuteFunctions.getNodeParameter.mockReturnValue('getGradebookHistory');
			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executeGradeOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: { error: 'API Error' }, pairedItem: { item: 0 } }]);
		});
	});

	describe('getGrades operation', () => {
		it('should get grades successfully', async () => {
			const mockResponse = { grades: [] };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getGrades')
				.mockReturnValueOnce('123')
				.mockReturnValueOnce('456')
				.mockReturnValueOnce('789,101');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeGradeOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});
	});

	describe('updateGrade operation', () => {
		it('should update grade successfully', async () => {
			const mockResponse = { updated: true };
			const submissionData = { grade: 'A' };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('updateGrade')
				.mockReturnValueOnce('123')
				.mockReturnValueOnce('456')
				.mockReturnValueOnce('789')
				.mockReturnValueOnce(submissionData);
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeGradeOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});
	});

	describe('createGrade operation', () => {
		it('should create grade successfully', async () => {
			const mockResponse = { created: true };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('createGrade')
				.mockReturnValueOnce('123')
				.mockReturnValueOnce('456')
				.mockReturnValueOnce('789')
				.mockReturnValueOnce('A');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeGradeOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'POST',
				url: 'https://canvas.instructure.com/api/v1/courses/123/assignments/456/submissions/789/grade',
				headers: {
					Authorization: 'Bearer test-token',
					'Content-Type': 'application/json',
				},
				body: { grade: 'A' },
				json: true,
			});
		});
	});
});

describe('Submission Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				accessToken: 'test-token',
				baseUrl: 'https://canvas.instructure.com/api/v1',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
				requestWithAuthentication: jest.fn(),
			},
		};
	});

	describe('listSubmissions', () => {
		it('should list submissions successfully', async () => {
			const mockResponse = [
				{ id: 1, user_id: 123, assignment_id: 456 },
				{ id: 2, user_id: 124, assignment_id: 456 },
			];

			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('listSubmissions')
				.mockReturnValueOnce('course123')
				.mockReturnValueOnce('assignment456')
				.mockReturnValueOnce(['user'])
				.mockReturnValueOnce(false);

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeSubmissionOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([
				{
					json: mockResponse,
					pairedItem: { item: 0 },
				},
			]);
		});

		it('should handle list submissions error', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('listSubmissions')
				.mockReturnValueOnce('course123')
				.mockReturnValueOnce('assignment456')
				.mockReturnValueOnce([])
				.mockReturnValueOnce(false);

			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executeSubmissionOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([
				{
					json: { error: 'API Error' },
					pairedItem: { item: 0 },
				},
			]);
		});
	});

	describe('getSubmission', () => {
		it('should get submission successfully', async () => {
			const mockResponse = { id: 1, user_id: 123, assignment_id: 456 };

			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getSubmission')
				.mockReturnValueOnce('course123')
				.mockReturnValueOnce('assignment456')
				.mockReturnValueOnce('user123')
				.mockReturnValueOnce(['user']);

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeSubmissionOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([
				{
					json: mockResponse,
					pairedItem: { item: 0 },
				},
			]);
		});

		it('should handle get submission error', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getSubmission')
				.mockReturnValueOnce('course123')
				.mockReturnValueOnce('assignment456')
				.mockReturnValueOnce('user123')
				.mockReturnValueOnce([]);

			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Submission not found'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executeSubmissionOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([
				{
					json: { error: 'Submission not found' },
					pairedItem: { item: 0 },
				},
			]);
		});
	});

	describe('createSubmission', () => {
		it('should create submission successfully', async () => {
			const mockResponse = { id: 1, user_id: 123, assignment_id: 456 };

			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('createSubmission')
				.mockReturnValueOnce('course123')
				.mockReturnValueOnce('assignment456')
				.mockReturnValueOnce('online_text_entry')
				.mockReturnValueOnce('Test submission comment')
				.mockReturnValueOnce('This is my submission text');

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeSubmissionOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([
				{
					json: mockResponse,
					pairedItem: { item: 0 },
				},
			]);
		});

		it('should handle create submission error', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('createSubmission')
				.mockReturnValueOnce('course123')
				.mockReturnValueOnce('assignment456')
				.mockReturnValueOnce('online_text_entry')
				.mockReturnValueOnce('')
				.mockReturnValueOnce('This is my submission text');

			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Creation failed'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executeSubmissionOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([
				{
					json: { error: 'Creation failed' },
					pairedItem: { item: 0 },
				},
			]);
		});
	});

	describe('updateSubmission', () => {
		it('should update submission successfully', async () => {
			const mockResponse = { id: 1, user_id: 123, assignment_id: 456 };

			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('updateSubmission')
				.mockReturnValueOnce('course123')
				.mockReturnValueOnce('assignment456')
				.mockReturnValueOnce('user123')
				.mockReturnValueOnce('online_text_entry')
				.mockReturnValueOnce('Updated comment')
				.mockReturnValueOnce('Updated submission text');

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeSubmissionOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([
				{
					json: mockResponse,
					pairedItem: { item: 0 },
				},
			]);
		});

		it('should handle update submission error', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('updateSubmission')
				.mockReturnValueOnce('course123')
				.mockReturnValueOnce('assignment456')
				.mockReturnValueOnce('user123')
				.mockReturnValueOnce('online_text_entry')
				.mockReturnValueOnce('')
				.mockReturnValueOnce('Updated submission text');

			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Update failed'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executeSubmissionOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([
				{
					json: { error: 'Update failed' },
					pairedItem: { item: 0 },
				},
			]);
		});
	});
});

describe('User Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				accessToken: 'test-token',
				baseUrl: 'https://canvas.instructure.com'
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
				requestWithAuthentication: jest.fn(),
			},
		};
	});

	describe('listUsers operation', () => {
		it('should list users successfully', async () => {
			mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'operation': return 'listUsers';
					case 'accountId': return '12345';
					case 'searchTerm': return 'john';
					case 'enrollmentType': return 'student';
					case 'include': return ['email', 'enrollments'];
					default: return undefined;
				}
			});

			const mockResponse = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeUserOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: 'https://canvas.instructure.com/api/v1/accounts/12345/users?search_term=john&enrollment_type=student&include=email%2Cenrollments',
				headers: {
					'Authorization': 'Bearer test-token',
					'Content-Type': 'application/json',
				},
				json: true,
			});
			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});

		it('should handle listUsers errors', async () => {
			mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'operation': return 'listUsers';
					case 'accountId': return '12345';
					default: return '';
				}
			});

			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executeUserOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: { error: 'API Error' }, pairedItem: { item: 0 } }]);
		});
	});

	describe('getUser operation', () => {
		it('should get user successfully', async () => {
			mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'operation': return 'getUser';
					case 'userId': return '12345';
					case 'include': return ['email'];
					default: return undefined;
				}
			});

			const mockResponse = { id: 12345, name: 'John Doe', email: 'john@example.com' };
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeUserOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: 'https://canvas.instructure.com/api/v1/users/12345?include=email',
				headers: {
					'Authorization': 'Bearer test-token',
					'Content-Type': 'application/json',
				},
				json: true,
			});
			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});
	});

	describe('createUser operation', () => {
		it('should create user successfully', async () => {
			mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'operation': return 'createUser';
					case 'accountId': return '12345';
					case 'userName': return 'John Doe';
					case 'userEmail': return 'john@example.com';
					case 'loginUniqueId': return 'johndoe';
					case 'password': return 'password123';
					case 'sendConfirmation': return true;
					default: return '';
				}
			});

			const mockResponse = { id: 67890, name: 'John Doe', email: 'john@example.com' };
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeUserOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'POST',
				url: 'https://canvas.instructure.com/api/v1/accounts/12345/users',
				headers: {
					'Authorization': 'Bearer test-token',
					'Content-Type': 'application/json',
				},
				json: true,
				body: {
					user: {
						name: 'John Doe',
						email: 'john@example.com',
					},
					pseudonym: {
						unique_id: 'johndoe',
						password: 'password123',
						send_confirmation: true,
					},
				},
			});
			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});
	});

	describe('updateUser operation', () => {
		it('should update user successfully', async () => {
			mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'operation': return 'updateUser';
					case 'userId': return '12345';
					case 'userName': return 'John Smith';
					case 'userEmail': return 'johnsmith@example.com';
					default: return '';
				}
			});

			const mockResponse = { id: 12345, name: 'John Smith', email: 'johnsmith@example.com' };
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeUserOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'PUT',
				url: 'https://canvas.instructure.com/api/v1/users/12345',
				headers: {
					'Authorization': 'Bearer test-token',
					'Content-Type': 'application/json',
				},
				json: true,
				body: {
					user: {
						name: 'John Smith',
						email: 'johnsmith@example.com',
					},
				},
			});
			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});
	});

	describe('deleteUser operation', () => {
		it('should delete user successfully', async () => {
			mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'operation': return 'deleteUser';
					case 'accountId': return '12345';
					case 'userId': return '67890';
					default: return '';
				}
			});

			const mockResponse = { id: 67890, workflow_state: 'deleted' };
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeUserOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'DELETE',
				url: 'https://canvas.instructure.com/api/v1/accounts/12345/users/67890',
				headers: {
					'Authorization': 'Bearer test-token',
					'Content-Type': 'application/json',
				},
				json: true,
			});
			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});
	});
});

describe('Analytics Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        accessToken: 'test-token',
        domain: 'https://test.instructure.com'
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
      },
    };
  });

  it('should get course activity analytics successfully', async () => {
    const mockResponse = { activity_data: [{ date: '2023-01-01', views: 10 }] };
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getCourseActivity')
      .mockReturnValueOnce(123);
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeAnalyticsOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://test.instructure.com/api/v1/courses/123/analytics/activity',
      headers: {
        'Authorization': 'Bearer test-token',
        'Content-Type': 'application/json',
      },
      json: true,
    });
    expect(result[0].json).toEqual(mockResponse);
  });

  it('should get assignment analytics successfully', async () => {
    const mockResponse = { assignments: [{ id: 1, title: 'Test Assignment' }] };
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getAssignmentAnalytics')
      .mockReturnValueOnce(123);
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeAnalyticsOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://test.instructure.com/api/v1/courses/123/analytics/assignments',
      headers: {
        'Authorization': 'Bearer test-token',
        'Content-Type': 'application/json',
      },
      json: true,
    });
    expect(result[0].json).toEqual(mockResponse);
  });

  it('should get student summaries with sort column', async () => {
    const mockResponse = { students: [{ id: 1, name: 'John Doe', score: 85 }] };
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getStudentSummaries')
      .mockReturnValueOnce(123)
      .mockReturnValueOnce('score');
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeAnalyticsOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://test.instructure.com/api/v1/courses/123/analytics/student_summaries',
      headers: {
        'Authorization': 'Bearer test-token',
        'Content-Type': 'application/json',
      },
      qs: {
        sort_column: 'score',
      },
      json: true,
    });
    expect(result[0].json).toEqual(mockResponse);
  });

  it('should get user course activity successfully', async () => {
    const mockResponse = { user_activity: [{ date: '2023-01-01', participations: 5 }] };
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getUserCourseActivity')
      .mockReturnValueOnce(123)
      .mockReturnValueOnce(456);
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeAnalyticsOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://test.instructure.com/api/v1/users/456/courses/123/analytics/activity',
      headers: {
        'Authorization': 'Bearer test-token',
        'Content-Type': 'application/json',
      },
      json: true,
    });
    expect(result[0].json).toEqual(mockResponse);
  });

  it('should handle API errors gracefully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getCourseActivity')
      .mockReturnValueOnce(123);
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
    mockExecuteFunctions.continueOnFail.mockReturnValue(true);

    const result = await executeAnalyticsOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result[0].json).toEqual({ error: 'API Error' });
  });
});
});
