import {ArticleType} from '../../../article/article-type';
import {getClientArticleLinkWithDomain, getPathToImage} from '../../../../www/page/cms/cms-article/cms-article-helper';
import {httpsSiteDomain, openGraphLocaleName} from '../../../../www/const';

import {SsrReplaceDataType} from './ssr-helper-type';

export function getMetaOpenGraphSsrReplaceData(article: ArticleType): SsrReplaceDataType {
    const {title, descriptionShort, titleImage, slug} = article;
    const selector = '<meta data-ssr="open-graph"/>';

    const value = [
        `<meta property="og:title" content="${title}"/>`,
        '<meta property="og:type" content="article"/>',
        `<meta property="og:image" content="${
            httpsSiteDomain + getPathToImage(titleImage.name, {height: 1024, width: 1024})
        }"/>`,
        `<meta property="og:description" content="${descriptionShort}"/>`,
        `<meta property="og:locale" content="${openGraphLocaleName}"/>`,
        `<meta property="og:url" content="${getClientArticleLinkWithDomain(slug)}"/>`,
    ].join('');

    return {selector, value};
}
