import {default as variableStyle} from './var.scss';

export const cssVariable = {
    maxDesktopWidth: Number.parseInt(variableStyle.maxDesktopWidth, 10),
    maxPhoneWidth: Number.parseInt(variableStyle.maxPhoneWidth, 10),
    maxTabletWidth: Number.parseInt(variableStyle.maxTabletWidth, 10),
    widthLimiterDesktopSidePadding: Number.parseInt(variableStyle.widthLimiterDesktopSidePadding, 10),
    widthLimiterPhoneSidePadding: Number.parseInt(variableStyle.widthLimiterPhoneSidePadding, 10),
    widthLimiterTabletSidePadding: Number.parseInt(variableStyle.widthLimiterTabletSidePadding, 10),
} as const;
