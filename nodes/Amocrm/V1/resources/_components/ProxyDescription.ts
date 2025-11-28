import { INodeProperties } from 'n8n-workflow';

export const addProxyDescription = (): INodeProperties => {
	return {
		displayName: 'Proxy',
		name: 'proxy',
		type: 'string',
		default: '',
		placeholder: 'http://username:password@host:port',
		description: 'Proxy server URL (e.g., http://mxzwdHpY:E8rQ7G82@45.10.108.154:62958)',
	};
};
