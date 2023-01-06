/* global MediaMetadataInit */

import {getPathToImage} from '../../util/path';
import {appIconPngFileName} from '../../const';

export const defaultMediaMetadata: MediaMetadataInit = {
    artwork: [
        // check with manifest.json
        {
            sizes: '48x48',
            src: getPathToImage(appIconPngFileName, {height: 48, width: 48}),
            type: 'image/png',
        },
        {
            sizes: '96x96',
            src: getPathToImage(appIconPngFileName, {height: 96, width: 96}),
            type: 'image/png',
        },
        {
            sizes: '144x144',
            src: getPathToImage(appIconPngFileName, {height: 144, width: 144}),
            type: 'image/png',
        },
        {
            sizes: '192x192',
            src: getPathToImage(appIconPngFileName, {height: 192, width: 192}),
            type: 'image/png',
        },
    ],
};
