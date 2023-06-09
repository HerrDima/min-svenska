/* global fetch, document, URL, Response, Blob */

import {FetchMethodEnum} from '../../util/fetch';
import {apiUrl} from '../../../server/const';

export async function makePdf(html: string, fileName: string): Promise<void> {
    // return fetchX<File>(apiUrl.clientMakePdf, fileSchema, {
    //     body: decodeURIComponent(html),
    //     method: FetchMethodEnum.post,
    // });

    const response: Response = await fetch(apiUrl.clientMakePdf, {
        body: encodeURIComponent(html),
        method: FetchMethodEnum.post,
    });

    const blob: Blob = await response.blob();

    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.style.position = 'absolute';
    link.style.zIndex = '1000000';
    link.style.opacity = '0';

    document.body?.append(link);

    link.href = objectUrl;
    link.download = `${fileName}.pdf`;

    link.click();
    link.remove();

    URL.revokeObjectURL(objectUrl);
}
