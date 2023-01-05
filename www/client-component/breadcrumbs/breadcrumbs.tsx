import {useContext, useCallback} from 'react';
import {Link} from 'react-router-dom';

import {ArticleContextType} from '../article/article-context/article-context-type';
import {articleContext} from '../article/article-context/article-context';
import {ArticlePreviewType} from '../../../server/article/article-type';
import {getArticleLinkToViewClient} from '../article/article-helper';

import breadcrumbsStyle from './breadcrumbs.scss';

export function Breadcrumbs(): JSX.Element {
    const {breadcrumbs, article} = useContext<ArticleContextType>(articleContext);

    const renderLink = useCallback((articlePreview: ArticlePreviewType, index: number): JSX.Element => {
        const {slug, title} = articlePreview;

        return (
            <li className={breadcrumbsStyle.breadcrumbs_list_item} key={`${slug}-${String(index)}`}>
                <Link className={breadcrumbsStyle.breadcrumbs_link} to={getArticleLinkToViewClient(slug)}>
                    {title}
                </Link>
                <span className={breadcrumbsStyle.breadcrumbs_separator}>/</span>
            </li>
        );
    }, []);

    const linkList = breadcrumbs.map<JSX.Element>(renderLink);

    return (
        <ul className={breadcrumbsStyle.breadcrumbs_list}>
            {linkList}
            <li className={breadcrumbsStyle.breadcrumbs_list_item}>
                <span className={breadcrumbsStyle.breadcrumbs_tail}>{article.title}</span>
            </li>
        </ul>
    );
}
