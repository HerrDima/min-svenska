export enum ArticleTypeEnum {
    article = 'article', // usual article
    audioList = 'audio-list', // get first *.mp3 file from every child and makes play list from it
    container = 'container', // shor children as [subDocumentListViewType: SubDocumentListViewTypeEnum]
}

export enum SubDocumentListViewTypeEnum {
    header = 'header', // just header
    headerImage = 'header-image', // header + image
}

export enum ArticleFileTypeEnum {
    audio = 'audio',
    image = 'image',
    unknown = 'unknown',
}

export type ArticleFileType = {
    duration: number; // in seconds
    height: number; // original height
    name: string; // name of file
    size: number; // size of file in bytes
    type: ArticleFileTypeEnum; // audio, image, etc.
    width: number; // original width
};

export type ArticleType = {
    articleType: ArticleTypeEnum;
    content: string;
    createdDate: string;
    description: string;
    descriptionShort: string;
    fileList: Array<ArticleFileType>;
    hasMetaRobotsNoFollowSeo: boolean; // Add/combine <meta name="robots" content="nofollow"/>
    hasMetaRobotsNoIndexSeo: boolean; // Add/combine <meta name="robots" content="noindex"/> and add X-Robots-Tag: noindex
    id: string;
    isActive: boolean; // actually temporary "removed"
    isInSiteMapXmlSeo: boolean; // has sitemap.xml link to article or not
    metaDescriptionSeo: string; // tag <meta name="description" content="....." />
    metaKeyWordsSeo: string; // tag <meta name="keywords" content="....." />
    metaSeo: string; // actually any html code
    publishDate: string;
    slug: string;
    staffArtistList: Array<string>;
    staffAuthorList: Array<string>;
    staffCompositorList: Array<string>;
    staffDirectorList: Array<string>;
    staffIllustratorList: Array<string>;
    staffReaderList: Array<string>;
    subDocumentIdList: Array<string>;
    subDocumentListViewType: SubDocumentListViewTypeEnum;
    tagList: Array<string>;
    tagTitleSeo: string; // tag <title>....</title>
    title: string;
    titleImage: ArticleFileType;
    updatedDate: string;
};

export type ArticlePreviewType = Pick<
    ArticleType,
    'articleType' | 'fileList' | 'isActive' | 'slug' | 'title' | 'titleImage'
>;
