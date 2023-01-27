/* global HTMLVideoElement, HTMLImageElement */

import {useRef, useState, useCallback} from 'react';

import {GetPathToFileType, GetPathToImageType} from '../../util/path';
import {Image} from '../Image/image';
import {secondsToHuman} from '../../util/time';
import {classNames} from '../../util/css';

import videoStyle from './video.scss';

type VideoPropsType = {
    alt: string;
    className?: string;
    duration: number;
    fileName: string;
    getPathToFile: GetPathToFileType;
    getPathToImage: GetPathToImageType;
    height: number;
    image?: {
        className?: string;
        imgClassName?: string;
    };
    poster: string;
    posterLoading: HTMLImageElement['loading'];
    title: string;
    videoClassName?: string;
    width: number;
};

// eslint-disable-next-line complexity
export function Video(props: VideoPropsType): JSX.Element {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isStarted, setIsStarted] = useState<boolean>(false);

    const playVideo = useCallback(() => {
        const {current: videoTag} = videoRef;

        setIsStarted(true);

        if (!videoTag) {
            return;
        }

        videoTag.play();
    }, [videoRef]);

    const handleOnCanPlay = useCallback(() => {
        const {current: videoTag} = videoRef;

        if (!videoTag || !isStarted) {
            return;
        }

        videoTag.play();
    }, [isStarted]);

    const {
        alt,
        title,
        image,
        fileName,
        width,
        getPathToImage,
        height,
        getPathToFile,
        className,
        videoClassName,
        poster,
        duration,
        posterLoading,
    } = props;

    return (
        <div
            className={`${videoStyle.video} ${className || ''}`.trim()}
            style={{display: 'block', height: 'auto', maxHeight: `${height}px`, maxWidth: `${width}px`}}
        >
            <svg
                height={height}
                style={{display: 'block', height: 'auto', maxHeight: `${height}px`, maxWidth: '100%'}}
                viewBox={`0 0 ${width} ${height}`}
                width={width}
            />

            <button aria-label="play" className={videoStyle.video__play_button} onClick={playVideo} type="button">
                <span className={videoStyle.video__play_button__icon} />
            </button>

            <p className={videoStyle.video__title}>{title}</p>

            <p className={videoStyle.video__duration}>{secondsToHuman(duration)}</p>

            <Image
                alt={alt}
                className={`${videoStyle.video__image} ${image?.className || ''}`.trim()}
                fileName={poster}
                getPathToFile={getPathToFile}
                getPathToImage={getPathToImage}
                height={height}
                imgClassName={`${videoStyle.video__image_tag} ${image?.imgClassName || ''}`.trim()}
                loading={posterLoading}
                title={title}
                width={width}
            />

            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
                className={classNames(videoStyle.video__tag, videoClassName, {
                    [videoStyle.video__tag__started]: isStarted,
                })}
                controls
                height={height}
                onCanPlay={handleOnCanPlay}
                preload="none"
                ref={videoRef}
                src={getPathToFile(fileName)}
                title={title}
                width={width}
            >
                Video is not supported.
            </video>
        </div>
    );
}
