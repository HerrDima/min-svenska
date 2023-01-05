import shareButtonStyle from '../share-button.scss';
import type {ShareButtonPropsType} from '../share-button-type';
import {share} from '../share-button-helper';
import {SvgImage} from '../../../../layout/svg-image/svg-image';
import {shareButtonName} from '../share-button-const';

export function ShareButtonOdnoklassniki(props: ShareButtonPropsType): JSX.Element {
    const {url, title} = props;

    function handleClick() {
        share(`https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl=${encodeURIComponent(url)}`, title);
    }

    return (
        <button
            aria-label="odnoklassniki"
            className={shareButtonStyle.share_button__odnoklassniki}
            onClick={handleClick}
            type="button"
        >
            <SvgImage className={shareButtonStyle.share_button__image} imageId={'#' + shareButtonName.odnoklassniki} />
        </button>
    );
}
