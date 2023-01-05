import {lazy, Suspense, ComponentType} from 'react';

import {Spinner} from '../../../layout/spinner/spinner';
import {LoginAdminRequired} from '../../../layout/login-admin-required/login-admin-required';
import {LazyResultType} from '../../../util/type';

const AsyncLazy = lazy<ComponentType<unknown>>(async (): Promise<LazyResultType<unknown>> => {
    const {CmsArticleList} = await import(
        /* webpackChunkName: 'page-cms-article-list' */
        './cms-article-list'
    );

    return {'default': CmsArticleList};
});

export function CmsArticleListAsync() {
    return (
        <LoginAdminRequired>
            <Suspense fallback={<Spinner position="absolute" />}>
                <AsyncLazy />
            </Suspense>
        </LoginAdminRequired>
    );
}
