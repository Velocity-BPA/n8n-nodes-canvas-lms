import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class CanvasLMSApi implements ICredentialType {
	name = 'canvasLMSApi';
	displayName = 'Canvas LMS API';
	documentationUrl = 'https://canvas.instructure.com/doc/api/';
	properties: INodeProperties[] = [
		{
			displayName: 'Canvas Instance URL',
			name: 'domain',
			type: 'string',
			default: 'https://canvas.instructure.com',
			description: 'The URL of your Canvas instance (e.g., https://school.instructure.com)',
			required: true,
		},
		{
			displayName: 'Client ID',
			name: 'clientId',
			type: 'string',
			default: '',
			description: 'OAuth2 Client ID from Canvas Developer Keys',
			required: true,
		},
		{
			displayName: 'Client Secret',
			name: 'clientSecret',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'OAuth2 Client Secret from Canvas Developer Keys',
			required: true,
		},
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'OAuth2 Access Token',
			required: true,
		},
		{
			displayName: 'Refresh Token',
			name: 'refreshToken',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'OAuth2 Refresh Token for token renewal',
			required: false,
		},
	];
}