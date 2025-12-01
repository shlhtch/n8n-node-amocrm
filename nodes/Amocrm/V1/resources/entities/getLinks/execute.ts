import { IDataObject, INodeExecutionData, IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../../transport';

interface IFilter {
	to_entity_id?: number;
	to_entity_type?: string;
	to_catalog_id?: number;
}

interface FilterFromFrontend {
	to_entity_id?: number;
	to_entity_type?: string;
	to_catalog_id?: number;
}

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const body = {} as IDataObject;
	const qs = {} as IDataObject;

	const entityType = this.getNodeParameter('entity_type', index) as string;
	const entityId = this.getNodeParameter('entity_id', index) as number;

	const filter = this.getNodeParameter('filter', index, {}) as FilterFromFrontend;

	if (Object.keys(filter).length) {
		qs.filter = {
			to_entity_id: filter.to_entity_id,
			to_entity_type: filter.to_entity_type,
			to_catalog_id: filter.to_catalog_id,
		} as IFilter;
	}

	const requestMethod = 'GET';
	const endpoint = `${entityType}/${entityId}/links`;

	const responseData = await apiRequest.call(this, requestMethod, endpoint, body, qs);
	return this.helpers.returnJsonArray(responseData);
}