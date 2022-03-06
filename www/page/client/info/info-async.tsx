import {lazy} from 'react';

import {GuardSuspense} from '../../../layout/guard-suspense';
import {Spinner} from '../../../layout/spinner/spinner';
import {LoginRequired} from '../../../layout/login-required/login-required';

const AsyncLazy = lazy(
    () =>
        import(
            /* webpackChunkName: 'page-info' */
            './info'
        )
);

export function InfoAsync() {
    return (
        <LoginRequired>
            <GuardSuspense fallback={<Spinner position="absolute" />}>
                <AsyncLazy />
            </GuardSuspense>
        </LoginRequired>
    );
}