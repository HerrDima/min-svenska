import {useState, useCallback} from 'react';
import {Link} from 'react-router-dom';

import {copyrightName} from '../../const';
import {appRoute} from '../../component/app/app-route';
import {Navigation} from '../navigation/navigation';
import {classNames} from '../../util/css';
import {Search} from '../search/search';
import {useLocale} from '../../provider/locale/locale-context';

import headerStyle from './header.scss';

export function Header(): JSX.Element {
    const {getLocalizedString} = useLocale();
    const [isNavigationOpen, setIsNavigationOpen] = useState<boolean>(false);
    const toggleNavigation = useCallback(() => {
        setIsNavigationOpen((isOpen: boolean): boolean => !isOpen);
    }, []);

    const [hasSearchFocus, setHasSearchFocus] = useState<boolean>(false);

    return (
        <>
            <header className={headerStyle.header}>
                <button
                    className={classNames({
                        [headerStyle.header__navigation_toggle_button__open]: isNavigationOpen,
                        [headerStyle.header__navigation_toggle_button__closed]: !isNavigationOpen,
                        [headerStyle.header__navigation_toggle_button__search_focused]: hasSearchFocus,
                    })}
                    onClick={toggleNavigation}
                    title={getLocalizedString('UI__MENU')}
                    type="button"
                >
                    &nbsp;
                </button>
                <Link
                    className={classNames(headerStyle.header__home_link, {
                        [headerStyle.header__header__home_link__search_focused]: hasSearchFocus,
                    })}
                    to={appRoute.root.path}
                >
                    <svg
                        className={headerStyle.header__home_icon}
                        shapeRendering="crispEdges"
                        viewBox="0 0 31 30"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            // eslint-disable-next-line max-len
                            d="M8 0h9M6 1h2M17 1h2M0 2h6M19 2h6M0 3h1M24 3h1M0 4h1M24 4h1M1 5h1M23 5h1M1 6h1M23 6h1M2 7h1M22 7h1M3 8h1M21 8h1M3 9h1M21 9h1M3 10h1M6 10h2M9 10h1M15 10h2M18 10h1M21 10h1M3 11h1M6 11h4M15 11h4M21 11h1M4 12h1M7 12h2M11 12h1M13 12h1M16 12h2M20 12h1M4 13h1M12 13h1M20 13h1M5 14h1M19 14h1M6 15h13M8 16h1M19 16h1M7 17h1M20 17h1M25 17h3M7 18h1M21 18h1M25 18h1M28 18h1M7 19h1M22 19h1M26 19h1M29 19h1M7 20h1M22 20h1M27 20h1M30 20h1M7 21h1M23 21h1M27 21h1M30 21h1M8 22h1M16 22h1M23 22h1M26 22h1M29 22h1M8 23h1M16 23h1M23 23h1M26 23h1M28 23h1M8 24h1M12 24h1M16 24h1M23 24h1M25 24h1M28 24h1M8 25h1M12 25h1M16 25h1M23 25h2M27 25h1M9 26h1M12 26h1M15 26h1M23 26h1M26 26h1M9 27h1M12 27h1M15 27h1M23 27h1M25 27h1M9 28h1M12 28h1M15 28h1M22 28h3M10 29h2M13 29h2M16 29h6"
                            stroke="#020202"
                        />
                        <path d="M8 1h1M6 2h1M12 29h1" stroke="#fefefe" />
                        <path
                            // eslint-disable-next-line max-len
                            d="M9 1h8M17 2h2M19 3h5M19 4h5M18 5h1M19 6h1M20 7h1M20 8h1M20 9h1M20 10h1M20 11h1M19 12h1M19 13h1M15 14h4M18 16h1M19 17h1M20 18h1M26 18h2M21 19h1M28 19h1M21 20h1M29 20h1M22 21h1M29 21h1M15 22h1M22 22h1M28 22h1M15 23h1M22 23h1M27 23h1M11 24h1M15 24h1M22 24h1M27 24h1M11 25h1M15 25h1M22 25h1M26 25h1M11 26h1M22 26h1M25 26h1M11 27h1M14 27h1M22 27h1M24 27h1M11 28h1M13 28h2"
                            stroke="#d4dcdf"
                        />
                        <path
                            // eslint-disable-next-line max-len
                            d="M7 2h10M1 3h18M1 4h18M6 5h12M5 6h14M4 7h16M4 8h16M4 9h16M4 10h2M8 10h1M10 10h5M17 10h1M19 10h1M4 11h2M10 11h5M19 11h1M5 12h2M9 12h2M12 12h1M14 12h2M18 12h1M5 13h1M9 13h3M13 13h3M6 14h9M9 16h9M8 17h11M8 18h12M8 19h13M27 19h1M8 20h13M28 20h1M8 21h14M28 21h1M9 22h6M17 22h5M27 22h1M9 23h6M17 23h5M9 24h2M13 24h2M17 24h5M26 24h1M9 25h2M13 25h2M17 25h5M25 25h1M10 26h1M13 26h1M16 26h6M24 26h1M10 27h1M13 27h1M16 27h6"
                            stroke="#ffffff"
                        />
                        <path d="M2 5h4M19 5h4M2 6h3M20 6h3M3 7h1M21 7h1M6 13h3M16 13h3" stroke="#f87d82" />
                        <path d="M14 26h1M10 28h1M16 28h6" stroke="#d4dbe1" />
                    </svg>
                    {/*

                    <img
                        alt={copyrightName}
                        src="https://placekitten.com/72/72"
                    />
*/}
                    <span className={headerStyle.header__home_text}>{copyrightName}</span>
                </Link>
                <div
                    className={classNames(headerStyle.header__search, {
                        [headerStyle.header__search__focused]: hasSearchFocus,
                    })}
                >
                    <Search onChangeFocus={setHasSearchFocus} />
                </div>
            </header>
            <div
                className={classNames(headerStyle.header__navigation_wrapper, {
                    [headerStyle.header__navigation_wrapper__open]: isNavigationOpen,
                })}
            >
                <Navigation />
            </div>
        </>
    );
}
