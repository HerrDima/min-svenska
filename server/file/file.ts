import {constants as fileSystemConstants, ReadStream, Stats, createWriteStream, createReadStream} from 'node:fs';
import fileSystem from 'node:fs/promises';
import path from 'node:path';

import sharp from 'sharp';
import {FastifyReply, FastifyRequest} from 'fastify';
import {MultipartFile} from '@fastify/multipart';
import webpConverter from 'webp-converter';

import {PromiseResolveType} from '../../www/util/promise';
import {getRandomString} from '../../www/util/string';
import {getStringFromUnknown} from '../../www/util/type';
import {getFileExtension, getIsAudio, getIsImage, getIsVideo} from '../../www/page/cms/cms-article/cms-article-helper';
import {ArticleFileType, ArticleFileTypeEnum} from '../article/article-type';
import {fileSizeLimit} from '../../www/page/cms/cms-article/cms-article-const';

import {temporaryUploadFolder, uploadFolder} from './file-const';
import {makeAudioFile} from './file-audio';

// eslint-disable-next-line max-statements, complexity
export async function uploadFile(request: FastifyRequest): Promise<ArticleFileType> {
    const fileData: MultipartFile | void = await request.file({
        limits: {fileSize: fileSizeLimit, files: 1},
    });

    if (!fileData) {
        throw new Error('[uploadFile]: Can not get file');
    }

    const {filename, file} = fileData;

    const rawFileExtension = getFileExtension(filename);
    const hasExtension = rawFileExtension !== filename;
    const fileExtension = hasExtension ? `.${rawFileExtension}` : '';

    const uniqueFileName = `${getRandomString()}${fileExtension}`;
    const fullFilePath = path.join(uploadFolder, uniqueFileName);

    await new Promise((resolve: PromiseResolveType<void>, reject: PromiseResolveType<Error>) => {
        const writeStream = createWriteStream(fullFilePath);

        file.pipe(writeStream).on('close', resolve).on('error', reject);
    });

    const stats: Stats = await fileSystem.stat(fullFilePath);

    if (stats.size >= fileSizeLimit) {
        // remove original file
        await fileSystem.unlink(fullFilePath);

        throw new Error('File too big, limit 75MB');
    }

    const uploadResponse: ArticleFileType = {
        duration: 0,
        height: 0,
        name: uniqueFileName,
        size: stats.size,
        title: '',
        type: ArticleFileTypeEnum.unknown,
        width: 0,
    };

    if (getIsImage(uniqueFileName)) {
        const webPFileName = `${getRandomString()}.webp`;
        const webPFilePath = path.join(uploadFolder, webPFileName);

        await webpConverter.cwebp(fullFilePath, webPFilePath, '-q 80 -m 6', '-v');

        const webPStats: Stats = await fileSystem.stat(webPFilePath);

        // remove original file
        await fileSystem.unlink(fullFilePath);

        const uploadResponseWebP: ArticleFileType = {
            duration: 0,
            height: 0,
            name: webPFileName,
            size: webPStats.size,
            title: '',
            type: ArticleFileTypeEnum.image,
            width: 0,
        };

        return uploadResponseWebP;
    }

    if (getIsAudio(uniqueFileName)) {
        const mp3FileName = await makeAudioFile(fullFilePath);
        const mp3FilePath = path.join(uploadFolder, mp3FileName);
        const mp3Stats: Stats = await fileSystem.stat(mp3FilePath);

        // remove original file
        await fileSystem.unlink(fullFilePath);

        const uploadResponseAudio: ArticleFileType = {
            duration: 0,
            height: 0,
            name: mp3FileName,
            size: mp3Stats.size,
            title: '',
            type: ArticleFileTypeEnum.audio,
            width: 0,
        };

        return uploadResponseAudio;
    }

    if (getIsVideo(uniqueFileName)) {
        const uploadResponseVideo: ArticleFileType = {
            duration: 0,
            height: 0,
            name: uniqueFileName,
            size: uploadResponse.size,
            title: '',
            type: ArticleFileTypeEnum.video,
            width: 0,
        };

        return uploadResponseVideo;
    }

    return uploadResponse;
}

function getFile(request: FastifyRequest<{Params: {fileName?: string}}>, reply: FastifyReply): ReadStream {
    const {params} = request;
    const fileName = getStringFromUnknown(params, 'fileName');

    reply.header('x-warning-get-file', 'need-use-nginx');

    return createReadStream(path.join(uploadFolder, fileName));
}

export async function getImage(
    request: FastifyRequest<{Params: {fileName?: string; size?: string}}>,
    reply: FastifyReply
): Promise<ReadStream> {
    const {params} = request;
    const fileName = getStringFromUnknown(params, 'fileName');
    const size = getStringFromUnknown(params, 'size');

    reply.header('x-warning-get-file', 'need-use-nginx');

    const rawFileExtension = getFileExtension(fileName);
    const fullFilePath = path.join(uploadFolder, fileName);

    const newFileName: string = 'remove-me-' + getRandomString();
    const temporaryFilePath: string = path.join(temporaryUploadFolder, `${newFileName}.${rawFileExtension}`);

    const [rawImageWidth, rawImageHeight] = size.split('x');
    // https://developers.google.com/speed/webp/docs/cwebp, 0 -> means auto
    const imageWidth: number = Number.parseInt(rawImageWidth, 10) || 0;
    const imageHeight: number = Number.parseInt(rawImageHeight, 10) || 0;

    await fileSystem.access(fullFilePath, fileSystemConstants.R_OK);

    if (rawFileExtension === 'webp') {
        await webpConverter.cwebp(
            fullFilePath,
            temporaryFilePath,
            `-q 80 -m 6 -resize ${imageWidth.toString(10)} ${imageHeight.toString(10)}`,
            '-v'
        );

        return createReadStream(temporaryFilePath);
    }

    if (rawFileExtension === 'png') {
        await sharp(fullFilePath).resize(imageWidth, imageHeight).toFile(temporaryFilePath);

        return createReadStream(temporaryFilePath);
    }

    return getFile(request, reply);
}
