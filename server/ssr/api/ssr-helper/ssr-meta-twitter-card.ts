import {ArticleType} from '../../../article/article-type';
import {httpsSiteDomain} from '../../../../www/const';
import {getPathToImage} from '../../../../www/util/path';
import {convertStringForHtml} from '../../../../www/util/string';

import {SsrReplaceDataType} from './ssr-helper-type';

export function getMetaTwitterCardSsrReplaceData(article: ArticleType): SsrReplaceDataType {
    const {title, descriptionShort, titleImage} = article;
    const selector = '<meta data-ssr="twitter-card"/>';

    const value = [
        '<meta name="twitter:card" content="summary_large_image"/>',
        `<meta name="twitter:title" content="${convertStringForHtml(title)}"/>`,
        `<meta name="twitter:description" content="${convertStringForHtml(descriptionShort)}"/>`,
        `<meta name="twitter:image" content="${
            httpsSiteDomain + getPathToImage(titleImage.name, {height: '-', width: 1024})
        }"/>`,
    ].join('');

    return {selector, value};
}
