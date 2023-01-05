import {useLocation} from 'react-router-dom';
import {useScreenWidth} from 'react-system-hook';

import {AdSenseAds} from '../adsense/ad-sense-ads';
import {googleAdSenseTopAdId} from '../../../const';

import bottomAdsWrapperStyle from '../bottom-ads-wrapper/bottom-ads-wrapper.scss';

export function TopAdsWrapper(): JSX.Element {
    const routerLocation = useLocation();
    const screenWidth = useScreenWidth();

    return (
        <div className={bottomAdsWrapperStyle.bottom_ads_wrapper__wrapper}>
            <AdSenseAds
                adSlotId={googleAdSenseTopAdId}
                // className={topAdsWrapperStyle.top_ads_wrapper}
                key={`slug:${routerLocation.pathname + googleAdSenseTopAdId}-screen-width:${screenWidth}`}
            />
        </div>
    );
}
