import {getPathToFile, getPathToImage} from '../../util/path';
import {appIconPngFileName} from '../../const';

// eslint-disable-next-line complexity
function adaptiveVideo(videoHtmlCode: string): string {
    const [ignoredFullWidthString, widthAsString = ''] = videoHtmlCode.match(/width="(\d+)"/) || ['', '0'];
    const [ignoredFullHeightString, heightAsString = ''] = videoHtmlCode.match(/height="(\d+)"/) || ['', '0'];
    const [ignoredFullPosterString, posterAsString = ''] = videoHtmlCode.match(/poster="(\S+)"/) || [
        '',
        appIconPngFileName,
    ];
    const [ignoredFullDurationString, durationAsString = ''] = videoHtmlCode.match(/data-duration="(\S+)"/) || [
        '',
        '0',
    ];
    const [ignoredFullTitleString, titleAsString = ''] = videoHtmlCode.match(/title="(\S+)"/) || ['', 'THE TITLE'];
    const [ignoredFullSrcString, srcAsString = ''] = videoHtmlCode.match(/src="(\S+)"/) || ['', ''];
    const preload = 'none';
    const type = 'video/mp4';
    const controls = 'controls';
    const originalWidth = Number.parseInt(widthAsString, 10);
    const originalHeight = Number.parseInt(heightAsString, 10);

    if (!originalWidth || !originalHeight || !srcAsString || !posterAsString || !durationAsString || !titleAsString) {
        return videoHtmlCode;
    }

    const attributeList: Array<string> = [
        `controls="${controls}"`,
        `data-duration="${durationAsString}"`,
        `height="${originalHeight}"`,
        `width="${originalWidth}"`,
        `src="${getPathToFile(srcAsString)}"`,
        `poster="${getPathToImage(posterAsString, {height: '-', width: originalWidth})}"`,
        `preload="${preload}"`,
        `type="${type}"`,
    ];

    return `<video ${attributeList.join(' ')}></video>`;
}

export function markdownVideo(htmlCode: string): string {
    return htmlCode.replace(/<video[\S\s]+?<\/video>/gi, adaptiveVideo);
}
