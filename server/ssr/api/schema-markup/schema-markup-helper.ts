import {humanNormalizeString} from '../../../../www/util/human';

export function removeNonJsonSymbols(rawString: string): string {
    return rawString.replace(/["[\]{}]/g, '');
}

export function fitTextTo(fullString: string, maxSize: number): string {
    const cleanString = humanNormalizeString(fullString);

    if (cleanString.length <= maxSize) {
        return cleanString;
    }

    const resultString = cleanString.slice(0, maxSize);

    if (cleanString[maxSize] === ' ') {
        return resultString;
    }

    const resultWordList = resultString.split(/\s/g);

    resultWordList.pop();

    return resultWordList.join(' ');
}

export function timeTo0000(isoString: string): string {
    return isoString.replace(/\.\d{3}Z/, '+00:00');
}
