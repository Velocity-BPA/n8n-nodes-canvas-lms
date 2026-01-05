/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const fileOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['file'],
			},
		},
		options: [
			{
				name: 'Create Folder',
				value: 'createFolder',
				description: 'Create a new folder',
				action: 'Create a folder',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a file',
				action: 'Delete a file',
			},
			{
				name: 'Download',
				value: 'download',
				description: 'Get download URL for a file',
				action: 'Download a file',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get file metadata',
				action: 'Get a file',
			},
			{
				name: 'Get Folders',
				value: 'getFolders',
				description: 'List folders in a course or folder',
				action: 'Get folders',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many files',
				action: 'Get many files',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update file metadata',
				action: 'Update a file',
			},
			{
				name: 'Upload',
				value: 'upload',
				description: 'Upload a file',
				action: 'Upload a file',
			},
		],
		default: 'get',
	},
];

export const fileFields: INodeProperties[] = [
	// ----------------------------------
	//         file: context selection
	// ----------------------------------
	{
		displayName: 'Context Type',
		name: 'contextType',
		type: 'options',
		options: [
			{ name: 'Course', value: 'course' },
			{ name: 'User', value: 'user' },
			{ name: 'Group', value: 'group' },
			{ name: 'Folder', value: 'folder' },
		],
		required: true,
		default: 'course',
		description: 'The type of context for the file operation',
		displayOptions: {
			show: {
				resource: ['file'],
				operation: ['getAll', 'upload', 'getFolders', 'createFolder'],
			},
		},
	},
	{
		displayName: 'Context ID',
		name: 'contextId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the course, user, group, or folder',
		displayOptions: {
			show: {
				resource: ['file'],
				operation: ['getAll', 'upload', 'getFolders', 'createFolder'],
			},
		},
	},

	// ----------------------------------
	//         file: get, update, delete, download
	// ----------------------------------
	{
		displayName: 'File ID',
		name: 'fileId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the file',
		displayOptions: {
			show: {
				resource: ['file'],
				operation: ['get', 'update', 'delete', 'download'],
			},
		},
	},

	// ----------------------------------
	//         file: upload
	// ----------------------------------
	{
		displayName: 'File Name',
		name: 'fileName',
		type: 'string',
		required: true,
		default: '',
		description: 'Name for the uploaded file',
		displayOptions: {
			show: {
				resource: ['file'],
				operation: ['upload'],
			},
		},
	},
	{
		displayName: 'Binary Property',
		name: 'binaryPropertyName',
		type: 'string',
		required: true,
		default: 'data',
		description: 'Name of the binary property containing the file data',
		displayOptions: {
			show: {
				resource: ['file'],
				operation: ['upload'],
			},
		},
	},
	{
		displayName: 'Upload Options',
		name: 'uploadOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['file'],
				operation: ['upload'],
			},
		},
		options: [
			{
				displayName: 'Content Type',
				name: 'contentType',
				type: 'string',
				default: '',
				description: 'MIME type of the file (auto-detected if not specified)',
			},
			{
				displayName: 'On Duplicate',
				name: 'onDuplicate',
				type: 'options',
				options: [
					{ name: 'Overwrite', value: 'overwrite' },
					{ name: 'Rename', value: 'rename' },
				],
				default: 'overwrite',
				description: 'What to do if a file with the same name exists',
			},
			{
				displayName: 'Parent Folder ID',
				name: 'parentFolderId',
				type: 'string',
				default: '',
				description: 'ID of the folder to upload to (uses root folder if not specified)',
			},
			{
				displayName: 'Parent Folder Path',
				name: 'parentFolderPath',
				type: 'string',
				default: '',
				description: 'Path to the folder (e.g., "folder1/folder2")',
			},
		],
	},

	// ----------------------------------
	//         file: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['file'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Hidden',
				name: 'hidden',
				type: 'boolean',
				default: false,
				description: 'Whether to hide the file from students',
			},
			{
				displayName: 'Lock At',
				name: 'lockAt',
				type: 'dateTime',
				default: '',
				description: 'When to lock the file',
			},
			{
				displayName: 'Locked',
				name: 'locked',
				type: 'boolean',
				default: false,
				description: 'Whether the file is locked',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'New name for the file',
			},
			{
				displayName: 'On Duplicate',
				name: 'onDuplicate',
				type: 'options',
				options: [
					{ name: 'Overwrite', value: 'overwrite' },
					{ name: 'Rename', value: 'rename' },
				],
				default: 'overwrite',
				description: 'What to do if a file with the new name exists',
			},
			{
				displayName: 'Parent Folder ID',
				name: 'parentFolderId',
				type: 'string',
				default: '',
				description: 'Move file to this folder',
			},
			{
				displayName: 'Unlock At',
				name: 'unlockAt',
				type: 'dateTime',
				default: '',
				description: 'When to unlock the file',
			},
			{
				displayName: 'Visibility Level',
				name: 'visibilityLevel',
				type: 'options',
				options: [
					{ name: 'Inherit', value: 'inherit' },
					{ name: 'Course', value: 'course' },
					{ name: 'Institution', value: 'institution' },
					{ name: 'Public', value: 'public' },
				],
				default: 'inherit',
				description: 'Who can see the file',
			},
		],
	},

	// ----------------------------------
	//         file: getAll, getFolders
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['file'],
				operation: ['getAll', 'getFolders'],
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
				resource: ['file'],
				operation: ['getAll', 'getFolders'],
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
				resource: ['file'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Content Types',
				name: 'contentTypes',
				type: 'string',
				default: '',
				description: 'Comma-separated list of content types to filter by',
			},
			{
				displayName: 'Exclude Content Types',
				name: 'excludeContentTypes',
				type: 'string',
				default: '',
				description: 'Comma-separated list of content types to exclude',
			},
			{
				displayName: 'Include',
				name: 'include',
				type: 'multiOptions',
				options: [
					{ name: 'User', value: 'user' },
					{ name: 'Usage Rights', value: 'usage_rights' },
					{ name: 'Enhanced Preview URL', value: 'enhanced_preview_url' },
				],
				default: [],
				description: 'Additional data to include',
			},
			{
				displayName: 'Only Names',
				name: 'only',
				type: 'multiOptions',
				options: [
					{ name: 'Names', value: 'names' },
				],
				default: [],
				description: 'Return only specific attributes',
			},
			{
				displayName: 'Search Term',
				name: 'searchTerm',
				type: 'string',
				default: '',
				description: 'Search files by name',
			},
			{
				displayName: 'Sort',
				name: 'sort',
				type: 'options',
				options: [
					{ name: 'Name', value: 'name' },
					{ name: 'Size', value: 'size' },
					{ name: 'Created At', value: 'created_at' },
					{ name: 'Updated At', value: 'updated_at' },
					{ name: 'Content Type', value: 'content_type' },
					{ name: 'User', value: 'user' },
				],
				default: 'name',
				description: 'How to sort the results',
			},
			{
				displayName: 'Sort Order',
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
	//         file: createFolder
	// ----------------------------------
	{
		displayName: 'Folder Name',
		name: 'folderName',
		type: 'string',
		required: true,
		default: '',
		description: 'Name of the folder to create',
		displayOptions: {
			show: {
				resource: ['file'],
				operation: ['createFolder'],
			},
		},
	},
	{
		displayName: 'Folder Options',
		name: 'folderOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['file'],
				operation: ['createFolder'],
			},
		},
		options: [
			{
				displayName: 'Hidden',
				name: 'hidden',
				type: 'boolean',
				default: false,
				description: 'Whether the folder is hidden',
			},
			{
				displayName: 'Lock At',
				name: 'lockAt',
				type: 'dateTime',
				default: '',
				description: 'When to lock the folder',
			},
			{
				displayName: 'Locked',
				name: 'locked',
				type: 'boolean',
				default: false,
				description: 'Whether the folder is locked',
			},
			{
				displayName: 'Parent Folder ID',
				name: 'parentFolderId',
				type: 'string',
				default: '',
				description: 'ID of the parent folder',
			},
			{
				displayName: 'Parent Folder Path',
				name: 'parentFolderPath',
				type: 'string',
				default: '',
				description: 'Path to the parent folder',
			},
			{
				displayName: 'Position',
				name: 'position',
				type: 'number',
				default: 1,
				description: 'Position of the folder in the listing',
			},
			{
				displayName: 'Unlock At',
				name: 'unlockAt',
				type: 'dateTime',
				default: '',
				description: 'When to unlock the folder',
			},
		],
	},

	// ----------------------------------
	//         file: get options
	// ----------------------------------
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['file'],
				operation: ['get'],
			},
		},
		options: [
			{
				displayName: 'Include',
				name: 'include',
				type: 'multiOptions',
				options: [
					{ name: 'User', value: 'user' },
					{ name: 'Usage Rights', value: 'usage_rights' },
					{ name: 'Enhanced Preview URL', value: 'enhanced_preview_url' },
				],
				default: [],
				description: 'Additional data to include',
			},
		],
	},
];
