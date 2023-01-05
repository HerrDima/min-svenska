import {FastifyReply, FastifyRequest} from 'fastify';
import type {PetsdbQueryType, PetsdbReadPageConfigType} from 'petsdb';

import {mainResponseHeader} from '../const';
import {defaultPaginationQuery} from '../data-base/data-base-const';
import {makeClientArticleContextData} from '../ssr/api/srr-article';
import {getStringFromUnknown} from '../../www/util/type';
import {ArticleContextType} from '../../www/client-component/article/article-context/article-context-type';
import {PaginationResultType} from '../data-base/data-base-type';

import {articleCrud} from './article';
import {ArticleType} from './article-type';
import {validateArticle} from './article-validation';
import {tryQueryStringToRegExp} from './article-util';

export async function getArticleListPagination(
    request: FastifyRequest,
    reply: FastifyReply
): Promise<PaginationResultType<ArticleType>> {
    const {pageConfig, query} = Object.assign(
        {
            pageConfig: encodeURIComponent(JSON.stringify(defaultPaginationQuery)),
            query: encodeURIComponent(JSON.stringify({})),
        },
        request.query
    );
    const pageConfigParsed: PetsdbReadPageConfigType<ArticleType> = JSON.parse(decodeURIComponent(pageConfig));
    const queryParsed: PetsdbQueryType<ArticleType> = JSON.parse(decodeURIComponent(query));

    // eslint-disable-next-line no-loops/no-loops, guard-for-in
    for (const queryKey in queryParsed) {
        const queryValue = {...queryParsed}[queryKey];

        if (typeof queryValue === 'string') {
            Object.assign(queryParsed, {[queryKey]: tryQueryStringToRegExp(queryValue)});
        }
    }

    const articleListPagination: PaginationResultType<ArticleType> = await articleCrud.findManyPagination(
        queryParsed,
        pageConfigParsed
    );

    reply.code(200).header(...mainResponseHeader);

    return articleListPagination;
}

// eslint-disable-next-line id-length, sonarjs/no-identical-functions
export async function getArticleListPaginationPick(
    request: FastifyRequest,
    reply: FastifyReply
): Promise<PaginationResultType<Partial<ArticleType>>> {
    const {pageConfig, pick, query} = Object.assign(
        {
            pageConfig: encodeURIComponent(JSON.stringify(defaultPaginationQuery)),
            pick: encodeURIComponent(JSON.stringify([])),
            query: encodeURIComponent(JSON.stringify({})),
        },
        request.query
    );
    const pageConfigParsed: PetsdbReadPageConfigType<ArticleType> = JSON.parse(decodeURIComponent(pageConfig));
    const pickParsed: Array<keyof ArticleType> = JSON.parse(decodeURIComponent(pick));
    const queryParsed: PetsdbQueryType<ArticleType> = JSON.parse(decodeURIComponent(query));

    // eslint-disable-next-line no-loops/no-loops, guard-for-in
    for (const queryKey in queryParsed) {
        const queryValue = {...queryParsed}[queryKey];

        if (typeof queryValue === 'string') {
            Object.assign(queryParsed, {[queryKey]: tryQueryStringToRegExp(queryValue)});
        }
    }

    const articleListPagination: PaginationResultType<Partial<ArticleType>> =
        await articleCrud.findManyPaginationPartial(queryParsed, pageConfigParsed, pickParsed);

    reply.code(200).header(...mainResponseHeader);

    return articleListPagination;
}

// eslint-disable-next-line id-length, sonarjs/no-identical-functions
export async function getArticleClientListPaginationPick(
    request: FastifyRequest,
    reply: FastifyReply
): Promise<PaginationResultType<Partial<ArticleType>>> {
    const {pageConfig, pick, query} = Object.assign(
        {
            pageConfig: encodeURIComponent(JSON.stringify(defaultPaginationQuery)),
            pick: encodeURIComponent(JSON.stringify([])),
            query: encodeURIComponent(JSON.stringify({})),
        },
        request.query
    );
    const pageConfigParsed: PetsdbReadPageConfigType<ArticleType> = JSON.parse(decodeURIComponent(pageConfig));
    const pickParsed: Array<keyof ArticleType> = JSON.parse(decodeURIComponent(pick));
    const queryParsed: PetsdbQueryType<ArticleType> = JSON.parse(decodeURIComponent(query));

    // eslint-disable-next-line no-loops/no-loops, guard-for-in
    for (const queryKey in queryParsed) {
        const queryValue = {...queryParsed}[queryKey];

        if (typeof queryValue === 'string') {
            Object.assign(queryParsed, {[queryKey]: tryQueryStringToRegExp(queryValue)});
        }
    }

    queryParsed.isActive = true;

    const articleListPagination: PaginationResultType<Partial<ArticleType>> =
        await articleCrud.findManyPaginationPartial(queryParsed, pageConfigParsed, pickParsed);

    reply.code(200).header(...mainResponseHeader);

    return articleListPagination;
}

