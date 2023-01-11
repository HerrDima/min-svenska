import {getPathToFile, getPathToImage} from '../../util/path';
import {appIconPngFileName} from '../../const';

import markdownStyle from './markdown.scss';

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
    const controls = 'controls';
    const originalWidth = Number.parseInt(widthAsString, 10);
    const originalHeight = Number.parseInt(heightAsString, 10);

    if (!originalWidth || !originalHeight || !srcAsString || !posterAsString || !durationAsString || !titleAsString) {
        return videoHtmlCode;
    }

    const poster = getPathToImage(posterAsString, {height: '-', width: originalWidth});

    const attributeList: Array<string> = [
        `controls="${controls}"`,
        `data-duration="${durationAsString}"`,
        `height="${originalHeight}"`,
        `width="${originalWidth}"`,
        `src="${getPathToFile(srcAsString)}"`,
        `poster="${poster}"`,
        `preload="${preload}"`,
        `title="${titleAsString}"`,
        `class="${markdownStyle.markdown_video}"`,
        `style="background-image: linear-gradient(#888a, #888a), url(${poster})"`,
    ];

    return `<video ${attributeList.join(' ')}></video>`;
}

export function markdownVideo(htmlCode: string): string {
    return htmlCode.replace(/<video[\S\s]+?<\/video>/gi, adaptiveVideo);
}
