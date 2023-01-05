import {useLocation} from 'react-router-dom';
import {useScreenWidth} from 'react-system-hook';

import {AdSenseAds} from '../adsense/ad-sense-ads';
import {googleAdSenseBottomAdId} from '../../../const';

import bottomAdsWrapperStyle from './bottom-ads-wrapper.scss';

// eslint-disable-next-line react/prefer-stateless-function
export function BottomAdsWrapper(): JSX.Element {
    const routerLocation = useLocation();
    const screenWidth = useScreenWidth();

    return (
        <div className={bottomAdsWrapperStyle.bottom_ads_wrapper__wrapper}>
            <AdSenseAds
                adSlotId={googleAdSenseBottomAdId}
                // className={topAdsWrapperStyle.top_ads_wrapper}
                key={`slug:${routerLocation.pathname + googleAdSenseBottomAdId}-screen-width:${screenWidth}`}
            />
        </div>
    );
}
