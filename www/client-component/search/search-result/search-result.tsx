import {SearchArticleType} from '../search-type';
import {Spinner} from '../../../layout/spinner/spinner';
import {Locale} from '../../../provider/locale/locale-context';
import {classNames} from '../../../util/css';

import searchResultStyle from './search-result.scss';
import {sortSearchArticle} from './search-result-helper';
import {SearchResultLink} from './search-result-link/search-result-link';

type SearchResultPropsType = {
    className?: string;
    isLoading: boolean;
    list: Array<SearchArticleType>;
    minLetters: number;
    searchString: string;
};

export function SearchResult(props: SearchResultPropsType): JSX.Element {
    const {isLoading, list, searchString, minLetters, className = ''} = props;
    const fullClassName = classNames(searchResultStyle.search_result_wrapper, className);

    if (isLoading) {
        return (
            <div className={fullClassName}>
                <div className={searchResultStyle.search_result__loading}>
                    <Spinner isShow wrapperColor="transparent" />
                </div>
            </div>
        );
    }

    if (searchString.length < minLetters) {
        return (
            <div className={fullClassName}>
                <p className={searchResultStyle.search_result__just_text}>
                    <Locale stringKey="SEARCH__REQUEST_TOO_SHORT" />
                </p>
            </div>
        );
    }

    if (list.length === 0) {
        return (
            <div className={fullClassName}>
                <p className={searchResultStyle.search_result__just_text}>
                    <Locale stringKey="SEARCH__NOTHING_FOUND" />
                </p>
            </div>
        );
    }

    return (
        <div className={fullClassName}>
            <ul className={searchResultStyle.search_result__list}>
                {list.sort(sortSearchArticle).map<JSX.Element>((searchArticle: SearchArticleType): JSX.Element => {
                    const {slug} = searchArticle;

                    return (
                        <li className={searchResultStyle.search_result__list_item} key={slug}>
                            <SearchResultLink searchArticle={searchArticle} searchString={searchString} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
