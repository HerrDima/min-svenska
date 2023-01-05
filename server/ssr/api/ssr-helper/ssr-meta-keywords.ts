import {ArticleType} from '../../../article/article-type';

import {SsrReplaceDataType} from './ssr-helper-type';

export function getMetaKeywordsSsrReplaceData(article: ArticleType): SsrReplaceDataType {
    const {metaKeyWordsSeo} = article;
    const selector = '<meta data-ssr="meta-keywords" name="keywords" content=""/>';

    if (metaKeyWordsSeo) {
        return {selector, value: `<meta name="keywords" content="${metaKeyWordsSeo}"/>`};
    }

    return {selector, value: ''};
}
