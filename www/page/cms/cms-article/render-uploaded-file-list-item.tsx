/* global HTMLInputElement */
import {SyntheticEvent} from 'react';
import {Typography, Input, Col, Row} from 'antd';
import {UploadFile} from 'antd/es/upload/interface';
const {Title} = Typography;

import {ArticleFileType} from '../../../../server/article/article-type';
import {Box} from '../../../layout/box/box';

import {getFileMarkdownByFullInfo} from '../../../layout/markdown/markdown-helper';

type UploadedFileListItemPropsType = {
    file: UploadFile<unknown>;
    fileInfo: ArticleFileType | void;
    originNode: JSX.Element;
    setFileTitle: (newFileTitle: string) => void;
    // uploadedFileList: Array<UploadFile<unknown>>,
    // actions: { download: () => void; preview: () => void; remove: () => void }
};

export function renderUploadedFileListItem(props: UploadedFileListItemPropsType): JSX.Element {
    const {setFileTitle, fileInfo, originNode, file} = props;

    if (!fileInfo) {
        return (
            <Title level={4} type="danger">
                Can not found file by name: {file.name}
            </Title>
        );
    }

    return (
        <Box height={112}>
            {originNode}
            <Row gutter={8}>
                <Col span={12}>
                    <Input
                        defaultValue={fileInfo.title}
                        onInput={(evt: SyntheticEvent<HTMLInputElement>) => {
                            setFileTitle(evt.currentTarget.value.trim());
                        }}
                        placeholder="Title"
                    />
                </Col>
                <Col span={12}>
                    <Input readOnly value={getFileMarkdownByFullInfo(fileInfo, {alt: '', poster: ''})} />
                </Col>
            </Row>
        </Box>
    );
}
