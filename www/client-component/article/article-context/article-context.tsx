/* global ARTICLE_DATA */
import {createContext, useEffect, useState} from 'react';

import {isBrowser} from '../../../util/system';
import {articleScriptSelector} from '../article-const';
import {removeBySelector} from '../../../util/dom';
import {getArticleContextBySlug} from '../../../service/article/article-api';
import {useMakeExecutableState} from '../../../util/function';

import {ArticleContextType} from './article-context-type';
import {defaultArticleContextData} from './article-context-const';

export const articleContext = createContext<ArticleContextType>(defaultArticleContextData);

const {Provider} = articleContext;

type ArticleProviderPropsType = {
    articleData: ArticleContextType | null;
    children: Array<JSX.Element> | JSX.Element;
};

export function ArticleProvider(props: ArticleProviderPropsType): JSX.Element {
    const {children, articleData: passedArticleData} = props;
    const [articleData, setArticleData] = useState<ArticleContextType>(
        typeof ARTICLE_DATA === 'string' ? JSON.parse(ARTICLE_DATA) : defaultArticleContextData
    );
    const [slug, setSlug] = useState<string>(articleData.article.slug);

    const {execute: fetchArticle, isInProgress: isInProgressArticle} = useMakeExecutableState<
        [string],
        ArticleContextType
    >(getArticleContextBySlug);

    useEffect(() => {
        console.info('fetch data about article, slug:', slug);
        if (slug.trim()) {
            // eslint-disable-next-line promise/catch-or-return
            fetchArticle(slug).then(setArticleData);
        }
    }, [slug, fetchArticle]);

    removeBySelector(articleScriptSelector);

    const resultData: ArticleContextType = (isBrowser ? articleData : passedArticleData) || defaultArticleContextData;

    return <Provider value={{...resultData, isInProgressArticle, setSlug}}>{children}</Provider>;
}
