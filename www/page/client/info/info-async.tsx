import {lazy, Suspense, ComponentType} from 'react';

import {Spinner} from '../../../layout/spinner/spinner';
import {LoginAdminRequired} from '../../../layout/login-admin-required/login-admin-required';
import {LazyResultType} from '../../../util/type';

const AsyncLazy = lazy<ComponentType<unknown>>(async (): Promise<LazyResultType<unknown>> => {
    const {Info} = await import(
        /* webpackChunkName: 'page-login' */
        './info'
    );

    return {'default': Info};
});

export function InfoAsync() {
    return (
        <LoginAdminRequired>
            <Suspense fallback={<Spinner position="absolute" />}>
                <AsyncLazy />
            </Suspense>
        </LoginAdminRequired>
    );
}
