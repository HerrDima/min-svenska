import {ArticlePreviewType, ArticleType} from './article-type';
import {articleCrud} from './article';

export function getIsActiveArticlePreview(article: ArticlePreviewType): article is ArticlePreviewType {
    return article.isActive;
}

export function getArticleById(id: string): Promise<ArticleType | null> {
    return articleCrud.findOne({id});
}

/*
export function getArticleBySlug(slug: string): Promise<ArticleType | null> {
    return articleCrud.findOne({slug});
}
*/

function getActiveArticleBySlug(slug: string): Promise<ArticleType | null> {
    return articleCrud.findOne({isActive: true, slug});
}

export async function getActiveArticleBySlugEnsure(slug: string, defaultArticle: ArticleType): Promise<ArticleType> {
    if (!slug) {
        return defaultArticle;
    }

    return (await getActiveArticleBySlug(slug)) || defaultArticle;
}

export function articleToArticlePreview(article: ArticleType): ArticlePreviewType {
    const {articleType, fileList, isActive, slug, title, titleImage} = article;

    return {articleType, fileList, isActive, slug, title, titleImage};
}

export function getArticleParentListById(articleId: string): Promise<Array<ArticleType>> {
    return articleCrud.findMany({subDocumentIdList: [articleId]});
}

export function getArticleListByIdList(idList: Array<string>): Promise<Array<ArticleType | null>> {
    return Promise.all(idList.map(getArticleById));
}

export async function getArticleListByIdListFiltered(idList: Array<string>): Promise<Array<ArticleType>> {
    return getArticleListByIdList(idList).then((data: Array<ArticleType | null>): Array<ArticleType> => {
        return data.filter<ArticleType>((mayBeArticle: ArticleType | null): mayBeArticle is ArticleType => {
            return mayBeArticle !== null;
        });
    });
}

// eslint-disable-next-line id-length
export async function getArticlePreviewListByIdListFiltered(idList: Array<string>): Promise<Array<ArticlePreviewType>> {
    const articlePreviewList = await getArticleListByIdListFiltered(idList);

    return articlePreviewList.map<ArticlePreviewType>(articleToArticlePreview);
}

export async function getArticleBreadcrumbListById(id: string): Promise<Array<ArticleType>> {
    const articleList: Array<ArticleType> = [];

    let parent: ArticleType | null = null;
    let deep = 10;
    let childId: string = id;

    // eslint-disable-next-line no-loops/no-loops
    do {
        deep -= 1;
        parent = await articleCrud.findOne({subDocumentIdList: [childId]});

        if (parent) {
            childId = parent.id;
            articleList.unshift(parent);
        }
    } while (parent && deep > 0);

    return articleList;
}

// eslint-disable-next-line id-length
export async function getArticlePreviewBreadcrumbListById(id: string): Promise<Array<ArticlePreviewType>> {
    const articleList = await getArticleBreadcrumbListById(id);

    return articleList.map<ArticlePreviewType>(articleToArticlePreview);
}

export async function getSiblingListById(articleId: string): Promise<Array<ArticleType>> {
    const parentList = await getArticleParentListById(articleId);

    const idListRaw: Array<string> = [];

    parentList.forEach((article: ArticleType): unknown => idListRaw.push(...article.subDocumentIdList));

    const idSet = new Set<string>(idListRaw);

    const idList = [...idSet].filter<string>(
        (siblingArticleId: string): siblingArticleId is string => siblingArticleId !== articleId
    );

    return getArticleListByIdListFiltered(idList);
}

export async function getSiblingPreviewListById(articleId: string): Promise<Array<ArticlePreviewType>> {
    const articleList: Array<ArticleType> = await getSiblingListById(articleId);

    return articleList.map<ArticlePreviewType>(articleToArticlePreview);
}

export function getSubDocumentListFiltered(article: ArticleType): Promise<Array<ArticleType>> {
    const {subDocumentIdList} = article;

    return getArticleListByIdListFiltered(subDocumentIdList);
}

// eslint-disable-next-line id-length
export async function getSubDocumentListByParentIdFiltered(parentId: string): Promise<Array<ArticleType>> {
    const parent = await getArticleById(parentId);

    if (!parent) {
        return [];
    }

    return getSubDocumentListFiltered(parent);
}

export function getIsFileInArticle(fileName: string, article: ArticleType): boolean {
    return JSON.stringify(article).toLowerCase().includes(fileName.toLowerCase());
}

export function tryQueryStringToRegExp(value: string): RegExp | string {
    const partList = value.split('/');

    if (partList.length !== 3) {
        return value;
    }

    const [empty, mainValue, flags] = partList;

    if (empty !== '') {
        return value;
    }

    return new RegExp(mainValue, flags);
}
