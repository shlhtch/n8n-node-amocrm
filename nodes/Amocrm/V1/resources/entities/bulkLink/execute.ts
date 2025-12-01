import { INodeExecutionData, IExecuteFunctions } from 'n8n-workflow';
import { clearNullableProps } from '../../../helpers/clearNullableProps';
import { apiRequest } from '../../../transport';

interface IFormLink {
	link: Array<{
		entity_id: number;
		to_entity_id: number;
		to_entity_type: string;
		metadata?: {
			catalog_id?: number;
			quantity?: number;
			is_main?: boolean;
			updated_by?: number;
			price_id?: number;
		};
	}>;
}

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const requestMethod = 'POST';
	const entityType = this.getNodeParameter('entity_type', index) as string;
	const endpoint = `${entityType}/link`;

	const jsonParams = (await this.getNodeParameter('json', index)) as boolean;

	if (jsonParams) {
		const jsonString = (await this.getNodeParameter('jsonString', index)) as string;
		const responseData = await apiRequest.call(
			this,
			requestMethod,
			endpoint,
			JSON.parse(jsonString),
		);
		return this.helpers.returnJsonArray(responseData);
	}

	const linksCollection = (await this.getNodeParameter('collection', index)) as IFormLink;

	const body = linksCollection.link
		.map((link) => ({
			entity_id: link.entity_id,
			to_entity_id: link.to_entity_id,
			to_entity_type: link.to_entity_type,
			metadata: link.metadata ? clearNullableProps(link.metadata) : null,
		}))
		.map(clearNullableProps);

	const responseData = await apiRequest.call(this, requestMethod, endpoint, body);
	return this.helpers.returnJsonArray(responseData);
}