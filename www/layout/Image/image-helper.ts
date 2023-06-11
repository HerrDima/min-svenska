import {cssVariable} from '../../css/style';

function getFullHorizontalOneSidePadding(mediaWidth: number): number {
    if (mediaWidth <= cssVariable.maxPhoneWidth) {
        return cssVariable.widthLimiterPhoneSidePadding;
    }

    if (mediaWidth <= cssVariable.maxTabletWidth) {
        return cssVariable.widthLimiterTabletSidePadding;
    }

    return cssVariable.widthLimiterDesktopSidePadding;
}

export function getFullHorizontalPadding(mediaWidth: number): number {
    return getFullHorizontalOneSidePadding(mediaWidth) * 2;
}
