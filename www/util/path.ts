import {apiUrl} from '../../server/const';

export function getPathToImage(uniqueFileName: string, imageConfig: Record<'height' | 'width', number | '-'>): string {
    const {width, height} = imageConfig;

    return apiUrl.imageGet.replace(':size', `${String(width)}x${String(height)}`).replace(':fileName', uniqueFileName);
}

export function getPathToFile(uniqueFileName: string): string {
    return apiUrl.fileGet.replace(':fileName', uniqueFileName);
}
