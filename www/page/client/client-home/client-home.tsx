// import {useSystem} from 'react-system-hook';
import {useContext} from 'react';

import {ArticleContextType} from '../../../client-component/article/article-context/article-context-type';
import {articleContext} from '../../../client-component/article/article-context/article-context';
import {Page} from '../../../client-component/page/page';
import {ArticlePreviewList} from '../../../client-component/article-preview-list/article-preview-list';
import {Markdown} from '../../../layout/markdown/markdown';
import {PageHeader} from '../../../client-component/page-header/page-header';
import {copyrightName} from '../../../const';
import {SubDocumentListViewTypeEnum} from '../../../../server/article/article-type';

// eslint-disable-next-line max-statements
export function ClientHome(): JSX.Element {
    const {article, childList} = useContext<ArticleContextType>(articleContext);
    const {content, title} = article;

    return (
        <Page>
            <PageHeader>{copyrightName}</PageHeader>
            <ArticlePreviewList childList={childList} previewStyle={SubDocumentListViewTypeEnum.headerImage} />
            <Markdown articleTitle={title} mdInput={content} />
        </Page>
    );
}
