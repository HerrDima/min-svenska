import {CSSProperties} from 'react';
import {ScreenWidthNameEnum, getScreenName} from 'react-system-hook';

import {GetPathToImageType} from '../../util/path';

const screenAspectRation: Array<number> = [1, 2, 3];

type SourcePropsType = {
    fileName: string;
    getPathToImage: GetPathToImageType;
    height: number;
    mediaWidth: number;
    width: number;
};

export function Source(props: SourcePropsType): JSX.Element | null {
    const {mediaWidth, width, height, fileName, getPathToImage} = props;
    const imageAspect = width / height;
    const mediaName = getScreenName(mediaWidth);

    const horizontalPaddingMap: Record<ScreenWidthNameEnum, number> = {
        [ScreenWidthNameEnum.mobile]: 16, // padding 8 + 8
        [ScreenWidthNameEnum.tablet]: 24, // padding 12 + 12
        [ScreenWidthNameEnum.desktop]: 32, // padding 16 + 16
    };

    const imageWidth = mediaWidth - horizontalPaddingMap[mediaName];
    const imageHeight = Math.round(imageWidth / imageAspect);

    // prevent extra large image source
    if (imageWidth > width) {
        return null;
    }

    const styleMap: Record<ScreenWidthNameEnum, CSSProperties> = {
        [ScreenWidthNameEnum.mobile]: {display: 'block', height: 'auto', width: '100%'},
        [ScreenWidthNameEnum.tablet]: {display: 'block', height: 'auto', maxWidth: '100%', width: `${imageWidth}px`},
        [ScreenWidthNameEnum.desktop]: {display: 'block', height: 'auto', maxWidth: '100%', width: `${imageWidth}px`},
    };

    const srcSet: string = screenAspectRation
        .map<string>((multiple: number): string => {
            const imageSrc = getPathToImage(fileName, {height: imageHeight * multiple, width: imageWidth * multiple});

            return imageWidth * multiple <= width ? `${imageSrc} ${multiple}x` : '';
        })
        .filter(Boolean)
        .join(', ');

    return (
        <source
            height={String(imageHeight)}
            media={`(min-width: ${mediaWidth}px)`}
            srcSet={srcSet}
            style={styleMap[mediaName]}
            width={String(imageWidth)}
        />
    );
}
