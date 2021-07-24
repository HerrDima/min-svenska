/* global setTimeout */

import {lazy, Suspense, useState, useEffect} from 'react';

import {Locale} from '../../provider/locale/locale';
import {useLocale} from '../../provider/locale/locale-hook';
import {Spinner} from '../../layout/spinner/spinner';
import {ErrorData} from '../../layout/error-data/error-data';
import {useSystem} from '../../hook/system-hook/system-hook';
import {NavigationLink} from '../../hook/url-hook/navigation-link';
import {appRoute} from '../../component/app/app-route';

import pngImageSrc from './image/marker-icon-2x.png';
import svgImageSrc, {ReactComponent as SvgAsReactComponent} from './image/questions-with-an-official-answer.svg';
import homeStyle from './home.scss';

console.log(ErrorData);

const LoadMeAsyncLazy = lazy(
    () =>
        import(
            /* webpackChunkName: 'load-me-async-lazy' */
            '../../component/load-me-async-lazy/load-me-async-lazy'
        )
);

export function Home(): JSX.Element {
    const {getLocalizedString} = useLocale();
    const {screen} = useSystem();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    setTimeout(() => {
        console.log(isOpen);
        setIsOpen(false);
    }, 1e3);

    useEffect(() => {
        console.log('home');
    });

    console.log('evaluate home');

    return (
        <div>
            <h1 className={homeStyle.home_header}>home page</h1>

            <NavigationLink to={appRoute.info.path}>to info</NavigationLink>

            <pre>{JSON.stringify(screen, null, 4)}</pre>

            <Locale stringKey="BUTTON__APPLY" />

            <h4>{getLocalizedString('BUTTON__APPLY')}</h4>

            <img alt="" src={pngImageSrc} />

            <img alt="" src={svgImageSrc} />

            <SvgAsReactComponent />

            <Suspense fallback={<Spinner position="absolute" />}>
                <LoadMeAsyncLazy smth="home" />
            </Suspense>
        </div>
    );
}
