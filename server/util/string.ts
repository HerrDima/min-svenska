import {createHmac} from 'node:crypto';

import {sha256key} from '../key';

export function getSha256HashServer(text: string): string {
    return createHmac('sha256', sha256key).update(text).digest('hex');
}
