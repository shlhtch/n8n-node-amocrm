import { IDisplayOptions } from 'n8n-workflow';
import { IEntitiesProperties } from '../../interfaces';
import { addFilterDescription } from '../../_components/FilterDescription';
import { addProxyDescription } from '../../_components/ProxyDescription';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['entities'],
		operation: ['getBulkLinks'],
	},
};

export const description: IEntitiesProperties = [
	{
		displayName: 'Entity Type',
		name: 'entity_type',
		type: 'options',
		default: 'leads',
		options: [
			{
				name: 'Lead',
				value: 'leads',
			},
			{
				name: 'Contact',
				value: 'contacts',
			},
			{
				name: 'Company',
				value: 'companies',
			},
			{
				name: 'Customer',
				value: 'customers',
			},
		],
		displayOptions,
		required: true,
		description: 'Type of main entity',
	},
	{
		displayName: 'Entity IDs',
		name: 'entity_ids',
		type: 'string',
		default: '',
		displayOptions,
		required: true,
		description: 'Comma-separated list of main entity IDs',
	},
	addFilterDescription(displayOptions, [
		{
			displayName: 'To Entity ID',
			name: 'to_entity_id',
			type: 'number',
			default: '',
			description: 'Filter by linked entity ID',
		},
		{
			displayName: 'To Entity Type',
			name: 'to_entity_type',
			type: 'options',
			default: 'contacts',
			options: [
				{
					name: 'Lead',
					value: 'leads',
				},
				{
					name: 'Contact',
					value: 'contacts',
				},
				{
					name: 'Company',
					value: 'companies',
				},
				{
					name: 'Customer',
					value: 'customers',
				},
				{
					name: 'Catalog Element',
					value: 'catalog_elements',
				},
			],
			description: 'Filter by linked entity type',
		},
		{
			displayName: 'To Catalog ID',
			name: 'to_catalog_id',
			type: 'number',
			default: '',
			description: 'Filter by catalog ID',
		},
	]),
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions,
		options: [addProxyDescription()],
	},
];