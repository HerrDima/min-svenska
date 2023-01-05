/* global document */

export function loadAdSenseScript(googleAdSenseId: string): void {
    if (typeof document === 'undefined') {
        return;
    }

    const {head} = document;

    if (!head) {
        return;
    }

    const src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';

    if (document.querySelector(`script[src="${src}"]`)) {
        console.info(`AdSense script already exists, src: ${src}`);
        return;
    }

    const script = document.createElement('script');

    script.dataset.adClient = googleAdSenseId;
    script.async = true;
    script.src = src;

    head.append(script);
}
