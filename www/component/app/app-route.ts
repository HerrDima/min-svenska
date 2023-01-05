/* eslint-disable sort-keys */

export type AppRoutType = {
    path: string;
};

export const appRoute = {
    // client
    root: {
        path: '/',
    },

    // client
    article: {
        path: '/article/:slug' as const,
    },

    // cms
    articleList: {
        path: '/cms/article-list',
    },

    // cms
    articleTree: {
        path: '/cms/article-tree',
    },

    // cms
    articleCreate: {
        path: '/cms/article-create',
    },

    // cms
    articleEdit: {
        path: '/cms/article-edit/:articleId' as const, // `as const` is required for TS validation of useParams and generatePath of react-router-dom
    },

    // service
    login: {
        path: '/login',
    },
};
