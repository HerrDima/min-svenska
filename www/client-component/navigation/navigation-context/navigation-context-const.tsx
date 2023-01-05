import {ArticleTypeEnum} from '../../../../server/article/article-type';

import {makeDefaultArticleFile} from '../../../../server/article/article-helper';

import {NavigationContextType} from './navigation-context-type';

export const defaultNavigationContextData: NavigationContextType = {
    itemList: [
        {
            articleType: ArticleTypeEnum.article,
            fileList: [],
            isActive: true,
            slug: 'header-1',
            title: 'Header 1',
            titleImage: makeDefaultArticleFile(),
        },
        {
            articleType: ArticleTypeEnum.article,
            fileList: [],
            isActive: true,
            slug: 'header-2',
            title: 'Header 2',
            titleImage: makeDefaultArticleFile(),
        },
        {
            articleType: ArticleTypeEnum.article,
            fileList: [],
            isActive: true,
            slug: 'header-3',
            title: 'Header 3',
            titleImage: makeDefaultArticleFile(),
        },
    ],
};
