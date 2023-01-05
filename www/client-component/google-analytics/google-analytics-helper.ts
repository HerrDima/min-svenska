/* global document */

export function loadGoogleAnalyticsScript(googleAnalyticsId: string): void {
    if (typeof document === 'undefined') {
        return;
    }

    const {head} = document;

    if (!head) {
        return;
    }

    const src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;

    if (document.querySelector(`script[src="${src}"]`)) {
        console.info(`Google Analytics script already exists: ${src}`);
        return;
    }

    const script = document.createElement('script');

    script.async = true;
    script.src = src;

    head.append(script);
}
