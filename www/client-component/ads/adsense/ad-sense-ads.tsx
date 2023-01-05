/* global window, setInterval, clearInterval */
import {useState, useRef, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {googleAdSenseId} from '../../../const';
import {classNames} from '../../../util/css';
import {waitForCallback} from '../../../util/time';
import {getRandomString} from '../../../util/string';
import {getNeedUseThirdPartyServices} from '../../../util/url';

import {loadAdSenseScript} from './ad-sense-helper';

type AdSenseAdsPropsType = {
    adSlotId: string;
    className?: string;
};

declare global {
    interface Window {
        adsbygoogle?: Array<unknown>;
    }
}

export function AdSenseAds(props: AdSenseAdsPropsType): JSX.Element {
    const {className, adSlotId} = props;
    const [adNodeId, setAdNodeId] = useState<string>(getRandomString());
    const routerLocation = useLocation();
    const pathnameRef = useRef<string>('');
    const isNeedUseThirdPartyServices = getNeedUseThirdPartyServices();

    if (isNeedUseThirdPartyServices) {
        loadAdSenseScript(googleAdSenseId);
    }

    useEffect(() => {
        const adsPeriodUpdate = 60e3;

        const intervalId = setInterval(() => {
            console.info(`update setTimeout for ads, adSlotId: ${adSlotId}`);
            setAdNodeId(getRandomString());
        }, adsPeriodUpdate);

        return () => {
            console.info(`clear setTimeout for ads, adSlotId: ${adSlotId}`);
            clearInterval(intervalId);
        };
    }, [adSlotId]);

    function showAd(newPathname: string, newAdNodeId: string) {
        if (!isNeedUseThirdPartyServices) {
            return;
        }

        if (pathnameRef.current === newPathname + newAdNodeId) {
            console.info(`%cAdSense, stop extra show ads: ${newPathname}, ${newAdNodeId}`, 'color: #c00');
            return;
        }

        pathnameRef.current = newPathname + newAdNodeId;

        if (typeof window === 'undefined') {
            return;
        }

        waitForCallback((): boolean => Boolean(window.adsbygoogle), 10, 100)
            .then(() => {
                console.info(`%cAdSense, show ads, adSlotId: ${adSlotId}`, 'color: #c00');

                window.adsbygoogle?.push({
                    // eslint-disable-next-line camelcase, id-match
                    google_ad_client: googleAdSenseId,
                    // eslint-disable-next-line camelcase, id-match
                    google_ad_slot: adSlotId,
                });
            })
            .catch(console.error);
    }

    showAd(routerLocation.pathname, adNodeId);

    return (
        <ins
            className={classNames('adsbygoogle', className)}
            data-ad-client={googleAdSenseId}
            data-ad-format="auto"
            data-ad-slot={adSlotId}
            data-custom-ad-node-id={adNodeId}
            data-full-width-responsive="true"
            key={adNodeId}
            style={{display: 'block'}}
        />
    );
}
