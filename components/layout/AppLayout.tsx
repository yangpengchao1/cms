import {Breadcrumb, Layout, Menu, message} from 'antd';
import {
    BellOutlined,
    DashboardOutlined,
    DeploymentUnitOutlined,
    EditOutlined,
    FileAddOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MessageOutlined,
    ProjectOutlined,
    ReadOutlined,
    SolutionOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {useState} from "react";
import {useRouter} from "next/router";
import {authAPI} from "../../libs/API/AuthAPI";
import {LogoutRequest} from "../../libs/Entity/request/LogoutRequest";
import Link from "next/link";

const {Header, Content, Sider} = Layout;
const {SubMenu} = Menu;

export default function AppLayout(props: React.PropsWithChildren<any>) {

    const {children} = props;

    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);
    const [showLogoutFlag, setShowLogoutFlag] = useState(false);

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
                <Menu theme="dark" mode="inline">
                    <Menu.Item key="1" icon={<DashboardOutlined/>}>
                        <Link href="/dashboard/manager">
                            <a>Overview</a>
                        </Link>
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<SolutionOutlined/>} title="Student">
                        <Menu.Item key="3" icon={<TeamOutlined/>}>
                            <Link href="/dashboard/manager/students">
                                <a>Student List</a>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<DeploymentUnitOutlined/>} title="Teacher">
                        <Menu.Item key="6" icon={<TeamOutlined/>}>
                            <Link href="/dashboard/manager/teachers">
                                <a>Teacher List</a>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" icon={<ReadOutlined/>} title="Course">
                        <Menu.Item key="7" icon={<ProjectOutlined/>}>
                            <Link href="/dashboard/manager/courses">
                                <a>All Courses</a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="8" icon={<FileAddOutlined/>}>
                            <Link href="/dashboard/manager/add-course">
                                <a>Add Course</a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="10" icon={<EditOutlined/>}>
                            <Link href="/dashboard/manager/edit-course">
                                <a>Edit Course</a>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="9" icon={<MessageOutlined/>}>
                        <Link href="/dashboard/manager/message">
                            <a>Message</a>
                        </Link>
                    </Menu.Item>
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
                    <Breadcrumb className="dashboard-breadcrumb">

                        <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background dashboard-site-layout">
                        {children}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}