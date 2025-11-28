import { IDisplayOptions } from 'n8n-workflow';
import { INotesProperties } from '../../interfaces';
import { addJsonParametersDescription } from '../../_components/JsonParametersDescription';
import { entityType, getNotesDescription } from '../entity';
import { addProxyDescription } from '../../_components/ProxyDescription';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['notes'],
		operation: ['createNotes'],
	},
};

export const description: INotesProperties = [
	...entityType(displayOptions),
	...addJsonParametersDescription(displayOptions),
	...getNotesDescription(displayOptions),
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions,
		options: [
			addProxyDescription(),
		],
	},
];
