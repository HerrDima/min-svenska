import {useState, useCallback} from 'react';
import {Link} from 'react-router-dom';

import {copyrightName} from '../../const';
import {appRoute} from '../../component/app/app-route';
import {Navigation} from '../navigation/navigation';
import {classNames} from '../../util/css';
import {Search} from '../search/search';
import {useLocale} from '../../provider/locale/locale-context';

import headerStyle from './header.scss';
import {HeaderLogo} from './header-logo';

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
                    <HeaderLogo className={headerStyle.header__home_icon} />
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
