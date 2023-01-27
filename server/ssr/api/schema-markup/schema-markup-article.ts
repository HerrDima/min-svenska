// https://developers.google.com/search/docs/advanced/structured-data/article
// used - JSON-LD (recommended)

import {ArticleType} from '../../../article/article-type';
import {SsrReplaceDataType} from '../ssr-helper/ssr-helper-type';
import {getPathToImage} from '../../../../www/util/path';
import {
    companyLogoPngFileName,
    companyLogoPngHeight,
    companyLogoPngWidth,
    copyrightName,
    httpsSiteDomain,
} from '../../../../www/const';
import {ArticleImageDataType, getImageListFromArticle} from '../../../sitemap/sitemap-img-xml';
import {getClientArticleLinkWithDomain} from '../../../../www/client-component/article/article-helper';

import {fitTextTo, removeNonJsonSymbols, timeTo0000} from './schema-markup-helper';

// eslint-disable-next-line id-length
export function getSchemaMarkupArticleSsrReplaceData(article: ArticleType): SsrReplaceDataType {
    const {slug, title, createdDate, updatedDate, staffAuthorList, descriptionShort} = article;
    const selector = '<script data-ssr="article" type="application/ld+json"></script>';

    const articleImageList: Array<string> = getImageListFromArticle(article).imageList.map<string>(
        (imageData: ArticleImageDataType): string => imageData.src
    );

    const companyLogo =
        httpsSiteDomain +
        getPathToImage(companyLogoPngFileName, {height: companyLogoPngHeight, width: companyLogoPngWidth});

    const value = `
        <script type="application/ld+json">
            {
                "@context": "https://schema.org",
                "@type": "Article",
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": "${getClientArticleLinkWithDomain(slug)}"
                },
                "headline": "${fitTextTo(removeNonJsonSymbols(title), 110)}",
                "image": ${JSON.stringify(articleImageList)},
                "datePublished": "${timeTo0000(createdDate)}",
                "dateModified": "${timeTo0000(updatedDate)}",
                "author": {
                    "@type": "Person",
                    "name": "${removeNonJsonSymbols(staffAuthorList.join(', ')) || 'N/A'}",
                    "url": "${httpsSiteDomain}"
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "${removeNonJsonSymbols(copyrightName)}",
                    "logo": {
                      "@type": "ImageObject",
                      "url": "${companyLogo}"
                    }
                },
                "description": "${fitTextTo(removeNonJsonSymbols(descriptionShort || title), 300)}"
            }
        </script>`.replace(/\s+/gi, ' ');

    return {selector, value};
}
