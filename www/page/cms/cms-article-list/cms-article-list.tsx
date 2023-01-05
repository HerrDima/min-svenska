import {useEffect, useState} from 'react';
import {Table, Typography} from 'antd';
import {TablePaginationConfig, FilterValue, SorterResult, TableCurrentDataSource} from 'antd/es/table/interface';

import {useMakeExecutableState} from '../../../util/function';
import {PaginationQueryType, PaginationResultType} from '../../../../server/data-base/data-base-type';
import {getArticleListPaginationPick} from '../../../service/article/article-api';
import {CmsPage} from '../layout/cms-page/cms-page';

import {getArticleTableColumnList, keyForTableListList} from './cms-article-list-const';
import {ArticleForTableListKeysType, ArticleForTableListType, SortDirectionEnum} from './cms-article-list-type';

const {Title} = Typography;

export function CmsArticleList(): JSX.Element {
    const defaultPageSize = 10;
    const [searchedColumn, setSearchedColumn] = useState<ArticleForTableListKeysType>('title');
    const [searchText, setSearchText] = useState<string>('');

    // article for table
    const {
        execute: executeArticleList,
        result: resultArticleList,
        isInProgress: isInProgressArticleList,
    } = useMakeExecutableState<
        Parameters<typeof getArticleListPaginationPick<keyof ArticleForTableListType>>,
        PaginationResultType<ArticleForTableListType>
    >(getArticleListPaginationPick);

    const [paginationArticleList, setPaginationArticleList] = useState<PaginationQueryType<ArticleForTableListType>>({
        pageConfig: {
            pageIndex: 0,
            pageSize: defaultPageSize,
            sort: {title: 1},
        },
        query: {},
    });

    useEffect(() => {
        executeArticleList(paginationArticleList.query, paginationArticleList.pageConfig, keyForTableListList);
    }, [executeArticleList, paginationArticleList]);

    useEffect(() => {
        setPaginationArticleList(
            (
                currentPagination: PaginationQueryType<ArticleForTableListType>
            ): PaginationQueryType<ArticleForTableListType> => {
                const rawDirection = String({...currentPagination.pageConfig.sort}[String(searchedColumn)]);
                const sortDirection = rawDirection === SortDirectionEnum.descend ? -1 : 1;
                const {pageSize} = currentPagination.pageConfig;

                return {
                    pageConfig: {
                        pageIndex: 0,
                        pageSize,
                        sort: {[String(searchedColumn)]: sortDirection},
                    },
                    query: {[searchedColumn]: new RegExp(searchText, 'i').toString()},
                };
            }
        );
    }, [searchedColumn, searchText]);

    // eslint-disable-next-line complexity, max-statements
    function handleTableChange(
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: Array<SorterResult<ArticleForTableListType>> | SorterResult<ArticleForTableListType>,
        extra: TableCurrentDataSource<ArticleForTableListType>
    ) {
        const firstSorter: SorterResult<ArticleForTableListType> | void = Array.isArray(sorter) ? sorter[0] : sorter;

        if (!firstSorter) {
            console.warn('handleTableChange - NO firstSorter');
            return;
        }

        const {column, order, field, columnKey} = firstSorter;
        const sortDirection = order === SortDirectionEnum.descend ? -1 : 1;

        const pageIndex = (pagination.current || 1) - 1;
        const pageSize = pagination.pageSize || defaultPageSize;

        setPaginationArticleList((): PaginationQueryType<ArticleForTableListType> => {
            return {
                pageConfig: {
                    pageIndex,
                    pageSize,
                    sort: {[String(field)]: sortDirection},
                },
                query: {[searchedColumn]: new RegExp(searchText, 'i').toString()},
            };
        });

        console.log('handleTableChange');
        console.log('pagination:', pagination);
        console.log('filters:', filters);
        console.log('column:', column);
        console.log('sorter:', sorter);
        console.log('order:', order);
        console.log('columnKey:', columnKey);
        console.log('extra:', extra);
        console.log('///');
        console.log(searchedColumn);
        console.log(searchText);
        console.log('///');
    }

    return (
        <CmsPage>
            <Title level={2}>Article list</Title>

            <Table<ArticleForTableListType>
                columns={getArticleTableColumnList({setSearchText, setSearchedColumn})}
                dataSource={resultArticleList?.list || []}
                loading={isInProgressArticleList}
                onChange={handleTableChange}
                pagination={{
                    current: paginationArticleList.pageConfig.pageIndex + 1,
                    defaultPageSize,
                    hideOnSinglePage: false,
                    pageSize: paginationArticleList.pageConfig.pageSize,
                    pageSizeOptions: [defaultPageSize, 50, 100, 500, 1000, 2000, 5000],
                    showSizeChanger: true,
                    total: resultArticleList?.totalItemCount || 0,
                }}
                rowKey="id"
            />
        </CmsPage>
    );
}
