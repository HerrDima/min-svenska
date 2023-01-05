import {Fragment} from 'react';

import {AudioAsync} from '../audio-player/audio-player';
import {defaultMediaMetadata} from '../audio-player/audio-player-const';
import {textToSlug} from '../../util/human';

export const markdownAudioRegExp = /<audio[\S\s]+?<\/audio>/gi;

export type AudioTagDataType = {
    duration: number;
    src: string;
    title: string;
};

export function parseAudioTag(audioTag: string): AudioTagDataType {
    const [ignoredFullSrcString, srcAsString = ''] = audioTag.match(/src="(\S+)"/) || ['', ''];
    const [ignoredFullDurationString, durationAsString = ''] = audioTag.match(/data-duration="(\S+)"/) || ['', ''];
    const [ignoredFullTitleString, titleAsString = ''] = audioTag.match(/data-title="([^"]*?)"/) || ['', ''];
    const durationAsNumber = Number.parseFloat(durationAsString) || 0;

    return {
        duration: durationAsNumber,
        src: srcAsString,
        title: titleAsString,
    };
}

function getAudioFromHtml(audioHtmlCode: string, title: string): JSX.Element {
    const {duration, src, title: parsedTitle} = parseAudioTag(audioHtmlCode);

    const endTitle: string = parsedTitle || title;
    const downloadFileName = textToSlug(endTitle);

    return (
        <AudioAsync
            downloadFileName={downloadFileName}
            duration={duration}
            mediaMetadata={{...defaultMediaMetadata, title: endTitle}}
            preload={duration ? 'none' : 'metadata'}
            src={src}
            useRepeatButton
        />
    );
}

export function markdownAudio(htmlCode: string, title: string): Array<JSX.Element> {
    const splitTextList: Array<string> = htmlCode.split(markdownAudioRegExp);
    const audioList: Array<string> = htmlCode.match(markdownAudioRegExp) || [];

    return splitTextList.map((htmlChunk: string, index: number): JSX.Element => {
        const key = index.toString(16);
        const audioPart = audioList[index];

        return (
            <Fragment key={key}>
                <div
                    // eslint-disable-next-line react/no-danger, id-match
                    dangerouslySetInnerHTML={{__html: htmlChunk}}
                />
                {audioPart ? getAudioFromHtml(audioPart, title) : null}
            </Fragment>
        );
    });
}
