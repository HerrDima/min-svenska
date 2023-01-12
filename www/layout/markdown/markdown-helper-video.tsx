import {getPathToFile, getPathToImage} from '../../util/path';
import {appIconPngFileName} from '../../const';
import {Video} from '../video/video';

import markdownStyle from './markdown.scss';

// eslint-disable-next-line complexity
export function getVideoFromHtml(videoHtmlCode: string, title: string): JSX.Element {
    const [ignoredFullWidthString, widthAsString = ''] = videoHtmlCode.match(/width="(\d+)"/) || ['', '0'];
    const [ignoredFullHeightString, heightAsString = ''] = videoHtmlCode.match(/height="(\d+)"/) || ['', '0'];
    const [ignoredFullPosterString, posterAsString = ''] = videoHtmlCode.match(/poster="([^"]*?)"/) || [
        '',
        appIconPngFileName,
    ];
    const [ignoredFullDurationString, durationAsString = ''] = videoHtmlCode.match(/data-duration="([^"]*?)"/) || [
        '',
        '0',
    ];
    const [ignoredFullTitleString, titleAsString = ''] = videoHtmlCode.match(/title="([^"]*?)"/) || ['', 'THE TITLE'];
    const [ignoredFullSrcString, srcAsString = ''] = videoHtmlCode.match(/src="([^"]*?)"/) || ['', ''];

    return (
        <Video
            alt={(titleAsString || title).trim()}
            className={markdownStyle.markdown_video}
            duration={Number.parseFloat(durationAsString.trim())}
            fileName={srcAsString.trim()}
            getPathToFile={getPathToFile}
            getPathToImage={getPathToImage}
            height={Number.parseInt(heightAsString.trim(), 10)}
            image={{className: markdownStyle.markdown_picture, imgClassName: markdownStyle.markdown_image}}
            poster={posterAsString.trim()}
            title={(titleAsString || title).trim()}
            width={Number.parseInt(widthAsString.trim(), 10)}
        />
    );
}
