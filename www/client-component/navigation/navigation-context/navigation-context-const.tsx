import {ArticleTypeEnum} from '../../../../server/article/article-type';

import {NavigationContextType} from './navigation-context-type';

export const defaultNavigationContextData: NavigationContextType = {
    itemList: [
        {
            articleType: ArticleTypeEnum.article,
            fileList: [],
            isActive: true,
            slug: 'header-1',
            title: 'Header 1',
            titleImage: '',
        },
        {
            articleType: ArticleTypeEnum.article,
            fileList: [],
            isActive: true,
            slug: 'header-2',
            title: 'Header 2',
            titleImage: '',
        },
        {
            articleType: ArticleTypeEnum.article,
            fileList: [],
            isActive: true,
            slug: 'header-3',
            title: 'Header 3',
            titleImage: '',
        },
    ],
};
