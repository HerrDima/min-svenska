import {JSONSchemaType} from 'ajv';

import {makeDefaultArticle} from '../../../../server/article/article-helper';
import {makeArticlePreviewSchema, makeArticleSchema} from '../../../../server/article/article-validation';

import {ArticleContextType} from './article-context-type';

export const defaultArticleContextData: ArticleContextType = {
    article: makeDefaultArticle(),
    breadcrumbs: [],
    childList: [],
    isInProgressArticle: false,
    siblingList: [],
};

export const articleContextDataSchema: JSONSchemaType<ArticleContextType> = {
    additionalProperties: false,
    properties: {
        article: makeArticleSchema(),
        breadcrumbs: {
            items: makeArticlePreviewSchema(),
            type: 'array',
        },
        childList: {
            items: makeArticlePreviewSchema(),
            type: 'array',
        },
        isInProgressArticle: {
            type: 'boolean',
        },
        setSlug: {
            nullable: true,
            type: 'object',
        },
        siblingList: {
            items: makeArticlePreviewSchema(),
            type: 'array',
        },
    },
    required: ['article', 'breadcrumbs', 'childList', 'isInProgressArticle', 'siblingList'],
    type: 'object',
};
