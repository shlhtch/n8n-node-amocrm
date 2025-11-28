import { IDisplayOptions } from 'n8n-workflow';
import { ICatalogsProperties } from '../../interfaces';
import { addLimitDescription } from '../../_components/LimitDescription';
import { addPageDescription } from '../../_components/PageDescription';
import { addReturnAll } from '../../_components/ReturnAllDescription';
import { addProxyDescription } from '../../_components/ProxyDescription';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['catalogs'],
		operation: ['getCatalogs'],
	},
};

export const description: ICatalogsProperties = [
	addReturnAll(displayOptions),
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
	addPageDescription({
		show: {
			...displayOptions.show,
			returnAll: [false],
		},
	}),
	addLimitDescription(displayOptions),
];
