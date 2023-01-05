import type {PetsdbQueryType, PetsdbReadPageConfigType} from 'petsdb';

import {PaginationResultType} from '../../../server/data-base/data-base-type';
import {ArticleType} from '../../../server/article/article-type';
import {FetchMethodEnum, fetchX} from '../../util/fetch';
import {
    makeArticlePaginationSchema,
    makeArticlePaginationSchemaPick,
    makeArticleSchema,
} from '../../../server/article/article-validation';
import {apiUrl} from '../../../server/const';
import {paginationQueryToURLSearchParameters as paginationQueryToURLSearchParameters} from '../../util/url';
import {UnknownObjectType} from '../../util/type';
import {ArticleContextType} from '../../client-component/article/article-context/article-context-type';
import {articleContextDataSchema} from '../../client-component/article/article-context/article-context-const';

export async function getArticleListPagination(
    query: PetsdbQueryType<ArticleType>,
    pageConfig: PetsdbReadPageConfigType<ArticleType>
): Promise<PaginationResultType<ArticleType>> {
    const urlSearchParameters = paginationQueryToURLSearchParameters<ArticleType>(query, pageConfig, []);

    return fetchX<PaginationResultType<ArticleType>>(
        `${apiUrl.adminArticleListPagination}?${urlSearchParameters.toString()}`,
        makeArticlePaginationSchema(),
        {
            credentials: 'include',
            method: FetchMethodEnum.get,
        }
    );
}

export async function getArticleListPaginationPick<Keys extends keyof ArticleType>(
    query: PetsdbQueryType<ArticleType>,
    pageConfig: PetsdbReadPageConfigType<ArticleType>,
    pick: Array<Keys>
): Promise<PaginationResultType<Pick<ArticleType, Keys>>> {
    const urlSearchParameters = paginationQueryToURLSearchParameters<ArticleType>(query, pageConfig, pick);

    return fetchX<PaginationResultType<Pick<ArticleType, Keys>>>(
        `${apiUrl.adminArticleListPaginationPick}?${urlSearchParameters.toString()}`,
        makeArticlePaginationSchemaPick<Keys>(pick),
        {
            credentials: 'include',
            method: FetchMethodEnum.get,
        }
    );
}

export async function getArticleClientListPaginationPick<Keys extends keyof ArticleType>(
    query: PetsdbQueryType<ArticleType>,
    pageConfig: PetsdbReadPageConfigType<ArticleType>,
    fieldList: Array<Keys>
): Promise<PaginationResultType<Pick<ArticleType, Keys>>> {
    const urlSearchParameters = paginationQueryToURLSearchParameters<ArticleType>(query, pageConfig, fieldList);

    return fetchX<PaginationResultType<Pick<ArticleType, Keys>>>(
        `${apiUrl.clientSearchArticle}?${urlSearchParameters.toString()}`,
        makeArticlePaginationSchemaPick<Keys>(fieldList),
        {
            method: FetchMethodEnum.get,
        }
    );
}

export async function postArticleCreate(article: ArticleType): Promise<ArticleType> {
    return fetchX<ArticleType>(apiUrl.adminArticleCreate, makeArticleSchema(), {
        body: JSON.stringify(article),
        credentials: 'include',
        method: FetchMethodEnum.post,
    });
}

export async function postArticleUpdate(article: ArticleType): Promise<ArticleType> {
    return fetchX<ArticleType>(apiUrl.adminArticleUpdate, makeArticleSchema(), {
        body: JSON.stringify(article),
        credentials: 'include',
        method: FetchMethodEnum.post,
    });
}

export async function deleteArticle(articleId: string): Promise<UnknownObjectType> {
    return fetchX<UnknownObjectType>(
        apiUrl.adminArticleDelete.replace(':articleId', articleId),
        {
            required: [],
            type: 'object',
        },
        {
            credentials: 'include',
            method: FetchMethodEnum.delete,
        }
    );
}

export async function getArticleContextBySlug(slug: string): Promise<ArticleContextType> {
    return fetchX<ArticleContextType>(apiUrl.clientArticleContextGet.replace(':slug', slug), articleContextDataSchema, {
        credentials: 'include',
        method: FetchMethodEnum.get,
    });
}
