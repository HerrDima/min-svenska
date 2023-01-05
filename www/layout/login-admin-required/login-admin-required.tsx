import {useUserContext} from '../../provider/user/user-context';
import {LoginAsync} from '../../page/service/login/login-async';
import {UserRoleEnum} from '../../provider/user/user-context-type';

type PropsType = {
    children: JSX.Element;
};

export function LoginAdminRequired(props: PropsType): JSX.Element {
    const {children} = props;
    const {user} = useUserContext();

    return user.role === UserRoleEnum.admin ? children : <LoginAsync />;
}
