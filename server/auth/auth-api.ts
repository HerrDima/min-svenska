import {FastifyReply, FastifyRequest} from 'fastify';

import {LoginResponseType} from '../../www/service/auth/auth-type';
import {getSha256HashServer} from '../util/string';
import {UserRoleEnum} from '../../www/provider/user/user-context-type';
import {mainResponseHeader} from '../const';

import {authCrud} from './auth';
import {cookieFieldUserId} from './auth-const';

export async function postAuthLogin(
    request: FastifyRequest<{Body?: string}>,
    reply: FastifyReply
): Promise<LoginResponseType> {
    const {body, session} = request;

    const parsedData: Record<string, unknown> = JSON.parse(String(body || '{}'));

    const {login, password} = parsedData;

    if (typeof login !== 'string' || typeof password !== 'string') {
        reply.code(400);

        throw new Error('Login or password is not define.');
    }

    const user = await authCrud.findOne({login, password: getSha256HashServer(password)});

    if (!user) {
        reply.code(400);

        throw new Error('User Not Found.');
    }

    session.set(cookieFieldUserId, user.id);
    session.options({maxAge: 1000 * 60 * 60});

    const loginResponse: LoginResponseType = {
        user: {
            id: user.id,
            login: user.login,
            role: user.role,
        },
    };

    reply.code(200).header(...mainResponseHeader);

    return loginResponse;
}

export async function getAutoAuthLogin(request: FastifyRequest, reply: FastifyReply): Promise<LoginResponseType> {
    const defaultLoginResponse: LoginResponseType = {user: {id: '', login: '', role: UserRoleEnum.user}};
    const {session} = request;
    const userId = String(session.get(cookieFieldUserId) || '');

    reply.header(...mainResponseHeader);

    if (!userId) {
        reply.code(200);

        return defaultLoginResponse;
    }

    const user = await authCrud.findOne({id: userId});

    if (!user) {
        reply.code(200);

        return defaultLoginResponse;
    }

    const loginResponse: LoginResponseType = {
        user: {
            id: user.id,
            login: user.login,
            role: user.role,
        },
    };

    session.set(cookieFieldUserId, user.id);
    session.options({maxAge: 1000 * 60 * 60});

    reply.code(200);

    return loginResponse;
}
