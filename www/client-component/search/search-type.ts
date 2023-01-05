import {ArticleType} from '../../../server/article/article-type';

export type SearchArticleType = Pick<ArticleType, 'slug' | 'title'>;
export type KeyForArticleSearchType = ['slug', 'title'];
