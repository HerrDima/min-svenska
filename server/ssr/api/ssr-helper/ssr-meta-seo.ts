import {ArticleType} from '../../../article/article-type';

import {SsrReplaceDataType} from './ssr-helper-type';

export function getMetaSeoSsrReplaceData(article: ArticleType): SsrReplaceDataType {
    const {metaSeo} = article;
    const selector = '<meta data-ssr="meta-seo"/>';

    return {selector, value: metaSeo};
}
