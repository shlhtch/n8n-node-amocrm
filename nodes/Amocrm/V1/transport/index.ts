import {
	GenericValue,
	IDataObject,
	IHttpRequestMethods,
	IHttpRequestOptions,
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	NodeOperationError,
} from 'n8n-workflow';
import { Lock } from 'async-await-mutex-lock';

const lock = new Lock();
export async function apiRequest(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject | GenericValue | GenericValue[] = {},
	qs: IDataObject = {},
) {
	const authenticationMethod = this.getNodeParameter('authentication', 0) as string;
	const credentialType =
		authenticationMethod === 'oAuth2' ? 'amocrmOAuth2Api' : 'amocrmLongLivedApi';
	const credentials = await this.getCredentials(credentialType);

	// Получаем proxy из опций ноды
	const optionsParam = (this.getNodeParameter('options', 0, {}) as IDataObject) || {};
	const proxyUrl = optionsParam.proxy as string | undefined;

	const options: IHttpRequestOptions = {
		method,
		body,
		qs,
		url: `https://${credentials.subdomain}.amocrm.ru/api/v4/${endpoint}`,
		headers: {
			'content-type': 'application/json; charset=utf-8',
		},
	};

	// Добавляем proxy, если он указан
	if (proxyUrl && proxyUrl.trim() !== '') {
		try {
			const url = new URL(proxyUrl);
			const proxyHost = url.hostname;
			const proxyPort = url.port || (url.protocol === 'https:' ? '443' : '80');
			
			options.proxy = {
				host: url.hostname,
				port: parseInt(url.port, 10) || (url.protocol === 'https:' ? 443 : 80),
				protocol: url.protocol.replace(':', ''),
				auth: url.username && url.password ? {
					username: url.username,
					password: url.password,
				} : undefined,
			};
			
			// Логируем использование proxy
			const nodeName = this.getNode ? this.getNode().name : 'AmoCRM';
			console.log(`[${nodeName}] Using proxy: ${url.protocol}//${proxyHost}:${proxyPort} for request to ${endpoint}`);
		} catch (error) {
			throw new NodeOperationError(this.getNode(), 'Invalid proxy URL format', {
				description: 'Proxy URL must be in format: http://username:password@host:port',
			});
		}
	}

	try {
		await lock.acquire();
		return await this.helpers.httpRequestWithAuthentication.call(this, credentialType, options);
	} catch (e) {
		const concreteErrorsDescription = e.cause?.response?.data['validation-errors'];
		if (concreteErrorsDescription)
			throw new NodeOperationError(this.getNode(), 'Incorrect fields', {
				description: JSON.stringify(concreteErrorsDescription, null, 2),
			});
		throw e;
	} finally {
		lock.release();
	}
}

export async function apiRequestAllItems(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD',
	endpoint: string,
	body: IDataObject = {},
	query: IDataObject = {},
) {
	const returnData: any[] = [];

	let responseData;
	query.page = 1;
	query.limit = query.limit ? query.limit : 250;

	do {
		responseData = await apiRequest.call(this, method, endpoint, body, query);
		query.page++;
		returnData.push(responseData);
	} while (responseData._links?.next?.href?.length);

	return returnData;
}
