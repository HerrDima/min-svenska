import {ArticleFileType, ArticleFileTypeEnum} from '../../../server/article/article-type';
import {getPathToFile} from '../../util/path';
import {textToSlug} from '../../util/human';
import {NeverError} from '../../util/error';

// eslint-disable-next-line complexity
export function getFileMarkdownByFullInfo(
    fullFileInfo: ArticleFileType,
    additionalInfo: Record<'alt' | 'poster', string>
): string {
    const {duration, name, width, height, type, title} = fullFileInfo;
    const {alt, poster} = additionalInfo;
    const pathToFile = getPathToFile(name);

    const htmlTitle = title || 'THE TITLE';
    const htmlAlt = alt || title;
    const htmlPoster = poster || '';

    switch (type) {
        case ArticleFileTypeEnum.image: {
            return `![${htmlAlt}](${name} "${htmlTitle}" height="${height}" width="${width}")`;
        }
        case ArticleFileTypeEnum.audio: {
            return `<audio data-duration="${duration}" data-title="${title}" src="${name}"></audio>`;
        }
        case ArticleFileTypeEnum.video: {
            // eslint-disable-next-line max-len
            return `<video width="${width}" height="${height}" poster="${htmlPoster}" data-duration="${duration}" title="${title}" src="${name}"></video>`;
        }
        case ArticleFileTypeEnum.unknown: {
            return `<a href="${pathToFile}" target="_blank" download="${textToSlug(title)}">${name}</a>`;
        }
        default: {
            throw new NeverError(type);
        }
    }

    // eslint-disable-next-line no-unreachable
    return `<a href="${pathToFile}" target="_blank" download="${name}">${name}</a>`;
}
