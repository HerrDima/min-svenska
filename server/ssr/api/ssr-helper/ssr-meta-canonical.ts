import {ArticleType} from '../../../article/article-type';

import {getClientArticleLinkWithDomain} from '../../../../www/page/cms/cms-article/cms-article-helper';

import {SsrReplaceDataType} from './ssr-helper-type';

export function getCanonicalLinkSsrReplaceData(article: ArticleType): SsrReplaceDataType {
    const {slug} = article;
    const selector = '<link data-ssr="canonical-link" rel="canonical" href=""/>';
    const href = getClientArticleLinkWithDomain(slug);

    return {selector, value: `<link rel="canonical" href="${href}"/>`};
}
