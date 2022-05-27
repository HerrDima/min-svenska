/* global location */

import {createContext, useMemo, useState, useContext, useEffect} from 'react';

import {getAutoAuthLogin} from '../../service/auth/auth-api';
import {useMakeExecutableState} from '../../util/function';
import {LoginResponseType} from '../../service/auth/auth-type';
import {throwError} from '../../util/error';

import {defaultUserContext} from './user-context-const';
import {UserContextType, UserType} from './user-context-type';

export const UserContext = createContext<UserContextType>(defaultUserContext);

export function useUserContext(): UserContextType {
    return useContext<UserContextType>(UserContext);
}

const {Provider: UserContextProvider} = UserContext;

type PropsType = {
    children: Array<JSX.Element> | JSX.Element;
};

export function User(props: PropsType): JSX.Element {
    const [user, setUser] = useState<UserType>(defaultUserContext.user);
    const {execute: executeAutoLogin, isInProgress: isInProgressAutoLogin} = useMakeExecutableState<
        [],
        LoginResponseType
    >(getAutoAuthLogin);

    const providedData: UserContextType = useMemo<UserContextType>(() => {
        return {isInProgressAutoLogin, setUser, user};
    }, [isInProgressAutoLogin, user]);

    useEffect(() => {
        if (typeof location === 'object' && location.pathname?.includes('/cms/')) {
            executeAutoLogin()
                .then((loginResponse: LoginResponseType) => {
                    setUser(loginResponse.user);
                })
                .catch(throwError);
        }
    }, [executeAutoLogin]);

    const {children} = props;

    return <UserContextProvider value={providedData}>{children}</UserContextProvider>;
}
