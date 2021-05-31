import {classNames} from '../../util/css';

import {LangKeyType} from '../../provider/locale/translation/type';
import {Locale} from '../../provider/locale/c-locale';

import errorDataStyle from './error-data.scss';

type PropsType = {
    langKey: LangKeyType;
    className?: string;
};

export function ErrorData(props: PropsType): JSX.Element {
    const {langKey, className} = props;

    return (
        <div className={classNames(errorDataStyle.error_data, className)}>
            <p className={errorDataStyle.error_data__text}>
                <Locale stringKey={langKey} />
            </p>
        </div>
    );
}