import shareButtonStyle from '../share-button.scss';
import type {ShareButtonPropsType} from '../share-button-type';
import {share} from '../share-button-helper';
import {SvgImage} from '../../../../layout/svg-image/svg-image';
import {shareButtonName} from '../share-button-const';

export function ShareButtonViber(props: ShareButtonPropsType): JSX.Element {
    const {url, title} = props;

    function handleClick() {
        share(`viber://forward?text=${encodeURIComponent(title + ' ' + url)}`, title);
    }

    return (
        <button
            aria-label="facebook"
            className={shareButtonStyle.share_button__viber}
            onClick={handleClick}
            type="button"
        >
            <SvgImage className={shareButtonStyle.share_button__image} imageId={'#' + shareButtonName.viber} />
        </button>
    );
}
