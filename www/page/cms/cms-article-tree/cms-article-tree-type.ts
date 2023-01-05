import {ArticleType} from '../../../../server/article/article-type';

export type ArticleForTreeKeysType = 'articleType' | 'id' | 'isActive' | 'slug' | 'subDocumentIdList' | 'title';
export type ArticleForTreeType = Pick<ArticleType, ArticleForTreeKeysType>;
export type KeyForTreeType = ['articleType', 'id', 'isActive', 'slug', 'subDocumentIdList', 'title'];
