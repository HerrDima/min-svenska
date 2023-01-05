/* global process */

import path from 'node:path';

const cwd = process.cwd();

export const uploadFileFolder = 'static-file';
export const temporaryUploadFileFolder = 'static-file-temp';

export const uploadFolder = path.join(cwd, uploadFileFolder);
export const temporaryUploadFolder = path.join(cwd, temporaryUploadFileFolder);
