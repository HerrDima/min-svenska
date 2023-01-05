import {
    ArticleFileType,
    ArticleFileTypeEnum,
    ArticleType,
    ArticleTypeEnum,
    SubDocumentListViewTypeEnum,
} from './article-type';

export function makeDefaultArticleFile(): ArticleFileType {
    return {
        duration: 0,
        height: 0,
        name: '',
        size: 0,
        title: '',
        type: ArticleFileTypeEnum.unknown,
        width: 0,
    };
}

export function makeDefaultArticle(): ArticleType {
    const defaultArticleData: ArticleType = {
        articleType: ArticleTypeEnum.article,
        content: '',
        createdDate: '',
        description: '',
        descriptionShort: '',
        fileList: [],
        hasMetaRobotsNoFollowSeo: false, // Add/combine <meta name="robots" content="nofollow"/>
        hasMetaRobotsNoIndexSeo: false, // Add/combine <meta name="robots" content="noindex"/> and add X-Robots-Tag: noindex
        id: '',
        isActive: true, // actually temporary "removed"
        isInSiteMapXmlSeo: true, // has sitemap.xml link to article or not
        metaDescriptionSeo: '', // tag <meta name="description" content="....." />
        metaKeyWordsSeo: '', // tag <meta name="keywords" content="....." />
        metaSeo: '', // actually any html code
        publishDate: '',
        slug: '',
        staffArtistList: [],
        staffAuthorList: [],
        staffCompositorList: [],
        staffDirectorList: [],
        staffIllustratorList: [],
        staffReaderList: [],
        subDocumentIdList: [],
        subDocumentListViewType: SubDocumentListViewTypeEnum.header,
        tagList: [],
        tagTitleSeo: '', // tag <title>....</title>
        title: '',
        titleImage: makeDefaultArticleFile(),
        updatedDate: '',
    };

    return defaultArticleData;
}
