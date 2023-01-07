/* global process, fetch, Response, Buffer */
import {createWriteStream} from 'node:fs';
import fileSystem from 'node:fs/promises';
import path from 'node:path';

import {getArticleLinkToViewClient} from '../www/client-component/article/article-helper';
import {generatePath, paginationQueryToURLSearchParameters} from '../www/util/url';
import {appRoute} from '../www/component/app/app-route';
import {appIconPngFileName, companyLogoPngFileName} from '../www/const';
import {getPathToImage} from '../www/util/path';
import {articlePreviewKeyList} from '../www/client-component/search/search-const';

import {articleCrud} from './article/article';
import {ArticleType} from './article/article-type';
import {uploadFileFolder} from './file/file-const';
import {apiUrl, serverPort} from './const';
import {rootArticleSlug} from './article/article-const';
import {makeDirectory} from './file/directory';

const staticSiteFolderName = 'static-site';
const mainUrl = `http://127.0.0.1:${serverPort}`;

const cwd = process.cwd();

type StaticPageType = Readonly<{
    html: string;
    slug: string;
}>;

type ImageUrlType = Readonly<{
    slug: string;
    url: string;
}>;

async function getTextFromUrl(fullUrl: string): Promise<string> {
    const response = await fetch(fullUrl);

    return response.text();
}

async function getStaticPage(slug: string): Promise<StaticPageType> {
    const fullPageUrl = mainUrl + getArticleLinkToViewClient(slug);
    const html = await getTextFromUrl(fullPageUrl);

    return {html, slug};
}

async function copyDistributionFolder(): Promise<void> {
    await makeDirectory(cwd, staticSiteFolderName);

    await fileSystem.cp(path.join(cwd, 'dist'), path.join(cwd, staticSiteFolderName), {recursive: true});
}

async function copyStaticFileFolder(): Promise<void> {
    await makeDirectory(cwd, staticSiteFolderName);

    await fileSystem.cp(path.join(cwd, uploadFileFolder), path.join(cwd, staticSiteFolderName, uploadFileFolder), {
        recursive: true,
    });
}

async function collectHtmlPages(): Promise<Array<StaticPageType>> {
    const articleList: Array<ArticleType> = await articleCrud.findMany({isActive: true, isInSiteMapXmlSeo: true});

    const slugList = articleList.map<string>((article: ArticleType): string => {
        return article.slug;
    });

    const pageList: Array<StaticPageType> = [];

    // eslint-disable-next-line no-loops/no-loops
    for (const slug of slugList) {
        pageList.push(await getStaticPage(slug));
    }

    return pageList;
}

async function makeHtmlPages(pageList: Array<StaticPageType>) {
    await makeDirectory(cwd, staticSiteFolderName, 'article');

    // write html files
    // eslint-disable-next-line no-loops/no-loops
    for (const page of pageList) {
        const htmlPath = generatePath<typeof appRoute.article.path>(appRoute.article.path, {slug: page.slug}) + '.html';

        await fileSystem.writeFile(path.join(cwd, staticSiteFolderName, htmlPath), page.html);
    }
}

async function makeServicePages() {
    await makeDirectory(cwd, staticSiteFolderName);

    const html404 = await getTextFromUrl(mainUrl + '/404');

    await fileSystem.writeFile(path.join(cwd, staticSiteFolderName, '404.html'), html404);
}

async function makeApiArticle(pageList: Array<StaticPageType>) {
    await makeDirectory(cwd, staticSiteFolderName, 'api');
    // eslint-disable-next-line sonarjs/no-duplicate-string
    await makeDirectory(cwd, staticSiteFolderName, 'api', 'client-article');

    // write html files
    // eslint-disable-next-line no-loops/no-loops
    for (const page of pageList) {
        const apiPath = generatePath<typeof apiUrl.clientArticleContextGet>(apiUrl.clientArticleContextGet, {
            slug: page.slug,
        });
        const data = await getTextFromUrl(mainUrl + apiPath);

        await fileSystem.writeFile(path.join(cwd, staticSiteFolderName, 'api', 'client-article', page.slug), data);
    }
}

async function makeApiArticleSearch() {
    await makeDirectory(cwd, staticSiteFolderName, 'api');
    await makeDirectory(cwd, staticSiteFolderName, 'api', 'client-article');

    const querySearchParameters = paginationQueryToURLSearchParameters<ArticleType>(
        {},
        {pageIndex: 0, pageSize: 0, sort: {title: 1}},
        articlePreviewKeyList
    );

    const apiPath = `${apiUrl.clientSearchArticle}?${querySearchParameters}`;

    const data = await getTextFromUrl(mainUrl + apiPath);

    await fileSystem.writeFile(path.join(cwd, staticSiteFolderName, 'api', 'client-article', 'pagination-pick'), data);
}

async function makeIcons() {
    await makeDirectory(cwd, staticSiteFolderName, 'api-image');

    const appIconSizeList: Array<number> = [
        // manifest.json, check in manifest.json
        36, 48, 72, 96, 144, 192, 512, 1024, 2048,
        // apple icon, check in index.html
        57, 60, 72, 76, 114, 120, 144, 152, 180,
    ];

    // eslint-disable-next-line no-loops/no-loops
    for (const iconSize of appIconSizeList) {
        const sizeFolderName = `${iconSize}x${iconSize}`;

        await makeDirectory(cwd, staticSiteFolderName, 'api-image', sizeFolderName);

        const iconImagePath = getPathToImage(appIconPngFileName, {height: iconSize, width: iconSize});
        const responseIcon: Response = await fetch(mainUrl + iconImagePath);
        const responseIconArrayBuffer = await responseIcon.arrayBuffer();
        const responseIconBuffer = Buffer.from(responseIconArrayBuffer);

        createWriteStream(path.join(cwd, staticSiteFolderName, iconImagePath)).write(responseIconBuffer);
    }
}

