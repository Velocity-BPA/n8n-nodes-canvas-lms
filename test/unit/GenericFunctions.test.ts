/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import {
	parseLinkHeader,
	formatCanvasDomain,
	buildIncludeArray,
	formatDateForCanvas,
	getEnrollmentTypeLabel,
	buildNestedObject,
	flattenObject,
	validateSisId,
	buildSisIdReference,
	handleCanvasError,
	getWorkflowStateOptions,
} from '../../nodes/CanvasLms/GenericFunctions';

describe('GenericFunctions', () => {
	describe('parseLinkHeader', () => {
		it('should parse Link header with multiple links', () => {
			const linkHeader = '<https://canvas.instructure.com/api/v1/courses?page=2>; rel="next", <https://canvas.instructure.com/api/v1/courses?page=5>; rel="last"';
			const result = parseLinkHeader(linkHeader);
			
			expect(result.next).toBe('https://canvas.instructure.com/api/v1/courses?page=2');
			expect(result.last).toBe('https://canvas.instructure.com/api/v1/courses?page=5');
		});

		it('should return empty object for empty header', () => {
			const result = parseLinkHeader('');
			expect(result).toEqual({});
		});

		it('should handle single link', () => {
			const linkHeader = '<https://canvas.instructure.com/api/v1/courses?page=2>; rel="next"';
			const result = parseLinkHeader(linkHeader);
			
			expect(result.next).toBe('https://canvas.instructure.com/api/v1/courses?page=2');
		});
	});

	describe('formatCanvasDomain', () => {
		it('should remove https protocol', () => {
			expect(formatCanvasDomain('https://school.instructure.com')).toBe('school.instructure.com');
		});

		it('should remove http protocol', () => {
			expect(formatCanvasDomain('http://school.instructure.com')).toBe('school.instructure.com');
		});

		it('should remove trailing slash', () => {
			expect(formatCanvasDomain('school.instructure.com/')).toBe('school.instructure.com');
		});

		it('should remove /api/v1 suffix', () => {
			expect(formatCanvasDomain('school.instructure.com/api/v1')).toBe('school.instructure.com');
		});

		it('should handle clean domain', () => {
			expect(formatCanvasDomain('school.instructure.com')).toBe('school.instructure.com');
		});
	});

	describe('buildIncludeArray', () => {
		it('should build include array from string array', () => {
			const result = buildIncludeArray(['total_students', 'teachers']);
			
			expect(result['include[0]']).toBe('total_students');
			expect(result['include[1]']).toBe('teachers');
		});

		it('should handle single string', () => {
			const result = buildIncludeArray('enrollments');
			
			expect(result['include[0]']).toBe('enrollments');
		});

		it('should return empty object for undefined', () => {
			const result = buildIncludeArray(undefined);
			expect(result).toEqual({});
		});
	});

	describe('formatDateForCanvas', () => {
		it('should format Date object', () => {
			const date = new Date('2025-01-15T12:00:00Z');
			const result = formatDateForCanvas(date);
			
			expect(result).toBe('2025-01-15T12:00:00.000Z');
		});

		it('should format date string', () => {
			const result = formatDateForCanvas('2025-01-15T12:00:00Z');
			
			expect(result).toBe('2025-01-15T12:00:00.000Z');
		});

		it('should return undefined for undefined input', () => {
			const result = formatDateForCanvas(undefined);
			expect(result).toBeUndefined();
		});
	});

	describe('getEnrollmentTypeLabel', () => {
		it('should return Student for StudentEnrollment', () => {
			expect(getEnrollmentTypeLabel('StudentEnrollment')).toBe('Student');
		});

		it('should return Teacher for TeacherEnrollment', () => {
			expect(getEnrollmentTypeLabel('TeacherEnrollment')).toBe('Teacher');
		});

		it('should return Teaching Assistant for TaEnrollment', () => {
			expect(getEnrollmentTypeLabel('TaEnrollment')).toBe('Teaching Assistant');
		});

		it('should return original type for unknown', () => {
			expect(getEnrollmentTypeLabel('CustomEnrollment')).toBe('CustomEnrollment');
		});
	});

	describe('buildNestedObject', () => {
		it('should build nested object with prefix', () => {
			const data = { name: 'Test Course', code: 'TC101' };
			const result = buildNestedObject('course', data);
			
			expect(result['course[name]']).toBe('Test Course');
			expect(result['course[code]']).toBe('TC101');
		});

		it('should skip null and undefined values', () => {
			const data = { name: 'Test', empty: null, undef: undefined };
			const result = buildNestedObject('user', data);
			
			expect(result['user[name]']).toBe('Test');
			expect(result['user[empty]']).toBeUndefined();
			expect(result['user[undef]']).toBeUndefined();
		});

		it('should skip empty strings', () => {
			const data = { name: 'Test', empty: '' };
			const result = buildNestedObject('course', data);
			
			expect(result['course[name]']).toBe('Test');
			expect(result['course[empty]']).toBeUndefined();
		});
	});

	describe('flattenObject', () => {
		it('should flatten nested object', () => {
			const obj = { user: { name: 'Test', email: 'test@example.com' } };
			const result = flattenObject(obj);
			
			expect(result.user_name).toBe('Test');
			expect(result.user_email).toBe('test@example.com');
		});

		it('should handle flat object', () => {
			const obj = { name: 'Test', value: 123 };
			const result = flattenObject(obj);
			
			expect(result.name).toBe('Test');
			expect(result.value).toBe(123);
		});

		it('should preserve arrays', () => {
			const obj = { items: [1, 2, 3] };
			const result = flattenObject(obj);
			
			expect(result.items).toEqual([1, 2, 3]);
		});
	});

	describe('validateSisId', () => {
		it('should return true for valid SIS ID', () => {
			expect(validateSisId('12345')).toBe(true);
			expect(validateSisId('student_001')).toBe(true);
			expect(validateSisId('ABC-123')).toBe(true);
		});

		it('should return false for invalid SIS ID with special chars', () => {
			expect(validateSisId('path/to/id')).toBe(false);
			expect(validateSisId('file:id')).toBe(false);
			expect(validateSisId('query?id')).toBe(false);
		});
	});

	describe('buildSisIdReference', () => {
		it('should build user SIS ID reference', () => {
			expect(buildSisIdReference('user', '12345')).toBe('sis_user_id:12345');
		});

		it('should build course SIS ID reference', () => {
			expect(buildSisIdReference('course', 'CS101')).toBe('sis_course_id:CS101');
		});

		it('should build section SIS ID reference', () => {
			expect(buildSisIdReference('section', 'SEC001')).toBe('sis_section_id:SEC001');
		});
	});

	describe('handleCanvasError', () => {
		it('should format error with errors object', () => {
			const error = {
				errors: {
					name: [{ message: 'Name is required' }],
					email: [{ message: 'Invalid email format' }],
				},
			};
			const result = handleCanvasError(error);
			
			expect(result).toContain('name: Name is required');
			expect(result).toContain('email: Invalid email format');
		});

		it('should return message if present', () => {
			const error = { message: 'Something went wrong' };
			const result = handleCanvasError(error);
			
			expect(result).toBe('Something went wrong');
		});

		it('should return default message for unknown error', () => {
			const error = {};
			const result = handleCanvasError(error);
			
			expect(result).toBe('Unknown Canvas API error');
		});
	});

	describe('getWorkflowStateOptions', () => {
		it('should return course states', () => {
			const states = getWorkflowStateOptions('course');
			
			expect(states).toContainEqual({ name: 'Unpublished', value: 'unpublished' });
			expect(states).toContainEqual({ name: 'Available', value: 'available' });
		});

		it('should return assignment states', () => {
			const states = getWorkflowStateOptions('assignment');
			
			expect(states).toContainEqual({ name: 'Published', value: 'published' });
			expect(states).toContainEqual({ name: 'Unpublished', value: 'unpublished' });
		});

		it('should return empty array for unknown resource', () => {
			const states = getWorkflowStateOptions('unknown');
			expect(states).toEqual([]);
		});
	});
});
