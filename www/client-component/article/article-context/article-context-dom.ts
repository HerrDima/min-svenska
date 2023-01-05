/* global document */

import {ArticleContextType} from './article-context-type';

export function articleContextDom(articleData: ArticleContextType) {
    if (typeof document === 'undefined') {
        return;
    }

    const {article} = articleData;
    const {title, tagTitleSeo} = article;

    document.title = tagTitleSeo || title;
}
