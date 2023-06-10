import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {StaticRouter} from 'react-router-dom/server';

import {isBrowser} from '../../util/system';
import {ClientHome} from '../../page/client/client-home/client-home';
import {Error404} from '../../page/service/error-404/error-404';
import {LoginAsync} from '../../page/service/login/login-async';
import {CmsArticleListAsync} from '../../page/cms/cms-article-list/cms-article-list-async';
import {CmsArticleTreeAsync} from '../../page/cms/cms-article-tree/cms-article-tree-async';
import {CmsArticleCreateAsync} from '../../page/cms/cms-article/cms-article-create/cms-article-create-async';
import {CmsArticleEditAsync} from '../../page/cms/cms-article/cms-article-edit/cms-article-edit-async';
import {ClientArticle} from '../../page/client/client-article/client-article';
import {Page} from '../../client-component/page/page';

import {appRoute} from './app-route';

type PropsType = {
    url: string;
};

export function AppRouting(props: PropsType): JSX.Element {
    const switchNode = (
        <Routes>
            <Route Component={ClientHome} path={appRoute.root.path} />
            <Route Component={ClientArticle} path={appRoute.article.path} />

            <Route Component={LoginAsync} path={appRoute.login.path} />

            <Route Component={CmsArticleListAsync} path={appRoute.articleList.path} />
            <Route Component={CmsArticleTreeAsync} path={appRoute.articleTree.path} />
            <Route Component={CmsArticleCreateAsync} path={appRoute.articleCreate.path} />
            <Route Component={CmsArticleEditAsync} path={appRoute.articleEdit.path} />

            <Route
                element={
                    <Page>
                        <Error404 />
                    </Page>
                }
                path="*"
            />
        </Routes>
    );

    if (isBrowser) {
        return <BrowserRouter>{switchNode}</BrowserRouter>;
    }

    const {url} = props;

    return <StaticRouter location={url}>{switchNode}</StaticRouter>;
}
