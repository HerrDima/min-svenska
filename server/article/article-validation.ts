import Ajv, {JSONSchemaType, ValidateFunction} from 'ajv';

import {PaginationResultType} from '../data-base/data-base-type';

import {
    ArticleFileType,
    ArticleFileTypeEnum,
    ArticlePreviewType,
    ArticleType,
    ArticleTypeEnum,
    SubDocumentListViewTypeEnum,
} from './article-type';

export function makeArticleFileSchema(): JSONSchemaType<ArticleFileType> {
    const articleFileProperties = {
        duration: {type: 'number'}, // in seconds
        height: {type: 'number'}, // original height
        name: {type: 'string'}, // name of file
        size: {type: 'number'}, // size of file in bytes
        title: {type: 'string'},
        type: {'enum': Object.values(ArticleFileTypeEnum), type: 'string'}, // audio, image, etc.
        width: {type: 'number'}, // original width
    } as const;

    const requiredFieldList: Array<keyof ArticleFileType> = [
        'duration',
        'height',
        'name',
        'size',
        'title',
        'type',
        'width',
    ];

    const articleFileSchema: JSONSchemaType<ArticleFileType> = {
        additionalProperties: false,
        properties: articleFileProperties,
        required: requiredFieldList,
        type: 'object',
    };

    return articleFileSchema;
}

export function makeArticleSchema(): JSONSchemaType<ArticleType> {
    const articleSchemaProperties = {
        // eslint-disable-next-line id-match
        _id: {type: 'string'},
        articleType: {'enum': Object.values(ArticleTypeEnum), type: 'string'},
        content: {type: 'string'},
        createdDate: {type: 'string'},
        description: {type: 'string'},
        descriptionShort: {type: 'string'},
        fileList: {items: makeArticleFileSchema(), type: 'array'},
        hasMetaRobotsNoFollowSeo: {type: 'boolean'},
        hasMetaRobotsNoIndexSeo: {type: 'boolean'},
        id: {type: 'string'},
        isActive: {type: 'boolean'}, // actually temporary "removed"
        isInSiteMapXmlSeo: {type: 'boolean'}, // has sitemap.xml link to article or not
        metaDescriptionSeo: {type: 'string'}, // tag <meta name="description" content="....." />
        metaKeyWordsSeo: {type: 'string'}, // tag <meta name="keywords" content="....." />
        metaSeo: {type: 'string'}, // actually any html code
        publishDate: {type: 'string'},
        slug: {type: 'string'},
        staffArtistList: {items: {type: 'string'}, type: 'array'},
        staffAuthorList: {items: {type: 'string'}, type: 'array'},
        staffCompositorList: {items: {type: 'string'}, type: 'array'},
        staffDirectorList: {items: {type: 'string'}, type: 'array'},
        staffIllustratorList: {items: {type: 'string'}, type: 'array'},
        staffReaderList: {items: {type: 'string'}, type: 'array'},
        subDocumentIdList: {items: {type: 'string'}, type: 'array'},
        subDocumentListViewType: {'enum': Object.values(SubDocumentListViewTypeEnum), type: 'string'},
        tagList: {items: {type: 'string'}, type: 'array'},
        tagTitleSeo: {type: 'string'}, // tag <title>....</title>
        title: {type: 'string'},
        titleImage: makeArticleFileSchema(),
        updatedDate: {type: 'string'},
    } as const;

    const requiredFieldList: Array<keyof ArticleType> = [
        'articleType',
        'content',
        'createdDate',
        'description',
        'descriptionShort',
        'fileList',
        'hasMetaRobotsNoFollowSeo',
        'hasMetaRobotsNoIndexSeo',
        'id',
        'isActive',
        'isInSiteMapXmlSeo',
        'metaDescriptionSeo',
        'metaKeyWordsSeo',
        'metaSeo',
        'publishDate',
        'slug',
        'staffArtistList',
        'staffAuthorList',
        'staffCompositorList',
        'staffDirectorList',
        'staffIllustratorList',
        'staffReaderList',
        'subDocumentIdList',
        'subDocumentListViewType',
        'tagList',
        'tagTitleSeo',
        'title',
        'titleImage',
        'updatedDate',
    ];

    const articleSchema: JSONSchemaType<ArticleType> = {
        additionalProperties: false,
        properties: articleSchemaProperties,
        required: requiredFieldList,
        type: 'object',
    };

    return articleSchema;
}

