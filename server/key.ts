/* global process */

import dotenv from 'dotenv';

dotenv.config();

// eslint-disable-next-line no-process-env
const {SHA_256_KEY, SECRET_KEY} = process.env;

export const sha256key: string = String(SHA_256_KEY || '').trim();
export const secretKey: string = String(SECRET_KEY || '').trim();

(() => {
    if (sha256key === '') {
        throw new Error('[ERROR]: auth - sha256key is not define!');
    }

    if (secretKey === '') {
        throw new Error('[ERROR]: auth - sha256key is not define!');
    }
})();
