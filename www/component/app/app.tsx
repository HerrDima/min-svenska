import {StrictMode} from 'react';
import {AudioPlayerControlSprite} from 'react-audio-player-pro';

import {ErrorBoundary} from '../error-boundary/error-boundary';

import {NavigationContextType} from '../../client-component/navigation/navigation-context/navigation-context-type';
import {ArticleContextType} from '../../client-component/article/article-context/article-context-type';
import {ShareButtonSprite} from '../../client-component/share/share-button/share-button-sprite';
import {ThemeProvider} from '../../provider/theme/theme-context';
import {GdprInfo} from '../../layout/gdpr-info/gdpr-info';
import {ThemeNameEnum} from '../../provider/theme/theme-context-type';

import {AppProvider} from './app-provider';
import {AppRouting} from './app-routing';

export type AppPropsType = {
    articleData: ArticleContextType | null;
    defaultThemeName: ThemeNameEnum | null;
    navigationData: NavigationContextType | null;
    url: string;
};

export function App(props: AppPropsType): JSX.Element {
    const {url, navigationData, articleData, defaultThemeName} = props;

    return (
        <StrictMode>
            <ErrorBoundary errorFallBack={<h1>Front-end error</h1>}>
                <ThemeProvider defaultThemeName={defaultThemeName}>
                    <AppProvider articleData={articleData} navigationData={navigationData}>
                        <AppRouting url={url} />
                        <GdprInfo />
                    </AppProvider>

                    <AudioPlayerControlSprite />
                    <ShareButtonSprite />
                </ThemeProvider>
            </ErrorBoundary>
        </StrictMode>
    );
}
