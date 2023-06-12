import {ArticleType} from '../../../article/article-type';
import {convertStringForHtml} from '../../../../www/util/string';

import {SsrReplaceDataType} from './ssr-helper-type';

export function getTitleSsrReplaceData(article: ArticleType): SsrReplaceDataType {
    const {tagTitleSeo, title} = article;

    return {
        selector: '<title data-ssr="title"></title>',
        value: `<title>${convertStringForHtml(tagTitleSeo || title)}</title>`,
    };
}
