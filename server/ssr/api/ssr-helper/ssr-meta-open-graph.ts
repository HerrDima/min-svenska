import {ArticleType} from '../../../article/article-type';
import {getPathToImage} from '../../../../www/util/path';
import {httpsSiteDomain, openGraphLocaleName} from '../../../../www/const';
import {getClientArticleLinkWithDomain} from '../../../../www/client-component/article/article-helper';
import {convertStringForHtml} from '../../../../www/util/string';

import {SsrReplaceDataType} from './ssr-helper-type';

export function getMetaOpenGraphSsrReplaceData(article: ArticleType): SsrReplaceDataType {
    const {title, descriptionShort, titleImage, slug} = article;
    const selector = '<meta data-ssr="open-graph"/>';

    const value = [
        `<meta property="og:title" content="${convertStringForHtml(title)}"/>`,
        '<meta property="og:type" content="article"/>',
        `<meta property="og:image" content="${
            httpsSiteDomain + getPathToImage(titleImage.name, {height: '-', width: 1024})
        }"/>`,
        `<meta property="og:description" content="${convertStringForHtml(descriptionShort)}"/>`,
        `<meta property="og:locale" content="${openGraphLocaleName}"/>`,
        `<meta property="og:url" content="${getClientArticleLinkWithDomain(slug)}"/>`,
    ].join('');

    return {selector, value};
}
