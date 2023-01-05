export enum UserRoleEnum {
    admin = 'admin',
    user = 'user',
}

export type UserType = {
    id: string;
    login: string;
    role: UserRoleEnum;
};

export type UserContextType = {
    isInProgressAutoLogin: boolean;
    setUser: (user: UserType) => void;
    user: UserType;
};
