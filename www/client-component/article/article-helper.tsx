import {generatePath} from '../../util/url';
import {appRoute} from '../../component/app/app-route';
import {rootArticleSlug} from '../../../server/article/article-const';

export function getArticleLinkToViewClient(slug: string): string {
    if (slug.trim() === rootArticleSlug) {
        return '/';
    }

    return generatePath<typeof appRoute.article.path>(appRoute.article.path, {slug});
}
