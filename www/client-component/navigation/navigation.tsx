import {useCallback, useContext} from 'react';
import {Link} from 'react-router-dom';

import {Locale} from '../../provider/locale/locale-context';
import {getArticleLinkToViewClient} from '../article/article-helper';
import {ArticlePreviewType} from '../../../server/article/article-type';
import {rootArticleSlug} from '../../../server/article/article-const';
import {ArticleContextType} from '../article/article-context/article-context-type';
import {articleContext} from '../article/article-context/article-context';
import {classNames} from '../../util/css';

import {NavigationContextType} from './navigation-context/navigation-context-type';
import {navigationContext} from './navigation-context/navigation-context';
import navigationStyle from './navigation.scss';

export function Navigation(): JSX.Element {
    const navigationContextData = useContext<NavigationContextType>(navigationContext);
    const {article, breadcrumbs} = useContext<ArticleContextType>(articleContext);
    const {slug: currentArticleSlug} = article;
    const {itemList} = navigationContextData;
    const [ignoredHomeItem, sectionItem] = breadcrumbs;

    const renderNavigationListItem = useCallback(
        (menuItem: ArticlePreviewType, index: number): JSX.Element => {
            const {slug, title} = menuItem;
            const isActiveLink = currentArticleSlug === slug || sectionItem?.slug === slug;

            return (
                <li className={navigationStyle.navigation_list_item} key={`${slug}-${String(index)}`}>
                    <Link
                        className={classNames(navigationStyle.navigation_link, {
                            [navigationStyle.navigation_link_active]: isActiveLink,
                        })}
                        to={getArticleLinkToViewClient(slug)}
                    >
                        {title}
                    </Link>
                </li>
            );
        },
        [currentArticleSlug, sectionItem]
    );

    return (
        <nav className={navigationStyle.navigation}>
            <ul className={navigationStyle.navigation_list}>
                <li className={navigationStyle.navigation_list_item}>
                    <Link
                        className={classNames(navigationStyle.navigation_link, {
                            [navigationStyle.navigation_link_active]: currentArticleSlug === rootArticleSlug,
                        })}
                        to={getArticleLinkToViewClient(rootArticleSlug)}
                    >
                        <Locale stringKey="NAVIGATION__HOME" />
                    </Link>
                </li>
                {itemList.map(renderNavigationListItem)}
            </ul>
        </nav>
    );
}