// eslint-disable-next-line complexity, max-statements
export async function postAdminArticleCreate(
    request: FastifyRequest<{Body?: string}>,
    reply: FastifyReply
): Promise<ArticleType | Record<'message', string>> {
    const {body} = request;
    const parsedData: ArticleType = JSON.parse(String(body || '{}'));
    const [isValidArticle, modelJsonSchemaValidate] = validateArticle(parsedData);

    reply.header(...mainResponseHeader);

    if (!isValidArticle) {
        reply.code(400);

        return {message: JSON.stringify(modelJsonSchemaValidate.errors)};
    }

    const {id, slug} = parsedData;

    if (id.trim() === '') {
        reply.code(400);

        return {message: 'Id Should exists.'};
    }

    if (slug.trim() === '') {
        reply.code(400);

        return {message: 'Slug should exists.'};
    }

    const existedArticleById = await articleCrud.findOne({id});

    if (existedArticleById) {
        reply.code(400);

        return {message: `Article with id="${id}" already exists.`};
    }

    const existedArticleBySlug = await articleCrud.findOne({slug});

    if (existedArticleBySlug) {
        reply.code(400);

        return {message: `Article with slug="${slug}" already exists.`};
    }

    const currentDate = new Date().toISOString();

    const actualizedArticle: ArticleType = {
        ...parsedData,
        createdDate: currentDate,
        updatedDate: currentDate,
    };

    await articleCrud.createOne(actualizedArticle);

    reply.code(200);

    return actualizedArticle;
}

// eslint-disable-next-line complexity, max-statements
export async function postAdminArticleUpdate(
    request: FastifyRequest<{Body?: string}>,
    reply: FastifyReply
): Promise<ArticleType | Record<'message', string>> {
    const {body} = request;
    const parsedData: ArticleType = JSON.parse(String(body || '{}'));
    const [isValidArticle, modelJsonSchemaValidate] = validateArticle(parsedData);

    reply.header(...mainResponseHeader);

    if (!isValidArticle) {
        reply.code(400);

        return {message: JSON.stringify(modelJsonSchemaValidate.errors)};
    }

    const {id} = parsedData;

    if (id.trim() === '') {
        reply.code(400);

        return {message: 'Id Should exists.'};
    }

    const existedArticleById = await articleCrud.findOne({id});

    if (!existedArticleById) {
        reply.code(400);

        return {message: `Article with id="${id}" does not exists.`};
    }

    const actualizedArticle: ArticleType = {
        ...parsedData,
        updatedDate: new Date().toISOString(),
    };

    await articleCrud.updateOne({id}, actualizedArticle);

    reply.code(200);

    return actualizedArticle;
}

export async function deleteAdminArticleDelete(
    request: FastifyRequest<{Params: {articleId?: string}}>,
    reply: FastifyReply
): Promise<Record<'articleId', string>> {
    const {params} = request;
    const articleId = getStringFromUnknown(params, 'articleId');

    await articleCrud.deleteOne({id: articleId});

    reply.code(200).header(...mainResponseHeader);

    return {articleId};
}

export async function getClientArticleContextData(
    request: FastifyRequest<{Params: {slug?: string}}>,
    reply: FastifyReply
): Promise<ArticleContextType> {
    const {params} = request;
    const slug = getStringFromUnknown(params, 'slug');

    const [clientArticleData] = await makeClientArticleContextData(slug);

    const status = clientArticleData.article.id === '' ? 404 : 200;

    reply.code(status).header(...mainResponseHeader);

    return clientArticleData;
}