export function makeArticleSchemaPick<KeyOfArticle extends keyof ArticleType>(
    fieldList: Array<KeyOfArticle>
): JSONSchemaType<Pick<ArticleType, KeyOfArticle>> {
    const articlePickedSchema: JSONSchemaType<Pick<ArticleType, KeyOfArticle>> = makeArticleSchema();
    const {properties} = articlePickedSchema;

    const pickedProperties: Record<string, unknown> = fieldList.reduce<Record<string, unknown>>(
        (accumulator: Record<string, unknown>, propertyName: KeyOfArticle) => {
            return {...accumulator, [propertyName]: properties[propertyName]};
        },
        {}
    );

    const articleSchemaPick: JSONSchemaType<Pick<ArticleType, KeyOfArticle>> = Object.assign<
        JSONSchemaType<Pick<ArticleType, KeyOfArticle>>,
        {properties: Record<string, unknown>; required: Array<KeyOfArticle>}
    >(articlePickedSchema, {
        properties: pickedProperties,
        required: fieldList,
    });

    return articleSchemaPick;
}

export function makeArticlePaginationSchema(): JSONSchemaType<PaginationResultType<ArticleType>> {
    const articlePaginationSchema: JSONSchemaType<PaginationResultType<ArticleType>> = {
        additionalProperties: false,
        properties: {
            list: {items: makeArticleSchema(), type: 'array'},
            pageIndex: {type: 'number'},
            pageSize: {type: 'number'},
            sort: {type: 'object'},
            totalItemCount: {type: 'number'},
            totalPageCount: {type: 'number'},
        },
        required: ['list', 'pageIndex', 'pageSize', 'sort', 'totalItemCount', 'totalPageCount'],
        type: 'object',
    };

    return articlePaginationSchema;
}

export function makeArticlePaginationSchemaPick<Keys extends keyof ArticleType>(
    fieldList: Array<Keys>
): JSONSchemaType<PaginationResultType<Pick<ArticleType, Keys>>> {
    const articlePaginationSchemaPick: JSONSchemaType<PaginationResultType<Pick<ArticleType, Keys>>> = {
        additionalProperties: false,
        properties: {
            list: {items: makeArticleSchemaPick<Keys>(fieldList), type: 'array'},
            pageIndex: {type: 'number'},
            pageSize: {type: 'number'},
            sort: {type: 'object'},
            totalItemCount: {type: 'number'},
            totalPageCount: {type: 'number'},
        },
        required: ['list', 'pageIndex', 'pageSize', 'sort', 'totalItemCount', 'totalPageCount'],
        type: 'object',
    };

    return articlePaginationSchemaPick;
}

export function validateArticle(data: unknown): [boolean, ValidateFunction<ArticleType>] {
    const ajv = new Ajv();
    const modelJsonSchemaValidate = ajv.compile<ArticleType>(makeArticleSchema());

    const isValidArticle = modelJsonSchemaValidate(data);

    return [isValidArticle, modelJsonSchemaValidate];
}

export function makeArticlePreviewSchema(): JSONSchemaType<ArticlePreviewType> {
    const requiredFieldList: Array<keyof ArticlePreviewType> = [
        'articleType',
        'fileList',
        'isActive',
        'slug',
        'title',
        'titleImage',
    ];

    const articlePreviewSchema: JSONSchemaType<ArticlePreviewType> =
        makeArticleSchemaPick<keyof ArticlePreviewType>(requiredFieldList);

    return articlePreviewSchema;
}
