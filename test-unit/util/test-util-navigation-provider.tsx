import {BrowserRouter, Route, Routes} from 'react-router-dom';

type NavigationProviderPropsType = {
    component: () => JSX.Element;
};

export function TestUtilNavigationProvider(props: NavigationProviderPropsType): JSX.Element {
    const {component: Page} = props;

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Page />} path="/" />
            </Routes>
        </BrowserRouter>
    );
}
