import {Fragment} from 'react';

import {getAudioFromHtml} from './markdown-helper-audio';
import {getImageFromHtml} from './markdown-helper-image';
import {getVideoFromHtml} from './markdown-helper-video';
import {getIsEmptyHtml, StringToJsxRawDataType} from './markdown-helper';
import {MarkdownItemCounter} from './markdown-item-counter';

const markdownVideoRegExp = /<video [^>]+\/>/gi;
const markdownAudioRegExp = /<audio [^>]+\/>/gi;
const markdownImageRegExp = /<img [^>]+\/>/gi;
const markdownReplaceRegExp = /<video [^>]+\/>|<audio [^>]+\/>|<img [^>]+\/>/gi;

function getIsVideoHtmlCode(htmlString: string): boolean {
    return htmlString.search(markdownVideoRegExp) >= 0;
}

function getIsAudioHtmlCode(htmlString: string): boolean {
    return htmlString.search(markdownAudioRegExp) >= 0;
}

function getIsImageHtmlCode(htmlString: string): boolean {
    return htmlString.search(markdownImageRegExp) >= 0;
}

function htmlStringToJsx(rawData: StringToJsxRawDataType, markdownItemCounter: MarkdownItemCounter): JSX.Element {
    const {htmlString} = rawData;

    if (getIsVideoHtmlCode(htmlString)) {
        // add image and video cause every video has image as poster
        markdownItemCounter.increaseImage();
        markdownItemCounter.increaseVideo();

        return getVideoFromHtml(rawData, markdownItemCounter);
    }

    if (getIsAudioHtmlCode(htmlString)) {
        markdownItemCounter.increaseAudio();

        return getAudioFromHtml(rawData);
    }

    if (getIsImageHtmlCode(htmlString)) {
        markdownItemCounter.increaseImage();

        return getImageFromHtml(rawData, markdownItemCounter);
    }

    console.error('[htmlStringToJsx] Can not parse html string');
    console.log('||--' + htmlString + '--||');
    // eslint-disable-next-line react/no-danger, id-match
    return <div dangerouslySetInnerHTML={{__html: htmlString}} />;
}

type PropsType = {
    articleTitle: string;
    htmlCode: string;
};

export function MarkdownHtmlToReact(props: PropsType): JSX.Element {
    const {htmlCode, articleTitle} = props;
    const splitTextList: Array<string> = htmlCode.split(markdownReplaceRegExp);
    const replaceList: Array<string> = htmlCode.match(markdownReplaceRegExp) || [];
    const markdownItemCounter = new MarkdownItemCounter();

    const jsxList: Array<JSX.Element> = splitTextList.map((htmlChunk: string, index: number): JSX.Element => {
        const key = index.toString(16);
        const replacePart = replaceList[index];

        return (
            <Fragment key={key}>
                {getIsEmptyHtml(htmlChunk) ? null : (
                    // eslint-disable-next-line react/no-danger, id-match
                    <div dangerouslySetInnerHTML={{__html: htmlChunk}} />
                )}
                {replacePart ? htmlStringToJsx({articleTitle, htmlString: replacePart}, markdownItemCounter) : null}
            </Fragment>
        );
    });

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{jsxList}</>;
}
