import {ReactNode} from 'react';

import {LocalizationProvider} from '../../provider/locale/locale-context';
import {UserProvider} from '../../provider/user/user-context';
import {NavigationProvider} from '../../client-component/navigation/navigation-context/navigation-context';
import {NavigationContextType} from '../../client-component/navigation/navigation-context/navigation-context-type';
import {ArticleProvider} from '../../client-component/article/article-context/article-context';
import {ArticleContextType} from '../../client-component/article/article-context/article-context-type';

type PropsType = {
    articleData: ArticleContextType | null;
    children: ReactNode;
    navigationData: NavigationContextType | null;
};

export function AppProvider(props: PropsType): JSX.Element {
    const {children, navigationData, articleData} = props;

    return (
        <UserProvider>
            <NavigationProvider navigationData={navigationData}>
                <ArticleProvider articleData={articleData}>
                    <LocalizationProvider>{children}</LocalizationProvider>
                </ArticleProvider>
            </NavigationProvider>
        </UserProvider>
    );
}
