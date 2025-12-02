import { INodeProperties } from 'n8n-workflow';

import * as getLinks from './getLinks';
import * as link from './link';
import * as unlink from './unlink';
import * as getMultipleLinks from './getMultipleLinks';
import * as multipleLink from './multipleLink';
import * as multipleUnlink from './multipleUnlink';

export { getLinks, link, unlink, getMultipleLinks, multipleLink, multipleUnlink };

export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['entities'],
			},
		},
		options: [
			{
				name: 'Get Links',
				value: 'getLinks',
				description: 'Get list of linked entities',
				action: 'Get list of linked entities',
			},
			{
				name: 'Get Multiple Links',
				value: 'getMultipleLinks',
				description: 'Get links for multiple entities',
				action: 'Get links for multiple entities',
			},
			{
				name: 'Link Entities',
				value: 'link',
				description: 'Link entities to main entity',
				action: 'Link entities to main entity',
			},
			{
				name: 'Multiple Link Entities',
				value: 'multipleLink',
				description: 'Link entities to multiple main entities',
				action: 'Link entities to multiple main entities',
			},
			{
				name: 'Multiple Unlink Entities',
				value: 'multipleUnlink',
				description: 'Unlink entities from multiple main entities',
				action: 'Unlink entities from multiple main entities',
			},
			{
				name: 'Unlink Entities',
				value: 'unlink',
				description: 'Unlink entities from main entity',
				action: 'Unlink entities from main entity',
			},
		],
		default: 'getLinks',
	},
	...getLinks.description,
	...link.description,
	...unlink.description,
	...getMultipleLinks.description,
	...multipleLink.description,
	...multipleUnlink.description,
];