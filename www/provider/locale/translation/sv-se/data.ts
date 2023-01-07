import {LocaleDictionaryType} from '../type';
import {enUs} from '../en-us/data';

export const svSe: LocaleDictionaryType = {
    ...enUs,

    /* eslint-disable id-match, id-length, max-len, sonarjs/no-duplicate-string, sort-keys */
    META__LANGUAGE_NAME: 'Svanska',

    NAVIGATION__HOME: 'Hem',

    SHARE__RECOMMEND_TO_FRIENDS__HEADER: 'Rekommendera till vänner:',
    SHARE__HEADER: 'Dela med sig:',
    SEE_ALSO__HEADER: 'Se även:',

    /* eslint-enable id-match, id-length, max-len,sonarjs/no-duplicate-string, sort-keys */
};

/*
const keyList: Array<string> = [];
const valueList: Array<string> = [];

Object.entries(enUs).forEach((data: [string, string]) => {
    const [key, value] = data;

    keyList.push(key);
    valueList.push(value);
});

console.log('---- i18n keys ----');
console.log(keyList.join('\n'));
console.log('---- i18n values ----');
console.log(valueList.join('\n'));
*/
