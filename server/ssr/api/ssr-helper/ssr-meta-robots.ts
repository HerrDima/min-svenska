import {ArticleType} from '../../../article/article-type';

import {SsrReplaceDataType} from './ssr-helper-type';

export function getMetaRobotsSsrReplaceData(article: ArticleType): SsrReplaceDataType {
    const {hasMetaRobotsNoFollowSeo, hasMetaRobotsNoIndexSeo} = article;
    const selector = '<meta data-ssr="meta-robots" name="robots"/>';

    if (hasMetaRobotsNoFollowSeo && hasMetaRobotsNoIndexSeo) {
        return {selector, value: '<meta name="robots" content="noindex, nofollow"/>'};
    }

    if (hasMetaRobotsNoFollowSeo) {
        return {selector, value: '<meta name="robots" content="nofollow"/>'};
    }

    if (hasMetaRobotsNoIndexSeo) {
        return {selector, value: '<meta name="robots" content="noindex"/>'};
    }

    return {selector, value: ''};
}
