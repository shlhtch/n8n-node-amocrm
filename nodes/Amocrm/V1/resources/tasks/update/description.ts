import { IDisplayOptions, INodeProperties } from 'n8n-workflow';
import { addJsonParametersDescription } from '../../_components/JsonParametersDescription';
import { taskModelDescription } from '../model';
import { addRequestId } from '../../_components/RequestId';
import { ITasksProperties } from '../../interfaces';
import { addProxyDescription } from '../../_components/ProxyDescription';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['tasks'],
		operation: ['updateTasks'],
	},
};

const updateTaskModel: INodeProperties[] = [...taskModelDescription, addRequestId()];

export const description: ITasksProperties = [
	...addJsonParametersDescription(displayOptions),
	{
		displayName: 'Tasks',
		name: 'collection',
		placeholder: 'Add edited task',
		type: 'fixedCollection',
		default: [],
		required: true,
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
				displayName: 'Update Task',
				name: 'task',
				values: updateTaskModel,
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
		options: [
			addProxyDescription(),
		],
	},
];
