/* global process */

import path from 'path';
import {promises as fileSystemPromises} from 'fs';

import {FastifyReply, FastifyRequest} from 'fastify';

import {ArticleType} from '../article/article-type';
import {articleCrud} from '../article/article';

import {uploadFileFolder} from './file-const';
import {specialFileNameList} from '../../www/const';
import {mainResponseHeader} from '../const';
import {getIsFileInArticle} from '../article/article-util';

const cwd = process.cwd();

type GetExtraFilesType = {
    actualSpecialFileList: Array<string>,
    expectedSpecialFileList: Array<string>,
    extraFileList: Array<string>,
}

export async function removeExtraStaticFiles(
    request: FastifyRequest,
    reply: FastifyReply
): Promise<GetExtraFilesType> {
    const articleList: Array<ArticleType> = await articleCrud.findMany({});

    const actualSpecialFileList: Array<string> = [];
    const fileNameList: Array<string> = await fileSystemPromises.readdir(path.join(cwd, uploadFileFolder));
    const extraFileList: Array<string> = [];

    fileNameList.forEach((fileName: string) => {
        if (specialFileNameList.includes(fileName)) {
            actualSpecialFileList.push(fileName);
            return;
        }

        const isFileInArticle = articleList.some((article: ArticleType): boolean => {
            return getIsFileInArticle(fileName, article);
        });

        if (isFileInArticle) {
            return;
        }

        fileSystemPromises.unlink(path.join(cwd, uploadFileFolder, fileName));
        extraFileList.push(fileName);
    });

    reply.code(200).header(...mainResponseHeader);

    return {
        actualSpecialFileList: actualSpecialFileList.sort(),
        expectedSpecialFileList: specialFileNameList.sort(),
        extraFileList: extraFileList.sort(),
    };
}