import {lazy, Suspense, ComponentType} from 'react';

import {Spinner} from '../../../layout/spinner/spinner';
import {LazyResultType} from '../../../util/type';

const AsyncLazy = lazy<ComponentType<unknown>>(async (): Promise<LazyResultType<unknown>> => {
    const {Login} = await import(
        /* webpackChunkName: 'page-login' */
        './login'
    );

    return {'default': Login};
});

export function LoginAsync() {
    return (
        <Suspense fallback={<Spinner position="absolute" />}>
            <AsyncLazy />
        </Suspense>
    );
}
