/* global fetch, HeadersInit, FormData, Response, File */

import {JSONSchemaType} from 'ajv';

import {getExpectedStructure} from './object';

export const enum FetchMethodEnum {
    delete = 'DELETE',
    get = 'GET',
    patch = 'PATCH',
    post = 'POST',
    put = 'PUT',
}

type OptionsType = {
    body?: File | FormData | string; // body data type must match "Content-Type" header
    credentials?: 'include' | 'omit' | 'same-origin'; // include, same-origin, omit (default: same-origin)
    headers?: HeadersInit;
    method?: FetchMethodEnum; // GET, POST, PUT, DELETE, etc. (default: GET)
    mode?: 'cors' | 'no-cors' | 'same-origin'; // no-cors, cors, same-origin (default: same-origin)
    // cache?: 'default'; // default, no-cache, reload, force-cache, only-if-cached (default: default)
    // headers?: {
    //     'Access-Control-Allow-Headers'?: '*',
    //     Accept?: 'application/json, text/javascript, */*; q=0.01',
    //     'Content-Type'?: 'application/x-www-form-urlencoded; charset=UTF-8',
    // },
    // redirect?: 'follow'; // manual, follow, error (default: follow)
    // referrer?: 'no-referrer'; // no-referrer, client (default: client)
};

type FetchCacheType = Record<string, Promise<unknown> | null>;

const fetchCache: FetchCacheType = {};

function invalidateCache(options?: OptionsType) {
    const {method} = options || {};

    if (!method || method === FetchMethodEnum.get) {
        return;
    }

    Object.keys(fetchCache).forEach((key: string) => {
        fetchCache[key] = null;
    });
}

function fetchEndCallBack(fetchBeginTimeStamp: number, url: string) {
    const maxFetchingTime = 2e3; // 2 seconds
    const fetchEndTimeStamp = Date.now();
    const fetchingTime = fetchEndTimeStamp - fetchBeginTimeStamp;

    if (fetchingTime > maxFetchingTime) {
        console.log(`%c[WARNING]: "${url}" took %c${fetchingTime / 1e3}s`, 'color: #00c', 'color: #c00');
    }
}

export function fetchX<ExpectedResponseType>(
    url: string,
    jsonSchema: JSONSchemaType<ExpectedResponseType>,
    options?: OptionsType
): Promise<ExpectedResponseType> {
    invalidateCache(options);

    const cacheProperty = `${url} - ${JSON.stringify(options || '[empty]')}`;

    const savedPromiseResult: Promise<unknown> | null = fetchCache[cacheProperty];

    if (savedPromiseResult) {
        console.log(
            `%c[fetchX]: [CACHE]\n> url: ${url},\n> options: ${JSON.stringify(options || '[empty]')}`,
            'color: #0a0'
        );

        return savedPromiseResult
            .then((data: unknown): ExpectedResponseType => getExpectedStructure<ExpectedResponseType>(data, jsonSchema))
            .catch((error: Error) => {
                fetchCache[cacheProperty] = null;
                console.error(error);

                throw error;
            });
    }

    const fetchBeginTimeStamp = Date.now();

    const fetchResult: Promise<ExpectedResponseType> = fetch(url, options)
        .then((response: Response): Promise<unknown> => response.json())
        .then((data: unknown): ExpectedResponseType => {
            const checkedData: ExpectedResponseType = getExpectedStructure<ExpectedResponseType>(data, jsonSchema);

            fetchEndCallBack(fetchBeginTimeStamp, url);

            return checkedData;
        })
        .catch((error: Error) => {
            fetchEndCallBack(fetchBeginTimeStamp, url);

            fetchCache[cacheProperty] = null;
            console.error(error);

            throw error;
        });

    fetchCache[cacheProperty] = fetchResult;

    return fetchResult;
}

export type FetchArgumentsType<ResultType> = Parameters<typeof fetchX<ResultType>>;
