import {useEffect} from 'react';
import {Typography, message} from 'antd';
import {useParams} from 'react-router-dom';

import {CmsArticle} from '../cms-article';
import {CmsArticleModeEnum} from '../cms-article-const';
import {ArticleType} from '../../../../../server/article/article-type';
import {getArticleListPagination, postArticleUpdate} from '../../../../service/article/article-api';
import {useMakeExecutableState} from '../../../../util/function';
import {Spinner} from '../../../../layout/spinner/spinner';
import {CmsPage} from '../../layout/cms-page/cms-page';
import {PaginationResultType} from '../../../../../server/data-base/data-base-type';
import {IsRender} from '../../../../layout/is-render/is-render';

const {Title} = Typography;

export function CmsArticleEdit(): JSX.Element {
    const {articleId} = useParams<'articleId'>();

    const {
        execute: articleById,
        isInProgress: isInProgressArticleById,
        result: articleByIdResult,
    } = useMakeExecutableState<Parameters<typeof getArticleListPagination>, PaginationResultType<ArticleType>>(
        getArticleListPagination
    );

    useEffect(() => {
        articleById(
            {id: articleId || ''},
            {
                pageIndex: 0,
                pageSize: 1,
                sort: {title: 1},
            }
        );
    }, [articleById, articleId]);

    const {execute: updateArticle, isInProgress: isInProgressUpdateArticle} = useMakeExecutableState<
        Parameters<typeof postArticleUpdate>,
        ArticleType
    >(postArticleUpdate);

    function handleOnFinish(article: ArticleType) {
        updateArticle(article)
            .then((savedArticle: ArticleType) => {
                console.log(savedArticle);
                message.success('Article has been updated!');
            })
            .catch((requestError: Error) => {
                message.error(`ERROR: ${requestError.message}`);
            });
    }

    const articleToEdit: ArticleType | null = articleByIdResult?.list[0] || null;

    if (articleToEdit === null) {
        return (
            <CmsPage key="no-article">
                <IsRender isRender={isInProgressArticleById}>
                    <Title level={2}>Edit an article: {articleId}</Title>
                    <Spinner isShow={isInProgressArticleById} position="fixed" />
                </IsRender>
                <IsRender isRender={!isInProgressArticleById}>
                    <Title level={2}>Can not found article by id: {articleId}</Title>
                </IsRender>
            </CmsPage>
        );
    }

    return (
        <CmsPage key={articleId}>
            <Title level={2}>Edit an article: {articleId}</Title>
            <CmsArticle article={articleToEdit} mode={CmsArticleModeEnum.edit} onFinish={handleOnFinish} />
            <Spinner isShow={isInProgressUpdateArticle} position="fixed" />
        </CmsPage>
    );
}
