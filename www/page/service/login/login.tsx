/* global HTMLFormElement, HTMLInputElement */
import {SyntheticEvent, useCallback, useState} from 'react';

import {useUserContext} from '../../../provider/user/user-context';
import {useMakeExecutableState} from '../../../util/function';
import {LoginResponseType} from '../../../service/auth/auth-type';
import {loginUser} from '../../../service/auth/auth-api';
import {throwError} from '../../../util/error';
import {apiUrl} from '../../../../server/const';

export function Login(): JSX.Element {
    const userContext = useUserContext();
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const loginHook = useMakeExecutableState<Parameters<typeof loginUser>, LoginResponseType>(loginUser);

    const onSubmit = useCallback(
        (evt: SyntheticEvent<HTMLFormElement>) => {
            evt.preventDefault();

            loginHook
                .execute(login, password)
                .then((loginResponse: LoginResponseType) => {
                    const {user} = loginResponse;

                    userContext.setUser(user);
                })
                .catch(throwError);
        },
        [login, password, loginHook, userContext]
    );

    return (
        <form action={apiUrl.login} onSubmit={onSubmit}>
            <pre>{JSON.stringify(userContext, null, 4)}</pre>
            <pre>{JSON.stringify(loginHook, null, 4)}</pre>

            <label>
                <p>login</p>
                <input
                    onInput={(evt: SyntheticEvent<HTMLInputElement>) => {
                        setLogin(evt.currentTarget.value);
                    }}
                    placeholder="login"
                    type="text"
                />
            </label>
            <label>
                <p>password</p>
                <input
                    onInput={(evt: SyntheticEvent<HTMLInputElement>) => {
                        setPassword(evt.currentTarget.value);
                    }}
                    placeholder="password"
                    type="text"
                />
            </label>

            {loginHook.error ? <h3>ERROR login</h3> : '???'}

            <br />

            <button type="submit">submit</button>
        </form>
    );
}
