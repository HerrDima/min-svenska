import {ArticleType} from '../../../../server/article/article-type';

export const enum SortDirectionEnum {
    ascend = 'ascend',
    descend = 'descend',
}

export type ArticleForTableListKeysType =
    | 'articleType'
    | 'createdDate'
    | 'id'
    | 'isActive'
    | 'publishDate'
    | 'slug'
    | 'title'
    | 'titleImage'
    | 'updatedDate';
export type ArticleForTableListType = Pick<ArticleType, ArticleForTableListKeysType>;
export type KeyForTableListListType = [
    'articleType',
    'createdDate',
    'id',
    'isActive',
    'publishDate',
    'slug',
    'title',
    'titleImage',
    'updatedDate'
];
