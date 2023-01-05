import {UserRoleEnum} from '../../provider/user/user-context-type';

export type LoginResponseType = {
    user: {
        id: string;
        login: string;
        role: UserRoleEnum;
    };
};
