import {ArticleType} from '../../../article/article-type';
import {convertStringForHtml} from '../../../../www/util/string';

import {SsrReplaceDataType} from './ssr-helper-type';

export function getMetaDescriptionSsrReplaceData(article: ArticleType): SsrReplaceDataType {
    const {metaDescriptionSeo} = article;
    const selector = '<meta data-ssr="meta-description" name="description" content=""/>';

    if (metaDescriptionSeo) {
        return {selector, value: `<meta name="description" content="${convertStringForHtml(metaDescriptionSeo)}"/>`};
    }

    return {selector, value: ''};
}
