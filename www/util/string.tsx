import {LocaleNameEnum} from '../provider/locale/locale-context-type';

/*
export function getHash(data: Array<unknown> | Record<string, unknown> | string): string {
    let result = 0;
    const fullString: string = typeof data === 'string' ? data : JSON.stringify(data, null, 0);
    const stringLength = fullString.length;

    // eslint-disable-next-line no-loops/no-loops
    for (let index = 0; index < stringLength; index += 1) {
        result = Math.trunc(Math.imul(31, result) + (fullString.codePointAt(index) || 0));
    }

    return result.toString(32);
}
*/

export function getRandomString(): string {
    const fromRandom = Math.random().toString(32).replace('0.', '');
    const fromTime = Date.now().toString(32);

    return `${fromRandom}${fromTime}`.toLowerCase();
}

export function findString(input: string, searchQuery: string, flags: '' | 'g' | 'gi' = 'gi'): Array<string> {
    const result: Array<string> = [];
    const searchQueryLength = searchQuery.length;

    const splitRegExp = new RegExp('(?=' + searchQuery + ')', flags);
    const equalRegExp = new RegExp('^' + searchQuery, flags);

    const splitLeftList: Array<string> = input.split(splitRegExp);

    // eslint-disable-next-line no-loops/no-loops
    for (const leftSplitPart of splitLeftList) {
        if (equalRegExp.test(leftSplitPart)) {
            result.push(leftSplitPart.slice(0, searchQueryLength), leftSplitPart.slice(searchQueryLength));
        } else {
            result.push(leftSplitPart);
        }
    }

    return result;
}

export function sortCompare(shortLocaleName: LocaleNameEnum, stringA: string, stringB: string): number {
    return new Intl.Collator(shortLocaleName).compare(stringA, stringB);
}

export function toTrimmedString(value: unknown): string {
    return String(value ?? '').trim();
}

export function sortStringCallback(stringA: string, stringB: string): number {
    return stringA.localeCompare(stringB);
}

export function sortStringCallbackReverse(stringA: string, stringB: string): number {
    return sortStringCallback(stringB, stringA);
}

export function getTickCross(isEnable: boolean): string {
    return isEnable ? '✔' : '❌';
}
