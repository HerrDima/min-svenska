import {makeCrud} from '../data-base/data-base';
import {CrudConfigOnChangeArgumentType} from '../data-base/data-base-type';

import {AuthUserType} from './auth-type';
import {authUserSchema} from './auth-validation';

export const authCrud = makeCrud<AuthUserType>(
    {
        dataBaseId: 'user',
        onChange: (data: CrudConfigOnChangeArgumentType): Promise<void> => {
            console.log('update auth DB');
            console.log(data);

            return Promise.resolve();
        },
        onInit: (data: CrudConfigOnChangeArgumentType): Promise<void> => {
            console.log('onInit auth DB');
            console.log(data);

            return Promise.resolve();
        },
    },
    authUserSchema
);

/*
authCrud.createOne({
    id: 'some-user-id',
    login: 'the-admin',
    password: getSha256Hash('123456'),
    role: UserRoleEnum.admin,
});
*/
