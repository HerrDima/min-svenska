import {Typography, Select, Button} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {UploadFile} from 'antd/es/upload/interface';
import {Link} from 'react-router-dom';

import {ArticleFileType, ArticleType} from '../../../../server/article/article-type';
import {getArticleLinkToViewClient} from '../../../client-component/article/article-helper';

import {ArticleForValidationType} from './cms-article-type';
import {getArticleLinkToEdit, getIsImage, getPathToFile, getPathToImage} from './cms-article-helper';

const {Option} = Select;
const {Text} = Typography;

export function makeFileListItem(fileInfo: ArticleFileType): UploadFile<unknown> {
    const {name: fileInfoName} = fileInfo;

    const url = getIsImage(fileInfoName)
        ? getPathToImage(fileInfoName, {height: 96, width: 96})
        : getPathToFile(fileInfoName);

    return {
        name: fileInfoName,
        status: 'done',
        uid: fileInfoName,
        url,
    };
}

export function makeSubDocumentOption(articleForValidation: ArticleForValidationType): JSX.Element {
    const {title, id} = articleForValidation;

    return (
        <Option key={id} title={title} value={id}>
            {title}
        </Option>
    );
}

export function getParentList(
    article: ArticleType,
    savedArticleList: Array<ArticleForValidationType>
): Array<ArticleForValidationType> {
    const {id: articleId} = article;

    return savedArticleList.filter((savedArticle: ArticleForValidationType): boolean =>
        savedArticle.subDocumentIdList.includes(articleId)
    );
}

export function renderParentList(
    article: ArticleType,
    savedArticleList: Array<ArticleForValidationType>
): Array<JSX.Element> {
    const parentList: Array<JSX.Element> = getParentList(article, savedArticleList).map(
        (savedArticle: ArticleForValidationType, index: number): JSX.Element => {
            const {id, title, slug} = savedArticle;

            return (
                <Text key={id}>
                    {index > 0 ? ', ' : null}
                    <Link to={getArticleLinkToViewClient(slug)}>{title}</Link>
                    &nbsp;|&nbsp;
                    <Link to={getArticleLinkToEdit(id)}>{slug}</Link>
                </Text>
            );
        }
    );

    if (parentList.length > 0) {
        return parentList;
    }

    return [<Text key="no-parents">no parents</Text>];
}

export function UploadButton(): JSX.Element {
    return <Button icon={<PlusOutlined />}>Upload</Button>;
}