async function makeCompanyLogo() {
    const logoWidth = 600;
    const logoHeight = 60;

    await makeDirectory(cwd, staticSiteFolderName, 'api-image');
    await makeDirectory(cwd, staticSiteFolderName, 'api-image', `${logoWidth}x${logoHeight}`);

    const companyLogoPath = getPathToImage(companyLogoPngFileName, {height: logoHeight, width: logoWidth});
    const responseLogo: Response = await fetch(mainUrl + companyLogoPath);
    const responseLogoArrayBuffer = await responseLogo.arrayBuffer();
    const responseLogoBuffer = Buffer.from(responseLogoArrayBuffer);

    createWriteStream(path.join(cwd, staticSiteFolderName, companyLogoPath)).write(responseLogoBuffer);
}

async function makeImages(pageList: Array<StaticPageType>) {
    await makeDirectory(cwd, staticSiteFolderName, 'api-image');

    const imageUrlList: Array<ImageUrlType> = [];

    pageList.forEach((page: StaticPageType) => {
        const {html, slug} = page;
        const urlList: Array<string> = html.match(/\/api-image\/[^\s"]+/gi) || [];

        urlList.forEach((url: string) => {
            imageUrlList.push({slug, url});
        });
    });

    // eslint-disable-next-line no-loops/no-loops
    for (const imageUrl of imageUrlList) {
        const imageUrlChunks = imageUrl.url.split('/');
        const [ignoredSpace, ignoredImageApiString, imageSize, imageName] = imageUrlChunks;

        if (!imageName || !imageSize) {
            console.log('----------------------------------------');
            console.log(`[ERROR]: makeImages: wrong image url, slug / url:', ${imageUrl.slug}/${imageUrl.url}`);
            // eslint-disable-next-line no-continue
            continue;
        }

        await makeDirectory(cwd, staticSiteFolderName, 'api-image', imageSize);

        const imageResponse: Response = await fetch(mainUrl + imageUrl.url);

        if (!imageResponse.ok) {
            console.log('----------------------------------------');
            console.log(`[ERROR]: makeImages: can not get slug/url:', ${imageUrl.slug} / ${imageUrl.url}`);
            // eslint-disable-next-line no-continue
            continue;
        }

        const imageArrayBuffer = await imageResponse.arrayBuffer();
        const imageBuffer = Buffer.from(imageArrayBuffer);

        createWriteStream(path.join(cwd, staticSiteFolderName, imageUrl.url)).write(imageBuffer);

        // console.log(`[INFO]: makeImages: ${imageUrlList.indexOf(imageUrl) + 1}/${imageUrlList.length} : ${imageUrl.url}`);
        // console.log(imageName, imageSize);
    }
}

async function makeIndexHtml(pageList: Array<StaticPageType>) {
    const rootArticle = pageList.find((article: StaticPageType): boolean => {
        return article.slug === rootArticleSlug;
    });

    if (!rootArticle) {
        throw new Error(`[ERROR]: makeIndexHtml: can not find root article, slug: ${rootArticleSlug}`);
    }

    await fileSystem.writeFile(path.join(cwd, staticSiteFolderName, 'index.html'), rootArticle.html);
}

// eslint-disable-next-line max-statements
export async function makeStatic() {
    console.log('> [makeStatic]: makeStatic: begin');

    console.log('>> [makeStatic]: copyStaticFileFolder: begin');
    await copyStaticFileFolder();
    console.log('>> [makeStatic]: copyStaticFileFolder: end');

    console.log('>> [makeStatic]: collectHtmlPages: begin');
    const pageList: Array<StaticPageType> = await collectHtmlPages();

    console.log('>> [makeStatic]: collectHtmlPages: end');

    console.log('>> [makeStatic]: makeHtmlPages: begin');
    await makeHtmlPages(pageList);
    console.log('>> [makeStatic]: makeHtmlPages: end');

    console.log('>> [makeStatic]: makeServicePages: begin');
    await makeServicePages();
    console.log('>> [makeStatic]: makeServicePages: end');

    console.log('>> [makeStatic]: makeApiArticle: begin');
    await makeApiArticle(pageList);
    console.log('>> [makeStatic]: makeApiArticle: end');

    console.log('>> [makeStatic]: makeApiArticleSearch: begin');
    await makeApiArticleSearch();
    console.log('>> [makeStatic]: makeApiArticleSearch: end');

    console.log('>> [makeStatic]: makeIcons: begin');
    await makeIcons();
    console.log('>> [makeStatic]: makeIcons: end');

    console.log('>> [makeStatic]: makeCompanyLogo: begin');
    await makeCompanyLogo();
    console.log('>> [makeStatic]: makeCompanyLogo: end');

    console.log('>> [makeStatic]: makeImages: begin');
    await makeImages(pageList);
    console.log('>> [makeStatic]: makeImages: end');

    console.log('>> [makeStatic]: copyDistFolder: begin');
    await copyDistributionFolder();
    console.log('>> [makeStatic]: copyDistFolder: end');

    console.log('>> [makeStatic]: makeIndexHtml: begin');
    await makeIndexHtml(pageList);
    console.log('>> [makeStatic]: makeIndexHtml: end');

    console.log('> [makeStatic]: makeStatic: end');
}
