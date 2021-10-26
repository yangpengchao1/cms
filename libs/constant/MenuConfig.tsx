import {LeftSideMenu} from "../Entity/LeftSideMenu";
import {
    DashboardOutlined,
    DeploymentUnitOutlined, EditOutlined, FileAddOutlined, MessageOutlined, ProjectOutlined,
    ReadOutlined,
    SolutionOutlined,
    TeamOutlined
} from "@ant-design/icons";
import {Role} from "../enum/Role";


const overviewFunctions: LeftSideMenu = {
    href: "/dashboard/manager",
    label: "Overview",
    icon: <DashboardOutlined/>,
}

const studentFunctions: LeftSideMenu = {
    href: "",
    label: "Student",
    icon: <SolutionOutlined/>,
    subMenu: [
        {
            href: "/dashboard/manager/students",
            label: "Student List",
            icon: <TeamOutlined/>,
        }
    ]
}

const teacherFunctions: LeftSideMenu = {
    href: "teachers",
    label: "Teacher",
    icon: <DeploymentUnitOutlined/>,
    subMenu: [
        {
            href: "/dashboard/manager/teachers",
            label: "Teacher List",
            icon: <TeamOutlined/>,
        }
    ]
}

const courseFunctions: LeftSideMenu = {
    href: "courses",
    label: "Course",
    icon: <ReadOutlined/>,
    subMenu: [
        {
            href: "/dashboard/manager/courses",
            label: "All Courses",
            icon: <ProjectOutlined/>,
        },
        {
            href: "/dashboard/manager/add-course",
            label: "Add Course",
            icon: <FileAddOutlined/>,
        },
        {
            href: "/dashboard/manager/edit-course",
            label: "Edit Course",
            icon: <EditOutlined/>,
        },
    ]
}

const messageFunctions: LeftSideMenu = {
    href: "/dashboard/manager/message",
    label: "Message",
    icon: <MessageOutlined/>,
}

export const routes: Map<Role, LeftSideMenu[]> = new Map([
    [Role.MANAGER, [overviewFunctions, studentFunctions, teacherFunctions, courseFunctions, messageFunctions]],
]);