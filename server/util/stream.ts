/* global NodeJS */

import {PromiseResolveType} from '../../www/util/promise';

export function streamToStringServer(stream: NodeJS.ReadableStream): Promise<string> {
    const chunks: Array<string> = [];

    return new Promise((resolve: PromiseResolveType<string>, reject: PromiseResolveType<Error>) => {
        stream.on('data', (chunk: string): unknown => chunks.push(chunk));
        stream.on('error', (error: Error): unknown => reject(error));
        stream.on('end', (): unknown => resolve(chunks.join('')));
    });
}
