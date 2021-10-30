import {BrowserRouter, Route, Switch, StaticRouter} from 'react-router-dom';

import {Home} from '../../page/home/home';
import {Info} from '../../page/info/info';
import {Error404} from '../../page/error-404/error-404';

import {appRoute} from './app-route';

export function AppRouting(): JSX.Element {
    const switchNode = (
        <Switch>
            <Route component={Home} exact path={appRoute.root.path} />
            <Route component={Info} exact path={appRoute.info.path} />

            <Route component={Error404} />
        </Switch>
    );

    if (typeof window === 'undefined') {
        return <StaticRouter>{switchNode}</StaticRouter>;
    }

    return <BrowserRouter>{switchNode}</BrowserRouter>;
}
