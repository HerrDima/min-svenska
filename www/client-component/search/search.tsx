/* global HTMLInputElement, document, MouseEvent, HTMLDivElement */

import {SyntheticEvent, useCallback, useEffect, useRef, useState} from 'react';

import {PaginationResultType} from '../../../server/data-base/data-base-type';
import {noop, useMakeExecutableState} from '../../util/function';
import {getArticleClientListPaginationPick} from '../../service/article/article-api';
import {useLocale} from '../../provider/locale/locale-context';
import {classNames} from '../../util/css';
import {useHotKey} from '../../util/hot-key';

import {articlePreviewKeyList} from './search-const';
import {SearchArticleType} from './search-type';
import searchStyle from './search.scss';
import {SearchResult} from './search-result/search-result';

type SearchPropsType = {
    className?: string;
    onChangeFocus?: (hasFocus: boolean) => void;
};

export function Search(props: SearchPropsType): JSX.Element {
    const {className = '', onChangeFocus = noop} = props;
    const wrapperRef = useRef<HTMLDivElement>(null);
    const {getLocalizedString} = useLocale();
    const [hasFocus, setHasFocus] = useState<boolean>(false);
    const minLetters = 3;
    const forceBlur = useCallback(() => setHasFocus(false), []);
    const forceFocus = useCallback(() => setHasFocus(true), []);

    useHotKey([], 'Escape', forceBlur);

    useEffect(() => {
        function handleBodyOnClick(evt: MouseEvent) {
            const hasWrapperInPath = Boolean(wrapperRef.current && evt.composedPath().includes(wrapperRef.current));

            if (hasWrapperInPath) {
                return;
            }

            forceBlur();
        }

        document.body.addEventListener('click', handleBodyOnClick, false);

        return () => {
            document.body.removeEventListener('click', handleBodyOnClick, false);
        };
    }, [forceBlur]);

    const {
        execute: executeArticleList,
        result: resultArticleList,
        isInProgress: isInProgressArticleList,
    } = useMakeExecutableState<
        Parameters<typeof getArticleClientListPaginationPick<keyof SearchArticleType>>,
        PaginationResultType<SearchArticleType>
    >(getArticleClientListPaginationPick);

    const [searchString, setSearchString] = useState<string>('');

    const handleInput = useCallback((evt: SyntheticEvent<HTMLInputElement>) => {
        setSearchString(evt.currentTarget.value.trim());
    }, []);

    useEffect(() => {
        if (searchString.length >= minLetters) {
            executeArticleList(
                {
                    pageIndex: 0,
                    pageSize: 0,
                    query: {
                        title: {
                            $regex: searchString,
                            $regexFlag: 'gi',
                        },
                    },
                    sort: {title: 1},
                },
                articlePreviewKeyList
            );
        }
    }, [searchString, executeArticleList]);

    useEffect(() => {
        onChangeFocus(hasFocus);
    }, [hasFocus, onChangeFocus]);

    return (
        <div className={classNames(searchStyle.search_wrapper, className)} ref={wrapperRef}>
            <input
                className={searchStyle.search_input}
                onFocus={forceFocus}
                onInput={handleInput}
                placeholder={getLocalizedString('UI__SEARCH_PLACEHOLDER')}
                type="text"
            />

            <button
                className={classNames(searchStyle.search_icon, {[searchStyle.search_icon__focused]: hasFocus})}
                onClick={forceBlur}
                type="button"
            />

            {hasFocus && searchString.trim() ? (
                <div className={searchStyle.result_wrapper}>
                    <SearchResult
                        isLoading={isInProgressArticleList}
                        list={resultArticleList?.result || []}
                        minLetters={minLetters}
                        searchString={searchString}
                    />
                </div>
            ) : null}
        </div>
    );
}
