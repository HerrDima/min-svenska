/* global ARTICLE_DATA */
import {createContext, useEffect, useState} from 'react';

import {isBrowser} from '../../../util/system';
import {getArticleContextBySlug} from '../../../service/article/article-api';
import {useMakeExecutableState} from '../../../util/function';

import {ArticleContextType} from './article-context-type';
import {defaultArticleContextData} from './article-context-const';
import {articleContextDom} from './article-context-dom';

export const articleContext = createContext<ArticleContextType>(defaultArticleContextData);

const {Provider: ArticleContextProvider} = articleContext;

type ArticleProviderPropsType = {
    articleData: ArticleContextType | null;
    children: Array<JSX.Element> | JSX.Element;
};

export function ArticleProvider(props: ArticleProviderPropsType): JSX.Element {
    const {children, articleData: passedArticleData} = props;
    const [articleData, setArticleData] = useState<ArticleContextType>(
        typeof ARTICLE_DATA === 'string' ? JSON.parse(decodeURIComponent(ARTICLE_DATA)) : defaultArticleContextData
    );
    const [slug, setSlug] = useState<string>(articleData.article.slug);

    const {execute: fetchArticle, isInProgress: isInProgressArticle} = useMakeExecutableState<
        Parameters<typeof getArticleContextBySlug>,
        ArticleContextType
    >(getArticleContextBySlug);

    useEffect(() => {
        console.log('fetch data about article, slug:', slug);
        if (slug === articleData.article.slug) {
            // eslint-disable-next-line promise/catch-or-return
            return;
        }
        fetchArticle(slug).then(setArticleData).catch(console.error);
    }, [slug, fetchArticle, articleData.article.slug]);

    useEffect(() => {
        articleContextDom(articleData);
    }, [articleData]);

    const resultData: ArticleContextType = (isBrowser ? articleData : passedArticleData) || defaultArticleContextData;

    return (
        <ArticleContextProvider value={{...resultData, isInProgressArticle, setSlug}}>
            {children}
        </ArticleContextProvider>
    );
}
