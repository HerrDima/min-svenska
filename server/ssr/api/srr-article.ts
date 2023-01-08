import {ArticleContextType} from '../../../www/client-component/article/article-context/article-context-type';
import {makeDefaultArticle} from '../../article/article-helper';
import {
    getActiveArticleBySlugEnsure,
    getArticlePreviewBreadcrumbListById,
    getArticlePreviewListByIdListFiltered,
    getIsActiveArticlePreview,
    getSiblingPreviewListById,
} from '../../article/article-util';
import {ArticlePreviewType, ArticleType} from '../../article/article-type';
import {articleSsrFieldName} from '../../../www/client-component/article/article-const';

import {replaceSpecialSymbols} from './ssr-helper/ssr-symbol';

export async function makeClientArticleContextData(slug: string): Promise<[ArticleContextType, string]> {
    const article: ArticleType = await getActiveArticleBySlugEnsure(slug, makeDefaultArticle());

    const {subDocumentIdList, id} = article;

    const [childList, siblingList, breadcrumbs] = await Promise.all([
        getArticlePreviewListByIdListFiltered(subDocumentIdList),
        getSiblingPreviewListById(id),
        getArticlePreviewBreadcrumbListById(id),
    ]);

    const articleData: ArticleContextType = {
        article,
        breadcrumbs: breadcrumbs.filter<ArticlePreviewType>(getIsActiveArticlePreview),
        childList: childList.filter<ArticlePreviewType>(getIsActiveArticlePreview),
        isInProgressArticle: false,
        siblingList: siblingList.filter<ArticlePreviewType>(getIsActiveArticlePreview),
    };

    const articleDataHtmlString: string = [
        '<script>',
        `window.${articleSsrFieldName} = '${replaceSpecialSymbols(encodeURIComponent(JSON.stringify(articleData)))}'`,
        '</script>',
    ].join('');

    return [articleData, articleDataHtmlString];
}
