import {useContext} from 'react';
import {Link} from 'react-router-dom';

import {Locale} from '../../provider/locale/locale-context';
import {ArticleContextType} from '../article/article-context/article-context-type';
import {articleContext} from '../article/article-context/article-context';
import {ArticlePreviewType} from '../../../server/article/article-type';
import {getArticleLinkToViewClient} from '../article/article-helper';

import siblingsStyle from './siblings.scss';

export function Siblings(): JSX.Element {
    const {siblingList} = useContext<ArticleContextType>(articleContext);

    return (
        <div className={siblingsStyle.siblings}>
            <p className={siblingsStyle.siblings_header}>
                <Locale stringKey="SEE_ALSO__HEADER" />
            </p>
            <ul className={siblingsStyle.siblings_list}>
                {siblingList.map((articlePreview: ArticlePreviewType, index: number): JSX.Element => {
                    const {slug, title} = articlePreview;

                    return (
                        <li className={siblingsStyle.siblings_list_item} key={`${slug}-${String(index)}`}>
                            <Link className={siblingsStyle.siblings_link} to={getArticleLinkToViewClient(slug)}>
                                {title}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
