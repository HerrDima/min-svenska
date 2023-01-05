import {useState, useEffect, useCallback} from 'react';
import {Tree, Typography, List, Divider, message} from 'antd';
import {DataNode} from 'rc-tree/lib/interface';
import {DownOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';

import {CmsPage} from '../layout/cms-page/cms-page';
import {useMakeExecutableState} from '../../../util/function';
import {PaginationResultType} from '../../../../server/data-base/data-base-type';
import {getArticleListPaginationPick} from '../../../service/article/article-api';
import {Spinner} from '../../../layout/spinner/spinner';
import {Box} from '../../../layout/box/box';
import {getTickCross} from '../../../util/string';
import {getArticleLinkToEdit} from '../cms-article/cms-article-helper';
import {getArticleLinkToViewClient} from '../../../client-component/article/article-helper';

import {ArticleForTreeType} from './cms-article-tree-type';
import {keyForTreeList} from './cms-article-tree-const';
import {
    getArticleForTreeById,
    getArticleWithLostChildList,
    getArticleWithoutParentList,
    makeArticleTree,
} from './cms-article-tree-helper';

const {Title, Text} = Typography;
const {Item: ListItem} = List;

export function CmsArticleTree(): JSX.Element {
    const {execute: executeArticleListPaginationPick, isInProgress: isInProgressArticleListPagination} =
        useMakeExecutableState<
            Parameters<typeof getArticleListPaginationPick<keyof ArticleForTreeType>>,
            PaginationResultType<ArticleForTreeType>
        >(getArticleListPaginationPick);

    const [savedArticleList, setSavedArticleList] = useState<Array<ArticleForTreeType>>([]);

    useEffect(() => {
        executeArticleListPaginationPick({}, {pageIndex: 0, pageSize: 0, sort: {title: 1}}, keyForTreeList)
            .then((data: PaginationResultType<ArticleForTreeType>) => setSavedArticleList(data.list))
            .catch((error: Error) => {
                console.log(error);
                message.error('Can not fetch article list.');
            });
    }, [executeArticleListPaginationPick]);

    const tree: DataNode = makeArticleTree(savedArticleList);
    const articleWithoutParentList = getArticleWithoutParentList(savedArticleList);
    const articleWithLostChildList = getArticleWithLostChildList(savedArticleList);

    const renderArticleWithoutParent = useCallback(
        (articleWithoutParent: ArticleForTreeType, index: number): JSX.Element => {
            const {title, slug, isActive, articleType, id: articleId} = articleWithoutParent;

            return (
                <ListItem>
                    <Text>{index + 1}.&nbsp;</Text>
                    <Link to={getArticleLinkToViewClient(slug)}>{title}</Link>
                    {' | '}
                    <Link to={getArticleLinkToEdit(articleId)}>{slug}</Link>
                    {' | '}
                    <Text>
                        {articleType}&nbsp;{getTickCross(isActive)}
                    </Text>
                </ListItem>
            );
        },
        []
    );

    const renderArticleWithLostChild = useCallback(
        (articleWithLostChild: ArticleForTreeType, index: number): JSX.Element => {
            const {title, slug, isActive, articleType, id: articleId, subDocumentIdList} = articleWithLostChild;

            const lostIdList = subDocumentIdList
                .filter((lostId: string): boolean => !getArticleForTreeById(savedArticleList, lostId))
                .join(', ');

            return (
                <ListItem>
                    <Text>{index + 1}.&nbsp;</Text>
                    <Link to={getArticleLinkToViewClient(slug)}>{title}</Link>
                    {' | '}
                    <Link to={getArticleLinkToEdit(articleId)}>{slug}</Link>
                    {' | '}
                    <Text>
                        {articleType} {getTickCross(isActive)}
                    </Text>
                    {' | '}
                    <Text type="danger">Ids:&nbsp;{lostIdList}</Text>
                </ListItem>
            );
        },
        [savedArticleList]
    );

    console.log('%c[WARNING]: Article tree (does not work into <StrictMode/>)', 'color: #fff; background-color: #c00;');

    return (
        <CmsPage>
            <Title level={2}>Article tree</Title>

            <Divider orientation="left">
                Articles in a tree, total (include non-parents): {savedArticleList.length}
            </Divider>
            <Tree<DataNode>
                autoExpandParent
                defaultExpandAll
                showLine
                switcherIcon={<DownOutlined />}
                treeData={[tree]}
            />

            <Divider orientation="left">Articles without parent, total: {articleWithoutParentList.length}</Divider>
            <Box backgroundColor="#fff">
                <List<ArticleForTreeType>
                    bordered
                    dataSource={articleWithoutParentList}
                    renderItem={renderArticleWithoutParent}
                />
            </Box>

            <Divider orientation="left">Articles with lost children, total: {articleWithLostChildList.length}</Divider>
            <Box backgroundColor="#fff">
                <List<ArticleForTreeType>
                    bordered
                    dataSource={articleWithLostChildList}
                    renderItem={renderArticleWithLostChild}
                />
            </Box>

            <Spinner isShow={isInProgressArticleListPagination} position="absolute" />
        </CmsPage>
    );
}
