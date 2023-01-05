// eslint-disable-next-line max-len
import {NavigationContextType} from '../../../www/client-component/navigation/navigation-context/navigation-context-type';
import {navigationSsrFieldName} from '../../../www/client-component/navigation/navigation-const';
import {
    articleToArticlePreview,
    getSubDocumentListByParentIdFiltered,
    getIsActiveArticlePreview,
} from '../../article/article-util';
import {rootArticleId} from '../../article/article-const';
import {ArticlePreviewType} from '../../article/article-type';

export async function getNavigationContextData(): Promise<[NavigationContextType, string]> {
    const articleList = await getSubDocumentListByParentIdFiltered(rootArticleId);

    const navigationData: NavigationContextType = {
        itemList: articleList
            .map<ArticlePreviewType>(articleToArticlePreview)
            .filter<ArticlePreviewType>(getIsActiveArticlePreview),
    };

    const navigationDataHtmlString: string = [
        '<script>',
        `window.${navigationSsrFieldName} = '${encodeURIComponent(JSON.stringify(navigationData))}'`,
        '</script>',
    ].join('');

    return [navigationData, navigationDataHtmlString];
}
