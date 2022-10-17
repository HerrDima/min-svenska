import {ArticlePreviewType, SubDocumentListViewTypeEnum} from '../../../server/article/article-type';

import articlePreviewListStyle from './article-preview-list.scss';
import {ArticlePreview} from './article-preview/article-preview';

type ChildListPropsType = {
    childList: Array<ArticlePreviewType>;
    previewStyle: SubDocumentListViewTypeEnum;
};

export function ArticlePreviewList(props: ChildListPropsType): JSX.Element {
    const {childList, previewStyle} = props;

    if (childList.length === 0) {
        return <div />;
    }

    return (
        <ul className={articlePreviewListStyle.article_preview_list}>
            {childList.map((articlePreview: ArticlePreviewType): JSX.Element => {
                return (
                    <li className={articlePreviewListStyle.article_preview_list_item} key={articlePreview.slug}>
                        <ArticlePreview articlePreview={articlePreview} previewStyle={previewStyle} />
                    </li>
                );
            })}
        </ul>
    );
}
