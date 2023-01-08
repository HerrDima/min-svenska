import {useEffect, useState} from 'react';

import {Locale} from '../../provider/locale/locale-context';

import {applyGdpr, getDefaultIsVisible} from './gdpr-info-helper';
import gdprInfoStyle from './gdpr-info.scss';
import {gdprLinkAboutCookie} from './gdpr-info-const';

export function GdprInfo(): JSX.Element | null {
    const [isVisible, setIsVisible] = useState<boolean>(getDefaultIsVisible());
    const [isVisibleByTimeout, setIsVisibleByTimeout] = useState<boolean>(false);

    function handleApplyGdpr() {
        setIsVisible(false);

        applyGdpr();
    }

    useEffect(() => {
        setIsVisibleByTimeout(true);
    }, []);

    if (!isVisible || !isVisibleByTimeout) {
        return null;
    }

    return (
        <div className={gdprInfoStyle.gdpr_info__wrapper}>
            <div className={gdprInfoStyle.gdpr_info__container}>
                <p className={gdprInfoStyle.gdpr_info__text}>
                    <Locale stringKey="GDPR__WE_USE_COOKIES" />
                    <br />
                    <a
                        className={gdprInfoStyle.gdpr_info__link}
                        href={gdprLinkAboutCookie}
                        rel="noreferrer"
                        target="_blank"
                    >
                        <Locale stringKey="GDPR__WHAT_ARE_COOKIES" />
                    </a>
                </p>

                <button
                    className={gdprInfoStyle.gdpr_info__button}
                    onClick={handleApplyGdpr}
                    title="GDPR"
                    type="button"
                >
                    <span className={gdprInfoStyle.gdpr_info__button__icon__close} />
                </button>
            </div>
        </div>
    );
}
