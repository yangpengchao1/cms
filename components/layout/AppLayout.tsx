import {Breadcrumb, Layout, Menu, message} from 'antd';
import {BellOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined,} from '@ant-design/icons';
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {authAPI} from "../../libs/API/AuthAPI";
import {LogoutRequest} from "../../libs/Entity/request/LogoutRequest";
import Link from "next/link";
import {routes} from "../../libs/constant/MenuConfig";
import {LeftSideMenu} from "../../libs/Entity/LeftSideMenu";
import {Role} from "../../libs/enum/Role";

const {Header, Content, Sider} = Layout;
const {SubMenu} = Menu;

function showBreadcrumb(targetNode: LeftSideMenu, isDetail: boolean): JSX.Element {
    return <Breadcrumb className="dashboard-breadcrumb">
        <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
        {targetNode.parentNodeLabel ? <Breadcrumb.Item>{targetNode.parentNodeLabel}</Breadcrumb.Item> : ""}
        <Breadcrumb.Item>
            {isDetail==true ? <a href={targetNode.href}>{targetNode.label}</a> : targetNode.label}
        </Breadcrumb.Item>
    </Breadcrumb>;
}

function switchMenuActive
(route: string, menus: LeftSideMenu[] | undefined): { defaultOpenKeys: string[]; defaultSelectedKeys: string[]; breadcrumb: JSX.Element } {
    //截取路径"/dashboard/manager/teachers"
    const urlArr = route.split('/');
    const target = urlArr[urlArr.length - 1];
    const reg = /\[.*\]/;
    const isDetail = reg.test(target);
    // debugger

    let targetNode: LeftSideMenu | null;

    //    匹配路由
    if (isDetail) {
        //是详情页
        targetNode = findLeftSideMenuNodeByName(urlArr[urlArr.length - 2], menus);
    } else {
        //不是详情页
        targetNode = findLeftSideMenuNode(route, menus);
    }

    //    添加defaultSelectedKeys
    //设置默认选择
    let defaultSelectedKeys = [genKey("Overview")];
    let defaultOpenKeys = [genKey("Overview")];
    let breadcrumb: JSX.Element;
    if (targetNode != null) {
        defaultSelectedKeys = [genKey(targetNode.label)];
        defaultOpenKeys = [genKey(targetNode.parentNodeLabel)];
        breadcrumb = showBreadcrumb(targetNode, isDetail);
    }

    // @ts-ignore
    return {defaultSelectedKeys, defaultOpenKeys, breadcrumb}
}

let activedNode: LeftSideMenu | null = null;

function findLeftSideMenuNode(route: string, menus: LeftSideMenu[] | undefined): LeftSideMenu | null {
    // @ts-ignore
    menus.map((item: LeftSideMenu) => {
        if (item.subMenu) {
            findLeftSideMenuNode(route, item.subMenu);
        }
        if (item.href == route) {
            activedNode = item;
        }
    })
    return activedNode;
}

function findLeftSideMenuNodeByName(name: string, menus: LeftSideMenu[] | undefined): LeftSideMenu | null {
    // @ts-ignore
    menus.map((item: LeftSideMenu) => {
        if (item.subMenu) {
            findLeftSideMenuNode(name, item.subMenu);
        }
        if (item.label == name) {
            activedNode = item;
        }
    })
    return activedNode;
}

function genKey(label: string) {
    return `${label}-${label.length}`;
}

function renderMenus(menus: LeftSideMenu[] | undefined): JSX.Element[] {
    // @ts-ignore
    return menus.map((item: LeftSideMenu) => {
        const key = genKey(item.label);
        if (item.subMenu) {
            return (
                <SubMenu key={key} icon={item.icon} title={item.label}>
                    {renderMenus(item.subMenu)}
                </SubMenu>
            )
        } else {
            return (
                <Menu.Item key={key} icon={item.icon}>
                    <Link href={item.href}>
                        <a>{item.label}</a>
                    </Link>
                </Menu.Item>
            )
        }
    });
}

export default function AppLayout(props: React.PropsWithChildren<any>) {

    const {children} = props;

    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);
    const [showLogoutFlag, setShowLogoutFlag] = useState(false);
    const routesMap = routes.get(Role.MANAGER);
    const {defaultSelectedKeys, defaultOpenKeys, breadcrumb} = switchMenuActive(router.route, routesMap);

    const leftSideMenus = renderMenus(routesMap);

    // useEffect(async () => {
    //     switchMenuActive(router.route, routesMap);
    // }, []);


    function onCollapse(collapsedFlag: boolean) {
        setCollapsed(collapsedFlag);
    }

    function operateSlider() {
        onCollapse(!collapsed);
    }

    async function userLogout() {
        let logoutRequest = new LogoutRequest();
        const resp = await authAPI.logout(logoutRequest);
        const {code} = resp.data;
        if (code == 201) {
            localStorage.clear();
            //跳转页面
            await router.push("/");
        } else {
            message.error("用户名或密码错误");
        }
    }

    function showLogoutTip() {
        operateLogoutTip(true);
    }

    function hiddenLogoutTip() {
        operateLogoutTip(false);
    }

    function operateLogoutTip(flag: boolean) {
        setShowLogoutFlag(flag);
    }

    return (
        <Layout className="dashboard-layout">
            {/*Left*/}
            <Sider className="dashboard-slider" collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo">CMS</div>
                <Menu theme="dark" mode="inline"
                      defaultSelectedKeys={defaultSelectedKeys}
                    defaultOpenKeys={defaultOpenKeys}
                >
                    {leftSideMenus}
                </Menu>
            </Sider>

            {/*Right*/}
            <Layout className="site-layout">
                {/*Header*/}
                <Header className="dashboard-header">
                    <div className="icons-list ">
                        <div className="dashboard-header-menu" onClick={operateSlider}>
                            {{collapsed} ? <MenuFoldOutlined className="header-menu"/> :
                                <MenuUnfoldOutlined className="header-menu"/>}
                        </div>
                        <div className="userinfo" onMouseOver={showLogoutTip} onMouseOut={hiddenLogoutTip}>
                            <UserOutlined className="userinfo-icon"/>
                        </div>
                        <div className="bell">
                            <BellOutlined className="bell-icon"/>
                        </div>
                    </div>
                </Header>

                <div className={`${showLogoutFlag ? '' : 'hide'} logout`} onMouseOver={showLogoutTip}
                     onMouseOut={hiddenLogoutTip} onClick={userLogout}>
                    <LogoutOutlined className="logout-icon"/>
                    Logout
                </div>

                <Content className="dashboard-content">
                    {/*<Breadcrumb className="dashboard-breadcrumb">*/}
                    {/*<Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>*/}
                    {breadcrumb}
                    {/*</Breadcrumb>*/}
                    <div className="site-layout-background dashboard-site-layout">
                        {children}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );


}