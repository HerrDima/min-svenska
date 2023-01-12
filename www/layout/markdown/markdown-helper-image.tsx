import {getPathToFile, getPathToImage} from '../../util/path';
import {Image} from '../Image/image';

import markdownStyle from './markdown.scss';

// eslint-disable-next-line complexity
export function getImageFromHtml(imageHtmlCode: string, title: string): JSX.Element {
    const [ignoredFullWidthString, widthAsString = ''] = imageHtmlCode.match(/width="(\d+)"/) || ['', '0'];
    const [ignoredFullHeightString, heightAsString = ''] = imageHtmlCode.match(/height="(\d+)"/) || ['', '0'];
    const [ignoredFullSrcString, srcAsString = ''] = imageHtmlCode.match(/src="([^"]*?)"/) || ['', ''];
    const [ignoredFullAltString, altAsString = ''] = imageHtmlCode.match(/alt="([^"]*?)"/) || ['', ''];
    const [ignoredFullTitleString, titleAsString = ''] = imageHtmlCode.match(/title="([^"]*?)"/) || ['', ''];

    return (
        <Image
            alt={altAsString.trim()}
            className={markdownStyle.markdown_picture}
            fileName={srcAsString.trim()}
            getPathToFile={getPathToFile}
            getPathToImage={getPathToImage}
            height={Number.parseInt(heightAsString.trim(), 10)}
            imgClassName={markdownStyle.markdown_image}
            title={(titleAsString || title).trim()}
            width={Number.parseInt(widthAsString.trim(), 10)}
        />
    );
}
