import type {GetPathToFileType, GetPathToImageType} from '../../util/path';

import {Source} from './source';

// max website width is 1200
const screenWidthList: Array<number> = [1200, 1024, 912, 820, 768, 540, 425, 390, 375, 320, 280, 128];

type ImagePropsType = {
    alt: string;
    className?: string;
    fileName: string;
    getPathToFile: GetPathToFileType;
    getPathToImage: GetPathToImageType;
    height: number;
    imgClassName?: string;
    title: string;
    width: number;
};

export function Image(props: ImagePropsType): JSX.Element {
    const {className, fileName, getPathToImage, getPathToFile, alt, width, height, title, imgClassName} = props;

    const sourceTagList: Array<JSX.Element> = screenWidthList.map<JSX.Element>((mediaWidth: number): JSX.Element => {
        return (
            <Source
                fileName={fileName}
                getPathToImage={getPathToImage}
                height={height}
                key={mediaWidth}
                mediaWidth={mediaWidth}
                width={width}
            />
        );
    });

    return (
        <picture className={className}>
            {sourceTagList}
            <img
                alt={alt}
                className={imgClassName}
                height={height}
                loading="lazy"
                src={getPathToFile(fileName)}
                title={title}
                width={width}
            />
        </picture>
    );
}
