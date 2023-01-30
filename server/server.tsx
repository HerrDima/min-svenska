/* global Buffer, process */

import path from 'node:path';

import {fastifyCors} from '@fastify/cors';
import {fastifyStatic} from '@fastify/static';
import {fastifyCompress} from '@fastify/compress';
import {fastifyMultipart} from '@fastify/multipart';
import {fastifySecureSession} from '@fastify/secure-session';
import {FastifyError} from '@fastify/error';
import fastifyConstructor, {FastifyRequest, FastifyReply} from 'fastify';

import {appRoute} from '../www/component/app/app-route';

import {getAutoAuthLogin, postAuthLogin} from './auth/auth-api';
import {getHtmlCallBack} from './ssr/ssr';
import {secretKey} from './key';
import {apiUrl, serverPort, siteCookieKey} from './const';
import {
    getArticleListPagination,
    getArticleListPaginationPick,
    postAdminArticleCreate,
    deleteAdminArticleDelete,
    postAdminArticleUpdate,
    getClientArticleContextData,
    getArticleClientListPaginationPick,
    getArticleClientUrlList,
} from './article/article-api';
import {getImage, uploadFile} from './file/file';
import {adminOnly} from './auth/auth-helper';
import {makeCacheFile} from './article/article-cache';
import {getPdf} from './pdf/pdf';
import {ArticleFileType, ArticleType} from './article/article-type';
import {makeStatic} from './make-static';
import {temporaryUploadFolder, uploadFileFolder, uploadFolder} from './file/file-const';
import {getHtmlCallBackRequest} from './ssr/ssr-helper';
import {rootArticleSlug} from './article/article-const';
import {GetExtraFilesType, removeExtraStaticFiles} from './file/extra-static-files';
import {makeDirectory, tryToRemoveDirectory} from './file/directory';
import {PaginationResultType} from './data-base/data-base-type';

const cwd = process.cwd();
// eslint-disable-next-line no-process-env
const isMakeStaticSite = process.env.MAKE_STATIC_SITE === 'TRUE';

