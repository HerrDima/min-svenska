import {ScreenWidthNameEnum, getScreenName} from 'react-system-hook';

import {getPathToFile, getPathToImage} from '../../util/path';

import markdownStyle from './markdown.scss';

// max website width is 1200
const screenWidthList: Array<number> = [1200, 1024, 912, 820, 768, 540, 425, 390, 375, 320, 280, 128];
const screenAspectRation: Array<number> = [1, 2, 3];

type SourceArgumentTagType = {
    fileName: string;
    mediaWidth: number;
    originalHeight: number;
    originalWidth: number;
};

function makeSourceTag(data: SourceArgumentTagType): string {
    const {mediaWidth, originalWidth, originalHeight, fileName} = data;
    const imageAspect = originalWidth / originalHeight;
    const mediaName = getScreenName(mediaWidth);

    const horizontalPaddingMap: Record<ScreenWidthNameEnum, number> = {
        [ScreenWidthNameEnum.mobile]: 16, // padding 8 + 8
        [ScreenWidthNameEnum.tablet]: 24, // padding 12 + 12
        [ScreenWidthNameEnum.desktop]: 32, // padding 16 + 16
    };

    const imageWidth = mediaWidth - horizontalPaddingMap[mediaName];
    const imageHeight = Math.round(imageWidth / imageAspect);

    // prevent extra large image source
    if (imageWidth > originalWidth) {
        return '';
    }

    const styleMap: Record<ScreenWidthNameEnum, string> = {
        [ScreenWidthNameEnum.mobile]: 'display: block; height: auto; width: 100%;',
        [ScreenWidthNameEnum.tablet]: `display: block; height: auto; max-width: 100%; width: ${imageWidth}px;`,
        [ScreenWidthNameEnum.desktop]: `display: block; height: auto; max-width: 100%; width: ${imageWidth}px;`,
    };

    const media = `(min-width: ${mediaWidth}px)`;
    const style = styleMap[mediaName];

    const srcSet: Array<string> = screenAspectRation.map<string>((multiple: number): string => {
        const imageSrc = getPathToImage(fileName, {height: imageHeight * multiple, width: imageWidth * multiple});

        return imageWidth * multiple <= originalWidth ? `${imageSrc} ${multiple}x` : '';
    });

    // eslint-disable-next-line max-len
    return [
        '<source',
        `style="${style}"`,
        `media="${media}"`,
        `width="${String(imageWidth)}"`,
        `height="${String(imageHeight)}"`,
        `srcset="${srcSet.filter(Boolean).join(', ')}"`,
        '/>',
    ].join(' ');
}

// eslint-disable-next-line complexity
function adaptiveImage(imageHtmlCode: string): string {
    const [ignoredFullWidthString, widthAsString = ''] = imageHtmlCode.match(/width="(\d+)"/) || ['', '0'];
    const [ignoredFullHeightString, heightAsString = ''] = imageHtmlCode.match(/height="(\d+)"/) || ['', '0'];
    const [ignoredFullSrcString, srcAsString = ''] = imageHtmlCode.match(/src="(\S+)"/) || ['', ''];
    const originalWidth = Number.parseInt(widthAsString, 10);
    const originalHeight = Number.parseInt(heightAsString, 10);

    if (!originalWidth || !originalHeight || !srcAsString) {
        return imageHtmlCode;
    }

    const sourceTagList: Array<string> = screenWidthList.map<string>((mediaWidth: number): string => {
        return makeSourceTag({
            fileName: srcAsString,
            mediaWidth,
            originalHeight,
            originalWidth,
        });
    });

    const imageWithClassName = imageHtmlCode
        .replace(/<img /, `<img class="${markdownStyle.markdown_image}" `)
        .replace(/src="(\S+)"/, `src="${getPathToFile(srcAsString)}"`);

    const sourceTagListJoined = sourceTagList.join('');

    return `<picture class="${markdownStyle.markdown_picture}">${sourceTagListJoined}${imageWithClassName}</picture>`;
}

export function markdownImage(htmlCode: string): string {
    return htmlCode.replace(/<img[\S\s]+?\/>/gi, adaptiveImage);
}
