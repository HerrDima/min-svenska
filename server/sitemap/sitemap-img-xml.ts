import {ArticleType} from '../article/article-type';
import {getPathToImage} from '../../www/util/path';
import {httpsSiteDomain} from '../../www/const';
import {getClientArticleLinkWithDomain} from '../../www/client-component/article/article-helper';

export type ArticleImageDataType = {
    alt: string;
    src: string;
};

type ArticleXmlImgDataType = {
    imageList: Array<ArticleImageDataType>;
    url: string;
};

const findImageRegExpGlobal = /!\[([\S\s]*?)]\((\S+?)(?:\s+"([\S\s]+?)")?\)/g;

export function getImageListFromArticle(article: ArticleType): ArticleXmlImgDataType {
    const {titleImage, content, title, slug} = article;

    const imageList: Array<ArticleImageDataType> = [];

    if (titleImage.size > 0) {
        imageList.push({
            alt: title,
            src: httpsSiteDomain + getPathToImage(titleImage.name, {height: 1024, width: 1024}),
        });
    }

    content.replace(findImageRegExpGlobal, (matchedString: string, alt: string, src: string): string => {
        imageList.push({alt, src: httpsSiteDomain + src});

        return '';
    });

    return {
        imageList,
        url: getClientArticleLinkWithDomain(slug),
    };
}

function articleImageDataToString(articleImageData: ArticleImageDataType): string {
    const {alt, src} = articleImageData;

    return [
        '<image:image>',
        `<image:loc>${src}</image:loc>`,
        // -- `            <image:caption>${getLastmodTagContent(mongoDocument)}</image:caption>`,
        // -- `            <image:geo_location>${getLastmodTagContent(mongoDocument)}</image:geo_location>`,
        `<image:title>${alt}</image:title>`,
        // -- `            <image:license>${getLastmodTagContent(mongoDocument)}</image:license>`,
        '</image:image>',
    ].join('');
}

function articleXmlImgDataToString(articleXmlImg: ArticleXmlImgDataType): string {
    const {imageList, url} = articleXmlImg;

    if (imageList.length > 0) {
        return ['<url>', `<loc>${url}</loc>`, ...imageList.map(articleImageDataToString), '</url>'].join('');
    }

    return '';
}

export function getSiteMapImgXml(articleList: Array<ArticleType>): string {
    const imageDataList: Array<ArticleXmlImgDataType> = articleList.reduce<Array<ArticleXmlImgDataType>>(
        (result: Array<ArticleXmlImgDataType>, article: ArticleType): Array<ArticleXmlImgDataType> => {
            return [...result, getImageListFromArticle(article)];
        },
        []
    );

    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
        ...imageDataList.map(articleXmlImgDataToString),
        '</urlset>',
    ].join('');
}
