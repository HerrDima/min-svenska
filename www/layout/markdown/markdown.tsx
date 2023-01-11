/* global HTMLDivElement */

import {HTMLAttributes, useContext} from 'react';
import {markdown, classNameMdPro, classNameMdProThemeLight} from 'markdown-pro';

import {classNames} from '../../util/css';
import {ThemeContextType} from '../../provider/theme/theme-context-type';
import {ThemeContext} from '../../provider/theme/theme-context';

import {markdownImage} from './markdown-helper-image';
import {markdownAudio} from './markdown-helper-audio';
import {markdownVideo} from './markdown-helper-video';

import markdownStyle from './markdown.scss';

type PropsType = HTMLAttributes<HTMLDivElement> & {
    articleTitle: string;
    mdInput: string;
};

export function Markdown(props: PropsType): JSX.Element {
    const {mdFontSize} = useContext<ThemeContextType>(ThemeContext);
    const {mdInput, articleTitle, ...divAttributes} = props;
    const {className} = divAttributes;
    const htmlCodeClean = markdown(mdInput, {useLineBreak: true, useWrapper: false});
    const htmlCodeImage = markdownImage(htmlCodeClean);
    const htmlCodeVideo = markdownVideo(htmlCodeImage);
    const htmlCodeListAudio = markdownAudio(htmlCodeVideo, articleTitle);
    const fullClassName = classNames(markdownStyle.markdown, classNameMdPro, classNameMdProThemeLight, className);

    return (
        <div
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...divAttributes}
            className={fullClassName}
            style={{fontSize: `${mdFontSize}px`}}
        >
            {htmlCodeListAudio}
        </div>
    );
}
