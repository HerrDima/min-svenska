import {ArticleType} from '../../../article/article-type';
import {httpsSiteDomain} from '../../../../www/const';
import {getPathToImage} from '../../../../www/page/cms/cms-article/cms-article-helper';

import {SsrReplaceDataType} from './ssr-helper-type';

export function getMetaTwitterCardSsrReplaceData(article: ArticleType): SsrReplaceDataType {
    const {title, descriptionShort, titleImage} = article;
    const selector = '<meta data-ssr="twitter-card"/>';

    const value = [
        '<meta property="twitter:card" content="summary_large_image"/>',
        `<meta property="twitter:title" content="${title}"/>`,
        `<meta property="twitter:description" content="${descriptionShort}"/>`,
        `<meta property="twitter:image" content="${
            httpsSiteDomain + getPathToImage(titleImage.name, {height: 1024, width: 1024})
        }"/>`,
    ].join('');

    return {selector, value};
}
