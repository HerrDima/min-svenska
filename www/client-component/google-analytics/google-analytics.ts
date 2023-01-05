// REF: https://developers.google.com/analytics/devguides/collection/analyticsjs/#the_google_analytics_tag
// REF: https://developers.google.com/analytics/devguides/collection/analyticsjs/single-page-applications

/* global window, document, setInterval */

import {useRef} from 'react';

import {waitForCallback} from '../../util/time';
import {getNeedUseThirdPartyServices} from '../../util/url';

import {loadGoogleAnalyticsScript} from './google-analytics-helper';

type GoogleAnalyticsType = {
    googleAnalyticsId: string;
    pathname: string;
};

declare global {
    interface Window {
        dataLayer?: Array<unknown>;
        ga?: (key: string, valueA: string, valueB?: string, valueC?: string) => void;
        gtag?: (key: 'config' | 'js', value: Date | string) => void;
    }
}

// eslint-disable-next-line complexity, max-statements
export function useGoogleAnalytics(config: GoogleAnalyticsType): null {
    const {googleAnalyticsId, pathname} = config;
    const pathnameRef = useRef<string>('');
    const isNeedUseThirdPartyServices = getNeedUseThirdPartyServices();

    if (!isNeedUseThirdPartyServices) {
        return null;
    }

    function setAndSend(newPathname: string) {
        const {ga: definedGa} = window;

        if (!definedGa) {
            throw new Error('Google Analytics (window.ga) is not defined');
        }

        if (pathnameRef.current === newPathname) {
            return;
        }

        pathnameRef.current = newPathname;
        console.info(`%cGoogle Analytics set and send page: ${newPathname}`, 'color: #0c0');
        definedGa('set', 'page', newPathname);
        definedGa('send', 'pageview');
    }

    if (typeof document === 'undefined' || typeof window === 'undefined') {
        return null;
    }

    if (window.ga) {
        setAndSend(pathname);
        return null;
    }

    loadGoogleAnalyticsScript(googleAnalyticsId);

    // eslint-disable-next-line unicorn/consistent-destructuring
    window.dataLayer = window.dataLayer || [];

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    function gtag(...argumentList: Array<unknown>) {
        // eslint-disable-next-line prefer-rest-params, unicorn/consistent-destructuring
        window.dataLayer?.push(arguments);
    }

    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', googleAnalyticsId);

    // eslint-disable-next-line unicorn/consistent-destructuring
    waitForCallback((): boolean => Boolean(window.ga), 10, 200)
        .then((): void => {
            // eslint-disable-next-line id-length
            const {ga} = window;

            if (!ga) {
                console.error('[ERROR]: ga is not define');
                return;
            }

            ga('create', googleAnalyticsId, 'auto');

            console.info('Google Analytics is initialized');

            setAndSend(pathname);

            // fix pokazatel' otkazov
            setInterval((): unknown => ga('send', 'event', 'nobouncy', '15sec'), 15e3);
        })
        .catch(console.error);

    return null;
}
