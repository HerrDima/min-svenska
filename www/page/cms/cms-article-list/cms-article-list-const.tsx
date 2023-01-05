/* global HTMLInputElement */
import {SyntheticEvent} from 'react';
import {Input} from 'antd';
import {ColumnType} from 'antd/es/table/interface';
import {SearchOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';

import {getPathToImage, getArticleLinkToEdit} from '../cms-article/cms-article-helper';
import {getTickCross} from '../../../util/string';
import {dateIsoToHumanView} from '../../../util/time';
import {getArticleLinkToViewClient} from '../../../client-component/article/article-helper';
import {ArticleFileType} from '../../../../server/article/article-type';

import {
    ArticleForTableListKeysType,
    ArticleForTableListType,
    KeyForTableListListType,
    SortDirectionEnum,
} from './cms-article-list-type';

type GetArticleTableColumnListArgumentType = {
    setSearchText: (searchText: string) => void;
    setSearchedColumn: (dataIndex: ArticleForTableListKeysType) => void;
};

export function getArticleTableColumnList(
    data: GetArticleTableColumnListArgumentType
): Array<ColumnType<ArticleForTableListType>> {
    const {setSearchedColumn, setSearchText} = data;

    const articleTableColumnList: Array<ColumnType<ArticleForTableListType>> = [
        /*
        {
            dataIndex: 'id',
            defaultSortOrder: null,
            key: 'id',
            sorter: () => 0,
            title: 'Id',
        },
    */
        {
            dataIndex: 'title',
            defaultSortOrder: SortDirectionEnum.ascend,
            // eslint-disable-next-line react/no-multi-comp
            filterDropdown: () => {
                return (
                    <Input
                        key="title"
                        onInput={(evt: SyntheticEvent<HTMLInputElement>) => {
                            setSearchedColumn('title');
                            setSearchText(evt.currentTarget.value.trim());
                        }}
                        placeholder="Search..."
                    />
                );
            },
            filterIcon: <SearchOutlined />,
            key: 'title',
            render(title: string, article: ArticleForTableListType) {
                return (
                    <Link key={article.id} to={getArticleLinkToViewClient(article.slug)}>
                        {title}
                    </Link>
                );
            },
            sorter: () => 0,
            title: 'Title',
        },
        {
            dataIndex: 'slug',
            defaultSortOrder: null,
            // eslint-disable-next-line react/no-multi-comp
            filterDropdown: () => {
                return (
                    <Input
                        key="slug"
                        onInput={(evt: SyntheticEvent<HTMLInputElement>) => {
                            setSearchedColumn('slug');
                            setSearchText(evt.currentTarget.value);
                        }}
                        placeholder="Search..."
                    />
                );
            },
            filterIcon: <SearchOutlined />,
            key: 'slug',
            render(slug: string, article: ArticleForTableListType) {
                return (
                    <Link key={article.id} to={getArticleLinkToEdit(article.id)}>
                        {slug}
                    </Link>
                );
            },
            sorter: () => 0,
            title: 'Slug/edit',
        },
        {
            dataIndex: 'articleType',
            defaultSortOrder: null,
            key: 'articleType',
            sorter: () => 0,
            title: 'Type',
        },
        {
            align: 'center',
            dataIndex: 'isActive',
            defaultSortOrder: null,
            key: 'isActive',
            render(
                isActive: boolean
                // article: ArticleForTableListType
            ) {
                return getTickCross(isActive);
            },
            sorter: () => 0,
            title: 'Is active',
        },
        {
            align: 'center',
            dataIndex: 'titleImage',
            defaultSortOrder: null,
            key: 'titleImage',
            render(imageFile: ArticleFileType) {
                return (
                    <img
                        alt={imageFile.name}
                        height="64px"
                        src={getPathToImage(imageFile.name, {height: 64, width: 64})}
                        style={{objectFit: 'contain'}}
                        width="64px"
                    />
                );
            },
            sorter: () => 0,
            title: 'Image',
        },
        {
            align: 'right',
            dataIndex: 'createdDate',
            defaultSortOrder: null,
            key: 'createdDate',
            render: dateIsoToHumanView,
            sorter: () => 0,
            title: 'Created UTC-0',
            width: 120,
        },
        {
            align: 'right',
            dataIndex: 'updatedDate',
            defaultSortOrder: null,
            key: 'updatedDate',
            render: dateIsoToHumanView,
            sorter: () => 0,
            title: 'Updated UTC-0',
            width: 120,
        },
        {
            align: 'right',
            dataIndex: 'publishDate',
            defaultSortOrder: null,
            key: 'publishDate',
            render: dateIsoToHumanView,
            sorter: () => 0,
            title: 'Publish UTC-0',
            width: 120,
        },
    ];

    return articleTableColumnList;
}

export const keyForTableListList: KeyForTableListListType = [
    'articleType',
    'createdDate',
    'id',
    'isActive',
    'publishDate',
    'slug',
    'title',
    'titleImage',
    'updatedDate',
];
