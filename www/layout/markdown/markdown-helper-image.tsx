import {getPathToFile, getPathToImage} from '../../util/path';
import {Image} from '../Image/image';

import markdownStyle from './markdown.scss';
import {StringToJsxRawDataType} from './markdown-helper';
import {MarkdownItemCounter} from './markdown-item-counter';

// eslint-disable-next-line complexity
export function getImageFromHtml(
    rawData: StringToJsxRawDataType,
    markdownItemCounter: MarkdownItemCounter
): JSX.Element {
    const {htmlString, articleTitle} = rawData;

    const [ignoredFullWidthString, widthAsString = ''] = htmlString.match(/width="(\d+)"/) || ['', '0'];
    const [ignoredFullHeightString, heightAsString = ''] = htmlString.match(/height="(\d+)"/) || ['', '0'];
    const [ignoredFullSrcString, srcAsString = ''] = htmlString.match(/src="([^"]*?)"/) || ['', ''];
    const [ignoredFullAltString, altAsString = ''] = htmlString.match(/alt="([^"]*?)"/) || ['', ''];
    const [ignoredFullTitleString, titleAsString = ''] = htmlString.match(/title="([^"]*?)"/) || ['', ''];

    return (
        <Image
            alt={altAsString.trim()}
            className={markdownStyle.markdown_picture}
            fileName={srcAsString.trim()}
            getPathToFile={getPathToFile}
            getPathToImage={getPathToImage}
            height={Number.parseInt(heightAsString.trim(), 10)}
            imgClassName={markdownStyle.markdown_image}
            loading={markdownItemCounter.getLoadingImageType()}
            title={(titleAsString || articleTitle).trim()}
            width={Number.parseInt(widthAsString.trim(), 10)}
        />
    );
}
