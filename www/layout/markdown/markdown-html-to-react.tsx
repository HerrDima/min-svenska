import {Fragment} from 'react';

import {getAudioFromHtml} from './markdown-helper-audio';
import {getImageFromHtml} from './markdown-helper-image';
import {getVideoFromHtml} from './markdown-helper-video';
import {getIsEmptyHtml} from './markdown-helper';

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

function htmlStringToJsx(htmlString: string, articleTitle: string): JSX.Element {
    if (getIsVideoHtmlCode(htmlString)) {
        return getVideoFromHtml(htmlString, articleTitle);
    }

    if (getIsAudioHtmlCode(htmlString)) {
        return getAudioFromHtml(htmlString, articleTitle);
    }

    if (getIsImageHtmlCode(htmlString)) {
        return getImageFromHtml(htmlString, articleTitle);
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

    const jsxList: Array<JSX.Element> = splitTextList.map((htmlChunk: string, index: number): JSX.Element => {
        const key = index.toString(16);
        const replacePart = replaceList[index];

        return (
            <Fragment key={key}>
                {getIsEmptyHtml(htmlChunk) ? null : (
                    // eslint-disable-next-line react/no-danger, id-match
                    <div dangerouslySetInnerHTML={{__html: htmlChunk}} />
                )}
                {replacePart ? htmlStringToJsx(replacePart, articleTitle) : null}
            </Fragment>
        );
    });

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{jsxList}</>;
}
