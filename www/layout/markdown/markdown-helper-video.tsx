import {getPathToFile, getPathToImage} from '../../util/path';
import {appIconPngFileName} from '../../const';
import {Video} from '../video/video';

import markdownStyle from './markdown.scss';
import {StringToJsxRawDataType} from './markdown-helper';
import {MarkdownItemCounter} from './markdown-item-counter';

// eslint-disable-next-line complexity
export function getVideoFromHtml(
    rawData: StringToJsxRawDataType,
    markdownItemCounter: MarkdownItemCounter
): JSX.Element {
    const {htmlString, articleTitle} = rawData;
    const [ignoredFullWidthString, widthAsString = ''] = htmlString.match(/width="(\d+)"/) || ['', '0'];
    const [ignoredFullHeightString, heightAsString = ''] = htmlString.match(/height="(\d+)"/) || ['', '0'];
    const [ignoredFullPosterString, posterAsString = ''] = htmlString.match(/poster="([^"]*?)"/) || [
        '',
        appIconPngFileName,
    ];
    const [ignoredFullDurationString, durationAsString = ''] = htmlString.match(/data-duration="([^"]*?)"/) || [
        '',
        '0',
    ];
    const [ignoredFullTitleString, titleAsString = ''] = htmlString.match(/title="([^"]*?)"/) || ['', 'THE TITLE'];
    const [ignoredFullSrcString, srcAsString = ''] = htmlString.match(/src="([^"]*?)"/) || ['', ''];

    return (
        <Video
            alt={(titleAsString || articleTitle).trim()}
            className={markdownStyle.markdown_video}
            duration={Number.parseFloat(durationAsString.trim())}
            fileName={srcAsString.trim()}
            getPathToFile={getPathToFile}
            getPathToImage={getPathToImage}
            height={Number.parseInt(heightAsString.trim(), 10)}
            image={{className: markdownStyle.markdown_picture, imgClassName: markdownStyle.markdown_image}}
            poster={posterAsString.trim()}
            posterLoading={markdownItemCounter.getLoadingImageType()}
            title={(titleAsString || articleTitle).trim()}
            width={Number.parseInt(widthAsString.trim(), 10)}
        />
    );
}
