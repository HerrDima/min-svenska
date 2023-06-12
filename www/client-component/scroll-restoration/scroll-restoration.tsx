/* global window, document, requestAnimationFrame, sessionStorage */

import {useEffect, useState, useCallback, useContext} from 'react';
import {useLocation} from 'react-router-dom';

import {debounce} from '../../util/function';
import {classNames} from '../../util/css';
import {ArticleContextType} from '../article/article-context/article-context-type';
import {articleContext} from '../article/article-context/article-context';
import {useLocale} from '../../provider/locale/locale-context';

import {getAbsoluteScrollTop, getRelativeScrollTop, smoothScrollToTop} from './scroll-restoration-helper';
import scrollRestorationStyle from './scroll-restoration.scss';

export function ScrollRestoration(): JSX.Element {
    const topScrollPositionToShowToTopButton = 100;
    const {getLocalizedString} = useLocale();
    const {pathname} = useLocation();
    const [scrollTop, setScrollTop] = useState<number>(0);
    const getItemKey = useCallback((): string => 'ScrollRestoration:' + pathname, [pathname]);
    const {isInProgressArticle} = useContext<ArticleContextType>(articleContext);

    useEffect(() => {
        if (isInProgressArticle) {
            return;
        }

        requestAnimationFrame(() => {
            const relativeScrollTop = Number.parseFloat(sessionStorage.getItem(getItemKey()) || '0') || 0;
            const absoluteScrollTop = getAbsoluteScrollTop(relativeScrollTop);

            document.documentElement.scrollTop = absoluteScrollTop;
        });
    }, [getItemKey, isInProgressArticle]);

    useEffect(() => {
        const debouncedChangeScrollTopPosition = debounce<[]>(() => {
            const {documentElement} = document;

            sessionStorage.setItem(getItemKey(), getRelativeScrollTop().toString(10));

            setScrollTop(documentElement.scrollTop);
        }, 150);

        window.addEventListener('scroll', debouncedChangeScrollTopPosition, {
            capture: false,
            passive: true,
        });

        return () => {
            window.removeEventListener('scroll', debouncedChangeScrollTopPosition);
        };
    }, [getItemKey]);

    return (
        <button
            className={classNames(scrollRestorationStyle.scroll_restoration__scroll_to_top_button, {
                [scrollRestorationStyle.scroll_restoration__scroll_to_top_button__visible]:
                    scrollTop > topScrollPositionToShowToTopButton,
            })}
            onClick={smoothScrollToTop}
            title={getLocalizedString('UI__TO_TOP')}
            type="button"
        >
            <span className={scrollRestorationStyle.scroll_restoration__scroll_to_top_button__arrow} />
        </button>
    );
}
