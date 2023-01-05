import {KeyForValidationListType} from './cms-article-type';

export const enum CmsArticleModeEnum {
    create = 'create',
    edit = 'edit',
}

export const keyForValidationList: KeyForValidationListType = ['id', 'slug', 'subDocumentIdList', 'title'];
export const noDateUTC = '0000-00-00T00:00:00.000Z';

export const imageAccept = 'image/png, image/jpeg, image/gif, image/webp';
export const fileAccept = `${imageAccept}, audio/mp3, audio/wav`;
export const imageFileSizeLimit = 16e6;
export const fileSizeLimit = 75e6;
