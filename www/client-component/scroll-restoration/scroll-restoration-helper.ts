/* global window, document */

export function smoothScrollToTop() {
    window.scrollTo({behavior: 'smooth', top: 0});
}

// get scroll top position in 0..1
export function getRelativeScrollTop(): number {
    const fullBodyHeight: number = document.body.clientHeight;
    const viewPortHeight: number = document.documentElement.clientHeight;

    if (fullBodyHeight <= viewPortHeight) {
        return 0;
    }

    const currentAbsoluteScrollTop: number = document.documentElement.scrollTop;
    const maxScrollTop: number = fullBodyHeight - viewPortHeight;

    const relativeScrollPosition: number = currentAbsoluteScrollTop / maxScrollTop;

    return relativeScrollPosition;
}

// get scroll top position in pixels
export function getAbsoluteScrollTop(relativeScrollPosition: number): number {
    if (relativeScrollPosition === 0) {
        return 0;
    }

    const fullBodyHeight: number = document.body.clientHeight;
    const viewPortHeight: number = document.documentElement.clientHeight;

    if (fullBodyHeight <= viewPortHeight) {
        return 0;
    }

    const maxScrollTop: number = fullBodyHeight - viewPortHeight;
    const absoluteScrollPosition: number = maxScrollTop * relativeScrollPosition;

    return absoluteScrollPosition;
}
