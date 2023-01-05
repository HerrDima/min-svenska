import {FetchMethodEnum, fetchX} from '../../util/fetch';
import {apiUrl} from '../../../server/const';

import {LoginResponseType} from './auth-type';
import {loginResponseSchema} from './auth-const';

export function loginUser(login: string, password: string): Promise<LoginResponseType> {
    return fetchX<LoginResponseType>(apiUrl.login, loginResponseSchema, {
        body: JSON.stringify({login, password}),
        method: FetchMethodEnum.post,
    });
}

export function getAutoAuthLogin(): Promise<LoginResponseType> {
    return fetchX<LoginResponseType>(apiUrl.getUser, loginResponseSchema, {
        credentials: 'include',
        method: FetchMethodEnum.get,
    });
}
