import { IDataObject, INodeExecutionData, IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../../transport';

interface IFilter {
	entity_id?: number[];
	to_entity_id?: number;
	to_entity_type?: string;
	to_catalog_id?: number;
}

interface FilterFromFrontend {
	entity_ids: string;
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
	const entityIdsString = this.getNodeParameter('entity_ids', index) as string;

	const entityIds = entityIdsString
		.split(',')
		.map((id) => Number(id.trim()))
		.filter((id) => !isNaN(id));

	if (entityIds.length === 0) {
		throw new Error('At least one entity ID is required');
	}

	const filter = this.getNodeParameter('filter', index, {}) as FilterFromFrontend;

	qs.filter = {
		entity_id: entityIds,
		to_entity_id: filter.to_entity_id,
		to_entity_type: filter.to_entity_type,
		to_catalog_id: filter.to_catalog_id,
	} as IFilter;

	const requestMethod = 'GET';
	const endpoint = `${entityType}/links`;

	const responseData = await apiRequest.call(this, requestMethod, endpoint, body, qs);
	return this.helpers.returnJsonArray(responseData);
}