/* global BUILD_DATE_H, IS_PRODUCTION */
/* eslint-disable id-match */

export const selector = {
    appWrapper: '.js-app-wrapper',
};

export const demoUrl = 'http://webbestmaster.github.io/react-audio-player-pro';

export const googleAnalyticsId = 'UA-156987706-1';
export const googleAdSenseId = 'ca-pub-8997870404482178';
export const googleAdSenseBottomAdId = '9673664092';
export const googleAdSenseTopAdId = '4086736743';

export const siteDomain = 'herrdima.github.io';
export const httpsSiteDomain = `https://${siteDomain}`;
export const openGraphLocaleName = 'sv_SE';
export const copyrightName = 'Min Svenska';
// special file 1/2
export const companyLogoPngFileName = 'company-logo.png';
// special file 2/2
export const appIconPngFileName = 'app-icon.png';
export const specialFileNameList: Array<string> = [companyLogoPngFileName, appIconPngFileName];

function sayHi() {
    const {log} = console;

    // http://patorjk.com/software/taag/#p=display&f=ANSI%20Shadow&t=Empty
    // Font: ANSI Shadow
    const hiString = `


    ███████╗███╗   ███╗██████╗ ████████╗██╗   ██╗
    ██╔════╝████╗ ████║██╔══██╗╚══██╔══╝╚██╗ ██╔╝
    █████╗  ██╔████╔██║██████╔╝   ██║    ╚████╔╝
    ██╔══╝  ██║╚██╔╝██║██╔═══╝    ██║     ╚██╔╝
    ███████╗██║ ╚═╝ ██║██║        ██║      ██║
    ╚══════╝╚═╝     ╚═╝╚═╝        ╚═╝      ╚═╝


`;

    log(hiString);

    log('Build date:', BUILD_DATE_H);
    log('Is production:', IS_PRODUCTION);

    log('===================\n');
}

sayHi();
