import {ArticleType, ArticleTypeEnum} from '../article/article-type';
import {rootArticleSlug} from '../article/article-const';
import {getClientArticleLinkWithDomain} from '../../www/page/cms/cms-article/cms-article-helper';

function getLastmodTagContent(article: ArticleType): string {
    const {updatedDate} = article;
    const [yyyymmdd] = updatedDate.split('T');

    return yyyymmdd;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
function getChangefreqTagContent(article: ArticleType): string {
    return 'weekly'; // always, hourly, daily, weekly, monthly, yearly, never
}

function getPriorityTagContent(article: ArticleType): string {
    const {slug, articleType} = article;

    if (slug === rootArticleSlug) {
        return '1.0';
    }

    if (articleType === ArticleTypeEnum.container) {
        return '0.8';
    }

    return '0.5';
}

function getSiteMapXmlItem(article: ArticleType): string {
    const {slug} = article;

    return [
        '<url>',
        `<loc>${getClientArticleLinkWithDomain(slug)}</loc>`,
        `<lastmod>${getLastmodTagContent(article)}</lastmod>`,
        `<changefreq>${getChangefreqTagContent(article)}</changefreq>`,
        `<priority>${getPriorityTagContent(article)}</priority>`,
        '</url>',
    ].join('');
}

export function getSiteMapXml(articleList: Array<ArticleType>): string {
    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<?xml-stylesheet type="text/xsl" href="/gss-0.9.xsl"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...articleList.map(getSiteMapXmlItem),
        '</urlset>',
    ].join('');
}
