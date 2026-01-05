/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	ILoadOptionsFunctions,
	IPollFunctions,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

/**
 * Make an API request to Canvas LMS
 */
export async function canvasApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions | IPollFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	query: IDataObject = {},
	uri?: string,
): Promise<IDataObject | IDataObject[]> {
	const credentials = await this.getCredentials('canvasApi');
	const domain = credentials.domain as string;

	const options: IHttpRequestOptions = {
		method,
		url: uri || `https://${domain}/api/v1${endpoint}`,
		headers: {
			'Content-Type': 'application/json',
		},
		body,
		qs: query,
		json: true,
	};

	if (Object.keys(body).length === 0) {
		delete options.body;
	}

	if (Object.keys(query).length === 0) {
		delete options.qs;
	}

	try {
		const response = await this.helpers.httpRequestWithAuthentication.call(
			this,
			'canvasApi',
			options,
		);
		return response as IDataObject | IDataObject[];
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

/**
 * Make an API request with full response (including headers for pagination)
 */
export async function canvasApiRequestWithFullResponse(
	this: IExecuteFunctions | ILoadOptionsFunctions | IPollFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	query: IDataObject = {},
	uri?: string,
): Promise<{ body: IDataObject | IDataObject[]; headers: IDataObject }> {
	const credentials = await this.getCredentials('canvasApi');
	const domain = credentials.domain as string;

	const options: IHttpRequestOptions = {
		method,
		url: uri || `https://${domain}/api/v1${endpoint}`,
		headers: {
			'Content-Type': 'application/json',
		},
		body,
		qs: query,
		json: true,
		returnFullResponse: true,
	};

	if (Object.keys(body).length === 0) {
		delete options.body;
	}

	if (Object.keys(query).length === 0) {
		delete options.qs;
	}

	try {
		const response = await this.helpers.httpRequestWithAuthentication.call(
			this,
			'canvasApi',
			options,
		);
		return response as { body: IDataObject | IDataObject[]; headers: IDataObject };
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

/**
 * Parse Link header for pagination
 */
export function parseLinkHeader(linkHeader: string): IDataObject {
	const links: IDataObject = {};
	if (!linkHeader) {
		return links;
	}

	const linkParts = linkHeader.split(',');
	for (const part of linkParts) {
		const match = part.match(/<([^>]+)>;\s*rel="([^"]+)"/);
		if (match) {
			links[match[2]] = match[1];
		}
	}

	return links;
}

/**
 * Make an API request and return all results (handling pagination)
 */
export async function canvasApiRequestAllItems(
	this: IExecuteFunctions | ILoadOptionsFunctions | IPollFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	query: IDataObject = {},
): Promise<IDataObject[]> {
	const returnData: IDataObject[] = [];

	query.per_page = query.per_page || 100;

	let response = await canvasApiRequestWithFullResponse.call(
		this,
		method,
		endpoint,
		body,
		query,
	);

	if (Array.isArray(response.body)) {
		returnData.push(...response.body);
	} else {
		returnData.push(response.body);
	}

	let nextUrl = parseLinkHeader(response.headers.link as string).next as string | undefined;

	while (nextUrl) {
		response = await canvasApiRequestWithFullResponse.call(
			this,
			method,
			endpoint,
			body,
			{},
			nextUrl,
		);

		if (Array.isArray(response.body)) {
			returnData.push(...response.body);
		} else {
			returnData.push(response.body);
		}

		nextUrl = parseLinkHeader(response.headers.link as string).next as string | undefined;
	}

	return returnData;
}

/**
 * Validate and format Canvas domain
 */
export function formatCanvasDomain(domain: string): string {
	// Remove protocol if included
	let formattedDomain = domain.replace(/^https?:\/\//, '');
	// Remove trailing slash
	formattedDomain = formattedDomain.replace(/\/$/, '');
	// Remove /api/v1 if included
	formattedDomain = formattedDomain.replace(/\/api\/v1$/, '');
	return formattedDomain;
}

/**
 * Build include[] parameter array
 */
export function buildIncludeArray(includes: string[] | string | undefined): IDataObject {
	if (!includes) {
		return {};
	}

	const includeArray = Array.isArray(includes) ? includes : [includes];
	const query: IDataObject = {};

	includeArray.forEach((include, index) => {
		query[`include[${index}]`] = include;
	});

	return query;
}

/**
 * Format date to ISO string for Canvas API
 */
export function formatDateForCanvas(date: string | Date | undefined): string | undefined {
	if (!date) {
		return undefined;
	}

	if (typeof date === 'string') {
		return new Date(date).toISOString();
	}

	return date.toISOString();
}

/**
 * Convert Canvas enrollment type to readable string
 */
export function getEnrollmentTypeLabel(type: string): string {
	const types: IDataObject = {
		StudentEnrollment: 'Student',
		TeacherEnrollment: 'Teacher',
		TaEnrollment: 'Teaching Assistant',
		DesignerEnrollment: 'Designer',
		ObserverEnrollment: 'Observer',
	};

	return (types[type] as string) || type;
}

/**
 * Build nested object for Canvas API request body
 * Canvas API often expects nested objects like course[name], user[name], etc.
 */
export function buildNestedObject(prefix: string, data: IDataObject): IDataObject {
	const result: IDataObject = {};

	for (const [key, value] of Object.entries(data)) {
		if (value !== undefined && value !== null && value !== '') {
			result[`${prefix}[${key}]`] = value;
		}
	}

	return result;
}

/**
 * Flatten nested Canvas API response
 */
export function flattenObject(obj: IDataObject, prefix = ''): IDataObject {
	const result: IDataObject = {};

	for (const [key, value] of Object.entries(obj)) {
		const newKey = prefix ? `${prefix}_${key}` : key;

		if (value && typeof value === 'object' && !Array.isArray(value)) {
			Object.assign(result, flattenObject(value as IDataObject, newKey));
		} else {
			result[newKey] = value;
		}
	}

	return result;
}

/**
 * Handle file upload to Canvas (multi-step process)
 * Step 1: Request upload URL
 * Step 2: Upload file to URL
 * Step 3: Confirm upload
 */
export async function canvasFileUpload(
	this: IExecuteFunctions,
	endpoint: string,
	fileName: string,
	fileContent: Buffer,
	contentType: string,
	additionalParams: IDataObject = {},
): Promise<IDataObject> {
	const credentials = await this.getCredentials('canvasApi');

	// Step 1: Request upload URL
	const uploadRequest: IDataObject = {
		name: fileName,
		size: fileContent.length,
		content_type: contentType,
		...additionalParams,
	};

	const uploadData = await canvasApiRequest.call(
		this,
		'POST',
		endpoint,
		uploadRequest,
	) as IDataObject;

	const uploadUrl = uploadData.upload_url as string;
	const uploadParams = uploadData.upload_params as IDataObject;

	// Step 2: Upload file to the URL
	const formData: IDataObject = {
		...uploadParams,
		file: {
			value: fileContent,
			options: {
				filename: fileName,
				contentType,
			},
		},
	};

	const uploadOptions: IHttpRequestOptions = {
		method: 'POST',
		url: uploadUrl,
		body: formData,
		json: true,
	};

	const uploadResponse = await this.helpers.httpRequest(uploadOptions);

	// Handle redirect confirmation if needed
	if (uploadResponse.location) {
		const confirmOptions: IHttpRequestOptions = {
			method: 'GET',
			url: uploadResponse.location,
			headers: {
				Authorization: `Bearer ${credentials.accessToken}`,
			},
			json: true,
		};

		return await this.helpers.httpRequest(confirmOptions);
	}

	return uploadResponse as IDataObject;
}

/**
 * Validate SIS ID format
 */
export function validateSisId(sisId: string): boolean {
	// SIS IDs should not contain certain special characters
	const invalidChars = /[<>:"\/\\|?*]/;
	return !invalidChars.test(sisId);
}

/**
 * Build SIS ID reference for API calls
 */
export function buildSisIdReference(type: 'user' | 'course' | 'section' | 'account', sisId: string): string {
	return `sis_${type}_id:${sisId}`;
}

/**
 * Handle errors specific to Canvas API
 */
export function handleCanvasError(error: IDataObject): string {
	if (error.errors) {
		const errors = error.errors as IDataObject;
		const errorMessages: string[] = [];

		for (const [field, messages] of Object.entries(errors)) {
			if (Array.isArray(messages)) {
				for (const msg of messages) {
					if (typeof msg === 'object' && msg.message) {
						errorMessages.push(`${field}: ${msg.message}`);
					} else {
						errorMessages.push(`${field}: ${msg}`);
					}
				}
			}
		}

		return errorMessages.join('; ');
	}

	if (error.message) {
		return error.message as string;
	}

	return 'Unknown Canvas API error';
}

/**
 * Get workflow state options for various Canvas resources
 */
export function getWorkflowStateOptions(resource: string): Array<{ name: string; value: string }> {
	const states: IDataObject = {
		course: [
			{ name: 'Unpublished', value: 'unpublished' },
			{ name: 'Available', value: 'available' },
			{ name: 'Completed', value: 'completed' },
			{ name: 'Deleted', value: 'deleted' },
		],
		assignment: [
			{ name: 'Published', value: 'published' },
			{ name: 'Unpublished', value: 'unpublished' },
		],
		enrollment: [
			{ name: 'Active', value: 'active' },
			{ name: 'Invited', value: 'invited' },
			{ name: 'Inactive', value: 'inactive' },
			{ name: 'Completed', value: 'completed' },
			{ name: 'Rejected', value: 'rejected' },
			{ name: 'Deleted', value: 'deleted' },
		],
		module: [
			{ name: 'Active', value: 'active' },
			{ name: 'Unpublished', value: 'unpublished' },
		],
	};

	return (states[resource] as Array<{ name: string; value: string }>) || [];
}

/**
 * License text emission (runs once per node load)
 */
let licenseEmitted = false;

export function emitLicenseNotice(context: IExecuteFunctions): void {
	if (licenseEmitted) {
		return;
	}

	const logger = context.getNode();
	if (logger) {
		console.warn(`[Velocity BPA Licensing Notice]

This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).

Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.

For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.`);
	}

	licenseEmitted = true;
}
