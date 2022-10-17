/* global HTMLDivElement */

import {HTMLAttributes, useContext} from 'react';
import {markdown, defaultMarkdownConfig} from 'markdown-pro';

import {classNames} from '../../util/css';
import {ThemeContextType} from '../../provider/theme/theme-context-type';
import {ThemeContext} from '../../provider/theme/theme-context';

import {markdownImage} from './markdown-helper-image';
import {markdownAudio} from './markdown-helper-audio';
import markdownStyle from './markdown.scss';

type PropsType = HTMLAttributes<HTMLDivElement> & {
    mdInput: string;
};

export function Markdown(props: PropsType): JSX.Element {
    const {mdFontSize} = useContext<ThemeContextType>(ThemeContext);
    const {mdInput, ...divAttributes} = props;
    const {className} = divAttributes;
    const htmlCodeClean = markdown(mdInput, {useWrapper: false});
    const htmlCodeImage = markdownImage(htmlCodeClean);
    const htmlCodeListAudio = markdownAudio(htmlCodeImage);
    const fullClassName = classNames(markdownStyle.markdown, defaultMarkdownConfig.wrapperClassName, className);

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
