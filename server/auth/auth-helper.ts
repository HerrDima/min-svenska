import {FastifyReply, FastifyRequest} from 'fastify';

import {UserRoleEnum} from '../../www/provider/user/user-context-type';
import {mainResponseHeader} from '../const';

import {authCrud} from './auth';
import {cookieFieldUserId} from './auth-const';
import {AuthUserType} from './auth-type';

export function makeDefaultAuthUser(): AuthUserType {
    const defaultUserData: AuthUserType = {
        id: '',
        login: '',
        password: '',
        role: UserRoleEnum.user,
    };

    return defaultUserData;
}

async function getIsAdmin(request: FastifyRequest): Promise<boolean> {
    const {session} = request;

    const user = await authCrud.findOne({id: String(session.get(cookieFieldUserId) || '')});

    return Boolean(user && user.role === UserRoleEnum.admin);
}

type AdminOnlyWrapperType<ResponseType> = (
    request: FastifyRequest<{Body?: string; Params: {articleId?: string}}>,
    reply: FastifyReply
) => Promise<ResponseType>;

export function adminOnly<ResponseType>(
    callBack: AdminOnlyWrapperType<ResponseType>
): AdminOnlyWrapperType<ResponseType> {
    return async (
        request: FastifyRequest<{Body?: string; Params: {articleId?: string}}>,
        reply: FastifyReply
    ): Promise<ResponseType> => {
        if (await getIsAdmin(request)) {
            return callBack(request, reply);
        }

        reply.code(403).header(...mainResponseHeader);

        throw new Error('403 Forbidden');
    };
}