// eslint-disable-next-line max-statements, unicorn/prefer-top-level-await
(async () => {
    await tryToRemoveDirectory(temporaryUploadFolder);
    await makeDirectory(temporaryUploadFolder);

    const fastify = fastifyConstructor({logger: false});

    // //////////////
    // Services
    // //////////////
    await fastify.register(fastifyCors);
    await fastify.register(fastifyCompress);
    await fastify.register(fastifyMultipart);

    // first of two fastifyStaticServer plugin
    await fastify.register(fastifyStatic, {
        prefix: `/${uploadFileFolder}/`,
        root: uploadFolder,
        setHeaders: (response: {setHeader: (header: string, value: string) => void}) => {
            console.info('[ERROR] using fastifyStaticServer: upload files');
            response.setHeader('x-warning-get-file', 'need-use-nginx');
        },
    });

    // second of two fastifyStaticServer plugin
    await fastify.register(fastifyStatic, {
        decorateReply: false, // the reply decorator has been added by the first plugin registration
        prefix: '/', // optional: default '/'
        root: path.join(cwd, 'dist'),
        setHeaders: (response: {setHeader: (header: string, value: string) => void}) => {
            console.info('[ERROR] using fastifyStaticServer: html, css...');
            response.setHeader('x-warning-get-file', 'need-use-nginx');
        },
    });

    // options for setCookie, see https://github.com/fastify/fastify-cookie
    await fastify.register(fastifySecureSession, {
        // the name of the session cookie, defaults to 'session'
        cookie: {
            httpOnly: true, // Use httpOnly for all production purposes
            path: '/',
        },
        cookieName: siteCookieKey,
        // adapt this to point to the directory where secret-key is located
        key: Buffer.from(secretKey, 'base64').subarray(0, 32),
    });

    // //////////////
    // API
    // //////////////
    fastify.post(apiUrl.login, postAuthLogin);
    fastify.get(apiUrl.getUser, getAutoAuthLogin);
    fastify.get(
        apiUrl.adminArticleListPagination,
        adminOnly<PaginationResultType<ArticleType>>(getArticleListPagination)
    );
    fastify.get(
        apiUrl.adminArticleListPaginationPick,
        adminOnly<PaginationResultType<Partial<ArticleType>>>(getArticleListPaginationPick)
    );
    fastify.post(apiUrl.adminFileUpload, adminOnly<ArticleFileType>(uploadFile));
    fastify.get(apiUrl.imageGet, getImage);
    fastify.get(apiUrl.clientArticleContextGet, getClientArticleContextData);
    fastify.get(apiUrl.articleClientUrlListGet, getArticleClientUrlList);
    fastify.get(apiUrl.clientSearchArticle, getArticleClientListPaginationPick);
    fastify.post(apiUrl.clientMakePdf, getPdf);
    fastify.get(apiUrl.removeExtraStaticFilesGet, adminOnly<GetExtraFilesType>(removeExtraStaticFiles));
    fastify.post(apiUrl.adminArticleCreate, adminOnly<ArticleType | Record<'message', string>>(postAdminArticleCreate));
    fastify.post(apiUrl.adminArticleUpdate, adminOnly<ArticleType | Record<'message', string>>(postAdminArticleUpdate));
    fastify.delete(apiUrl.adminArticleDelete, adminOnly<Record<'articleId', string>>(deleteAdminArticleDelete));

    // //////////////
    // Pages
    // //////////////
    // [client root]
    fastify.get(appRoute.root.path, async (request: FastifyRequest, reply: FastifyReply): Promise<string> => {
        const {html} = await getHtmlCallBack({slug: rootArticleSlug, url: appRoute.root.path});

        makeCacheFile('index', html).catch(console.error);

        // eslint-disable-next-line sonarjs/no-duplicate-string
        reply.header('X-file-generated', 'use-nginx');
        reply.type('text/html');

        return html;
    });
    // [client article]
    fastify.get(
        appRoute.article.path,
        async (request: FastifyRequest<{Params: {slug?: string}}>, reply: FastifyReply): Promise<string> => {
            const {article, html} = await getHtmlCallBack(getHtmlCallBackRequest(request));

            if (article.slug) {
                makeCacheFile(article.slug, html).catch(console.error);
            } else {
                reply.code(404);
            }

            if (article.hasMetaRobotsNoIndexSeo) {
                reply.header('X-Robots-Tag', 'noindex');
            }

            reply.header('X-file-generated', 'use-nginx');
            reply.type('text/html');

            return html;
        }
    );

    // [service login]
    fastify.get(appRoute.login.path, async (request: FastifyRequest, reply: FastifyReply): Promise<string> => {
        const {html} = await getHtmlCallBack({slug: '', url: appRoute.login.path});

        makeCacheFile('login', html).catch(console.error);

        reply.header('X-file-generated', 'use-nginx');
        reply.type('text/html');

        return html;
    });

    [
        appRoute.articleList.path,
        appRoute.articleTree.path,
        appRoute.articleCreate.path,
        appRoute.articleEdit.path,
    ].forEach((cmsPath: string): void => {
        // [cms articleList]
        fastify.get(cmsPath, async (request: FastifyRequest, reply: FastifyReply): Promise<string> => {
            const {html} = await getHtmlCallBack({slug: '', url: request.raw.url || ''});

            reply.type('text/html');

            return html;
        });
    });

    // //////////////
    // 4xx & 5xx
    // //////////////
    fastify.setErrorHandler(
        async (error: FastifyError, request: FastifyRequest, reply: FastifyReply): Promise<string> => {
            request.log.warn(error);

            const {html} = await getHtmlCallBack({slug: '', url: request.raw.url || ''});

            reply.code(500);
            reply.type('text/html');

            return html;
        }
    );

    fastify.setNotFoundHandler(async (request: FastifyRequest, reply: FastifyReply): Promise<string> => {
        request.log.warn(request);

        const {html} = await getHtmlCallBack({slug: '', url: request.raw.url || ''});

        reply.code(404);
        reply.type('text/html');

        return html;
    });

    fastify.listen({host: '0.0.0.0', port: serverPort}, async (error: Error | null): Promise<void> => {
        if (error) {
            console.log(error);
            throw error;
        }

        console.info(`> Server started port: ${serverPort}`);

        if (isMakeStaticSite) {
            await makeStatic();
            await fastify.close();
            console.info(`> Server on port: ${serverPort} has been closed`);
        }
    });
})();
