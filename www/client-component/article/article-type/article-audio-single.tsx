import {useContext} from 'react';

import {ArticleContextType} from '../article-context/article-context-type';
import {articleContext} from '../article-context/article-context';
import {Markdown} from '../../../layout/markdown/markdown';
import {getFileMarkdownByFullInfo} from '../../../layout/markdown/markdown-helper';
import {ArticleFileType, ArticleFileTypeEnum} from '../../../../server/article/article-type';
import {AudioAsync} from '../../../layout/audio-player/audio-player';
import {defaultMediaMetadata} from '../../../layout/audio-player/audio-player-const';
import articleStyle from '../article.scss';
import {getPathToFile} from '../../../util/path';

export function ArticleAudioSingle(): JSX.Element {
    const {article} = useContext<ArticleContextType>(articleContext);
    const {content, titleImage, title, fileList, slug} = article;
    const firstAudioFile = fileList.find(
        (fileInfo: ArticleFileType): boolean => fileInfo.type === ArticleFileTypeEnum.audio
    );

    return (
        <>
            <Markdown
                articleTitle={title}
                className={articleStyle.article_markdown}
                mdInput={getFileMarkdownByFullInfo(titleImage, {alt: title, poster: ''})}
            />
            {firstAudioFile ? (
                <AudioAsync
                    downloadFileName={slug}
                    duration={firstAudioFile.duration}
                    mediaMetadata={{...defaultMediaMetadata, title}}
                    preload="none"
                    src={getPathToFile(firstAudioFile.name)}
                    useRepeatButton
                />
            ) : null}
            <Markdown articleTitle={title} className={articleStyle.article_markdown} mdInput={content} />
        </>
    );
}
