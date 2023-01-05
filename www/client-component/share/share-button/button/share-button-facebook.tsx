import shareButtonStyle from '../share-button.scss';
import type {ShareButtonPropsType} from '../share-button-type';
import {share} from '../share-button-helper';
import {SvgImage} from '../../../../layout/svg-image/svg-image';
import {shareButtonName} from '../share-button-const';

export function ShareButtonFacebook(props: ShareButtonPropsType): JSX.Element {
    const {url, title} = props;

    function handleClick() {
        share(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, title);
    }

    return (
        <button
            aria-label="facebook"
            className={shareButtonStyle.share_button__facebook}
            onClick={handleClick}
            type="button"
        >
            <SvgImage className={shareButtonStyle.share_button__image} imageId={'#' + shareButtonName.facebook} />
        </button>
    );
}
