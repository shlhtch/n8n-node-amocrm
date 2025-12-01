import { INodeProperties } from 'n8n-workflow';

import * as getLinks from './getLinks';
import * as link from './link';
import * as unlink from './unlink';
import * as getBulkLinks from './getBulkLinks';
import * as bulkLink from './bulkLink';
import * as bulkUnlink from './bulkUnlink';

export { getLinks, link, unlink, getBulkLinks, bulkLink, bulkUnlink };

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
				name: 'Link Entities',
				value: 'link',
				description: 'Link entities to main entity',
				action: 'Link entities to main entity',
			},
			{
				name: 'Unlink Entities',
				value: 'unlink',
				description: 'Unlink entities from main entity',
				action: 'Unlink entities from main entity',
			},
			{
				name: 'Get Bulk Links',
				value: 'getBulkLinks',
				description: 'Get links for multiple entities',
				action: 'Get links for multiple entities',
			},
			{
				name: 'Bulk Link Entities',
				value: 'bulkLink',
				description: 'Link entities to multiple main entities',
				action: 'Link entities to multiple main entities',
			},
			{
				name: 'Bulk Unlink Entities',
				value: 'bulkUnlink',
				description: 'Unlink entities from multiple main entities',
				action: 'Unlink entities from multiple main entities',
			},
		],
		default: 'getLinks',
	},
	...getLinks.description,
	...link.description,
	...unlink.description,
	...getBulkLinks.description,
	...bulkLink.description,
	...bulkUnlink.description,
];