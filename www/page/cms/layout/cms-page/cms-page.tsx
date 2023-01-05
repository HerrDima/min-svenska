import {ReactNode} from 'react';
import {Layout, Menu} from 'antd';
import {Link, useLocation} from 'react-router-dom';

import 'antd/dist/reset.css';

import {Box} from '../../../../layout/box/box';
import {appRoute} from '../../../../component/app/app-route';

const {Content} = Layout;

type CmsPagePropsType = {
    children: ReactNode;
};

export function CmsPage(props: CmsPagePropsType): JSX.Element {
    const {children} = props;
    const routerLocation = useLocation();

    return (
        <Layout>
            <Box padding={16}>
                <Menu
                    defaultSelectedKeys={[routerLocation.pathname]}
                    items={[
                        {
                            key: appRoute.articleList.path,
                            label: <Link to={appRoute.articleList.path}>List</Link>,
                        },
                        {
                            key: appRoute.articleCreate.path,
                            label: <Link to={appRoute.articleCreate.path}>Create</Link>,
                        },
                        {
                            key: appRoute.articleTree.path,
                            label: <Link to={appRoute.articleTree.path}>Tree</Link>,
                        },
                    ]}
                    mode="horizontal"
                />
            </Box>

            <Box padding={16}>
                <Content>{children}</Content>
            </Box>

            {/* <Footer>Footer is here</Footer> */}
        </Layout>
    );
}
