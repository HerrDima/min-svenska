import {readFileSync} from 'node:fs';

export const contentStringBegin = '<div class="js-app-wrapper">';
export const contentStringEnd = '</div>';
export const contentStringFull = contentStringBegin + contentStringEnd;

// eslint-disable-next-line no-sync
export const indexHtml: string = readFileSync('./dist/index.html', 'utf8');
