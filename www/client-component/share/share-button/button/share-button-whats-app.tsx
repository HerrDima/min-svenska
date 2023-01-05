import shareButtonStyle from '../share-button.scss';
import type {ShareButtonPropsType} from '../share-button-type';
import {share} from '../share-button-helper';
import {SvgImage} from '../../../../layout/svg-image/svg-image';
import {shareButtonName} from '../share-button-const';

export function ShareButtonWhatsApp(props: ShareButtonPropsType): JSX.Element {
    const {title} = props;

    function handleClick() {
        share(`https://wa.me/?text=${encodeURIComponent(title)}`, title);
    }

    return (
        <button
            aria-label="facebook"
            className={shareButtonStyle.share_button__whats_app}
            onClick={handleClick}
            type="button"
        >
            <SvgImage className={shareButtonStyle.share_button__image} imageId={'#' + shareButtonName.whatsApp} />
        </button>
    );
}
