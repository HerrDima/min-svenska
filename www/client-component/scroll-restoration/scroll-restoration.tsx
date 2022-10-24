/* global window, requestAnimationFrame, sessionStorage, sessionStorage */

import {useState, useEffect} from 'react';
import {useLocation} from 'react-router';

import {PromiseResolveType} from '../../util/promise';
import {debounce} from '../../util/function';
import {classNames} from '../../util/css';
import {useStaticNumberState} from "../../util/use-static-state";

import scrollRestorationStyle from './scroll-restoration.scss';

const topScrollPositionToShowToTopButton = 100;

const storageKeyPrefix = 'scroll-restoration-path:';

export function ScrollRestoration(): JSX.Element {
    const [isToTopButtonVisible, setIsToTopButtonVisible] = useState<boolean>(false);
    const {pathname} = useLocation();
    const [scrollTop, setScrollTop] = useStaticNumberState(0, 'scroll-top/' + pathname);

    function getItemKey(): string {
        return storageKeyPrefix + pathname;
    }

    function restoreScrollTopPosition(): Promise<void> {
        const {documentElement} = window.document;

        return new Promise((resolve: PromiseResolveType<void>) => {
            requestAnimationFrame(() => {
                // TODO: check for 'scroll' event was fired
                documentElement.scrollTop = scrollTop;

                requestAnimationFrame(() => {
                    documentElement.scrollTop = scrollTop;

                    refreshIsToTopButtonVisible();

                    resolve();
                });
            });
        });
    }

    useEffect(() => {
        restoreScrollTopPosition();

        const debouncedChangeScrollTopPosition = debounce<[]>(handleChangeScrollTopPosition, 150);

        window.addEventListener('scroll', debouncedChangeScrollTopPosition, {
            capture: false,
            passive: true,
        });

        return () => {
            window.removeEventListener('scroll', debouncedChangeScrollTopPosition);
        }
    }, []);

    function refreshIsToTopButtonVisible() {
        const {scrollTop} = window.document.documentElement;
        const isToTopButtonVisible = scrollTop > topScrollPositionToShowToTopButton;

        setIsToTopButtonVisible(isToTopButtonVisible);
    }


    useEffect(() => {
        restoreScrollTopPosition();
    }, [pathname]);

    function handleChangeScrollTopPosition() {
        refreshIsToTopButtonVisible();
        saveScrollTopPosition();
    }


    function saveScrollTopPosition() {
        const {scrollTop} = window.document.documentElement;

        sessionStorage.setItem(getItemKey(), String(scrollTop));
    }

    function handleScrollToTop() {
        window.document.documentElement.scrollTop = 0;

        handleChangeScrollTopPosition();
    }

    return (
        <button
            className={classNames(scrollRestorationStyle.scroll_restoration__scroll_to_top_button, {
                [scrollRestorationStyle.scroll_restoration__scroll_to_top_button__visible]: isToTopButtonVisible,
            })}
            onClick={handleScrollToTop}
            type="button"
        >
            <span className={scrollRestorationStyle.scroll_restoration__scroll_to_top_button__arrow}/>
        </button>
    );
}
