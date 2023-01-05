/* global URLSearchParams, location */
import {generatePath as reactRouterGeneratePath} from 'react-router-dom';
import type {PetsdbQueryType, PetsdbReadPageConfigType} from 'petsdb';

import {ArticleType} from '../../server/article/article-type';

// eslint-disable-next-line id-length
export function paginationQueryToURLSearchParameters<DataType extends Record<string, unknown>>(
    query: PetsdbQueryType<DataType>,
    pageConfig: PetsdbReadPageConfigType<ArticleType>,
    pick: Array<keyof DataType>
): URLSearchParams {
    return new URLSearchParams({
        pageConfig: encodeURIComponent(JSON.stringify(pageConfig)),
        pick: encodeURIComponent(JSON.stringify(pick)),
        query: encodeURIComponent(JSON.stringify(query)),
    });
}

export type ExtractPathDataType<StringConstType> = StringConstType extends `${string}:${infer KeyNames}/${infer Rest}`
    ? ExtractPathDataType<Rest> & {[key in KeyNames]: string}
    : StringConstType extends `${string}:${infer KeyNames}`
    ? ExtractPathDataType<string> & {[key in KeyNames]: string}
    : Record<never, string>;

export type ExtractPathKeysType<StringConstType> = keyof ExtractPathDataType<StringConstType>;

// Just workaround for react-router-dom, should be the same as ExtractPathDataType, but use Record<string, string> in the and
type RouterPathDataType<StringConstType> = StringConstType extends `${string}:${infer KeyNames}/${infer Rest}`
    ? ExtractPathDataType<Rest> & {[key in KeyNames]: string}
    : StringConstType extends `${string}:${infer KeyNames}`
    ? ExtractPathDataType<string> & {[key in KeyNames]: string}
    : Record<string, string>;

export function generatePath<PathType extends string>(
    rawPath: PathType,
    pathData: ExtractPathDataType<PathType>
): string {
    const pathDataForRouter: RouterPathDataType<PathType> = JSON.parse(JSON.stringify(pathData));

    return reactRouterGeneratePath(rawPath, pathDataForRouter);
}

/*
// eslint-disable-next-line id-length
export function urlSearchParametersToPaginationQuery<DataType>(
    urlSearchParameters: URLSearchParams
): {pagination: PaginationQueryType<DataType>} {
    const pagination = urlSearchParameters.get('pagination') || encodeURIComponent(JSON.stringify({}));

    const result: PaginationQueryType<DataType> = JSON.parse(decodeURIComponent(pagination));

    return result;
}
*/

export function getNeedUseThirdPartyServices(): boolean {
    if (typeof location === 'undefined') {
        return false;
    }

    // eslint-disable-next-line sonarjs/prefer-single-boolean-return
    if (location.hostname === 'localhost') {
        return false;
    }

    return true;
}
