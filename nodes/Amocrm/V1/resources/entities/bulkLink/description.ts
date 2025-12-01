import { IDisplayOptions } from 'n8n-workflow';
import { IEntitiesProperties } from '../../interfaces';
import { addJsonParametersDescription } from '../../_components/JsonParametersDescription';
import { addProxyDescription } from '../../_components/ProxyDescription';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['entities'],
		operation: ['bulkLink'],
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
	...addJsonParametersDescription(displayOptions),
	{
		displayName: 'Links',
		name: 'collection',
		placeholder: 'Add link',
		type: 'fixedCollection',
		default: [],
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				...displayOptions.show,
				json: [false],
			},
		},
		options: [
			{
				displayName: 'Link',
				name: 'link',
				values: [
					{
						displayName: 'Entity ID',
						name: 'entity_id',
						type: 'number',
						default: '',
						required: true,
						description: 'ID of main entity',
					},
					{
						displayName: 'To Entity ID',
						name: 'to_entity_id',
						type: 'number',
						default: '',
						required: true,
						description: 'ID of entity to link',
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
						required: true,
						description: 'Type of entity to link',
					},
					{
						displayName: 'Metadata',
						name: 'metadata',
						type: 'collection',
						placeholder: 'Add Metadata',
						default: {},
						options: [
							{
								displayName: 'Catalog ID',
								name: 'catalog_id',
								type: 'number',
								default: '',
								description: 'ID of catalog (for catalog_elements)',
							},
							{
								displayName: 'Quantity',
								name: 'quantity',
								type: 'number',
								default: 1,
								description: 'Quantity (for catalog_elements)',
							},
							{
								displayName: 'Is Main',
								name: 'is_main',
								type: 'boolean',
								default: false,
								description: 'Is main contact',
							},
							{
								displayName: 'Updated By',
								name: 'updated_by',
								type: 'number',
								default: '',
								description: 'ID of user who performs the action',
							},
							{
								displayName: 'Price ID',
								name: 'price_id',
								type: 'number',
								default: '',
								description: 'ID of price field (for catalog_elements)',
							},
						],
					},
				],
			},
		],
	},
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