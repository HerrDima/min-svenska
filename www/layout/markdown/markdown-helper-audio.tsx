import {Audio} from 'react-audio-player-pro';

import {defaultMediaMetadata} from '../audio-player/audio-player-const';
import {textToSlug} from '../../util/human';
import {getPathToFile} from '../../util/path';

import markdownStyle from './markdown.scss';
import {StringToJsxRawDataType} from './markdown-helper';

export const markdownAudioRegExp = /<audio[\S\s]+?<\/audio>/gi;

export type AudioTagDataType = {
    duration: number;
    fileName: string;
    title: string;
};

export function parseAudioTag(audioTag: string): AudioTagDataType {
    const [ignoredFullSrcString, srcAsString = ''] = audioTag.match(/src="([^"]*?)"/) || ['', ''];
    const [ignoredFullDurationString, durationAsString = ''] = audioTag.match(/data-duration="([^"]*?)"/) || ['', ''];
    const [ignoredFullTitleString, titleAsString = ''] = audioTag.match(/data-title="([^"]*?)"/) || ['', ''];
    const durationAsNumber = Number.parseFloat(durationAsString) || 0;

    return {
        duration: durationAsNumber,
        fileName: srcAsString,
        title: titleAsString,
    };
}

export function getAudioFromHtml(rawData: StringToJsxRawDataType): JSX.Element {
    const {htmlString, articleTitle} = rawData;

    const {duration, fileName, title: parsedTitle} = parseAudioTag(htmlString);

    const endTitle: string = parsedTitle || articleTitle;
    const downloadFileName = textToSlug(endTitle);

    return (
        <Audio
            className={markdownStyle.markdown_audio}
            downloadFileName={downloadFileName}
            duration={duration}
            mediaMetadata={{...defaultMediaMetadata, title: endTitle}}
            preload={duration ? 'none' : 'metadata'}
            src={getPathToFile(fileName)}
            useRepeatButton
        />
    );
}
