import {ReactNode} from 'react';

import {ShareButtonVkontakte} from '../../share-button/button/share-button-vkontakte';
import {ShareButtonFacebook} from '../../share-button/button/share-button-facebook';
import {ShareButtonOdnoklassniki} from '../../share-button/button/share-button-odnoklassniki';
import {ShareButtonTwitter} from '../../share-button/button/share-button-twitter';
import {ShareButtonTelegram} from '../../share-button/button/share-button-telegram';
import {ShareButtonViber} from '../../share-button/button/share-button-viber';
import {ShareButtonWhatsApp} from '../../share-button/button/share-button-whats-app';

import shareButtonListContentStyle from './share-button-list-content.scss';

type ShareButtonListContentPropsType = {
    listHeader: ReactNode;
    title: string;
    url: string;
};

export function ShareButtonListContent(props: ShareButtonListContentPropsType): JSX.Element {
    const {url, title, listHeader} = props;

    return (
        <div className={shareButtonListContentStyle.share_button_list__wrapper}>
            <p className={shareButtonListContentStyle.share_button_list__title}>{listHeader}</p>

            <div className={shareButtonListContentStyle.share_button_list}>
                <ShareButtonVkontakte title={title} url={url} />

                <ShareButtonFacebook title={title} url={url} />

                <ShareButtonOdnoklassniki title={title} url={url} />

                <ShareButtonTwitter title={title} url={url} />

                <ShareButtonTelegram title={title} url={url} />

                <ShareButtonViber title={title} url={url} />

                <ShareButtonWhatsApp title={title} url={url} />
            </div>
        </div>
    );
}
