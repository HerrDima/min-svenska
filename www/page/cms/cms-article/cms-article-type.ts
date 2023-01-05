import {ArticleType} from '../../../../server/article/article-type';

import {CmsArticleModeEnum} from './cms-article-const';

export type ArticleForValidationKeysType = 'id' | 'slug' | 'subDocumentIdList' | 'title';
export type ArticleForValidationType = Pick<ArticleType, ArticleForValidationKeysType>;
export type KeyForValidationListType = ['id', 'slug', 'subDocumentIdList', 'title'];
export type MakeSlugValidatorArgumentType = {
    id: string;
    mode: CmsArticleModeEnum;
    savedArticleList: Array<ArticleForValidationType>;
};
