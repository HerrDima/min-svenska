import {JSONSchemaType} from 'ajv';

import {UserRoleEnum} from '../../www/provider/user/user-context-type';

import {AuthUserType} from './auth-type';

export const authUserSchema: JSONSchemaType<AuthUserType> = {
    additionalProperties: false,
    properties: {
        // eslint-disable-next-line id-match
        _id: {nullable: true, type: 'string'},
        id: {type: 'string'},
        login: {type: 'string'},
        password: {type: 'string'},
        role: {'enum': Object.values(UserRoleEnum), type: 'string'},
    },
    required: ['id', 'login', 'password', 'role'],
    type: 'object',
};
