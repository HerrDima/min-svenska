/* eslint-disable import/no-default-export, init-declarations */

declare module '*.svg' {
    const content: string;

    export default content;
}

declare module '*.png' {
    const content: string;

    export default content;
}

declare module '*.md' {
    const content: string;

    export default content;
}

declare module '*.txt' {
    const content: string;

    export default content;
}

declare const IS_PRODUCTION: unknown;

declare const BUILD_DATE_H: unknown;

// SSR
declare const NAVIGATION_DATA: string | void;

declare const ARTICLE_DATA: string | void;

declare module 'webp-converter' {
    declare type LoggingOptionType =
        // eslint-disable-next-line max-len
        | '-map 1'
        | '-map 2'
        | '-map 3'
        | '-map 4'
        | '-map 5'
        | '-map 6'
        | '-print_lsim'
        | '-print_psnr'
        | '-print_ssim'
        | '-progress'
        | '-quiet'
        | '-short'
        | '-v';

    declare type CwebpType = (
        sourcePath: string,
        destinationPath: string,
        // https://developers.google.com/speed/webp/docs/cwebp
        convertFlags: string,
        loggingFlags: LoggingOptionType
    ) => Promise<void>;

    declare type CebpConverterType = {
        cwebp: CwebpType;
    };

    const webpConverter: CebpConverterType;

    export default webpConverter;
}

declare module 'lighthouse' {
    export declare type LighthouseCategoryNameType = 'accessibility' | 'best-practices' | 'performance' | 'pwa' | 'seo';

    export declare type LighthouseResultLhrCategoryType = {
        id: string;
        score: number;
        title: string;
    };

    export declare type LighthouseConfigType = {
        disableNetworkThrottling: boolean;
        disableStorageReset: boolean;
        formFactor: 'desktop' | 'mobile';
        logLevel: 'info' | 'quiet' | 'verbose';
        onlyCategories?: Array<LighthouseCategoryNameType>;
        output: 'csv' | 'html' | 'json';
        port: string;
        screenEmulation: {
            deviceScaleRatio: number;
            // turn on / turin off emulation
            disabled: boolean;
            height: number;
            mobile: boolean;
            width: number;
        };
        throttlingMethod?: 'provided';
    };

    export declare type LighthouseResultLhrCategoriesType = Record<
        LighthouseCategoryNameType,
        LighthouseResultLhrCategoryType
    >;

    export declare type LighthouseResultLhrType = {
        categories: LighthouseResultLhrCategoriesType;
    };

    export declare type LighthouseResultType = {
        lhr: LighthouseResultLhrType;
        report: string;
    };

    declare type LighthouseType = (url: string, config: LighthouseConfigType) => Promise<LighthouseResultType>;

    const lighthouse: LighthouseType;

    export default lighthouse;
}
/*
declare module '*.scss';
declare module '*.png';
declare module '*.jpg';
declare module '*.mp3';
*/
