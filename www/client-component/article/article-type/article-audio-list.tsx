import {useContext} from 'react';
import {TrackType} from 'react-audio-player-pro';

import {ArticleContextType} from '../article-context/article-context-type';
import {articleContext} from '../article-context/article-context';
import {Markdown} from '../../../layout/markdown/markdown';
import {markdownAudioRegExp, parseAudioTag} from '../../../layout/markdown/markdown-helper-audio';
import {AudioPlayerAsync} from '../../../layout/audio-player/audio-player';
import {defaultMediaMetadata} from '../../../layout/audio-player/audio-player-const';
import articleStyle from '../article.scss';

export function ArticleAudioList(): JSX.Element {
    const {article} = useContext<ArticleContextType>(articleContext);
    const {content, title} = article;

    const splitTextList: Array<string> = content.split(markdownAudioRegExp);
    const audioList: Array<string> = content.match(markdownAudioRegExp) || [];

    const trackList: Array<TrackType> = audioList.map<TrackType>((audioTag: string): TrackType => {
        const {duration, title: trackTitle, src} = parseAudioTag(audioTag);

        return {
            content: trackTitle,
            duration,
            mediaMetadata: defaultMediaMetadata,
            preload: duration ? 'none' : 'metadata',
            src,
        };
    });

    return (
        <>
            <AudioPlayerAsync trackList={trackList} />

            <Markdown
                articleTitle={title}
                className={articleStyle.article_markdown}
                mdInput={splitTextList.join('\n')}
            />
        </>
    );
}
