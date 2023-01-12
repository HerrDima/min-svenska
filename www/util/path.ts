import {apiUrl} from '../../server/const';

export type GetPathToImageType = (
    uniqueFileName: string,
    imageConfig: Record<'height' | 'width', number | '-'>
) => string;
export type GetPathToFileType = (uniqueFileName: string) => string;

// eslint-disable-next-line func-style
export const getPathToImage: GetPathToImageType = (
    uniqueFileName: string,
    imageConfig: Record<'height' | 'width', number | '-'>
): string => {
    const {width, height} = imageConfig;

    return apiUrl.imageGet.replace(':size', `${String(width)}x${String(height)}`).replace(':fileName', uniqueFileName);
};

// eslint-disable-next-line func-style
export const getPathToFile: GetPathToFileType = (uniqueFileName: string): string => {
    return apiUrl.fileGet.replace(':fileName', uniqueFileName);
};
